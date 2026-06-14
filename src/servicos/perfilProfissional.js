const PLACEHOLDERS_LINKS = [
  'seu-nome',
  'seu-usuario',
  'seuusuario',
  'seuportfolio',
  'exemplo.com',
]

const PERFIS_AREA = {
  devops: {
    nome: 'DevOps',
    titulos: [
      'Estudante de DevOps em formação',
      'Desenvolvedor em transição para DevOps',
      'Estudante de Cloud e Infraestrutura',
    ],
    tecnologias: ['Linux', 'Docker', 'Cloud', 'CI/CD', 'Git/GitHub', 'HTTP/API REST', 'SQL'],
    resumo: 'Estudante de tecnologia com foco em DevOps, Linux, Docker, Cloud e APIs. Busco minha primeira oportunidade para aplicar conhecimentos em infraestrutura, automação e deploy de aplicações, desenvolvendo projetos práticos para fortalecer minha experiência.',
    objetivo: 'Conquistar uma oportunidade em DevOps ou infraestrutura, aplicando conhecimentos em Linux, Docker, Cloud e automação.',
    projeto: 'Projeto criado para praticar deploy e containerização de aplicações, utilizando Docker, Docker Compose e Linux. A aplicação organiza serviços em containers e documenta comandos no README.',
  },
  frontend: {
    nome: 'Front-end',
    titulos: ['Desenvolvedor Front-end em formação', 'Estudante de Front-end com foco em interfaces web'],
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Git/GitHub'],
    resumo: 'Estudante de tecnologia com foco em HTML, CSS, JavaScript e interfaces web. Busco minha primeira oportunidade para construir aplicações responsivas, acessíveis e bem estruturadas.',
    objetivo: 'Conquistar uma oportunidade em Front-end, aplicando conhecimentos em interfaces web e projetos responsivos.',
    projeto: 'Landing page responsiva desenvolvida com HTML, CSS e JavaScript, focada em estrutura visual, responsividade e organização de componentes.',
  },
  backendJava: {
    nome: 'Back-end Java',
    titulos: ['Desenvolvedor Java em formação', 'Desenvolvedor Back-end com foco em Java e Spring Boot'],
    tecnologias: ['Java', 'Spring Boot', 'APIs REST', 'SQL', 'Git/GitHub', 'Docker'],
  },
  backendCsharp: {
    nome: 'Back-end C#/.NET',
    titulos: ['Desenvolvedor .NET em formação', 'Desenvolvedor Back-end com foco em C# e APIs'],
    tecnologias: ['C#', '.NET', 'APIs REST', 'SQL', 'Git/GitHub'],
  },
  backendPython: {
    nome: 'Back-end Python',
    titulos: ['Desenvolvedor Python em formação', 'Desenvolvedor Back-end com foco em FastAPI e APIs'],
    tecnologias: ['Python', 'FastAPI', 'APIs REST', 'SQL/PostgreSQL', 'Git/GitHub'],
  },
  backendNode: {
    nome: 'Back-end Node.js',
    titulos: ['Desenvolvedor Node.js em formação', 'Desenvolvedor Back-end com foco em Node.js e APIs'],
    tecnologias: ['JavaScript/TypeScript', 'Node.js', 'Express', 'APIs REST', 'SQL/MongoDB', 'Git/GitHub'],
  },
  backend: {
    nome: 'Back-end',
    titulos: ['Desenvolvedor Back-end em formação', 'Estudante de Back-end com foco em APIs'],
    tecnologias: ['APIs REST', 'SQL', 'Git/GitHub', 'Docker'],
    resumo: 'Estudante de tecnologia com foco em APIs, banco de dados e boas práticas de desenvolvimento. Busco minha primeira oportunidade para atuar na construção de sistemas e serviços.',
    objetivo: 'Conquistar uma oportunidade em Back-end, aplicando conhecimentos em APIs, banco de dados e desenvolvimento de serviços.',
    projeto: 'API REST desenvolvida para gerenciar registros, utilizando banco de dados, rotas, validações e organização em camadas.',
  },
  dados: {
    nome: 'Dados',
    titulos: ['Estudante de Dados em formação', 'Analista de Dados em formação'],
    tecnologias: ['Python', 'SQL', 'PostgreSQL', 'Power BI', 'Análise de Dados'],
    resumo: 'Estudante de tecnologia com foco em Python, SQL, análise de dados e visualização. Busco minha primeira oportunidade para transformar dados em informações úteis para decisão.',
    objetivo: 'Conquistar uma oportunidade em Dados, aplicando conhecimentos em Python, SQL, análise e visualização.',
  },
  qa: {
    nome: 'QA',
    titulos: ['Analista de QA em formação', 'Estudante de Qualidade de Software'],
    tecnologias: ['Testes manuais', 'Testes de API', 'Cypress', 'Playwright', 'Git/GitHub'],
    resumo: 'Estudante de tecnologia com foco em testes manuais, automação, APIs e qualidade de software. Busco minha primeira oportunidade para ajudar equipes a entregar sistemas mais confiáveis.',
    objetivo: 'Conquistar uma oportunidade em QA, aplicando conhecimentos em testes manuais, automação e APIs.',
  },
  suporte: {
    nome: 'Suporte',
    titulos: ['Estudante de Suporte Técnico', 'Técnico de Suporte em formação'],
    tecnologias: ['Informática', 'Redes', 'Linux', 'Atendimento', 'Segurança'],
  },
  tecnologia: {
    nome: 'Tecnologia',
    titulos: ['Estudante de tecnologia em formação'],
    tecnologias: ['Git/GitHub', 'Lógica de programação', 'Projetos'],
    resumo: 'Estudante de tecnologia em formação, construindo conhecimentos e projetos para conquistar a primeira oportunidade na área.',
    objetivo: 'Conquistar uma primeira oportunidade em tecnologia, aplicando estudos e projetos práticos.',
  },
}

