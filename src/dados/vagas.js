import rafaelSouzaPerfil from '../ativos/imagens/rafael-souza-perfil.webp'
import lucasDemoPerfil from '../ativos/imagens/jefferson-santos-perfil.jpg'
import macacoPhpCapa from '../ativos/imagens/macacophp.webp'

export const vagas = [
  {
    id: 'vaga-1',
    empresaId: 'empresa-1',
    titulo: 'Analista DevOps Júnior',
    nivel: 'Júnior',
    tipo: 'CLT',
    modalidade: 'Híbrido',
    localizacao: 'Recife, PE',
    salario: 'R$ 2.800 - R$ 3.600',
    status: 'ativa',
    publicadaEm: '2026-06-02',
    candidatos: 1,
    tags: ['devops', 'docker', 'docker-compose', 'linux', 'git', 'api-rest', 'cloud', 'ci-cd'],
    descricao:
      'No time de Cloud & DevOps da NexaCloud, você irá apoiar a automação de ambientes, a organização de aplicações em containers e a documentação de processos de deploy. A vaga é voltada para pessoas em formação que já estudam Linux, Docker, Git e conceitos de APIs.',
    requisitos: [
      'Linux básico para uso em terminal',
      'Git e GitHub para versionamento',
      'Noções de Docker e Docker Compose',
      'Conhecimento básico de APIs REST',
      'Interesse em CI/CD e cloud',
      'Boa comunicação e organização para documentar processos',
    ],
    atividades: [
      'Criar e revisar Dockerfiles simples',
      'Apoiar a configuração de ambientes com Docker Compose',
      'Documentar comandos de execução e deploy',
      'Acompanhar pipelines de CI/CD com apoio do time',
      'Ajudar squads a organizar aplicações para testes e homologação',
    ],
  },
  {
    id: 'vaga-6',
    empresaId: 'empresa-1',
    titulo: 'Desenvolvedor Front-end Júnior',
    nivel: 'Júnior',
    tipo: 'CLT',
    modalidade: 'Híbrido',
    localizacao: 'Recife, PE',
    salario: 'R$ 2.500 - R$ 3.400',
    status: 'ativa',
    publicadaEm: '2026-06-01',
    candidatos: 1,
    tags: ['frontend', 'react', 'typescript', 'javascript', 'api-rest', 'acessibilidade', 'git'],
    descricao:
      'No time de Produto Digital da NexaCloud, você irá construir interfaces responsivas, acessíveis e integradas a APIs. A vaga é voltada para pessoas que já praticam HTML, CSS, JavaScript, React e querem evoluir com TypeScript em projetos reais.',
    requisitos: [
      'HTML, CSS e JavaScript moderno',
      'Noções de React',
      'Interesse em TypeScript',
      'Consumo de APIs REST',
      'Git/GitHub básico',
      'Atenção a responsividade e acessibilidade',
    ],
    atividades: [
      'Desenvolver telas responsivas com React',
      'Consumir APIs REST no front-end',
      'Ajustar componentes seguindo um design system',
      'Corrigir bugs simples de interface',
      'Participar de code reviews com apoio do time',
    ],
  },
  {
    id: 'vaga-7',
    empresaId: 'empresa-1',
    titulo: 'Estágio em Dados e Dashboards',
    nivel: 'Estágio',
    tipo: 'Estágio',
    modalidade: 'Remoto',
    localizacao: 'Brasil',
    salario: 'R$ 1.400 - R$ 1.800',
    status: 'ativa',
    publicadaEm: '2026-05-30',
    candidatos: 0,
    tags: ['dados', 'python', 'sql', 'power-bi', 'dashboard', 'indicadores', 'estágio'],
    descricao:
      'Na área de Dados da NexaCloud, você irá apoiar a coleta, organização e visualização de indicadores para times internos e clientes. A vaga é ideal para estudantes que gostam de análise, planilhas, Python ou Power BI.',
    requisitos: [
      'Noções de lógica de programação',
      'Conhecimento básico de planilhas',
      'Interesse em Python para análise de dados',
      'Noções de SQL',
      'Boa organização para documentar indicadores',
      'Vontade de aprender Power BI ou Streamlit',
    ],
    atividades: [
      'Organizar bases de dados simples',
      'Criar gráficos e dashboards',
      'Apoiar consultas SQL básicas',
      'Documentar indicadores',
      'Participar da análise de métricas com o time',
    ],
  },
  {
    id: 'vaga-microsoft-cloud-architect',
    empresaId: 'empresa-microsoft',
    titulo: 'Cloud Solutions Architect (Azure)',
    nivel: 'Senior',
    tipo: 'CLT',
    modalidade: 'Remoto',
    localizacao: 'Brasil',
    salario: 'R$ 18.000 - R$ 25.000',
    status: 'ativa',
    publicadaEm: '2026-05-30',
    candidatos: 0,
    tags: ['azure', 'cloud', 'arquitetura', 'devops', 'terraform'],
    descricao:
      'Desenhar arquiteturas escalaveis na nuvem Azure para grandes clientes enterprise, focando em seguranca e performance.',
    requisitos: [
      'Experiencia solida com Azure',
      'Conhecimento em Infrastructure as Code (IaC)',
      'Ingles fluente para reunioes globais',
    ],
    atividades: [
      'Definir arquiteturas cloud para clientes enterprise',
      'Apoiar decisoes de seguranca, performance e escalabilidade',
      'Conduzir discussoes tecnicas com squads locais e globais',
    ],
  },
  {
    id: 'vaga-microsoft-fullstack-dotnet-react',
    empresaId: 'empresa-microsoft',
    titulo: 'Desenvolvedor Full-Stack (.NET & React)',
    nivel: 'Pleno',
    tipo: 'CLT',
    modalidade: 'Hibrido',
    localizacao: 'Sao Paulo, SP',
    salario: 'R$ 9.500 - R$ 13.000',
    status: 'ativa',
    publicadaEm: '2026-05-29',
    candidatos: 0,
    tags: ['dotnet', 'csharp', 'react', 'typescript', 'sql-server'],
    descricao:
      'Atuar no desenvolvimento de ferramentas internas que utilizam o ecossistema Office 365 e integracoes com bancos de dados complexos.',
    requisitos: [
      'Dominio de C#',
      'Experiencia com React.js moderno',
      'Familiaridade com Azure DevOps',
    ],
    atividades: [
      'Desenvolver interfaces e APIs internas',
      'Integrar solucoes com Microsoft 365 e SQL Server',
      'Participar de code reviews e melhorias de arquitetura',
    ],
  },
  {
    id: 'vaga-microsoft-estagio-dados',
    empresaId: 'empresa-microsoft',
    titulo: 'Estagiario em Engenharia de Dados',
    nivel: 'Estagio',
    tipo: 'Estagio',
    modalidade: 'Hibrido',
    localizacao: 'Sao Paulo, SP',
    salario: 'R$ 2.400 - R$ 3.000',
    status: 'ativa',
    publicadaEm: '2026-05-28',
    candidatos: 0,
    tags: ['python', 'sql', 'power-bi', 'dados', 'azure-data-factory'],
    descricao:
      'Apoiar o time de dados na construcao de dashboards e tratamento de pipelines simples para analise de mercado.',
    requisitos: [
      'Cursando tecnologia ou engenharia',
      'Nocoes basicas de SQL e Python',
      'Curiosidade por IA',
    ],
    atividades: [
      'Apoiar a criacao de dashboards em Power BI',
      'Tratar bases de dados para analises internas',
      'Aprender boas praticas de pipelines em Azure Data Factory',
    ],
  },
  {
    id: 'vaga-apple-ios-swift',
    empresaId: 'empresa-apple',
    titulo: 'Desenvolvedor iOS (Swift)',
    nivel: 'Pleno',
    tipo: 'CLT',
    modalidade: 'Hibrido',
    localizacao: 'Jundiai ou Sao Paulo, SP',
    salario: 'R$ 11.000 - R$ 16.000',
    status: 'ativa',
    publicadaEm: '2026-05-27',
    candidatos: 0,
    tags: ['swift', 'swiftui', 'ios', 'mobile', 'clean-architecture'],
    descricao:
      'Criar experiencias incriveis para o ecossistema iOS, focando em animacoes fluidas, performance e seguranca total dos dados.',
    requisitos: [
      'Dominio de Swift',
      'Experiencia com SwiftUI',
      'Conhecimento profundo das diretrizes de design da Apple (HIG)',
    ],
    atividades: [
      'Construir telas nativas com SwiftUI',
      'Otimizar performance, acessibilidade e seguranca',
      'Trabalhar junto a design e produto em novas experiencias mobile',
    ],
  },
  {
    id: 'vaga-apple-designer-produto',
    empresaId: 'empresa-apple',
    titulo: 'Designer de Produto (UX/UI)',
    nivel: 'Senior',
    tipo: 'CLT',
    modalidade: 'Presencial',
    localizacao: 'Sao Paulo, SP',
    salario: 'R$ 13.500 - R$ 19.000',
    status: 'ativa',
    publicadaEm: '2026-05-26',
    candidatos: 0,
    tags: ['figma', 'ux', 'ui', 'design', 'prototipagem', 'acessibilidade'],
    descricao:
      'Liderar o design de novas funcionalidades para aplicativos nativos, garantindo simplicidade, consistencia e alto cuidado visual.',
    requisitos: [
      'Portfolio de alto nivel',
      'Experiencia com acessibilidade digital',
      'Visao critica de usabilidade',
    ],
    atividades: [
      'Criar fluxos, prototipos e especificacoes de produto',
      'Conduzir decisoes de UX com base em clareza e simplicidade',
      'Colaborar com engenharia em detalhes de interacao e acessibilidade',
    ],
  },
]

