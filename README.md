# Trilum Conecta

## Página pública do Coday 2026.1

A apresentação possui uma página pública com acesso ao projeto, contas de demonstração e
materiais:

* **Produção:** [https://auhauhbr.github.io/Trilum-Conecta/#/coday](https://auhauhbr.github.io/Trilum-Conecta/#/coday)
* **Local:** `http://localhost:5173/Trilum-Conecta/#/coday`

Para QR Codes, use sempre a URL completa com `#/coday`.

**Trilum Conecta** é uma plataforma front-end que conecta aprendizado, construção de evidências e oportunidades em tecnologia. O produto atende alunos/candidatos e empresas/recrutadores em uma jornada integrada: diagnóstico inicial, recomendações explicáveis, evolução de perfil, projetos práticos, candidaturas e análise contextual de candidatos.

As regras do sistema são a fonte de verdade. Pontuações, recomendações, radar, qualidade de vagas e compatibilidade são calculados localmente. Uma camada opcional de IA local via Ollama pode melhorar textos e explicações, mas nunca decide recomendações, aprova candidatos ou altera dados automaticamente.

## Acesso da Demo

Versão publicada no GitHub Pages:

[https://auhauhbr.github.io/Trilum-Conecta/#/](https://auhauhbr.github.io/Trilum-Conecta/#/)

> **Nota:** Use o link com `#/`, pois o projeto usa `HashRouter` para funcionar corretamente no GitHub Pages.

### Contas prontas para apresentação

**Empresa NexaCloud Solutions**

* **E-mail:** empresa.demo@trilum.demo
* **Senha:** Empresa@123

**Aluno Lucas Andrade**

* **E-mail:** aluno.demo@trilum.demo
* **Senha:** Aluno@123
* **Cenário:** aluno DevOps em formação, com perfil demonstrativo e pontos de melhoria guiados pelo mentor.

**Observação:** Lucas Andrade já aparece como candidato em vagas da NexaCloud Solutions, permitindo testar rapidamente a visualização de perfil, o dossiê do candidato, o radar de prontidão, o retorno de candidatura e a exportação de currículo pelo lado da empresa.

Todos os dados das contas demonstrativas são fictícios e foram criados apenas para apresentação do projeto.

## Funcionalidades

### Jornada do aluno

* **Landing page institucional** com apresentação da plataforma, equipe e mentor contextual.
* **Cadastro e login local** para aluno e empresa.
* **Validação guiada** por mentor em login/cadastro.
* **Wizard diagnóstico** que coleta área desejada, foco de carreira, experiência, tecnologias, objetivo e disponibilidade.
* **Recomendador por regras e pesos** para priorizar trilhas, cursos e vagas coerentes com o perfil.
* **Trilhas organizadas por famílias**, com conteúdo principal, pré-requisitos e complementos.
* **Catálogo** de cursos, trilhas, módulos, aulas e progresso individual.
* **Registro local** de progresso por usuário.
* **Certificados Trilum** para cursos concluídos.
* **Mentor contextual** que acompanha página, seção, filtros, cursos, vagas, perfil e currículo.
* **Perfil público assistido** com tecnologias, idiomas, formação, projetos, experiências e certificados externos.
* **Gerador de currículo** com preview, copiar texto, exportação em PDF e orientações de preenchimento.
* **Projetos práticos sugeridos** conectando cursos e trilhas a GitHub, deploy e evidências para o perfil.
* **Radar de prontidão para candidatura** com score orientativo, pontos fortes, lacunas e próxima melhor ação.
* **Retorno profissional das candidaturas**, com status cuidadosos, feedback público e sugestões de evolução.

### Jornada da empresa

* **Área da empresa** com perfil institucional, criação de vagas, gerenciamento, preview da vaga e lista de candidatos.
* **Empresas e vagas mockadas**, incluindo a empresa demonstrativa NexaCloud Solutions.
* **Visualização de empresa na vaga** com logo, capa, descrição e dados institucionais.
* **Força do perfil da empresa** com pontos fortes e próximos ajustes.
* **Raio-X da vaga** com qualidade, atratividade, coerência, erros, alertas e sugestões.
* **Melhoria assistida de vagas e perfil institucional**, sempre revisável antes de aplicar.
* **Dossiê do candidato** com compatibilidades, lacunas, evidências e recomendação interna cautelosa.
* **Feedback assistido de candidatura**, separado de observações internas e compartilhado apenas após revisão.
* **Exportação do currículo atualizado** do candidato pela empresa.
* **Mentor da empresa** com dicas sobre perfil, vagas, tags, compatibilidade e candidatos.
* **Mentor compactável:** ao fechar, ele vira um botão flutuante e pode ser reaberto sem atualizar a página.

### Coday e demonstração

* **Página pública do Coday** com acesso ao projeto, contas demo, apresentação e documentação visual.
* **Login demo autocompletado** ao entrar pela página Coday.
* **Massa fictícia integrada** entre Lucas Andrade e NexaCloud Solutions para demonstrar o fluxo completo.

## Roteiro Rápido de Teste

### Aluno

1. Acesse a landing page.
2. Entre em **Cadastrar** e crie uma conta de aluno.
3. Observe o mentor de validação nos campos obrigatórios e na senha.
4. Complete o wizard para receber recomendações.
5. Confira o painel, o mentor e o radar de candidatura.
6. Acesse cursos, trilhas e projetos práticos sugeridos.
7. Abra uma vaga e confira prontidão, vaga e empresa.
8. Edite o perfil público e abra **Meu Currículo**.
9. Veja candidaturas e o retorno profissional da empresa.

### Empresa

1. Crie ou acesse uma conta de empresa.
2. Confira o aviso do mentor para completar o perfil.
3. Edite o perfil institucional da empresa.
4. Use a vaga demo criada automaticamente no cadastro ou crie uma nova vaga.
5. Abra a lista de candidatos da vaga demo.
6. Abra a vaga **Analista DevOps Júnior** e clique em *Lucas Andrade*.
7. Confira o dossiê, currículo, evidências e feedback assistido.

> Ao cadastrar uma nova empresa, a plataforma cria automaticamente uma vaga demo editável e um candidato fictício com perfil completo. Isso permite testar o gerenciamento de vaga, ver o perfil do candidato, alterar o status e exportar o currículo sem precisar cadastrar um aluno antes.

## Tecnologias

* React
* Vite
* React Router
* JavaScript
* CSS
* LocalStorage
* Lucide React
* Tabler Icons / React Icons (quando aplicável)

## Como Rodar Localmente

**Pré-requisitos:**

* Node.js
* npm

Instale as dependências:

```bash
npm i
```

Rode em desenvolvimento:

```bash
npm run dev
```

Acesse a URL exibida no terminal, normalmente: `http://localhost:5173`

### Scripts

* `npm run dev`: Inicia o ambiente local.
* `npm run lint`: Executa a verificação de lint.
* `npm run build`: Gera a versão final na pasta `dist`.
* `npm run preview`: Abre uma prévia local da build.

## Publicação no GitHub Pages

A publicação é feita pelos desenvolvedores do projeto. Depois do deploy, o avaliador/mentor acessa apenas o link final da plataforma no GitHub Pages.

Antes de publicar:

```bash
npm run lint
npm run build
```

**Configuração usada:**

* `vite.config.js` com `base: '/Trilum-Conecta/'`.
* `HashRouter` no React para evitar tela branca ao recarregar rotas no GitHub Pages.
* GitHub Actions publicando a pasta `dist`.
* `public/.nojekyll` para evitar processamento pelo Jekyll.

## Dados e Persistência

O MVP usa dados mockados e `localStorage`. Isso permite testar cadastro, login, progresso, certificados, empresas, vagas e candidaturas sem back-end.

Os dados ficam salvos no navegador usado no teste. Para reiniciar a demo, limpe o armazenamento local do site nas ferramentas do navegador.

Quando a massa de demonstração é atualizada, o projeto sincroniza automaticamente as contas oficiais da demo. Dados personalizados criados no navegador continuam preservados sempre que possível.

## Mentor IA local opcional

O projeto possui uma camada opcional de explicações e redação assistida com Ollama local. Ela pode melhorar orientações do mentor, textos de vagas e perfil da empresa, resumos de dossiê e feedbacks. O recomendador por regras continua decidindo cursos, trilhas e vagas; radar, qualidade e compatibilidade também continuam determinísticos.

No deploy público, todas as funcionalidades continuam disponíveis com regras e fallbacks. A build tenta usar a IA local, mas a geração via Ollama depende do Ollama instalado e executando no computador do visitante, do modelo `gemma3:1b` disponível e da origem pública autorizada na configuração local do Ollama. Sem isso, o fallback é usado automaticamente.

Veja configuração, proteções e testes em [docs/MENTOR_IA.md](docs/MENTOR_IA.md).

## Observações Para Avaliação

* As recomendações de cursos, trilhas e vagas são baseadas em regras manuais.
* A IA é opcional e usada apenas para redação e explicação; nenhuma decisão depende dela.
* As tags das vagas influenciam a compatibilidade com alunos.
* Radar e dossiê são apoios orientativos e não bloqueiam candidaturas nem substituem análise humana.
* O currículo exportado usa os dados atuais do perfil do aluno.
* A primeira abertura no GitHub Pages pode demorar alguns segundos para carregar imagens maiores do mentor.
* O projeto é um MVP front-end; dados criados durante o teste ficam apenas no navegador.
