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
  SectionTitle,
  TabButton,
  TabList,
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

const emptyExperience = {
  company: "",
  position: "",
  period: "",
  location: "",
  description: "",
  sortOrder: 0,
};

const emptyCourse = {
  title: "",
  institution: "",
  period: "",
  location: "",
  description: "",
  link: "",
  kind: "course",
  sortOrder: 0,
};

const ADMIN_TABS = [
  { id: "quotes", label: "Orçamentos" },
  { id: "media", label: "Imagens" },
  { id: "experience", label: "Experiência" },
  { id: "courses", label: "Formação" },
  { id: "portfolio", label: "Portfólio" },
  { id: "services", label: "Serviços" },
  { id: "technologies", label: "Tecnologias" },
];

export default function AdminClient({
  initialAuthenticated = false,
  initialPortfolio = [],
  initialServices = [],
  initialTechnologies = [],
  initialExperiences = [],
  initialCourses = [],
  initialMedia = [],
  initialQuotes = [],
}) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("quotes");

  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [services, setServices] = useState(initialServices);
  const [technologies, setTechnologies] = useState(initialTechnologies);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [courses, setCourses] = useState(initialCourses);
  const [media, setMedia] = useState(initialMedia);
  const [quotes, setQuotes] = useState(initialQuotes);
  const [mediaDrafts, setMediaDrafts] = useState(() =>
    Object.fromEntries(
      (initialMedia || []).map((item) => [
        item.key,
        { url: item.url || "", altText: item.altText || "" },
      ])
    )
  );

  const [portfolioForm, setPortfolioForm] = useState(emptyPortfolio);
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [technologyForm, setTechnologyForm] = useState(emptyTechnology);
  const [experienceForm, setExperienceForm] = useState(emptyExperience);
  const [courseForm, setCourseForm] = useState(emptyCourse);

  const [editingPortfolioId, setEditingPortfolioId] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingTechnologyId, setEditingTechnologyId] = useState(null);
  const [editingExperienceId, setEditingExperienceId] = useState(null);
  const [editingCourseId, setEditingCourseId] = useState(null);

  async function refreshAll() {
    const responses = await Promise.all([
      fetch("/api/portfolio"),
      fetch("/api/services"),
      fetch("/api/technologies"),
      fetch("/api/experiences"),
      fetch("/api/courses"),
      fetch("/api/media"),
      fetch("/api/contact/quote"),
    ]);
    const [p, s, t, e, c, m, q] = await Promise.all(
      responses.map((r) => r.json())
    );
    setPortfolio(Array.isArray(p) ? p : []);
    setServices(Array.isArray(s) ? s : []);
    setTechnologies(Array.isArray(t) ? t : []);
    setExperiences(Array.isArray(e) ? e : []);
    setCourses(Array.isArray(c) ? c : []);
    const mediaList = Array.isArray(m) ? m : [];
    setMedia(mediaList);
    setQuotes(Array.isArray(q) ? q : []);
    setMediaDrafts(
      Object.fromEntries(
        mediaList.map((item) => [
          item.key,
          { url: item.url || "", altText: item.altText || "" },
        ])
      )
    );
  }

  async function uploadFile(file) {
    const form = new FormData();
    form.append("file", file);
    const response = await fetch("/api/media/upload", {
      method: "POST",
      body: form,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || "Falha no upload");
    }
    return data.url;
  }

  async function saveMediaItem(item) {
    setLoading(true);
    setError("");
    const draft = mediaDrafts[item.key] || { url: item.url, altText: item.altText };
    try {
      let response;
      if (item.id) {
        response = await fetch(`/api/media/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            label: item.label,
            url: draft.url,
            altText: draft.altText,
            sortOrder: item.sortOrder || 0,
          }),
        });
      } else {
        response = await fetch("/api/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key: item.key,
            label: item.label,
            url: draft.url,
            altText: draft.altText,
            sortOrder: item.sortOrder || 0,
          }),
        });
      }
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Falha ao salvar mídia");
        return;
      }
      await refreshAll();
    } finally {
      setLoading(false);
    }
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
    setExperiences([]);
    setCourses([]);
    setMedia([]);
    setQuotes([]);
    setMediaDrafts({});
    setEditingPortfolioId(null);
    setEditingServiceId(null);
    setEditingTechnologyId(null);
    setEditingExperienceId(null);
    setEditingCourseId(null);
    setPortfolioForm(emptyPortfolio);
    setServiceForm(emptyService);
    setTechnologyForm(emptyTechnology);
    setExperienceForm(emptyExperience);
    setCourseForm(emptyCourse);
  }

  async function saveEntity({
    event,
    endpoint,
    editingId,
    payload,
    onReset,
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
    await refreshAll();
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
          <p>
            Gerencie portfólio, serviços, tecnologias, experiências, cursos e
            imagens.
          </p>
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
        <p>
          Use as abas abaixo para editar cada bloco do site sem rolar a página
          inteira.
        </p>
        <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
          <SecondaryButton type="button" onClick={handleLogout}>
            Sair
          </SecondaryButton>
          <Link href="/">Ver site</Link>
        </div>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </Card>

      <TabList role="tablist" aria-label="Seções do admin">
        {ADMIN_TABS.map((tab) => (
          <TabButton
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            $active={activeTab === tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>

      {activeTab === "quotes" ? (
      <Card role="tabpanel" aria-label="Orçamentos">
        <SectionTitle>Orçamentos recebidos</SectionTitle>
        <p style={{ marginBottom: 12 }}>
          Solicitações enviadas pelo site (salvas no MySQL + email quando SMTP
          estiver configurado).
        </p>
        <ItemList>
          {quotes.length === 0 ? (
            <EmptyState>Nenhuma solicitação ainda.</EmptyState>
          ) : (
            quotes.map((item) => (
              <ItemRow key={item.id}>
                <div>
                  <strong>
                    #{item.id} · {item.name}
                  </strong>
                  <p>
                    {item.email}
                    {item.phone ? ` · ${item.phone}` : ""}
                    {item.budget ? ` · ${item.budget}` : ""}
                  </p>
                  <p style={{ marginTop: 6 }}>{item.message}</p>
                  <p style={{ marginTop: 6, opacity: 0.75 }}>
                    origem: {item.source || "-"} · email: {item.emailStatus} ·{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString("pt-BR")
                      : ""}
                  </p>
                </div>
              </ItemRow>
            ))
          )}
        </ItemList>
      </Card>
      ) : null}

      {activeTab === "media" ? (
      <Card role="tabpanel" aria-label="Imagens do site">
        <SectionTitle>Imagens do site</SectionTitle>
        <p style={{ marginBottom: 12 }}>
          URLs locais (`/assets/...`, `/uploads/...`) são otimizadas (AVIF/WebP)
          pelo Next.js. Você também pode colar uma URL externa ou fazer upload.
        </p>
        <ItemList>
          {media.map((item) => {
            const draft = mediaDrafts[item.key] || {
              url: item.url || "",
              altText: item.altText || "",
            };
            return (
              <ItemRow key={item.key}>
                <div style={{ width: "100%" }}>
                  <strong>
                    {item.label} <span style={{ opacity: 0.65 }}>({item.key})</span>
                  </strong>
                  <FormGrid style={{ marginTop: 10 }}>
                    <label className="full">
                      URL
                      <input
                        value={draft.url}
                        onChange={(e) =>
                          setMediaDrafts((prev) => ({
                            ...prev,
                            [item.key]: { ...draft, url: e.target.value },
                          }))
                        }
                      />
                    </label>
                    <label className="full">
                      Texto alternativo
                      <input
                        value={draft.altText}
                        onChange={(e) =>
                          setMediaDrafts((prev) => ({
                            ...prev,
                            [item.key]: { ...draft, altText: e.target.value },
                          }))
                        }
                      />
                    </label>
                    <label>
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setLoading(true);
                          setError("");
                          try {
                            const url = await uploadFile(file);
                            setMediaDrafts((prev) => ({
                              ...prev,
                              [item.key]: { ...draft, url },
                            }));
                          } catch (err) {
                            setError(err.message || "Falha no upload");
                          } finally {
                            setLoading(false);
                            e.target.value = "";
                          }
                        }}
                      />
                    </label>
                  </FormGrid>
                  {draft.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={draft.url}
                      alt={draft.altText || item.label}
                      style={{
                        marginTop: 10,
                        maxWidth: 160,
                        maxHeight: 90,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  ) : null}
                  <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                    <PrimaryButton
                      type="button"
                      disabled={loading}
                      onClick={() => saveMediaItem(item)}
                    >
                      Salvar
                    </PrimaryButton>
                  </div>
                </div>
              </ItemRow>
            );
          })}
        </ItemList>
      </Card>
      ) : null}

      {activeTab === "experience" ? (
      <Card role="tabpanel" aria-label="Experiência">
        <SectionTitle>Experiência</SectionTitle>
        <form
          onSubmit={(event) =>
            saveEntity({
              event,
              endpoint: "/api/experiences",
              editingId: editingExperienceId,
              payload: {
                ...experienceForm,
                sortOrder: Number(experienceForm.sortOrder || 0),
              },
              onReset: () => {
                setEditingExperienceId(null);
                setExperienceForm(emptyExperience);
              },
            })
          }
        >
          <FormGrid>
            <label>
              Empresa
              <input
                value={experienceForm.company}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    company: e.target.value,
                  })
                }
                required
              />
            </label>
            <label>
              Cargo
              <input
                value={experienceForm.position}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    position: e.target.value,
                  })
                }
                required
              />
            </label>
            <label>
              Período
              <input
                value={experienceForm.period}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    period: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Local
              <input
                value={experienceForm.location}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    location: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Ordem
              <input
                type="number"
                value={experienceForm.sortOrder}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    sortOrder: e.target.value,
                  })
                }
              />
            </label>
            <label className="full">
              Descrição
              <textarea
                rows={4}
                value={experienceForm.description}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    description: e.target.value,
                  })
                }
              />
            </label>
          </FormGrid>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <PrimaryButton type="submit" disabled={loading}>
              {editingExperienceId
                ? "Atualizar experiência"
                : "Cadastrar experiência"}
            </PrimaryButton>
            {editingExperienceId ? (
              <SecondaryButton
                type="button"
                onClick={() => {
                  setEditingExperienceId(null);
                  setExperienceForm(emptyExperience);
                }}
              >
                Cancelar
              </SecondaryButton>
            ) : null}
          </div>
        </form>
        <ItemList>
          {experiences.length === 0 ? (
            <EmptyState>Nenhuma experiência cadastrada.</EmptyState>
          ) : (
            experiences.map((item) => (
              <ItemRow key={item.id}>
                <div>
                  <strong>
                    #{item.id} · {item.company}
                  </strong>
                  <p>
                    {item.position} — {item.period}
                  </p>
                </div>
                <div className="actions">
                  <SecondaryButton
                    type="button"
                    onClick={() => {
                      setEditingExperienceId(item.id);
                      setExperienceForm({
                        company: item.company || "",
                        position: item.position || "",
                        period: item.period || "",
                        location: item.location || "",
                        description: item.description || "",
                        sortOrder: item.sortOrder || 0,
                      });
                    }}
                  >
                    Editar
                  </SecondaryButton>
                  <SecondaryButton
                    type="button"
                    onClick={() =>
                      deleteEntity("/api/experiences", item.id, () => {
                        if (editingExperienceId === item.id) {
                          setEditingExperienceId(null);
                          setExperienceForm(emptyExperience);
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
      ) : null}

      {activeTab === "courses" ? (
      <Card role="tabpanel" aria-label="Formação e cursos">
        <SectionTitle>Formação & Cursos</SectionTitle>
        <form
          onSubmit={(event) =>
            saveEntity({
              event,
              endpoint: "/api/courses",
              editingId: editingCourseId,
              payload: {
                ...courseForm,
                sortOrder: Number(courseForm.sortOrder || 0),
              },
              onReset: () => {
                setEditingCourseId(null);
                setCourseForm(emptyCourse);
              },
            })
          }
        >
          <FormGrid>
            <label>
              Título
              <input
                value={courseForm.title}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, title: e.target.value })
                }
                required
              />
            </label>
            <label>
              Instituição
              <input
                value={courseForm.institution}
                onChange={(e) =>
                  setCourseForm({
                    ...courseForm,
                    institution: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Tipo
              <select
                value={courseForm.kind}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, kind: e.target.value })
                }
              >
                <option value="formation">Formação</option>
                <option value="course">Curso</option>
                <option value="certificate">Certificado</option>
              </select>
            </label>
            <label>
              Período
              <input
                value={courseForm.period}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, period: e.target.value })
                }
              />
            </label>
            <label>
              Local
              <input
                value={courseForm.location}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, location: e.target.value })
                }
              />
            </label>
            <label>
              Ordem
              <input
                type="number"
                value={courseForm.sortOrder}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, sortOrder: e.target.value })
                }
              />
            </label>
            <label className="full">
              Descrição
              <textarea
                rows={3}
                value={courseForm.description}
                onChange={(e) =>
                  setCourseForm({
                    ...courseForm,
                    description: e.target.value,
                  })
                }
              />
            </label>
            <label className="full">
              Link do certificado
              <input
                value={courseForm.link}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, link: e.target.value })
                }
              />
            </label>
          </FormGrid>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <PrimaryButton type="submit" disabled={loading}>
              {editingCourseId ? "Atualizar curso" : "Cadastrar curso"}
            </PrimaryButton>
            {editingCourseId ? (
              <SecondaryButton
                type="button"
                onClick={() => {
                  setEditingCourseId(null);
                  setCourseForm(emptyCourse);
                }}
              >
                Cancelar
              </SecondaryButton>
            ) : null}
          </div>
        </form>
        <ItemList>
          {courses.length === 0 ? (
            <EmptyState>Nenhum curso cadastrado.</EmptyState>
          ) : (
            courses.map((item) => (
              <ItemRow key={item.id}>
                <div>
                  <strong>
                    #{item.id} · {item.title}
                  </strong>
                  <p>
                    {item.institution} — {item.kind}
                  </p>
                </div>
                <div className="actions">
                  <SecondaryButton
                    type="button"
                    onClick={() => {
                      setEditingCourseId(item.id);
                      setCourseForm({
                        title: item.title || "",
                        institution: item.institution || "",
                        period: item.period || "",
                        location: item.location || "",
                        description: item.description || "",
                        link: item.link || "",
                        kind: item.kind || "course",
                        sortOrder: item.sortOrder || 0,
                      });
                    }}
                  >
                    Editar
                  </SecondaryButton>
                  <SecondaryButton
                    type="button"
                    onClick={() =>
                      deleteEntity("/api/courses", item.id, () => {
                        if (editingCourseId === item.id) {
                          setEditingCourseId(null);
                          setCourseForm(emptyCourse);
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
      ) : null}

      {activeTab === "portfolio" ? (
      <Card role="tabpanel" aria-label="Portfólio">
        <SectionTitle>Portfólio</SectionTitle>
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
              Imagem (URL)
              <input
                value={portfolioForm.image}
                onChange={(e) =>
                  setPortfolioForm({ ...portfolioForm, image: e.target.value })
                }
              />
            </label>
            <label>
              Upload da imagem
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setLoading(true);
                  setError("");
                  try {
                    const url = await uploadFile(file);
                    setPortfolioForm((prev) => ({ ...prev, image: url }));
                  } catch (err) {
                    setError(err.message || "Falha no upload");
                  } finally {
                    setLoading(false);
                    e.target.value = "";
                  }
                }}
              />
            </label>
            <label className="full">
              Tecnologias do projeto
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
          </div>
        </form>
        <ItemList>
          {portfolio.map((item) => (
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
          ))}
        </ItemList>
      </Card>
      ) : null}

      {activeTab === "services" ? (
      <Card role="tabpanel" aria-label="Serviços">
        <SectionTitle>Serviços</SectionTitle>
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
          </div>
        </form>
        <ItemList>
          {services.map((item) => (
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
          ))}
        </ItemList>
      </Card>
      ) : null}

      {activeTab === "technologies" ? (
      <Card role="tabpanel" aria-label="Tecnologias">
        <SectionTitle>Tecnologias</SectionTitle>
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
              />
            </label>
          </FormGrid>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <PrimaryButton type="submit" disabled={loading}>
              {editingTechnologyId
                ? "Atualizar tecnologia"
                : "Cadastrar tecnologia"}
            </PrimaryButton>
          </div>
        </form>
        <ItemList>
          {technologies.map((item) => (
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
          ))}
        </ItemList>
      </Card>
      ) : null}
    </AdminPage>
  );
}
