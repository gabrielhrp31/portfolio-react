"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AdminPage,
  Card,
  EmptyState,
  ErrorText,
  FormGrid,
  ItemList,
  ItemRow,
  PrimaryButton,
  SecondaryButton,
  Title,
} from "./styles";
import { SERVICE_ICON_OPTIONS } from "@/lib/serviceIcons";

const emptyPortfolio = {
  name: "",
  description: "",
  image: "/assets/images/portfolio.jpg",
  technologies: "react, javascript",
  urlDemo: "",
  urlGithub: "",
  user: "",
  password: "",
  roles: "",
  sortOrder: 0,
};

const emptyService = {
  name: "",
  description: "",
  iconKey: "code",
  sortOrder: 0,
};

const emptyTechnology = {
  slug: "",
  label: "",
  sortOrder: 0,
};

export default function AdminClient({
  initialAuthenticated = false,
  initialPortfolio = [],
  initialServices = [],
  initialTechnologies = [],
}) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [services, setServices] = useState(initialServices);
  const [technologies, setTechnologies] = useState(initialTechnologies);

  const [portfolioForm, setPortfolioForm] = useState(emptyPortfolio);
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [technologyForm, setTechnologyForm] = useState(emptyTechnology);

  const [editingPortfolioId, setEditingPortfolioId] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingTechnologyId, setEditingTechnologyId] = useState(null);

  async function refreshAll() {
    const [portfolioRes, servicesRes, technologiesRes] = await Promise.all([
      fetch("/api/portfolio"),
      fetch("/api/services"),
      fetch("/api/technologies"),
    ]);
    const [portfolioData, servicesData, technologiesData] = await Promise.all([
      portfolioRes.json(),
      servicesRes.json(),
      technologiesRes.json(),
    ]);
    setPortfolio(Array.isArray(portfolioData) ? portfolioData : []);
    setServices(Array.isArray(servicesData) ? servicesData : []);
    setTechnologies(Array.isArray(technologiesData) ? technologiesData : []);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!response.ok) {
      setError("Senha inválida");
      return;
    }
    setAuthenticated(true);
    setPassword("");
    await refreshAll();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setPortfolio([]);
    setServices([]);
    setTechnologies([]);
    setEditingPortfolioId(null);
    setEditingServiceId(null);
    setEditingTechnologyId(null);
    setPortfolioForm(emptyPortfolio);
    setServiceForm(emptyService);
    setTechnologyForm(emptyTechnology);
  }

  async function saveEntity({
    event,
    endpoint,
    editingId,
    payload,
    onReset,
    onRefresh,
  }) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch(
      editingId ? `${endpoint}/${editingId}` : endpoint,
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    setLoading(false);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Falha ao salvar");
      return;
    }
    onReset();
    await onRefresh();
  }

  async function deleteEntity(endpoint, id, onAfter) {
    if (!window.confirm("Excluir este item?")) return;
    setLoading(true);
    const response = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    setLoading(false);
    if (!response.ok) {
      setError("Falha ao excluir");
      return;
    }
    onAfter();
    await refreshAll();
  }

  if (!authenticated) {
    return (
      <AdminPage>
        <Card as="form" onSubmit={handleLogin}>
          <Title>Admin do Portfólio</Title>
          <p>Gerencie portfólio, serviços e tecnologias.</p>
          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error ? <ErrorText>{error}</ErrorText> : null}
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </PrimaryButton>
          <Link href="/">← Voltar ao site</Link>
        </Card>
      </AdminPage>
    );
  }

  return (
    <AdminPage>
      <Card>
        <Title>Painel Admin</Title>
        <p>Cadastre portfólio, serviços prestados e tecnologias exibidas.</p>
        <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
          <SecondaryButton type="button" onClick={handleLogout}>
            Sair
          </SecondaryButton>
          <Link href="/">Ver site</Link>
        </div>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </Card>

      <Card>
        <Title>Portfólio</Title>
        <form
          onSubmit={(event) =>
            saveEntity({
              event,
              endpoint: "/api/portfolio",
              editingId: editingPortfolioId,
              payload: {
                ...portfolioForm,
                sortOrder: Number(portfolioForm.sortOrder || 0),
              },
              onReset: () => {
                setEditingPortfolioId(null);
                setPortfolioForm(emptyPortfolio);
              },
              onRefresh: refreshAll,
            })
          }
        >
          <FormGrid>
            <label>
              Nome
              <input
                value={portfolioForm.name}
                onChange={(e) =>
                  setPortfolioForm({ ...portfolioForm, name: e.target.value })
                }
                required
              />
            </label>
            <label>
              Ordem
              <input
                type="number"
                value={portfolioForm.sortOrder}
                onChange={(e) =>
                  setPortfolioForm({
                    ...portfolioForm,
                    sortOrder: e.target.value,
                  })
                }
              />
            </label>
            <label className="full">
              Descrição
              <textarea
                rows={3}
                value={portfolioForm.description}
                onChange={(e) =>
                  setPortfolioForm({
                    ...portfolioForm,
                    description: e.target.value,
                  })
                }
                required
              />
            </label>
            <label className="full">
              Imagem
              <input
                value={portfolioForm.image}
                onChange={(e) =>
                  setPortfolioForm({ ...portfolioForm, image: e.target.value })
                }
              />
            </label>
            <label className="full">
              Tecnologias do projeto (Devicon, separadas por vírgula)
              <input
                value={portfolioForm.technologies}
                onChange={(e) =>
                  setPortfolioForm({
                    ...portfolioForm,
                    technologies: e.target.value,
                  })
                }
              />
            </label>
            <label>
              URL Demo
              <input
                value={portfolioForm.urlDemo}
                onChange={(e) =>
                  setPortfolioForm({
                    ...portfolioForm,
                    urlDemo: e.target.value,
                  })
                }
              />
            </label>
            <label>
              URL Github
              <input
                value={portfolioForm.urlGithub}
                onChange={(e) =>
                  setPortfolioForm({
                    ...portfolioForm,
                    urlGithub: e.target.value,
                  })
                }
              />
            </label>
          </FormGrid>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <PrimaryButton type="submit" disabled={loading}>
              {editingPortfolioId ? "Atualizar projeto" : "Cadastrar projeto"}
            </PrimaryButton>
            {editingPortfolioId ? (
              <SecondaryButton
                type="button"
                onClick={() => {
                  setEditingPortfolioId(null);
                  setPortfolioForm(emptyPortfolio);
                }}
              >
                Cancelar
              </SecondaryButton>
            ) : null}
          </div>
        </form>
        <ItemList>
          {portfolio.length === 0 ? (
            <EmptyState>Nenhum projeto cadastrado.</EmptyState>
          ) : (
            portfolio.map((item) => (
              <ItemRow key={item.id}>
                <div>
                  <strong>
                    #{item.id} · {item.name}
                  </strong>
                  <p>{item.description}</p>
                </div>
                <div className="actions">
                  <SecondaryButton
                    type="button"
                    onClick={() => {
                      setEditingPortfolioId(item.id);
                      setPortfolioForm({
                        name: item.name || "",
                        description: item.description || "",
                        image: item.image || "",
                        technologies: (item.technologies || []).join(", "),
                        urlDemo: item.urlDemo || "",
                        urlGithub: item.urlGithub || "",
                        user: item.user || "",
                        password: item.password || "",
                        roles: item.roles || "",
                        sortOrder: item.sortOrder || 0,
                      });
                    }}
                  >
                    Editar
                  </SecondaryButton>
                  <SecondaryButton
                    type="button"
                    onClick={() =>
                      deleteEntity("/api/portfolio", item.id, () => {
                        if (editingPortfolioId === item.id) {
                          setEditingPortfolioId(null);
                          setPortfolioForm(emptyPortfolio);
                        }
                      })
                    }
                  >
                    Excluir
                  </SecondaryButton>
                </div>
              </ItemRow>
            ))
          )}
        </ItemList>
      </Card>

      <Card>
        <Title>Serviços</Title>
        <form
          onSubmit={(event) =>
            saveEntity({
              event,
              endpoint: "/api/services",
              editingId: editingServiceId,
              payload: {
                ...serviceForm,
                sortOrder: Number(serviceForm.sortOrder || 0),
              },
              onReset: () => {
                setEditingServiceId(null);
                setServiceForm(emptyService);
              },
              onRefresh: refreshAll,
            })
          }
        >
          <FormGrid>
            <label>
              Nome
              <input
                value={serviceForm.name}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, name: e.target.value })
                }
                required
              />
            </label>
            <label>
              Ícone
              <select
                value={serviceForm.iconKey}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, iconKey: e.target.value })
                }
              >
                {SERVICE_ICON_OPTIONS.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Ordem
              <input
                type="number"
                value={serviceForm.sortOrder}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, sortOrder: e.target.value })
                }
              />
            </label>
            <label className="full">
              Descrição
              <textarea
                rows={3}
                value={serviceForm.description}
                onChange={(e) =>
                  setServiceForm({
                    ...serviceForm,
                    description: e.target.value,
                  })
                }
                required
              />
            </label>
          </FormGrid>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <PrimaryButton type="submit" disabled={loading}>
              {editingServiceId ? "Atualizar serviço" : "Cadastrar serviço"}
            </PrimaryButton>
            {editingServiceId ? (
              <SecondaryButton
                type="button"
                onClick={() => {
                  setEditingServiceId(null);
                  setServiceForm(emptyService);
                }}
              >
                Cancelar
              </SecondaryButton>
            ) : null}
          </div>
        </form>
        <ItemList>
          {services.length === 0 ? (
            <EmptyState>Nenhum serviço cadastrado.</EmptyState>
          ) : (
            services.map((item) => (
              <ItemRow key={item.id}>
                <div>
                  <strong>
                    #{item.id} · {item.name}
                  </strong>
                  <p>{item.description}</p>
                  <small>ícone: {item.iconKey}</small>
                </div>
                <div className="actions">
                  <SecondaryButton
                    type="button"
                    onClick={() => {
                      setEditingServiceId(item.id);
                      setServiceForm({
                        name: item.name || "",
                        description: item.description || "",
                        iconKey: item.iconKey || "code",
                        sortOrder: item.sortOrder || 0,
                      });
                    }}
                  >
                    Editar
                  </SecondaryButton>
                  <SecondaryButton
                    type="button"
                    onClick={() =>
                      deleteEntity("/api/services", item.id, () => {
                        if (editingServiceId === item.id) {
                          setEditingServiceId(null);
                          setServiceForm(emptyService);
                        }
                      })
                    }
                  >
                    Excluir
                  </SecondaryButton>
                </div>
              </ItemRow>
            ))
          )}
        </ItemList>
      </Card>

      <Card>
        <Title>Tecnologias</Title>
        <p>
          Use o slug do Devicon (ex: <code>react</code>, <code>spring</code>,{" "}
          <code>mysql</code>).
        </p>
        <form
          onSubmit={(event) =>
            saveEntity({
              event,
              endpoint: "/api/technologies",
              editingId: editingTechnologyId,
              payload: {
                ...technologyForm,
                sortOrder: Number(technologyForm.sortOrder || 0),
              },
              onReset: () => {
                setEditingTechnologyId(null);
                setTechnologyForm(emptyTechnology);
              },
              onRefresh: refreshAll,
            })
          }
        >
          <FormGrid>
            <label>
              Slug (Devicon)
              <input
                value={technologyForm.slug}
                onChange={(e) =>
                  setTechnologyForm({
                    ...technologyForm,
                    slug: e.target.value,
                  })
                }
                placeholder="react"
                required
              />
            </label>
            <label>
              Label
              <input
                value={technologyForm.label}
                onChange={(e) =>
                  setTechnologyForm({
                    ...technologyForm,
                    label: e.target.value,
                  })
                }
                placeholder="React"
              />
            </label>
            <label>
              Ordem
              <input
                type="number"
                value={technologyForm.sortOrder}
                onChange={(e) =>
                  setTechnologyForm({
                    ...technologyForm,
                    sortOrder: e.target.value,
                  })
                }
              />
            </label>
          </FormGrid>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <PrimaryButton type="submit" disabled={loading}>
              {editingTechnologyId
                ? "Atualizar tecnologia"
                : "Cadastrar tecnologia"}
            </PrimaryButton>
            {editingTechnologyId ? (
              <SecondaryButton
                type="button"
                onClick={() => {
                  setEditingTechnologyId(null);
                  setTechnologyForm(emptyTechnology);
                }}
              >
                Cancelar
              </SecondaryButton>
            ) : null}
          </div>
        </form>
        <ItemList>
          {technologies.length === 0 ? (
            <EmptyState>Nenhuma tecnologia cadastrada.</EmptyState>
          ) : (
            technologies.map((item) => (
              <ItemRow key={item.id}>
                <div>
                  <strong>
                    #{item.id} · {item.label}
                  </strong>
                  <p>slug: {item.slug}</p>
                </div>
                <div className="actions">
                  <SecondaryButton
                    type="button"
                    onClick={() => {
                      setEditingTechnologyId(item.id);
                      setTechnologyForm({
                        slug: item.slug || "",
                        label: item.label || "",
                        sortOrder: item.sortOrder || 0,
                      });
                    }}
                  >
                    Editar
                  </SecondaryButton>
                  <SecondaryButton
                    type="button"
                    onClick={() =>
                      deleteEntity("/api/technologies", item.id, () => {
                        if (editingTechnologyId === item.id) {
                          setEditingTechnologyId(null);
                          setTechnologyForm(emptyTechnology);
                        }
                      })
                    }
                  >
                    Excluir
                  </SecondaryButton>
                </div>
              </ItemRow>
            ))
          )}
        </ItemList>
      </Card>
    </AdminPage>
  );
}
