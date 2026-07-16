# Melhorias sugeridas (inspirado em [valadao.works](https://valadao.works/))

## Já implementado nesta etapa
- Seção **Experiência** (timeline) alimentada por MySQL + seed
- Seção **Formação & Cursos** (cards) alimentada por MySQL + seed
- CRUD no `/admin` para ambos

## Próximas melhorias de produto/UX

1. **Hero com proposta clara**  
   No Valadão, o hero diz quem é + o que faz em 2–3 linhas objetivas (“Product Designer…”). Vale reduzir o typewriter e deixar um headline fixo + subtítulo editável no admin.

2. **Status de disponibilidade**  
   Badge tipo “Available for projects” no topo aumenta conversão de contato.

3. **Cases com narrativa**  
   Projetos do Valadão são case studies (problema → solução → resultado). Nos cards do portfólio, adicionar campos `challenge`, `solution`, `result` (ou página `/projects/[slug]`).

4. **Experiência com bullets**  
   Além da descrição, permitir lista de responsabilidades (JSON) como no Valadão.

5. **Navegação por âncoras**  
   Menu com links para Sobre, Serviços, Experiência, Cursos, Portfólio, Contato.

6. **CTA de contato recorrente**  
   Botão fixo WhatsApp/e-mail e bloco final “Vamos conversar?”.

7. **i18n PT/EN**  
   Toggle de idioma como no site de referência, começando por textos principais.

8. **Motion mais intencional**  
   Entrada das seções no scroll (sem atrapalhar leitura); manter identidade green/matrix sem saturar overlays.

9. **SEO + Open Graph**  
   Metadata dinâmica por projeto, `sitemap.xml`, preview social.

10. **Performance**  
    Trocar `<img>` por `next/image`, revisar `background-attachment: fixed` em mobile.
