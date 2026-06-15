const TEMPLATES = {
  frontend: {
    id: 'frontend-dashboard',
    titulo: 'Dashboard responsivo com React e TypeScript',
    area: 'Front-end',
    tecnologias: ['React', 'TypeScript', 'API REST', 'GitHub', 'CSS/Tailwind'],
    objetivo: 'Criar um dashboard responsivo com listagem, filtros e consumo de API.',
    passos: ['Planejar as telas', 'Criar cards e filtros', 'Consumir uma API', 'Ajustar responsividade', 'Publicar e documentar'],
    entregaveis: ['Repositório no GitHub', 'README', 'Prints da interface', 'Link do deploy, se possível'],
  },
  'backend-java': {
    id: 'backend-java-api',
    titulo: 'API REST com Spring Boot e banco de dados',
    area: 'Back-end Java',
    tecnologias: ['Java', 'Spring Boot', 'SQL', 'API REST', 'GitHub'],
    objetivo: 'Construir uma API CRUD com validações, banco de dados e documentação.',
    passos: ['Modelar os dados', 'Criar endpoints CRUD', 'Adicionar validações', 'Conectar banco', 'Documentar a API'],
    entregaveis: ['Repositório no GitHub', 'CRUD funcional', 'Banco configurado', 'README com endpoints'],
  },
  'backend-node': {
    id: 'backend-node-api',
    titulo: 'API REST com Node.js, autenticação e banco',
    area: 'Back-end Node',
    tecnologias: ['Node.js', 'Express', 'SQL/MongoDB', 'JWT', 'GitHub'],
    objetivo: 'Criar uma API com autenticação, persistência e testes básicos.',
    passos: ['Criar endpoints', 'Adicionar autenticação', 'Conectar banco', 'Validar entradas', 'Criar testes básicos'],
    entregaveis: ['Repositório no GitHub', 'Endpoints documentados', 'Autenticação funcional', 'README'],
  },
  'backend-csharp': {
    id: 'backend-dotnet-api',
    titulo: 'API CRUD com C# e .NET',
    area: 'Back-end C#/.NET',
    tecnologias: ['C#', '.NET', 'Entity Framework', 'SQL', 'API REST'],
    objetivo: 'Construir uma API CRUD em .NET com persistência e documentação.',
    passos: ['Criar projeto .NET', 'Modelar entidade', 'Configurar Entity Framework', 'Criar CRUD', 'Documentar execução'],
    entregaveis: ['Repositório no GitHub', 'CRUD funcional', 'Migrações do banco', 'README'],
  },
  'backend-python': {
    id: 'backend-python-api',
    titulo: 'API REST com Python e FastAPI',
    area: 'Back-end Python',
    tecnologias: ['Python', 'FastAPI', 'SQL', 'API REST', 'GitHub'],
    objetivo: 'Construir uma API em Python com validações, banco de dados e documentação automática.',
    passos: ['Definir recursos da API', 'Criar rotas CRUD', 'Adicionar validações', 'Conectar banco', 'Documentar execução'],
    entregaveis: ['Repositório no GitHub', 'Endpoints funcionais', 'Documentação da API', 'README'],
  },
  devops: {
    id: 'devops-docker-compose',
    titulo: 'API containerizada com Docker Compose',
    area: 'DevOps',
    tecnologias: ['Docker', 'Docker Compose', 'API REST', 'SQL', 'Linux', 'GitHub'],
    objetivo: 'Criar uma API simples com banco de dados e executar tudo com Docker Compose.',
    passos: ['Criar uma API simples', 'Adicionar banco de dados', 'Criar Dockerfile', 'Configurar docker-compose.yml', 'Documentar comandos no README'],
    entregaveis: ['Repositório no GitHub', 'README com instruções', 'Dockerfile e compose', 'Prints ou logs da aplicação'],
  },
  dados: {
    id: 'dados-dashboard',
    titulo: 'Dashboard de análise de dados',
    area: 'Dados',
    tecnologias: ['Python', 'Pandas', 'Power BI/Streamlit', 'CSV/API', 'GitHub'],
    objetivo: 'Limpar uma base de dados, analisar indicadores e apresentar resultados em um dashboard.',
    passos: ['Escolher uma base', 'Limpar os dados', 'Definir indicadores', 'Criar gráficos', 'Documentar conclusões'],
    entregaveis: ['Dataset', 'Código ou arquivo do dashboard', 'Gráficos', 'README com conclusões'],
  },
  qa: {
    id: 'qa-playwright',
    titulo: 'Plano de testes e automação com Playwright',
    area: 'QA',
    tecnologias: ['Playwright', 'JavaScript/TypeScript', 'Testes E2E', 'GitHub'],
    objetivo: 'Documentar cenários de teste e automatizar os fluxos principais de uma aplicação web.',
    passos: ['Escolher aplicação', 'Escrever casos de teste', 'Automatizar fluxos principais', 'Gerar evidências', 'Documentar execução'],
    entregaveis: ['Plano de testes', 'Testes automatizados', 'Relatório de execução', 'README'],
  },
  suporte: {
    id: 'suporte-inventario',
    titulo: 'Documentação de suporte e inventário de chamados',
    area: 'Suporte/TI',
    tecnologias: ['Planilha', 'Documentação', 'Redes básicas', 'Atendimento'],
    objetivo: 'Organizar um fluxo de atendimento com inventário, checklist e relatório de chamados.',
    passos: ['Definir fluxo', 'Criar checklist', 'Montar inventário', 'Registrar chamados exemplo', 'Criar relatório'],
    entregaveis: ['Fluxo de atendimento', 'Checklist', 'Inventário', 'Modelo de relatório'],
  },
  fullstack: {
    id: 'fullstack-sistema',
    titulo: 'Sistema simples com front-end, API e banco',
    area: 'Fullstack',
    tecnologias: ['React', 'API REST', 'SQL', 'GitHub', 'Docker opcional'],
    objetivo: 'Construir uma aplicação completa com interface, API, banco e autenticação simples.',
    passos: ['Definir escopo pequeno', 'Criar interface', 'Criar API', 'Conectar banco', 'Documentar e publicar'],
    entregaveis: ['Front-end', 'API', 'Banco', 'README', 'Deploy opcional'],
  },
}