export function criarVagaDemoEmpresa(empresaId) {
  return {
    id: `vaga-demo-${empresaId}`,
    empresaId,
    titulo: 'Analista de Suporte Tecnico Junior',
    nivel: 'Junior',
    tipo: 'CLT',
    modalidade: 'Hibrido',
    localizacao: 'Recife, PE',
    salario: 'R$ 2.200 - R$ 3.000',
    status: 'ativa',
    publicadaEm: new Date().toISOString().slice(0, 10),
    candidatos: 2,
    tags: ['suporte', 'redes', 'microsoft-365', 'windows', 'linux'],
    descricao:
      'Vaga demo criada automaticamente para a empresa testar gerenciamento, edicao, candidatos, perfil e exportacao de curriculo.',
    requisitos: [
      'Boa comunicacao para atendimento a usuarios',
      'Nocoes de Windows, redes e Microsoft 365',
      'Organizacao para registrar chamados e documentar solucoes',
      'Interesse em aprender cloud e seguranca',
    ],
    atividades: [
      'Atender chamados de primeiro nivel',
      'Apoiar configuracao de acessos e estacoes',
      'Documentar problemas recorrentes',
      'Acompanhar melhorias no processo de suporte',
    ],
  }
}

function criarCandidatoDemoPorBase(vagaId, idBase, sufixo) {
  const base = candidatosMock.find((candidato) => candidato.id === idBase)
  return {
    ...base,
    id: `cand-demo-${sufixo}-${vagaId}`,
    vagaId,
    status: base?.status || 'Em andamento',
  }
}