function normalizar(valor = '') {
  return String(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function linhas(valor = '') {
  if (Array.isArray(valor)) return valor.map(String).filter(Boolean)
  return String(valor).split(/[\n,]/).map((item) => item.trim()).filter(Boolean)
}

function urlValida(valor = '') {
  try {
    const url = new URL(valor)
    return ['http:', 'https:'].includes(url.protocol)
  } catch {
    return false
  }
}

function ehPlaceholder(valor = '') {
  const texto = normalizar(valor)
  return PLACEHOLDERS_LINKS.some((placeholder) => texto.includes(placeholder))
}

export function detectarPerfilArea(respostasWizard = {}) {
  const area = normalizar(respostasWizard.areaDesejada)
  const linguagem = normalizar(respostasWizard.linguagem)
  const tecnologia = normalizar(respostasWizard.tecnologiaInteresse)

  if (area.includes('devops') || area.includes('cloud')) return PERFIS_AREA.devops
  if (area.includes('front')) return PERFIS_AREA.frontend
  if (area.includes('dados') || area.includes('data')) return PERFIS_AREA.dados
  if (area.includes('qa') || area.includes('teste')) return PERFIS_AREA.qa
  if (area.includes('suporte')) return PERFIS_AREA.suporte
  if (area.includes('back') || area.includes('api')) {
    if (linguagem.includes('java') || tecnologia.includes('spring')) return { ...PERFIS_AREA.backend, ...PERFIS_AREA.backendJava }
    if (linguagem.includes('csharp') || linguagem.includes('c#') || tecnologia.includes('dotnet')) return { ...PERFIS_AREA.backend, ...PERFIS_AREA.backendCsharp }
    if (linguagem.includes('python') || tecnologia.includes('fastapi')) return { ...PERFIS_AREA.backend, ...PERFIS_AREA.backendPython }
    if (linguagem.includes('javascript') || tecnologia.includes('node')) return { ...PERFIS_AREA.backend, ...PERFIS_AREA.backendNode }
    return PERFIS_AREA.backend
  }
  return PERFIS_AREA.tecnologia
}

export function validarTituloProfissional(titulo, respostasWizard = {}) {
  const perfil = detectarPerfilArea(respostasWizard)
  const texto = String(titulo || '').trim()
  const genericos = ['devops', 'programador', 'programadora', 'estudante', 'desenvolvedor', 'tecnologia', 'ti']
  const problemas = []

  if (!texto) problemas.push('Adicione um título profissional.')
  else {
    if (texto.length < 12 || genericos.includes(normalizar(texto))) problemas.push('Seu título está muito genérico.')
    if (texto === texto.toLowerCase() && /[a-z]/.test(texto)) problemas.push('Use maiúsculas para deixar o título mais profissional.')
    const areaTitulo = normalizar(texto)
    if (perfil !== PERFIS_AREA.tecnologia && !normalizar(perfil.nome).split(/[\s/.]+/).some((termo) => termo.length > 2 && areaTitulo.includes(termo))) {
      problemas.push(`O título não deixa claro seu foco atual em ${perfil.nome}.`)
    }
  }

  return {
    valido: problemas.length === 0,
    nivel: problemas.length ? 'alerta' : 'bom',
    mensagem: problemas[0] || 'Título claro e alinhado ao seu objetivo.',
    problemas,
    sugestoes: perfil.titulos,
  }
}

export function analisarResumoProfissional(texto, respostasWizard = {}, tecnologias = [], projetos = '') {
  const perfil = detectarPerfilArea(respostasWizard)
  const resumo = String(texto || '').trim()
  const normalizado = normalizar(resumo)
  const problemas = []
  const exageros = ['especialista', 'senior', 'sênior', 'dominio avancado', 'domínio avançado', 'expert']
  const areasCitadas = ['devops', 'frontend', 'front-end', 'backend', 'back-end', 'dados', 'qa']
    .filter((area) => normalizado.includes(area))

  if (!resumo || resumo.includes('Adicione uma biografia')) problemas.push('Adicione um resumo profissional real.')
  else {
    if (resumo.length < 80) problemas.push('O resumo está curto; explique foco, objetivo e prática.')
    if (resumo.length > 650) problemas.push('O resumo está longo; prefira de 2 a 4 frases.')
    if (areasCitadas.length > 2) problemas.push('O resumo mistura muitas áreas sem uma narrativa clara.')
    if (exageros.some((termo) => normalizado.includes(normalizar(termo)))) problemas.push('Evite afirmar senioridade ou domínio sem evidências.')
    if (!normalizado.includes('oportunidade') && !normalizado.includes('objetivo') && !normalizado.includes('busco')) problemas.push('Inclua seu objetivo profissional.')
    if (!linhas(tecnologias).some((tecnologia) => normalizado.includes(normalizar(tecnologia).split(/[\s/-]/)[0]))) problemas.push('Cite algumas tecnologias principais do seu foco.')
    if (!projetos && !normalizado.includes('projeto')) problemas.push('Mencione que está construindo prática ou projetos.')
  }

  const base = perfil.resumo || PERFIS_AREA.tecnologia.resumo
  return {
    qualidade: problemas.length >= 3 ? 'fraco' : problemas.length ? 'ok' : 'bom',
    problemas,
    sugestao: base,
    versoes: {
      curta: base.split('. ').slice(0, 2).join('. '),
      profissional: base,
      primeiraVaga: base,
    },
  }
}

export function validarLinksProfissionais({ linkedin = '', github = '', portfolio = '' } = {}) {
  const analisar = (id, valor, dominio, obrigatorio) => {
    if (!valor) return { valido: !obrigatorio, nivel: obrigatorio ? 'alerta' : 'info', mensagem: obrigatorio ? `${id} ainda não informado.` : 'Opcional, mas recomendado se você tiver projetos publicados.' }
    if (ehPlaceholder(valor)) return { valido: false, nivel: 'alerta', mensagem: `Seu ${id} ainda parece ser um exemplo. Troque pelo link real.` }
    if (!urlValida(valor) || !normalizar(valor).includes(dominio)) return { valido: false, nivel: 'alerta', mensagem: `Informe uma URL válida do ${id}.` }
    return { valido: true, nivel: 'bom', mensagem: `${id} válido.` }
  }

  return {
    linkedin: analisar('LinkedIn', linkedin, 'linkedin.com', true),
    github: analisar('GitHub', github, 'github.com', true),
    portfolio: analisar('Portfólio', portfolio, '', false),
  }
}

export function analisarTecnologiasPerfil(tecnologias, respostasWizard = {}) {
  const perfil = detectarPerfilArea(respostasWizard)
  const lista = linhas(tecnologias)
  const normalizadas = lista.map(normalizar)
  const duplicadas = lista.filter((item, index) => normalizadas.indexOf(normalizar(item)) !== index)
  const centraisPresentes = perfil.tecnologias.filter((central) => normalizadas.some((item) => item.includes(normalizar(central).split('/')[0])))
  const foraDoFoco = lista.filter((item) => {
    const termo = normalizar(item).split(/\s[-–—]\s/)[0]
    return !perfil.tecnologias.some((central) => termo.includes(normalizar(central).split('/')[0]) || normalizar(central).includes(termo))
  })
  const problemas = []
  if (!lista.length) problemas.push('Adicione tecnologias coerentes com seu objetivo.')
  if (duplicadas.length) problemas.push(`Remova tecnologias repetidas: ${[...new Set(duplicadas)].join(', ')}.`)
  if (centraisPresentes.length < Math.min(3, perfil.tecnologias.length)) problemas.push(`Faltam tecnologias centrais de ${perfil.nome}.`)
  if (foraDoFoco.length > Math.max(2, Math.floor(lista.length / 2))) problemas.push('Muitas tecnologias listadas estão fora do foco atual.')

  return {
    valido: problemas.length === 0,
    problemas,
    coerentes: centraisPresentes,
    foraDoFoco,
    sugestoes: perfil.tecnologias,
    sugestaoTexto: perfil.tecnologias.join(', '),
    sugestaoComNivel: perfil.tecnologias.map((item) => `${item} - estudando`).join('\n'),
  }
}

export function analisarProjetos(projetos, respostasWizard = {}) {
  const perfil = detectarPerfilArea(respostasWizard)
  const lista = linhas(projetos)
  const problemas = []
  if (!lista.length) problemas.push('Adicione pelo menos um projeto prático.')
  else if (lista.every((item) => item.length < 45)) problemas.push('Explique melhor o objetivo e as tecnologias de cada projeto.')
  if (lista.length && !lista.some((item) => /github|http|deploy/i.test(item))) problemas.push('Inclua um link do GitHub ou deploy quando existir.')
  return {
    valido: problemas.length === 0,
    problemas,
    modelo: perfil.projeto || 'Projeto desenvolvido para [objetivo], utilizando [tecnologias]. A aplicação permite [funcionalidade principal] e foi criada para praticar [competências].',
  }
}

export function analisarCurriculoAntesExportar(curriculo = {}, perfil = {}, respostasWizard = {}) {
  const titulo = validarTituloProfissional(curriculo.titulo, respostasWizard)
  const resumo = analisarResumoProfissional(curriculo.resumo, respostasWizard, curriculo.tecnologias, curriculo.projetos)
  const links = validarLinksProfissionais({ linkedin: curriculo.linkedin || perfil.linkedin, github: curriculo.github || perfil.github, portfolio: curriculo.portfolio || perfil.portfolio })
  const tecnologias = analisarTecnologiasPerfil(curriculo.tecnologias, respostasWizard)
  const projetos = analisarProjetos(curriculo.projetos || perfil.projetos, respostasWizard)
  const problemas = [
    !titulo.valido && titulo.mensagem,
    !curriculo.objetivo && 'Objetivo profissional vazio.',
    resumo.qualidade === 'fraco' && resumo.problemas[0],
    !links.github.valido && links.github.mensagem,
    !links.linkedin.valido && links.linkedin.mensagem,
    !tecnologias.valido && tecnologias.problemas[0],
    !projetos.valido && projetos.problemas[0],
  ].filter(Boolean)
  return { pronto: problemas.length === 0, problemas }
}

export function calcularForcaPerfilProfissional({ titulo = '', bio = '', tecnologias = '', tecnologiasComNivel = '', linkedin = '', github = '', portfolio = '', projetos = '', curriculo = {}, respostasWizard = {} } = {}) {
  const tituloAnalise = validarTituloProfissional(titulo, respostasWizard)
  const resumoAnalise = analisarResumoProfissional(bio, respostasWizard, tecnologias, projetos)
  const links = validarLinksProfissionais({ linkedin, github, portfolio })
  const tecnologiasAnalise = analisarTecnologiasPerfil(tecnologiasComNivel || tecnologias, respostasWizard)
  const projetosAnalise = analisarProjetos(projetos, respostasWizard)
  let score = 0
  if (tituloAnalise.valido) score += 10
  if (resumoAnalise.qualidade === 'bom') score += 15
  else if (resumoAnalise.qualidade === 'ok') score += 8
  if (links.github.valido) score += 15
  if (links.linkedin.valido) score += 10
  if (links.portfolio.valido) score += 5
  if (tecnologiasAnalise.valido) score += 15
  else if (tecnologiasAnalise.coerentes.length) score += 7
  if (projetosAnalise.valido) score += 20
  else if (linhas(projetos).length) score += 8
  if (curriculo.objetivo && curriculo.resumo) score += 10

  const lacunas = [
    !tituloAnalise.valido && 'Melhorar título profissional',
    resumoAnalise.qualidade !== 'bom' && 'Melhorar resumo profissional',
    !links.github.valido && 'Adicionar GitHub real',
    !links.linkedin.valido && 'Adicionar LinkedIn real',
    !tecnologiasAnalise.valido && 'Alinhar tecnologias',
    !projetosAnalise.valido && 'Cadastrar projeto completo',
    (!curriculo.objetivo || !curriculo.resumo) && 'Revisar currículo',
  ].filter(Boolean)

  return {
    score,
    nivel: score >= 90 ? 'Muito forte' : score >= 70 ? 'Forte' : score >= 40 ? 'Em preparação' : 'Inicial',
    lacunas,
    titulo: tituloAnalise,
    resumo: resumoAnalise,
    links,
    tecnologias: tecnologiasAnalise,
    projetos: projetosAnalise,
  }
}

export function obterSugestoesPerfil(respostasWizard = {}) {
  const perfil = detectarPerfilArea(respostasWizard)
  return {
    area: perfil.nome,
    titulo: perfil.titulos[0],
    titulos: perfil.titulos,
    resumo: perfil.resumo || PERFIS_AREA.tecnologia.resumo,
    objetivo: perfil.objetivo || PERFIS_AREA.tecnologia.objetivo,
    tecnologias: perfil.tecnologias.join(', '),
    tecnologiasComNivel: perfil.tecnologias.map((item) => `${item} - estudando`).join('\n'),
    projeto: perfil.projeto || 'Projeto desenvolvido para [objetivo], utilizando [tecnologias]. A aplicação permite [funcionalidade principal] e foi criada para praticar [competências].',
  }
}
