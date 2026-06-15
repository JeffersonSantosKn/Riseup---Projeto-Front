import lucasDemoPerfil from '../ativos/imagens/jefferson-santos-perfil.jpg'
import macacoPhpCapa from '../ativos/imagens/macacophp.webp'

export const bangobalango = {
  alunoId: 'aluno-1',
}

export const modoApresentacao = {
  ativo: false,
}

export const usuarios = [
  {
    id: 'aluno-1',
    tipo: 'aluno',
    nome: 'Lucas Andrade',
    email: 'aluno.demo@trilum.demo',
    senha: 'Aluno@123',
    foto: 'LA',
    fotoUrl: lucasDemoPerfil,
    capaUrl: macacoPhpCapa,
    titulo: 'Estudante de DevOps',
    cargoAtual: 'Estudante de DevOps',
    localizacao: 'Recife, PE',
    bio:
      'Estudante de Análise e Desenvolvimento de Sistemas com foco em DevOps, APIs e automação de ambientes. Tenho estudado Linux, Docker, Git/GitHub, HTTP e bancos de dados, buscando transformar meus estudos em projetos práticos documentados.',
    tecnologias: ['Linux', 'Docker', 'Docker Compose', 'Git/GitHub', 'HTTP/API REST', 'SQL', 'JavaScript'],
    certificados: ['Git e GitHub para Projetos'],
    cursosConcluidos: ['Git e GitHub para Projetos'],
    wizardConcluido: true,
    respostasWizard: {
      areaAtual: 'estudante',
      areaDesejada: 'devops',
      focoCarreira: 'apis',
      informatica: 'avancado',
      programacao: 'projetos',
      linguagem: 'javascript',
      tecnologiaInteresse: 'docker-cloud',
      nivelTecnologia: 'avancar',
      experienciaProjetos: 'proprio',
      baseBackendDados: 'banco',
      objetivo: 'primeira-vaga',
      tempoSemanal: 'medio',
      ingles: 'basico',
      agil: 'ouvi',
      softSkills: 'bom',
    },
    perfilProfissional: {
      telefone: '(81) 98888-0000',
      linkedin: '',
      github: '',
      portfolio: '',
      tecnologiasComNivel:
        'Linux - estudando\nDocker - estudando\nDocker Compose - básico\nGit/GitHub - básico\nHTTP/API REST - básico\nSQL - básico\nJavaScript - básico\nReact - iniciante\nPython - iniciante',
      idiomas: 'Português - nativo\nInglês - básico/intermediário',
      projetos:
        'API containerizada com Docker Compose - Docker, API REST e SQL - em desenvolvimento\nPipeline simples de CI/CD para aplicação web - planejado',
      formacoes: 'Análise e Desenvolvimento de Sistemas - UNIT - cursando',
      experiencias:
        'Atendente de Suporte - Loja Digital Recife - 2024 - Atendimento ao cliente, organização de chamados simples, registro de solicitações e apoio na resolução de problemas operacionais.',
      certificadosExternos:
        'Git e GitHub - Curso introdutório - 2026 - 20h\nFundamentos de Linux - Curso introdutório - 2026 - 15h',
      certificadosExternosArquivos: [],
    },
    projetosPraticos: [
      {
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
        textoParaCurriculo:
          'Desenvolveu uma API simples containerizada com Docker Compose, incluindo banco de dados, documentação de execução e organização do ambiente local.',
        criadoEm: '20/05/2026 10:00:00',
        atualizadoEm: '10/06/2026 16:00:00',
      },
      {
        id: 'projeto-lucas-pipeline-ci',
        templateId: 'projeto-devops-pipeline-ci',
        titulo: 'Pipeline simples de CI/CD para aplicação web',
        descricao:
          'Projeto em andamento para praticar automação de build, testes e organização de entregas usando GitHub Actions.',
        tecnologias: ['GitHub Actions', 'CI/CD', 'Git', 'Docker', 'JavaScript'],
        status: 'planejado',
        origem: 'mentor',
        github: '',
        deploy: '',
        criadoEm: '02/06/2026 09:00:00',
        atualizadoEm: '12/06/2026 18:30:00',
      },
    ],
    progresso: {},
    curriculo: {
      fotoUrl: lucasDemoPerfil,
      titulo: 'Estudante de DevOps',
      objetivo:
        'Conquistar uma oportunidade júnior em DevOps ou infraestrutura, aplicando conhecimentos em Linux, Docker, Git, APIs e documentação técnica.',
      resumo: 'Estudante de DevOps estudando Linux e Docker.',
      tecnologias:
        'Linux\nDocker\nDocker Compose\nGit/GitHub\nSQL\nHTTP/API REST\nJavaScript\nReact básico\nPython básico',
      projetos:
        'API containerizada com Docker Compose - projeto em desenvolvimento, ainda sem repositório público.',
      formacoes: 'Análise e Desenvolvimento de Sistemas - UNIT - cursando',
      experiencias: 'Atendente de Suporte - Loja Digital Recife - 2024',
      idiomas: 'Português nativo\nInglês básico/intermediário',
      competencias: 'Organização\nDocumentação técnica\nAprendizado contínuo\nBoa comunicação\nColaboração',
      telefone: '(81) 98888-0000',
      linkedin: '',
      github: '',
      portfolio: '',
    },
  },
]