export function criarCandidatosDemoEmpresa(vagaId) {
  return [
    criarCandidatoDemoPorBase(vagaId, 'cand-2', 'rafael'),
    criarCandidatoDemoPorBase(vagaId, 'cand-app-demo-lucas-devops', 'lucas'),
  ].filter((candidato) => candidato.nome)
}

export function criarCandidatoDemoEmpresa(vagaId) {
  return criarCandidatosDemoEmpresa(vagaId)[0]
}

const projetoDockerLucas = {
  id: 'projeto-lucas-api-docker-compose',
  templateId: 'projeto-devops-docker-compose',
  titulo: 'API containerizada com Docker Compose',
  descricao:
    'Projeto em desenvolvimento para praticar Docker, Docker Compose, API REST, banco de dados e documentação técnica.',
  tecnologias: ['Docker', 'Docker Compose', 'API REST', 'SQL', 'GitHub', 'Linux'],
  status: 'em_andamento',
  origem: 'mentor',
  github: '',
  deploy: '',
}

const perfilLucasCandidato = {
  alunoId: 'aluno-1',
  nome: 'Lucas Andrade',
  cargo: 'Estudante de DevOps',
  localizacao: 'Recife, PE',
  email: 'aluno.demo@trilum.demo',
  foto: 'LA',
  fotoUrl: lucasDemoPerfil,
  capaUrl: macacoPhpCapa,
  bio:
    'Estudante de Análise e Desenvolvimento de Sistemas com foco em DevOps, APIs e automação de ambientes. Estuda Linux, Docker, Git/GitHub, HTTP e bancos de dados enquanto desenvolve seus primeiros projetos práticos.',
  cursos: ['Git e GitHub para Projetos', 'Linux para Desenvolvedores (Curso em Vídeo)', 'Fundamentos de HTTP e APIs Web'],
  cursosConcluidos: ['Git e GitHub para Projetos'],
  certificados: ['Git e GitHub para Projetos'],
  tecnologias: ['Linux', 'Docker', 'Docker Compose', 'Git/GitHub', 'HTTP/API REST', 'SQL', 'JavaScript'],
  projetosPraticos: [projetoDockerLucas],
  perfilProfissional: {
    telefone: '(81) 98888-0000',
    linkedin: '',
    github: '',
    portfolio: '',
    tecnologiasComNivel:
      'Linux - estudando\nDocker - estudando\nDocker Compose - básico\nGit/GitHub - básico\nHTTP/API REST - básico\nSQL - básico\nJavaScript - básico\nReact - iniciante\nPython - iniciante',
    idiomas: 'Português - nativo\nInglês - básico/intermediário',
    projetos:
      'API containerizada com Docker Compose - em desenvolvimento, ainda sem repositório público\nPipeline simples de CI/CD para aplicação web - planejado',
    formacoes: 'Análise e Desenvolvimento de Sistemas - UNIT - cursando',
    experiencias:
      'Atendente de Suporte - Loja Digital Recife - 2024 - atendimento, organização de chamados e apoio operacional.',
    certificadosExternos:
      'Git e GitHub - Curso introdutório - 2026 - 20h\nFundamentos de Linux - Curso introdutório - 2026 - 15h',
    certificadosExternosArquivos: [],
  },
  curriculo: {
    fotoUrl: lucasDemoPerfil,
    titulo: 'Estudante de DevOps',
    objetivo:
      'Conquistar uma oportunidade júnior em DevOps ou infraestrutura, aplicando conhecimentos em Linux, Docker, Git, APIs e documentação técnica.',
    resumo: 'Estudante de DevOps estudando Linux e Docker.',
    tecnologias: 'Linux\nDocker\nDocker Compose\nGit/GitHub\nSQL\nHTTP/API REST\nJavaScript',
    projetos: 'API containerizada com Docker Compose - projeto em desenvolvimento, ainda sem repositório público.',
    formacoes: 'Análise e Desenvolvimento de Sistemas - UNIT - cursando',
    experiencias: 'Atendente de Suporte - Loja Digital Recife - 2024',
    idiomas: 'Português nativo\nInglês básico/intermediário',
    competencias: 'Organização\nDocumentação técnica\nAprendizado contínuo\nBoa comunicação',
  },
}

