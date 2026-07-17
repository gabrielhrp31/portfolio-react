"use client";

import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import FadeContent from "@/components/react-bits/FadeContent";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { settingValue } from "@/lib/settings";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: max(16px, env(safe-area-inset-top, 0px)) 16px
    max(16px, env(safe-area-inset-bottom, 0px));
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 768px) {
    align-items: center;
    padding: 24px;
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 720px;
  max-height: min(92dvh, 900px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 20px 18px;
  margin: auto 0;

  @media (min-width: 768px) {
    padding: 26px 24px;
    margin: 0;
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    margin-bottom: 14px;
  }

  h2 {
    font-size: 22px;
    color: ${({ theme }) => theme.titles};
    line-height: 1.2;
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.textMuted};
    font-size: 14px;
    line-height: 1.4;
  }

  .close-btn {
    cursor: pointer;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.titles};
    border-radius: 12px;
    padding: 8px 12px;
    font-weight: 700;
  }

  form {
    margin-top: 14px;
    display: grid;
    gap: 12px;
  }

  .grid2 {
    display: grid;
    gap: 12px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 13px;
    color: ${({ theme }) => theme.textMuted};
    font-weight: 600;
  }

  input,
  textarea {
    background: ${({ theme }) => theme.surfaceAlt};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 14px;
    padding: 12px 12px;
    color: ${({ theme }) => theme.titles};
    font-size: 14px;
    outline: none;
  }

  textarea {
    min-height: 130px;
    resize: vertical;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 6px;
    flex-wrap: wrap;
  }

  .btn {
    cursor: pointer;
    border-radius: 14px;
    padding: 11px 16px;
    font-weight: 800;
    transition: transform 0.2s ease, filter 0.2s ease, opacity 0.2s ease;
  }

  .btn-primary {
    background: ${({ theme }) => theme.softAccent};
    color: #0e1b12;
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  .btn-secondary {
    background: ${({ theme }) => theme.surfaceAlt};
    color: ${({ theme }) => theme.titles};
    border: 1px solid ${({ theme }) => theme.border};
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .status {
    margin-top: 12px;
    padding: 12px 14px;
    border-radius: 14px;
    font-size: 14px;
    line-height: 1.4;
    border: 1px solid ${({ theme }) => theme.border};
  }

  .status.error {
    background: rgba(255, 0, 0, 0.08);
    color: ${({ theme }) => theme.titles};
  }

  .status.ok {
    background: rgba(72, 197, 88, 0.12);
  }
`;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export default function QuoteModal({ open, onClose, prefill = null }) {
  const settings = useSiteSettings();
  const modalTitle = settingValue(settings, "quote_modal_title");
  const modalHelper = settingValue(settings, "quote_modal_helper");
  const modalSubmit = settingValue(settings, "quote_modal_submit");
  const modalSuccess = settingValue(settings, "quote_modal_success");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (!open) return;
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setBudget("");
    setSubmitting(false);
    setError("");
    setOk(false);
    setWarning("");
  }, [open]);

  useEffect(() => {
    if (!open || !prefill || typeof prefill !== "object") return;
    if (prefill.name) setName(String(prefill.name));
    if (prefill.email) setEmail(String(prefill.email));
    if (prefill.phone) setPhone(String(prefill.phone));
    if (prefill.message) setMessage(String(prefill.message));
    if (prefill.budget) setBudget(String(prefill.budget));
  }, [open, prefill]);

  const canSubmit = useMemo(() => {
    return Boolean(name.trim() && isValidEmail(email) && message.trim());
  }, [name, email, message]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setError("");
    setOk(false);
    setWarning("");

    try {
      const res = await fetch("/api/contact/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          budget,
          message,
          source: prefill?.source || "modal",
        }),
      });

      const raw = await res.text();
      let data = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.error || "Falha ao enviar solicitação");
      }

      setWarning(data.warning || "");
      setOk(true);
    } catch (err) {
      setError(err?.message || "Falha ao enviar solicitação");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-label="Solicitação de orçamento"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <FadeContent playOnMount duration={260} blur className="quote-modal-fade">
        <Card>
          <div className="header">
            <div>
              <h2>{modalTitle}</h2>
              <p>{modalHelper}</p>
            </div>
            <button type="button" className="close-btn" onClick={onClose}>
              Fechar
            </button>
          </div>

          {!ok ? (
            <form onSubmit={onSubmit}>
              <div className="grid2">
                <label>
                  Seu nome
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Gabriel"
                    required
                  />
                </label>
                <label>
                  Seu email
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@exemplo.com"
                    required
                    inputMode="email"
                  />
                </label>
              </div>

              <div className="grid2">
                <label>
                  Telefone (opcional)
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(31) 99999-9999"
                  />
                </label>
                <label>
                  Valor estimado (opcional)
                  <input
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Ex: R$ 5.000"
                  />
                </label>
              </div>

              <label>
                Descreva o projeto
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="O que você quer construir/ajustar? Prazo e detalhes ajudam muito."
                  required
                />
              </label>

              <div className="actions">
                {error ? (
                  <div className="status error" style={{ marginRight: "auto" }}>
                    {error}
                  </div>
                ) : null}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!canSubmit || submitting}
                >
                  {submitting ? "Enviando..." : modalSubmit}
                </button>
              </div>
            </form>
          ) : (
            <div className="status ok">
              <b>{modalSuccess}</b>
              <div style={{ marginTop: 8 }}>
                {warning ||
                  "Recebi seu pedido. Assim que possível respondo por email."}
              </div>
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onClose}
                >
                  Ok
                </button>
              </div>
            </div>
          )}
        </Card>
      </FadeContent>
    </Overlay>
  );
}
