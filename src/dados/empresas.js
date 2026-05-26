import avanadeHero from '../ativos/imagens/avanade-baloes-hero.webp'
import avanadeLogo from '../ativos/imagens/avanade-logo.png'

export const empresas = [
  {
    id: 'empresa-1',
    nome: 'Avanade',
    nomeOficial: 'Avanade Brasil',
    email: 'empresa@riseup.com',
    senha: 'Empresa@123',
    logo: 'AV',
    logoUrl: avanadeLogo,
    capaUrl: avanadeHero,
    capa: '#f8fafc',
    descricao:
      'A Avanade é a consultoria líder em soluções digitais inovadoras no ecossistema Microsoft. Nascida da união entre Accenture e Microsoft, unimos tecnologia de ponta, visão de negócios e experiência humana para criar o que é relevante para o amanhã. No Brasil, somos um dos principais pilares de transformação digital, entregando projetos que moldam o futuro de indústrias inteiras.',
    descricaoCurta:
      'Unimos tecnologia, inovação e talentos para criar soluções digitais com impacto real em empresas e pessoas.',
    setor: 'Consultoria de Tecnologia e Soluções Digitais',
    tamanho: '60.000+ funcionários no mundo',
    sede: 'São Paulo, SP (com hubs em Recife e Curitiba)',
    localizacao: 'Recife, PE',
    hub: 'Porto Digital - Bairro do Recife, Recife - PE',
    especialidades: [
      'Azure Enterprise',
      'IA Generativa e Copilot',
      'Modern Workplace',
      'Dynamics 365',
      'Power Platform',
      '.NET 8',
      'React',
      'TypeScript',
    ],
    stackDetalhes: [
      'Cloud & Infra: Azure em escala enterprise, Kubernetes e serverless.',
      'Inteligência Artificial: IA Generativa, Copilot e soluções com dados.',
      'Business Apps: Dynamics 365 e Power Platform para low-code.',
      'Software Engineering: .NET 8, React e TypeScript em produtos robustos.',
    ],
    beneficios: [
      'Certificações Microsoft com suporte e vouchers',
      'Projetos globais em squads internacionais',
      'Programas ativos de diversidade e inclusão',
      'Modelo híbrido ou remoto conforme o projeto',
    ],
    site: 'https://www.avanade.com/pt-br',
    instagram: 'https://www.instagram.com/avanadeinc/',
    linkedin: 'https://www.linkedin.com/company/avanade/?originalSubdomain=br',
    youtube: 'https://www.youtube.com/avanade',
  },
  {
    id: 'empresa-2',
    nome: 'Nova Jornada Digital',
    email: 'rh@novajornada.com',
    senha: 'Empresa@123',
    logo: 'NJ',
    capa: 'linear-gradient(120deg, rgba(15, 23, 42, 0.95), rgba(99, 102, 241, 0.76))',
    descricao:
      'Consultoria de produtos digitais com foco em inclusão, desenvolvimento web e squads multidisciplinares.',
    localizacao: 'Remoto',
    site: 'https://novajornada.dev',
  },
]