export const candidatosMock = [
  {
    ...perfilLucasCandidato,
    id: 'cand-app-demo-lucas-devops',
    vagaId: 'vaga-1',
    status: 'Em análise',
    atualizadoEm: '10/06/2026 09:00:00',
  },
  {
    ...perfilLucasCandidato,
    id: 'cand-app-demo-lucas-frontend',
    vagaId: 'vaga-6',
    status: 'Rejeitado',
    atualizadoEm: '11/06/2026 14:30:00',
    feedbackPublicoAluno:
      'Agradecemos sua candidatura. Neste momento, seguimos com perfis mais alinhados a Front-end, especialmente com mais evidências práticas em React e TypeScript. Recomendamos fortalecer projetos nessa stack e manter seu perfil atualizado para futuras oportunidades.',
    observacaoInterna:
      'Perfil interessante para DevOps, mas pouco alinhado à vaga Front-end atual. Considerar para vagas de Cloud ou infraestrutura.',
    motivoInterno: 'Pouca evidência prática em React e TypeScript',
  },
  {
    id: 'cand-2',
    vagaId: 'vaga-6',
    nome: 'Rafael Souza',
    status: 'Em andamento',
    cargo: 'Técnico de suporte',
    localizacao: 'Recife, PE',
    bio: 'Experiência com atendimento de usuários, hardware, redes e documentação técnica.',
    cursos: ['Informática Essencial', 'Git e GitHub para Projetos'],
    tecnologias: ['Suporte', 'Redes', 'Windows', 'Microsoft 365'],
    ...{
    cargo: 'Tecnico de suporte',
    email: 'rafael.souza.demo@trilum.local',
    foto: 'RS',
    fotoUrl: rafaelSouzaPerfil,
    bio:
      'Tecnico de suporte com experiencia em atendimento a usuarios, diagnostico de hardware, redes, Microsoft 365 e documentacao tecnica. Busca crescer para suporte cloud e administracao de ambientes corporativos.',
    cursos: ['Informatica Essencial', 'Git e GitHub para Projetos', 'Linux para Iniciantes', 'Seguranca para Projetos Web'],
    cursosConcluidos: ['Informatica Essencial', 'Git e GitHub para Projetos'],
    certificados: ['Informatica Essencial', 'Git e GitHub para Projetos'],
    tecnologias: ['Suporte', 'Redes', 'Windows', 'Microsoft 365', 'Linux', 'Git/GitHub', 'Azure Fundamentals'],
    perfilProfissional: {
      telefone: '81988776655',
      linkedin: 'https://www.linkedin.com/in/rafael-souza-suporte',
      github: 'https://github.com/rafaelsouza-support',
      instagram: 'https://www.instagram.com/rafaelsouza.tech',
      portfolio: 'https://rafaelsouza-support.github.io',
      tecnologiasComNivel:
        'Suporte tecnico - intermediario\nRedes TCP/IP - basico\nWindows - intermediario\nMicrosoft 365 - basico\nLinux - basico\nGit/GitHub - basico\nAzure Fundamentals - estudando',
      idiomas: 'Portugues - nativo\nIngles - intermediario\nEspanhol - basico',
      projetos:
        'Inventario de chamados em planilha automatizada - Excel e Power Query - reducao de retrabalho\nLaboratorio domestico de redes - roteamento, DNS e documentacao de troubleshooting\nBase de conhecimento de suporte - artigos para problemas recorrentes de usuarios',
      formacoes:
        'Tecnico em Informatica - SENAC PE - 2024\nAnalise e Desenvolvimento de Sistemas - Faculdade ficticia Recife Tech - em andamento',
      experiencias:
        'Tecnico de suporte junior - HelpDesk Recife - 2024/2026 - atendimento N1, triagem de chamados e suporte Microsoft 365\nEstagio em infraestrutura - Recife Digital Lab - 2023/2024 - configuracao de estacoes, redes e documentacao',
      certificadosExternos:
        'Microsoft 365 Fundamentals - preparatorio\nCurso de Redes de Computadores - 40h\nLinux Essentials - curso livre',
      certificadosExternosArquivos: [
        { id: 'rafael-cert-redes', nome: 'certificado-redes-rafael.pdf', tipo: 'application/pdf', tamanho: 312000 },
        { id: 'rafael-cert-linux', nome: 'linux-essentials-rafael.pdf', tipo: 'application/pdf', tamanho: 286000 },
      ],
    },
    curriculo: {
      titulo: 'Tecnico de suporte junior',
      objetivo:
        'Atuar em suporte tecnico e infraestrutura, aplicando boas praticas de atendimento, documentacao e diagnostico para evoluir em ambientes cloud.',
      competencias: 'Comunicacao clara\nOrganizacao de chamados\nEmpatia com usuarios\nAprendizado continuo\nResolucao de problemas',
    },
    },
  },
]
