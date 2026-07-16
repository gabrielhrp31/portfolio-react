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

const emptyForm = {
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

export default function AdminClient({
  initialAuthenticated = false,
  initialItems = [],
}) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function refreshItems() {
    const response = await fetch("/api/portfolio");
    const data = await response.json();
    setItems(Array.isArray(data) ? data : []);
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
    await refreshItems();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setItems([]);
    setEditingId(null);
    setForm(emptyForm);
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
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
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      sortOrder: Number(form.sortOrder || 0),
    };

    const response = await fetch(
      editingId ? `/api/portfolio/${editingId}` : "/api/portfolio",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setLoading(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Falha ao salvar item");
      return;
    }

    resetForm();
    await refreshItems();
  }

  async function handleDelete(id) {
    if (!window.confirm("Excluir este item?")) return;
    setLoading(true);
    const response = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    setLoading(false);
    if (!response.ok) {
      setError("Falha ao excluir item");
      return;
    }
    if (editingId === id) resetForm();
    await refreshItems();
  }

  if (!authenticated) {
    return (
      <AdminPage>
        <Card as="form" onSubmit={handleLogin}>
          <Title>Admin do Portfólio</Title>
          <p>Entre com a senha definida em ADMIN_PASSWORD para cadastrar itens.</p>
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
        <Title>Gerenciar Portfólio</Title>
        <p>
          Cadastre, edite ou remova projetos. Eles aparecem automaticamente na
          home.
        </p>
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <SecondaryButton type="button" onClick={handleLogout}>
            Sair
          </SecondaryButton>
          <Link href="/">Ver site</Link>
        </div>

        <form onSubmit={handleSubmit}>
          <FormGrid>
            <label>
              Nome
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>
            <label>
              Ordem
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm({ ...form, sortOrder: e.target.value })
                }
              />
            </label>
            <label className="full">
              Descrição
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </label>
            <label className="full">
              Imagem (URL pública, ex: /assets/images/portfolio.jpg)
              <input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </label>
            <label className="full">
              Tecnologias (separadas por vírgula, ícones Devicon)
              <input
                value={form.technologies}
                onChange={(e) =>
                  setForm({ ...form, technologies: e.target.value })
                }
                placeholder="react, javascript, css3"
              />
            </label>
            <label>
              URL Demo
              <input
                value={form.urlDemo}
                onChange={(e) => setForm({ ...form, urlDemo: e.target.value })}
              />
            </label>
            <label>
              URL Github
              <input
                value={form.urlGithub}
                onChange={(e) =>
                  setForm({ ...form, urlGithub: e.target.value })
                }
              />
            </label>
            <label>
              Usuário demo
              <input
                value={form.user}
                onChange={(e) => setForm({ ...form, user: e.target.value })}
              />
            </label>
            <label>
              Senha demo
              <input
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </label>
            <label className="full">
              Cargos
              <input
                value={form.roles}
                onChange={(e) => setForm({ ...form, roles: e.target.value })}
              />
            </label>
          </FormGrid>
          {error ? <ErrorText>{error}</ErrorText> : null}
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <PrimaryButton type="submit" disabled={loading}>
              {loading
                ? "Salvando..."
                : editingId
                  ? "Atualizar item"
                  : "Cadastrar item"}
            </PrimaryButton>
            {editingId ? (
              <SecondaryButton type="button" onClick={resetForm}>
                Cancelar edição
              </SecondaryButton>
            ) : null}
          </div>
        </form>
      </Card>

      <Card>
        <Title>Itens cadastrados ({items.length})</Title>
        {items.length === 0 ? (
          <EmptyState>Nenhum item ainda. Cadastre o primeiro acima.</EmptyState>
        ) : (
          <ItemList>
            {items.map((item) => (
              <ItemRow key={item.id}>
                <div>
                  <strong>
                    #{item.id} · {item.name}
                  </strong>
                  <p>{item.description}</p>
                  <small>{(item.technologies || []).join(", ")}</small>
                </div>
                <div className="actions">
                  <SecondaryButton type="button" onClick={() => startEdit(item)}>
                    Editar
                  </SecondaryButton>
                  <SecondaryButton
                    type="button"
                    onClick={() => handleDelete(item.id)}
                  >
                    Excluir
                  </SecondaryButton>
                </div>
              </ItemRow>
            ))}
          </ItemList>
        )}
      </Card>
    </AdminPage>
  );
}