function normalizar(valor = '') {
  return String(valor).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function lista(valor) {
  if (Array.isArray(valor)) return valor.filter(Boolean)
  return String(valor || '').split(',').map((item) => item.trim()).filter(Boolean)
}

function nivelDoAluno(aluno = {}) {
  const respostas = aluno.respostasWizard || aluno
  if (['projetos', 'avancar'].includes(respostas.nivelTecnologia) || respostas.programacao === 'projetos') return 'Intermediário'
  if (respostas.programacao === 'avancado') return 'Avançado'
  return 'Iniciante'
}

function chavePorContexto({ tags = [], area = '', tecnologia = '', titulo = '' } = {}) {
  const texto = normalizar([area, tecnologia, titulo, ...lista(tags)].join(' '))
  if (/devops|docker|cloud|linux|ci\/cd|infra/.test(texto)) return 'devops'
  if (/qa|teste|playwright|cypress|qualidade/.test(texto)) return 'qa'
  if (/dados|data|python|power bi|sql|analytics/.test(texto)) return 'dados'
  if (/c#|csharp|dotnet|\.net/.test(texto)) return 'backend-csharp'
  if (/java|spring/.test(texto)) return 'backend-java'
  if (/node|express/.test(texto)) return 'backend-node'
  if (/fastapi|django|flask|python.*api|api.*python/.test(texto)) return 'backend-python'
  if (/fullstack|full stack/.test(texto)) return 'fullstack'
  if (/suporte|informatica|redes|hardware/.test(texto)) return 'suporte'
  if (/front|react|angular|next|html|css|javascript|typescript/.test(texto)) return 'frontend'
  return 'fullstack'
}

function adaptarTemplate(template, { aluno = {}, origem = 'mentor', origemId = '', tags = [] } = {}) {
  const nivel = nivelDoAluno(aluno)
  const passos = nivel === 'Iniciante' ? template.passos.slice(0, 4) : template.passos
  const tecnologias = [...new Set([...template.tecnologias, ...lista(tags).slice(0, 3)])]
  return {
    ...template,
    id: `projeto-${template.id}`,
    nivel,
    contexto: `Este projeto ajuda a transformar estudos de ${template.area} em evidência prática para perfil, currículo e candidaturas.`,
    tecnologias,
    passos,
    criteriosConclusao: [
      'O projeto executa o fluxo principal proposto',
      'O README explica como testar ou executar',
      'As tecnologias usadas estão descritas com clareza',
    ],
    textoParaPerfil: `${template.titulo} criado para praticar ${tecnologias.slice(0, 4).join(', ')} e documentar uma entrega funcional.`,
    textoParaCurriculo: `Desenvolveu projeto prático de ${template.titulo}, aplicando ${tecnologias.slice(0, 4).join(', ')} e documentação técnica.`,
    tags: tecnologias.map(normalizar),
    origem,
    origemId,
    statusInicial: 'planejado',
  }
}

export function sugerirProjetoFallback({ area = '', tags = [], nivel = '', aluno = {} } = {}) {
  const chave = chavePorContexto({ area, tags })
  return adaptarTemplate(TEMPLATES[chave], { aluno: { ...aluno, nivelTecnologia: nivel || aluno.nivelTecnologia }, tags })
}

export function gerarProjetoPorCurso({ curso = {}, aluno = {}, trilha = null } = {}) {
  const chave = chavePorContexto({ ...curso, tags: [...lista(curso.tags), ...lista(trilha?.tecnologias)] })
  return adaptarTemplate(TEMPLATES[chave], { aluno, origem: 'curso', origemId: curso.id, tags: curso.tags })
}

export function gerarProjetoPorTrilha({ trilha = {}, aluno = {} } = {}) {
  const chave = chavePorContexto({ ...trilha, tags: [...lista(trilha.tags), ...lista(trilha.tecnologias)] })
  return adaptarTemplate(TEMPLATES[chave], { aluno, origem: 'trilha', origemId: trilha.id, tags: trilha.tecnologias })
}

export function gerarProjetoPorVaga({ vaga = {}, aluno = {} } = {}) {
  const chave = chavePorContexto({ ...vaga, tags: vaga.tags })
  return adaptarTemplate(TEMPLATES[chave], { aluno, origem: 'vaga', origemId: vaga.id, tags: vaga.tags })
}

export function gerarProjetoPorTags({ tags = [], aluno = {} } = {}) {
  const chave = chavePorContexto({ tags })
  return adaptarTemplate(TEMPLATES[chave], { aluno, origem: 'mentor', tags })
}

export function gerarProjetosSugeridosAluno({ aluno = {}, cursos = [], trilhas = [], vagas = [] } = {}) {
  const projetos = [
    trilhas[0] && gerarProjetoPorTrilha({ trilha: trilhas[0], aluno }),
    cursos[0] && gerarProjetoPorCurso({ curso: cursos[0], aluno }),
    vagas[0] && gerarProjetoPorVaga({ vaga: vagas[0], aluno }),
    gerarProjetoPorTags({
      tags: [aluno.areaDesejada, aluno.tecnologiaInteresse, aluno.linguagem].filter(Boolean),
      aluno,
    }),
  ].filter(Boolean)
  return [...new Map(projetos.map((projeto) => [projeto.id, projeto])).values()].slice(0, 3)
}

export function projetoSugeridoParaProjetoAluno(projeto) {
  const agora = new Date().toLocaleString('pt-BR')
  return {
    ...projeto,
    id: `${projeto.id}-${Date.now()}`,
    templateId: projeto.id,
    status: 'planejado',
    descricao: projeto.textoParaPerfil,
    github: '',
    deploy: '',
    criadoEm: agora,
    atualizadoEm: agora,
  }
}

export function projetoEhEvidencia(projeto = {}) {
  return projeto.status === 'concluido'
    && Boolean(String(projeto.descricao || '').trim())
    && lista(projeto.tecnologias).length > 0
    && Boolean(String(projeto.github || projeto.deploy || '').trim())
}

export function projetoPodeAparecerNoCurriculo(projeto = {}) {
  return projetoEhEvidencia(projeto)
    || (projeto.status === 'em_andamento' && Boolean(String(projeto.github || projeto.deploy || '').trim()))
}
