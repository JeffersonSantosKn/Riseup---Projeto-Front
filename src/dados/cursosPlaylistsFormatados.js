// Cole os objetos abaixo dentro do array `inserirCurso` em `src/dados/inserirCurso.js`.
// Importante: se algum ID já existir, substitua o objeto antigo por este para não duplicar o curso.
// Estes objetos usam links de vídeos individuais, não apenas links de playlist.

export const cursosPlaylistsFormatados = [
  {
    id: 'curso-nextjs-14-completo',
    titulo: 'Next.js 14 Curso Completo',
    categoria: 'Front-end',
    tecnologia: 'nextjs',
    nivel: 'Intermediario',
    duracao: '1h45',
    professor: 'Kew Academy',
    videoPrincipal: 'https://www.youtube.com/watch?v=XelFRD8LhsM&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=1&pp=iAQB',
    tags: 'nextjs, react, frontend, fullstack, route-handlers, app-router, headers, cookies, cache, api-rest',
    trilhas: 'react-frontend,frontend-base-portfolio,backend-api-base',
    descricao: 'Aprenda Next.js 14 na prática, passando por renderização, criação de projeto, roteamento, layouts, metadata, route handlers, métodos HTTP, headers, cookies e cache para evoluir aplicações React para um nível mais profissional.',
    destaque: 'Evolua de React para Next.js com rotas, APIs internas e recursos modernos.',
    modulos: [
      {
        titulo: 'Módulo 1: Fundamentos, projeto e rotas',
        descricao: 'Crie o projeto, entenda renderização e organize rotas básicas e dinâmicas.',
        aulas: [
          {
            titulo: 'NextJS 14 Curso completo: Aula 01 - Renderização',
            duracao: '5:16',
            link: 'https://www.youtube.com/watch?v=XelFRD8LhsM&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=1&pp=iAQB',
            descricao: 'Entenda os tipos de renderização e como o Next.js entrega páginas para o usuário.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 02 - Criando primeiro projeto',
            duracao: '6:37',
            link: 'https://www.youtube.com/watch?v=PBdNF1oLBG4&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=2&pp=iAQB',
            descricao: 'Crie o primeiro projeto Next.js e conheça a estrutura inicial da aplicação.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 03 - Roteamento',
            duracao: '4:06',
            link: 'https://www.youtube.com/watch?v=c2-7pbXbnqM&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=3&pp=iAQB',
            descricao: 'Aprenda a criar rotas e organizar páginas no padrão do Next.js.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 04 - Rotas Dinâmicas',
            duracao: '7:22',
            link: 'https://www.youtube.com/watch?v=0toonzDOaF0&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=4&pp=iAQB',
            descricao: 'Crie rotas dinâmicas para páginas que dependem de parâmetros.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 05 - Página Not Found | 404',
            duracao: '6:42',
            link: 'https://www.youtube.com/watch?v=5N_CTsC3VU8&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=5&pp=iAQB',
            descricao: 'Configure uma página 404 personalizada para rotas inexistentes.',
          }
        ],
      },
      {
        titulo: 'Módulo 2: Layouts, navegação e organização',
        descricao: 'Trabalhe com layouts, links, metadata, templates, grupos de rotas e tratamento de erros.',
        aulas: [
          {
            titulo: 'NextJS 14 Curso completo: Aula 06 - Arquivo Layout',
            duracao: '3:19',
            link: 'https://www.youtube.com/watch?v=DKVJ0Wiu2Lg&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=6&pp=iAQB',
            descricao: 'Entenda o arquivo de layout e como reaproveitar estruturas visuais.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 07 - Layouts aninhados',
            duracao: '6:37',
            link: 'https://www.youtube.com/watch?v=tIqPhbr8cCs&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=7&pp=iAQB0gcJCToLAYcqIYzv',
            descricao: 'Organize layouts aninhados para diferentes áreas da aplicação.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 08 - Título Metadata',
            duracao: '4:37',
            link: 'https://www.youtube.com/watch?v=XYnAetqdrN0&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=8&pp=iAQB',
            descricao: 'Configure título e metadata para melhorar organização e SEO.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 09 - Componente Link',
            duracao: '4:03',
            link: 'https://www.youtube.com/watch?v=-Y-Lp8EDEVM&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=9&pp=iAQB',
            descricao: 'Use o componente Link para navegação interna sem recarregar a página.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 10 - Links ativos',
            duracao: '5:49',
            link: 'https://www.youtube.com/watch?v=1vOBNFT0ZGo&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=10&pp=iAQB',
            descricao: 'Identifique links ativos e melhore a experiência de navegação.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 11 - Arquivo Template',
            duracao: '3:17',
            link: 'https://www.youtube.com/watch?v=VHjpgzM7hJM&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=11&pp=iAQB',
            descricao: 'Entenda o uso de templates em páginas e rotas.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 12 - Route Groups',
            duracao: '3:32',
            link: 'https://www.youtube.com/watch?v=Do1k_9Tfivg&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=12&pp=iAQB',
            descricao: 'Organize rotas em grupos sem alterar a URL final.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 13 - Manipulação de Erros',
            duracao: '4:32',
            link: 'https://www.youtube.com/watch?v=U8nPU0SrGI4&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=13&pp=iAQB',
            descricao: 'Trate erros de rota e exiba estados adequados para o usuário.',
          }
        ],
      },
      {
        titulo: 'Módulo 3: Route Handlers e métodos HTTP',
        descricao: 'Construa endpoints internos e manipule GET, POST, PATCH, DELETE e query params.',
        aulas: [
          {
            titulo: 'NextJS 14 Curso completo: Aula 14 - Route Handlers',
            duracao: '4:56',
            link: 'https://www.youtube.com/watch?v=U51O5Njz-cA&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=14&pp=iAQB0gcJCToLAYcqIYzv',
            descricao: 'Crie handlers de rota para construir endpoints dentro do Next.js.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 15 - Manipulando rotas GET',
            duracao: '3:03',
            link: 'https://www.youtube.com/watch?v=4RuKvSjZ57Y&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=15&pp=iAQB',
            descricao: 'Implemente leitura de dados usando método GET.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 16 - Manipulando rotas POST',
            duracao: '5:01',
            link: 'https://www.youtube.com/watch?v=CR-b1pCuBqc&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=16&pp=iAQB',
            descricao: 'Implemente criação de dados usando método POST.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 17 - Rotas Dinâmicas',
            duracao: '3:31',
            link: 'https://www.youtube.com/watch?v=wa0FuOgbU9w&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=17&pp=iAQB',
            descricao: 'Crie rotas dinâmicas para páginas que dependem de parâmetros.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 18 - Manipulando rotas PATCH',
            duracao: 'A confirmar',
            link: 'https://www.youtube.com/watch?v=VCME9nZPKPw&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=18&pp=iAQB',
            descricao: 'Implemente atualização parcial de dados usando método PATCH.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 19 - Manipulando rotas DELETE',
            duracao: '2:17',
            link: 'https://www.youtube.com/watch?v=JbGUMzpMawg&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=19&pp=iAQB',
            descricao: 'Implemente remoção de dados usando método DELETE.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 20 - URL Query Params',
            duracao: '3:17',
            link: 'https://www.youtube.com/watch?v=GXvxJf2w0wY&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=20&pp=iAQB',
            descricao: 'Leia parâmetros de busca pela URL e use filtros na aplicação.',
          }
        ],
      },
      {
        titulo: 'Módulo 4: Redirect, headers, cookies e cache',
        descricao: 'Aplique recursos de controle de resposta, navegação, sessão e performance.',
        aulas: [
          {
            titulo: 'NextJS 14 Curso completo: Aula 21 - Redirect',
            duracao: '2:21',
            link: 'https://www.youtube.com/watch?v=MDQvi6FWjI0&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=21&pp=iAQB',
            descricao: 'Redirecione usuários entre rotas quando necessário.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 22 - Headers',
            duracao: '6:05',
            link: 'https://www.youtube.com/watch?v=i6QhvNJCLWE&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=22&pp=iAQB',
            descricao: 'Trabalhe com cabeçalhos HTTP dentro do Next.js.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 23 - Cookies',
            duracao: '5:43',
            link: 'https://www.youtube.com/watch?v=DOhYvtKZM9o&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=23&pp=iAQB',
            descricao: 'Leia e manipule cookies em fluxos de autenticação e estado.',
          },
          {
            titulo: 'NextJS 14 Curso completo: Aula 24 - Cache',
            duracao: '3:53',
            link: 'https://www.youtube.com/watch?v=bg6JSWZqeKA&list=PLtOMJw0mwbp1hfhMbw0uv29QZFdElmXAt&index=24&pp=iAQB',
            descricao: 'Entenda estratégias de cache para melhorar performance e controle de dados.',
          }
        ],
      }
    ],
  },
  {
    id: 'curso-postgresql-basico',
    titulo: 'PostgreSQL - Banco de Dados para Desenvolvedores',
    categoria: 'Dados',
    tecnologia: 'postgresql',
    nivel: 'Basico',
    duracao: '7h40',
    professor: 'Bóson Treinamentos',
    videoPrincipal: 'https://www.youtube.com/watch?v=Z_SPrzlT4Fc&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=1&pp=iAQB',
    tags: 'postgresql, sql, banco-de-dados, dados, backend, consultas, tabelas, joins, views, json, backup',
    trilhas: 'sql-banco-dados,dados-python-sql-profissional,backend-api-base,backend-node-api-profissional,backend-java-profissional',
    descricao: 'Aprenda PostgreSQL do básico ao intermediário, incluindo instalação, psql, pgAdmin, usuários, criação de bancos e tabelas, consultas SQL, filtros, agregações, joins, views, JSON, backup e procedimentos armazenados.',
    destaque: 'Aprofunde SQL com PostgreSQL, um banco relacional muito usado no mercado.',
    modulos: [
      {
        titulo: 'Módulo 1: Instalação, acesso e administração inicial',
        descricao: 'Instale PostgreSQL, configure ferramentas, use psql, pgAdmin e controle usuários.',
        aulas: [
          {
            titulo: 'Introdução ao PostgreSQL - Curso de Postgres',
            duracao: '10:02',
            link: 'https://www.youtube.com/watch?v=Z_SPrzlT4Fc&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=1&pp=iAQB',
            descricao: 'Aprenda um recurso importante do PostgreSQL para trabalhar com bancos relacionais.',
          },
          {
            titulo: 'PostgreSQL - Instalação do SGBD no Linux Debian - 01',
            duracao: '13:18',
            link: 'https://www.youtube.com/watch?v=Phkf71aZL7A&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=2&pp=iAQB',
            descricao: 'Prepare o ambiente PostgreSQL e conheça ferramentas de administração do banco.',
          },
          {
            titulo: 'PostgreSQL - Instalando o phpPgAdmin para gerenciamento remoto do SGBD - 02',
            duracao: '10:27',
            link: 'https://www.youtube.com/watch?v=HiI5sRkjf3w&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=3&pp=iAQB',
            descricao: 'Prepare o ambiente PostgreSQL e conheça ferramentas de administração do banco.',
          },
          {
            titulo: 'PostgreSQL - Instalação do SGBD no Microsoft Windows - 03',
            duracao: '12:14',
            link: 'https://www.youtube.com/watch?v=RHMC2LFJaYY&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=4&pp=iAQB',
            descricao: 'Prepare o ambiente PostgreSQL e conheça ferramentas de administração do banco.',
          },
          {
            titulo: 'Como instalar o PostgreSQL no Linux Debian 10',
            duracao: '10:01',
            link: 'https://www.youtube.com/watch?v=wuAdsns3qMA&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=5&pp=iAQB',
            descricao: 'Prepare o ambiente PostgreSQL e conheça ferramentas de administração do banco.',
          },
          {
            titulo: 'Curso de PostgreSQL - Comandos básicos do utilitário psql',
            duracao: '12:21',
            link: 'https://www.youtube.com/watch?v=Ft3F7wWA-x8&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=6&pp=iAQB',
            descricao: 'Use o terminal psql para administrar e executar comandos no PostgreSQL.',
          },
          {
            titulo: 'Configurar acesso por senha no psql para o PostgreSQL',
            duracao: '16:15',
            link: 'https://www.youtube.com/watch?v=HbAJQ1WuGRE&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=7&pp=iAQB',
            descricao: 'Use o terminal psql para administrar e executar comandos no PostgreSQL.',
          },
          {
            titulo: 'PostgreSQL - Como criar e excluir usuários com createuser e dropuser',
            duracao: '14:33',
            link: 'https://www.youtube.com/watch?v=XqkGdFO-ENc&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=8&pp=iAQB',
            descricao: 'Crie, remova e configure usuários para controlar acesso ao banco.',
          },
          {
            titulo: 'Como instalar e acessar o pgAdmin4 no Linux Debian  - Curso de PostgreSQL',
            duracao: '20:03',
            link: 'https://www.youtube.com/watch?v=I0FJevUrK0E&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=9&pp=iAQB',
            descricao: 'Prepare o ambiente PostgreSQL e conheça ferramentas de administração do banco.',
          },
          {
            titulo: 'Curso de PostgreSQL - Criar e Excluir Bancos de Dados com psql e pgAdmin',
            duracao: '17:36',
            link: 'https://www.youtube.com/watch?v=rw972yYVGcM&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=10&pp=iAQB',
            descricao: 'Use o terminal psql para administrar e executar comandos no PostgreSQL.',
          }
        ],
      },
      {
        titulo: 'Módulo 2: Tabelas, dados e consultas SQL',
        descricao: 'Crie tabelas, insira registros e consulte dados com filtros, ordenação e limites.',
        aulas: [
          {
            titulo: 'Curso de PostgreSQL - Tipos de Dados',
            duracao: '7:45',
            link: 'https://www.youtube.com/watch?v=qgcRtO6phlY&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=11&pp=iAQB',
            descricao: 'Conheça tipos de dados usados para modelar tabelas corretamente.',
          },
          {
            titulo: 'Curso de PostgreSQL - Como criar tabelas com CREATE TABLE',
            duracao: '14:50',
            link: 'https://www.youtube.com/watch?v=S7r4zQX769g&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=12&pp=iAQB',
            descricao: 'Crie tabelas e organize dados relacionais com comandos SQL.',
          },
          {
            titulo: 'PostgreSQL - Inserir registros em tabelas com INSERT INTO',
            duracao: '14:41',
            link: 'https://www.youtube.com/watch?v=vOJdflliU_E&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=13&pp=iAQB',
            descricao: 'Crie tabelas e organize dados relacionais com comandos SQL.',
          },
          {
            titulo: 'PostgreSQL - Como realizar consultas simples em tabelas com o comando SELECT',
            duracao: '12:27',
            link: 'https://www.youtube.com/watch?v=tjkmWuBTBgY&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=14&pp=iAQB',
            descricao: 'Crie tabelas e organize dados relacionais com comandos SQL.',
          },
          {
            titulo: 'Como filtrar consultas com a cláusula WHERE no PostgreSQL',
            duracao: '11:28',
            link: 'https://www.youtube.com/watch?v=myeJ1YWUiS4&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=15&pp=iAQB',
            descricao: 'Crie, remova e configure usuários para controlar acesso ao banco.',
          },
          {
            titulo: 'PostgreSQL - Ordenar resultados de consultas com ORDER BY',
            duracao: '11:35',
            link: 'https://www.youtube.com/watch?v=DNdgqtJbsIw&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=16&pp=iAQB',
            descricao: 'Realize consultas e recupere dados usando SELECT e filtros.',
          },
          {
            titulo: 'Curso de PostgreSQL - LIMIT e OFFSET - Limitar resultados de consultas',
            duracao: '10:04',
            link: 'https://www.youtube.com/watch?v=aWvU0zesMwc&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=17&pp=iAQB',
            descricao: 'Realize consultas e recupere dados usando SELECT e filtros.',
          },
          {
            titulo: 'Curso de PostgreSQL - Operadores de Comparação em Consultas SQL',
            duracao: '8:59',
            link: 'https://www.youtube.com/watch?v=xJycNaQBBBg&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=18&pp=iAQB',
            descricao: 'Realize consultas e recupere dados usando SELECT e filtros.',
          },
          {
            titulo: 'Curso de PostgreSQL - Operador BETWEEN e intervalos em consultas SQL',
            duracao: '9:15',
            link: 'https://www.youtube.com/watch?v=qJx2khL5Zjo&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=19&pp=iAQB',
            descricao: 'Realize consultas e recupere dados usando SELECT e filtros.',
          },
          {
            titulo: 'Curso de PostgreSQL - Cláusula UPDATE - Atualizar dados inseridos nas tabelas',
            duracao: '10:03',
            link: 'https://www.youtube.com/watch?v=Loh-PJ36qiU&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=20&pp=iAQB0gcJCToLAYcqIYzv',
            descricao: 'Crie, remova e configure usuários para controlar acesso ao banco.',
          },
          {
            titulo: 'Apagar registros de uma tabela no PostgreSQL com DELETE FROM e TRUNCATE TABLE',
            duracao: '11:53',
            link: 'https://www.youtube.com/watch?v=7iEVkcwM31E&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=21&pp=iAQB',
            descricao: 'Remova registros e entenda diferenças entre DELETE e TRUNCATE.',
          }
        ],
      },
      {
        titulo: 'Módulo 3: Consultas avançadas, funções, joins e views',
        descricao: 'Use agregações, aliases, joins, views, arrays e operadores para consultas mais completas.',
        aulas: [
          {
            titulo: '10 exemplos de funções de agregação no PostgreSQL',
            duracao: '13:12',
            link: 'https://www.youtube.com/watch?v=HrY_nkrpj4g&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=22&pp=iAQB',
            descricao: 'Use funções de agregação para calcular totais, médias e contagens.',
          },
          {
            titulo: 'Curso de PostgreSQL - Aliases com cláusula AS',
            duracao: '9:07',
            link: 'https://www.youtube.com/watch?v=Pjytyt9Iogo&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=23&pp=iAQB',
            descricao: 'Crie, remova e configure usuários para controlar acesso ao banco.',
          },
          {
            titulo: 'PostgreSQL - Consultas em duas ou mais tabelas com INNER JOIN',
            duracao: '15:01',
            link: 'https://www.youtube.com/watch?v=zCQJbP8E6Tk&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=24&pp=iAQB',
            descricao: 'Crie tabelas e organize dados relacionais com comandos SQL.',
          },
          {
            titulo: 'Curso de PostgreSQL - Como criar e executar VIEWS',
            duracao: '11:33',
            link: 'https://www.youtube.com/watch?v=dfGltH1GcXM&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=25&pp=iAQB',
            descricao: 'Crie views para reutilizar consultas e simplificar acesso aos dados.',
          },
          {
            titulo: 'Como usar Arrays em colunas de tabelas no PostgreSQL',
            duracao: '19:08',
            link: 'https://www.youtube.com/watch?v=w-yqmxdFtig&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=26&pp=iAQB',
            descricao: 'Crie tabelas e organize dados relacionais com comandos SQL.',
          },
          {
            titulo: '10 Exemplos de Operadores Aritméticos no PostgreSQL',
            duracao: '15:59',
            link: 'https://www.youtube.com/watch?v=bSZaI20-KnU&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=27&pp=iAQB',
            descricao: 'Aprenda um recurso importante do PostgreSQL para trabalhar com bancos relacionais.',
          },
          {
            titulo: 'Criar Tabelas Herdadas no PostgreSQL (OO em Bancos de Dados)',
            duracao: '16:29',
            link: 'https://www.youtube.com/watch?v=8C_Qncr3du4&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=28&pp=iAQB',
            descricao: 'Crie e exclua bancos de dados usando ferramentas do PostgreSQL.',
          }
        ],
      },
      {
        titulo: 'Módulo 4: Recursos avançados e manutenção',
        descricao: 'Explore herança, JSON, materialized views, backup, subqueries, strings e procedures.',
        aulas: [
          {
            titulo: 'Como usar tipo JSON em colunas no PostgreSQL',
            duracao: '16:43',
            link: 'https://www.youtube.com/watch?v=Uv_yDqfxS2s&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=29&pp=iAQB',
            descricao: 'Use colunas JSON para armazenar dados semiestruturados.',
          },
          {
            titulo: 'Como criar e usar Materialized Views no PostgreSQL',
            duracao: '10:31',
            link: 'https://www.youtube.com/watch?v=WB4ykHGr7w8&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=30&pp=iAQB',
            descricao: 'Crie views para reutilizar consultas e simplificar acesso aos dados.',
          },
          {
            titulo: 'Backup e Restauração de Banco de Dados PostgreSQL com pg_dump',
            duracao: '16:25',
            link: 'https://www.youtube.com/watch?v=ZBWx-CA0jdk&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=31&pp=iAQB',
            descricao: 'Faça backup e restauração de bancos usando pg_dump.',
          },
          {
            titulo: 'Subconsultas (Subqueries) no PostgreSQL',
            duracao: 'A confirmar',
            link: 'https://www.youtube.com/watch?v=n7D3py_IKVo&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=32&pp=iAQB',
            descricao: 'Realize consultas e recupere dados usando SELECT e filtros.',
          },
          {
            titulo: 'Funções de Manipulação de Strings no PostgreSQL - Parte I',
            duracao: '12:16',
            link: 'https://www.youtube.com/watch?v=oC5ARVrezD0&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=33&pp=iAQB',
            descricao: 'Aplique funções de manipulação de texto em consultas SQL.',
          },
          {
            titulo: 'Funções de Manipulação de Strings no PostgreSQL - Parte II',
            duracao: '17:47',
            link: 'https://www.youtube.com/watch?v=7ogC10CeUo8&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=34&pp=iAQB',
            descricao: 'Aplique funções de manipulação de texto em consultas SQL.',
          },
          {
            titulo: 'Introdução aos Procedimentos Armazenados no PostgreSQL',
            duracao: '26:33',
            link: 'https://www.youtube.com/watch?v=Ig1hGqiPROI&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=35&pp=iAQB',
            descricao: 'Conheça procedimentos armazenados para encapsular lógica no banco.',
          }
        ],
      }
    ],
  },
  {
    id: 'curso-playwright-automacao-testes',
    titulo: 'Automação de Testes com Playwright',
    categoria: 'QA',
    tecnologia: 'qa',
    nivel: 'Basico',
    duracao: '4h57',
    professor: 'Willames Vital - QA',
    videoPrincipal: 'https://www.youtube.com/watch?v=WYgDL106aVI&list=PLjN70jnl7au90KkTZDvlOFsmC6sLP3525&index=1&pp=iAQB',
    tags: 'qa, playwright, automacao, testes-e2e, terminal, logica, testes-web, javascript, typescript',
    trilhas: 'qa-testes,qa-automacao-profissional,react-frontend',
    descricao: 'Aprenda automação de testes com Playwright, começando por fundamentos de automação, ferramentas, terminal, instalação, lógica de programação aplicada a testes e conceitos essenciais para criar testes web modernos.',
    destaque: 'Comece automação de testes web com Playwright do jeito certo.',
    modulos: [
      {
        titulo: 'Módulo 1: Introdução, ferramentas e ambiente',
        descricao: 'Entenda o curso, o papel da automação, as ferramentas necessárias e a instalação do Playwright.',
        aulas: [
          {
            titulo: 'Curso de Automação de Testes com Playwright – Introdução',
            duracao: '12:50',
            link: 'https://www.youtube.com/watch?v=WYgDL106aVI&list=PLjN70jnl7au90KkTZDvlOFsmC6sLP3525&index=1&pp=iAQB',
            descricao: 'Entenda os fundamentos da automação de testes e quando aplicá-la.',
          },
          {
            titulo: 'Curso de Automação de Testes com Playwright – Módulo 0: Introdução à Automação de Testes',
            duracao: '31:53',
            link: 'https://www.youtube.com/watch?v=YNyjIPxCxNQ&list=PLjN70jnl7au90KkTZDvlOFsmC6sLP3525&index=2&pp=iAQB',
            descricao: 'Entenda os fundamentos da automação de testes e quando aplicá-la.',
          },
          {
            titulo: 'Curso de Automação de Testes com Playwright – Ferramentas',
            duracao: '21:55',
            link: 'https://www.youtube.com/watch?v=6RIr-cg7H50&list=PLjN70jnl7au90KkTZDvlOFsmC6sLP3525&index=3&pp=iAQB',
            descricao: 'Conheça as ferramentas necessárias para configurar o ambiente de testes.',
          },
          {
            titulo: 'Curso de Automação de Testes com Playwright – Módulo 1:  Uso do Terminal e Instalação do Playwright',
            duracao: '52:30',
            link: 'https://www.youtube.com/watch?v=atxNW6MlDr0&list=PLjN70jnl7au90KkTZDvlOFsmC6sLP3525&index=4&pp=iAQB',
            descricao: 'Use terminal e instale o Playwright para iniciar a automação.',
          }
        ],
      },
      {
        titulo: 'Módulo 2: Lógica de programação para QA',
        descricao: 'Reforce fundamentos de lógica úteis para escrever testes automatizados.',
        aulas: [
          {
            titulo: 'Curso de Automação de Testes com Playwright - Módulo 2: Fundamentos de Lógica de Programação - 1/6',
            duracao: '36:37',
            link: 'https://www.youtube.com/watch?v=QZ0ybCoQ0kw&list=PLjN70jnl7au90KkTZDvlOFsmC6sLP3525&index=5&pp=iAQB',
            descricao: 'Reforce lógica de programação aplicada à escrita de testes automatizados.',
          },
          {
            titulo: 'Curso de Automação de Testes com Playwright - Módulo 2: Fundamentos de Lógica de Programação - 2/6',
            duracao: '41:43',
            link: 'https://www.youtube.com/watch?v=I_PWY_RkgC4&list=PLjN70jnl7au90KkTZDvlOFsmC6sLP3525&index=6&pp=iAQB',
            descricao: 'Reforce lógica de programação aplicada à escrita de testes automatizados.',
          },
          {
            titulo: 'Curso de Automação de Testes com Playwright - Módulo 2: Fundamentos de Lógica de Programação - 3/6',
            duracao: '14:00',
            link: 'https://www.youtube.com/watch?v=e_lnVPt7qoI&list=PLjN70jnl7au90KkTZDvlOFsmC6sLP3525&index=7&pp=iAQB',
            descricao: 'Reforce lógica de programação aplicada à escrita de testes automatizados.',
          },
          {
            titulo: 'Curso de Automação de Testes com Playwright - Módulo 2: Fundamentos de Lógica de Programação - 4/6',
            duracao: '15:13',
            link: 'https://www.youtube.com/watch?v=CDQ2-s8X3CI&list=PLjN70jnl7au90KkTZDvlOFsmC6sLP3525&index=8&pp=iAQB',
            descricao: 'Reforce lógica de programação aplicada à escrita de testes automatizados.',
          },
          {
            titulo: 'Curso de Automação de Testes com Playwright - Módulo 2: Fundamentos de Lógica de Programação - 5/6',
            duracao: '10:39',
            link: 'https://www.youtube.com/watch?v=lVc85IRw-E0&list=PLjN70jnl7au90KkTZDvlOFsmC6sLP3525&index=9&pp=iAQB',
            descricao: 'Reforce lógica de programação aplicada à escrita de testes automatizados.',
          },
          {
            titulo: 'Curso de Automação de Testes com Playwright - Módulo 2: Fundamentos de Lógica de Programação - 6/6',
            duracao: '18:25',
            link: 'https://www.youtube.com/watch?v=aNuJq3tYy1I&list=PLjN70jnl7au90KkTZDvlOFsmC6sLP3525&index=10&pp=iAQB',
            descricao: 'Reforce lógica de programação aplicada à escrita de testes automatizados.',
          }
        ],
      },
      {
        titulo: 'Módulo 3: Fundamentos da automação',
        descricao: 'Conecte os conceitos de lógica e ferramentas com fundamentos práticos de automação.',
        aulas: [
          {
            titulo: 'Curso de Automação de Testes com Playwright – Módulo 3: Fundamentos da Automação de Testes',
            duracao: '41:30',
            link: 'https://www.youtube.com/watch?v=M2nco7K7vl0&list=PLjN70jnl7au90KkTZDvlOFsmC6sLP3525&index=11&pp=iAQB0gcJCToLAYcqIYzv',
            descricao: 'Aprenda conceitos centrais da automação e estrutura de testes.',
          }
        ],
      }
    ],
  },
  {
    id: 'curso-php-iniciante',
    titulo: 'Curso de PHP para Iniciantes',
    categoria: 'Back-end',
    tecnologia: 'php',
    nivel: 'Basico',
    duracao: '7h41',
    professor: 'Gustavo Guanabara',
    videoPrincipal: 'https://www.youtube.com/watch?v=F7KzJ7e6EAc&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=1&t=18s&pp=iAQB0gcJCToLAYcqIYzv',
    tags: 'php, backend, web, html, formularios, servidor, banco-de-dados, variaveis, funcoes, arrays',
    trilhas: 'php-backend,sql-banco-dados,backend-api-base',
    descricao: 'Aprenda PHP desde os fundamentos, entendendo sua história, funcionamento no servidor, instalação, variáveis, operadores, integração com HTML, condicionais, repetições, rotinas, strings, vetores e matrizes.',
    destaque: 'Base prática para criar páginas web dinâmicas com PHP.',
    modulos: [
      {
        titulo: 'Módulo 1: Introdução, funcionamento e ambiente',
        descricao: 'Conheça PHP, entenda seu funcionamento no servidor e configure o ambiente.',
        aulas: [
          {
            titulo: 'História do PHP - Curso PHP Iniciante #01 - Gustavo Guanabara',
            duracao: '19:04',
            link: 'https://www.youtube.com/watch?v=F7KzJ7e6EAc&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=1&t=18s&pp=iAQB0gcJCToLAYcqIYzv',
            descricao: 'Conheça a origem do PHP e sua importância na construção de sites dinâmicos.',
          },
          {
            titulo: 'Como funciona o PHP - Curso PHP Iniciante #02 - Gustavo Guanabara',
            duracao: '10:24',
            link: 'https://www.youtube.com/watch?v=Eup6utTPe2U&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=2&pp=iAQB',
            descricao: 'Entenda como o PHP roda no servidor e entrega respostas para o navegador.',
          },
          {
            titulo: 'Como Instalar o PHP - Curso de PHP Iniciante #03 - Gustavo Guanabara',
            duracao: '24:07',
            link: 'https://www.youtube.com/watch?v=3ltZBbKACh4&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=3&pp=iAQB0gcJCToLAYcqIYzv',
            descricao: 'Configure o ambiente necessário para começar a programar em PHP.',
          }
        ],
      },
      {
        titulo: 'Módulo 2: Variáveis, operadores e integração com HTML',
        descricao: 'Trabalhe com variáveis, operadores e integração entre páginas HTML e PHP.',
        aulas: [
          {
            titulo: 'Variáveis em PHP - Curso PHP Iniciante #04 - Gustavo Guanabara',
            duracao: '22:58',
            link: 'https://www.youtube.com/watch?v=DGZS9KrlrjI&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=5&pp=iAQB',
            descricao: 'Aprenda a declarar variáveis e armazenar informações em PHP.',
          },
          {
            titulo: 'Operadores Aritméticos - Curso PHP Iniciante #05 - Gustavo Guanabara',
            duracao: '26:20',
            link: 'https://www.youtube.com/watch?v=fCZdbl9-qkw&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=6&pp=iAQB0gcJCToLAYcqIYzv',
            descricao: 'Use operadores aritméticos para realizar cálculos no PHP.',
          },
          {
            titulo: 'Operadores de Atribuição - Curso PHP Iniciante #06 - Gustavo Guanabara',
            duracao: '30:27',
            link: 'https://www.youtube.com/watch?v=NuBt0B_GeEo&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=7&pp=iAQB',
            descricao: 'Trabalhe com operadores de atribuição para atualizar valores.',
          },
          {
            titulo: 'Operadores Relacionais - Curso PHP Iniciante #07 - Gustavo Guanabara',
            duracao: '26:41',
            link: 'https://www.youtube.com/watch?v=YrmPk8zL9Qw&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=8&pp=iAQB',
            descricao: 'Compare valores e construa condições com operadores relacionais.',
          },
          {
            titulo: 'Integração HTML5 + PHP - Curso PHP Iniciante #08 - Gustavo Guanabara',
            duracao: '34:40',
            link: 'https://www.youtube.com/watch?v=gvZfP2iBkw4&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=9&pp=iAQB',
            descricao: 'Integre formulários HTML com scripts PHP para páginas dinâmicas.',
          }
        ],
      },
      {
        titulo: 'Módulo 3: Condicionais e estruturas de repetição',
        descricao: 'Controle o fluxo do programa com if, switch, while, do while e for.',
        aulas: [
          {
            titulo: 'Estrutura Condicional if - Curso de PHP Iniciante #09 - Gustavo Guanabara',
            duracao: '28:05',
            link: 'https://www.youtube.com/watch?v=qAisUeI5oKE&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=10&pp=iAQB',
            descricao: 'Controle decisões do programa com estruturas condicionais if.',
          },
          {
            titulo: 'Estrutura Condicional Switch - Curso de PHP Iniciante #10 - Gustavo Guanabara',
            duracao: '22:44',
            link: 'https://www.youtube.com/watch?v=thElQ5IhM1Q&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=11&pp=iAQB',
            descricao: 'Use switch para tratar múltiplas alternativas de decisão.',
          },
          {
            titulo: 'Estrutura de Repetição While - Curso de PHP Iniciante #11 - Gustavo Guanabara',
            duracao: '20:06',
            link: 'https://www.youtube.com/watch?v=3jk8fSWpQIg&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=12&pp=iAQB',
            descricao: 'Crie repetições baseadas em condição usando while.',
          },
          {
            titulo: 'Estrutura de Repetição Do While - Curso de PHP Iniciante #12 - Gustavo Guanabara',
            duracao: '20:35',
            link: 'https://www.youtube.com/watch?v=6QymvmX3YJU&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=13&pp=iAQB0gcJCToLAYcqIYzv',
            descricao: 'Crie repetições baseadas em condição usando while.',
          },
          {
            titulo: 'Estrutura de Repetição For - Curso de PHP Iniciante #13 - Gustavo Guanabara',
            duracao: '19:15',
            link: 'https://www.youtube.com/watch?v=ancrPpEq9Rw&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=14&pp=iAQB',
            descricao: 'Use for para repetições com contador e controle definido.',
          }
        ],
      },
      {
        titulo: 'Módulo 4: Rotinas, strings, vetores e matrizes',
        descricao: 'Organize código com rotinas e manipule textos, vetores e matrizes.',
        aulas: [
          {
            titulo: 'Rotinas em PHP - Parte 1 - Curso de PHP Iniciante #14 - Gustavo Guanabara',
            duracao: '21:40',
            link: 'https://www.youtube.com/watch?v=7V6MdZQFArc&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=15&pp=iAQB',
            descricao: 'Organize código com rotinas e funções reutilizáveis.',
          },
          {
            titulo: 'Rotinas em PHP - Parte 2 - Curso PHP Iniciante #15 - Gustavo Guanabara',
            duracao: '19:52',
            link: 'https://www.youtube.com/watch?v=o3y8af8rSKM&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=16&pp=iAQB',
            descricao: 'Organize código com rotinas e funções reutilizáveis.',
          },
          {
            titulo: 'Funções String em PHP (Parte 1) - Curso PHP Iniciante #16 - Gustavo Guanabara',
            duracao: '32:56',
            link: 'https://www.youtube.com/watch?v=hQLyylI2LwI&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=17&pp=iAQB',
            descricao: 'Manipule textos com funções de string em PHP.',
          },
          {
            titulo: 'Funções String em PHP (Parte 2) - Curso PHP Iniciante #17 - Gustavo Guanabara',
            duracao: '23:35',
            link: 'https://www.youtube.com/watch?v=1KdhIz0Gh5A&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=18&pp=iAQB',
            descricao: 'Manipule textos com funções de string em PHP.',
          },
          {
            titulo: 'Vetores e Matrizes - Parte 1 - Curso PHP Iniciante #18 - Gustavo Guanabara',
            duracao: '25:26',
            link: 'https://www.youtube.com/watch?v=g8Gr2NIMxQQ&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=19&pp=iAQB0gcJCToLAYcqIYzv',
            descricao: 'Trabalhe com vetores e matrizes para armazenar coleções de dados.',
          },
          {
            titulo: 'Vetores e Matrizes - Parte 2 - Curso PHP Iniciantes #19 - Gustavo Guanabara',
            duracao: '32:42',
            link: 'https://www.youtube.com/watch?v=1f5H4mqCGHo&list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=20&pp=iAQB',
            descricao: 'Trabalhe com vetores e matrizes para armazenar coleções de dados.',
          }
        ],
      }
    ],
  },
  {
    id: 'qa-manual-e-automacao-completo',
    titulo: 'QA manual e automação do zero ao avançado',
    categoria: 'QA',
    tecnologia: 'qa',
    nivel: 'Iniciante',
    duracao: '9h35',
    professor: 'QAlizando',
    videoPrincipal: 'https://www.youtube.com/watch?v=tX3SKUaGL14&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=1&t=1s&pp=iAQB',
    tags: 'qa, testes, qualidade, teste-manual, casos-de-teste, bugs, jira, automacao, api, httparty, appium, jenkins, docker, cucumber',
    trilhas: 'qa-testes,qa-automacao-profissional,api-http-rest,devops-docker-cloud',
    descricao: 'Aprenda qualidade de software do zero, passando por fundamentos de QA, testes manuais, casos de teste, reporte de bugs, automação web, Git, testes de API, mobile com Appium, integração contínua, Jenkins, Docker e pipelines de regressão.',
    destaque: 'Jornada completa para iniciar em QA manual e evoluir para automação.',
    modulos: [
      {
        titulo: 'Módulo 1: Fundamentos de QA e testes manuais',
        descricao: 'Entenda o papel de QA, times ágeis, front-end/back-end, casos de teste, bugs e tipos de testes.',
        aulas: [
          {
            titulo: 'Introdução [Curso Do 0 Ao QA]',
            duracao: '2:16',
            link: 'https://www.youtube.com/watch?v=tX3SKUaGL14&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=1&t=1s&pp=iAQB',
            descricao: 'Apresentação do curso e da jornada para entrar na área de qualidade de software.',
          },
          {
            titulo: 'O que é e o que faz um QA [Curso Do 0 Ao QA Basico#1]',
            duracao: '7:41',
            link: 'https://www.youtube.com/watch?v=D77EgyDsnso&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=2&pp=iAQB',
            descricao: 'Aula prática para avançar em qualidade de software e automação de testes.',
          },
          {
            titulo: 'Time Agil [Curso Do 0 Ao QA Basico#2]',
            duracao: '5:16',
            link: 'https://www.youtube.com/watch?v=sDnCr1IVDCI&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=3&pp=iAQB',
            descricao: 'Conheça práticas ágeis e a relação entre QA, planejamento e entrega.',
          },
          {
            titulo: 'Explicando Front-End e Back-End [Curso Do 0 ao QA Basico#3]',
            duracao: '3:08',
            link: 'https://www.youtube.com/watch?v=xrBRuQGDPlw&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=4&pp=iAQB',
            descricao: 'Entenda diferenças entre front-end e back-end para planejar melhor os testes.',
          },
          {
            titulo: 'Testes Front End [Curso Do 0 Ao QA Basico#4]',
            duracao: '25:52',
            link: 'https://www.youtube.com/watch?v=giAee-VHR10&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=5&pp=iAQB',
            descricao: 'Aprenda a observar interfaces, fluxos e comportamento visual do usuário.',
          },
          {
            titulo: 'Testes Back End [Curso Do 0 ao QA Basico#5]',
            duracao: '28:35',
            link: 'https://www.youtube.com/watch?v=LOtLlwkf5-Q&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=6&pp=iAQB',
            descricao: 'Entenda testes em serviços, regras de negócio, dados e integrações.',
          },
          {
            titulo: 'Test Case [Curso Do 0 Ao QA Basico#6]',
            duracao: '11:15',
            link: 'https://www.youtube.com/watch?v=TLV7gWuXyEE&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=7&pp=iAQB',
            descricao: 'Crie casos de teste claros, reproduzíveis e úteis para o time.',
          },
          {
            titulo: 'Como Reportar Os Bugs, Board Kanban (JIRA) [Curso Do 0 Ao QA Basico#7]',
            duracao: '13:40',
            link: 'https://www.youtube.com/watch?v=kv8Fzx2CMlY&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=8&pp=iAQB',
            descricao: 'Reporte bugs com evidências e acompanhe fluxo de trabalho em Kanban/Jira.',
          },
          {
            titulo: 'Tipos de testes [Curso Do 0 Ao QA Basico#8]',
            duracao: '13:05',
            link: 'https://www.youtube.com/watch?v=7FqlsKBY3OY&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=9&pp=iAQB',
            descricao: 'Conheça os principais tipos de testes usados em software.',
          },
          {
            titulo: 'O Que É Metodologia Agil?? [Curso Do 0 Ao QA Basico#9]',
            duracao: '11:37',
            link: 'https://www.youtube.com/watch?v=NT1nzXeWzi8&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=10&pp=iAQB',
            descricao: 'Conheça práticas ágeis e a relação entre QA, planejamento e entrega.',
          },
          {
            titulo: '15 Coisas Que Você Precisa Saber Sobre a Área de QA',
            duracao: '26:43',
            link: 'https://www.youtube.com/watch?v=Gs28UoeHwwM&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=11&pp=iAQB',
            descricao: 'Veja conselhos práticos sobre rotina, carreira e expectativas na área de QA.',
          }
        ],
      },
      {
        titulo: 'Módulo 2: Automação web, Git e testes de API',
        descricao: 'Configure ambiente, pratique automação web, versionamento com Git e testes de API com HTTParty.',
        aulas: [
          {
            titulo: 'Introdução a automação  de testes [Curso Do 0 Ao QA Intermediário#1]',
            duracao: '5:07',
            link: 'https://www.youtube.com/watch?v=U60vskJGOpM&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=12&pp=iAQB',
            descricao: 'Entenda quando automatizar testes e como iniciar uma estratégia de automação.',
          },
          {
            titulo: 'Como Instalar O Ruby No Windows [Curso Do 0 Ao QA Intermediário#2]',
            duracao: '4:27',
            link: 'https://www.youtube.com/watch?v=FLsUc_WvXbQ&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=13&pp=iAQB',
            descricao: 'Configure Ruby e dependências para automação de testes.',
          },
          {
            titulo: 'Como Instalar O Ruby No Linux [Curso Do 0 Ao QA Intermediário#2]',
            duracao: '4:04',
            link: 'https://www.youtube.com/watch?v=u-rvRt3ID-0&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=14&pp=iAQB',
            descricao: 'Configure Ruby e dependências para automação de testes.',
          },
          {
            titulo: 'Como Instalar O Ruby No Mac OS [Curso Do 0 Ao QA Intermediário#2]',
            duracao: '4:13',
            link: 'https://www.youtube.com/watch?v=D9tdlDLlfOs&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=15&pp=iAQB',
            descricao: 'Configure Ruby e dependências para automação de testes.',
          },
          {
            titulo: 'Ruby Gems [Curso Do 0 Ao QA Intermediário#3]',
            duracao: '6:49',
            link: 'https://www.youtube.com/watch?v=J6kr48-8o8Q&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=16&pp=iAQB',
            descricao: 'Configure Ruby e dependências para automação de testes.',
          },
          {
            titulo: 'Aplicando Design Pattern Page Objects [Curso Do 0 Ao QA Intermediário#4]',
            duracao: '11:10',
            link: 'https://www.youtube.com/watch?v=znWHimXPSTQ&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=17&pp=iAQB',
            descricao: 'Organize testes automatizados usando o padrão Page Objects.',
          },
          {
            titulo: 'BDDs [Curso Do 0 Ao QA Intermediário#5]',
            duracao: '18:25',
            link: 'https://www.youtube.com/watch?v=151oqsTa14A&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=18&pp=iAQB',
            descricao: 'Use BDD para escrever cenários orientados ao comportamento esperado.',
          },
          {
            titulo: 'Mapeando Elementos HTML [Curso Do 0 Ao QA Intermediário#6]',
            duracao: '9:18',
            link: 'https://www.youtube.com/watch?v=JXOFIDtYxB4&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=19&pp=iAQB',
            descricao: 'Mapeie elementos HTML para interagir com a interface nos testes.',
          },
          {
            titulo: 'Criando Asserções Para Os Testes [Curso Do 0 Ao QA Intermediário#7]',
            duracao: '8:25',
            link: 'https://www.youtube.com/watch?v=Yp7l9jE53Uw&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=20&pp=iAQB',
            descricao: 'Crie validações para confirmar se o sistema respondeu como esperado.',
          },
          {
            titulo: 'Refatorando O Codigo [Curso Do 0 Ao QA Intermediário#8]',
            duracao: '19:04',
            link: 'https://www.youtube.com/watch?v=hyaSIZc-hT8&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=21&pp=iAQB',
            descricao: 'Melhore a organização e manutenção do código de testes.',
          },
          {
            titulo: 'Encerrando Curso Automação Front-End [Curso Do 0 Ao QA Intermediário#9]',
            duracao: '4:27',
            link: 'https://www.youtube.com/watch?v=0D4kElfE2Hg&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=22&pp=iAQB',
            descricao: 'Entenda quando automatizar testes e como iniciar uma estratégia de automação.',
          },
          {
            titulo: 'O Que É Git?? [Curso Do 0 Ao QA Intermediário#10]',
            duracao: '5:58',
            link: 'https://www.youtube.com/watch?v=J3t9ekEIX1k&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=23&pp=iAQB',
            descricao: 'Versione projetos de QA e colabore com Git e GitHub.',
          },
          {
            titulo: 'Como Instalar o GIT No Linux  [Curso Do 0 Ao QA Intermediário#11]',
            duracao: '1:37',
            link: 'https://www.youtube.com/watch?v=PT_r4bYz0FU&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=24&pp=iAQB',
            descricao: 'Versione projetos de QA e colabore com Git e GitHub.',
          },
          {
            titulo: 'Como Instalar o GIT No MacOs [Curso Do 0 Ao QA Intermediário#11]',
            duracao: '1:46',
            link: 'https://www.youtube.com/watch?v=FWXEaDauaU8&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=25&pp=iAQB',
            descricao: 'Versione projetos de QA e colabore com Git e GitHub.',
          },
          {
            titulo: 'Como Instalar o GIT No Windows [Curso Do 0 Ao QA Intermediário#11]',
            duracao: '2:46',
            link: 'https://www.youtube.com/watch?v=yGdpa_YfGBo&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=26&pp=iAQB',
            descricao: 'Versione projetos de QA e colabore com Git e GitHub.',
          },
          {
            titulo: 'Como Criar Um Repositorio No Github Gratz [Curso Do 0 Ao QA Intermediário#12]',
            duracao: '2:59',
            link: 'https://www.youtube.com/watch?v=_FP-0JthiWA&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=27&pp=iAQB',
            descricao: 'Versione projetos de QA e colabore com Git e GitHub.',
          },
          {
            titulo: 'Como Subir O Codigo No Git  [Curso Do 0 Ao QA Intermediário#13]',
            duracao: '6:48',
            link: 'https://www.youtube.com/watch?v=w41tVjZfymQ&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=28&pp=iAQB',
            descricao: 'Versione projetos de QA e colabore com Git e GitHub.',
          },
          {
            titulo: 'Configurando Projeto HTTParty [Curso Do 0 Ao QA Intermediário#14]',
            duracao: '5:52',
            link: 'https://www.youtube.com/watch?v=HXRYVEb4IAM&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=29&pp=iAQB',
            descricao: 'Automatize testes de API e valide requisições HTTP.',
          },
          {
            titulo: 'Conhecendo A API [Curso Do 0 Ao QA Intermediário#15]',
            duracao: '7:42',
            link: 'https://www.youtube.com/watch?v=ff9Td45hrkc&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=30&pp=iAQB',
            descricao: 'Automatize testes de API e valide requisições HTTP.',
          },
          {
            titulo: 'GET usando HTTParty [Curso Do 0 Ao QA Intermediário#16]',
            duracao: '6:13',
            link: 'https://www.youtube.com/watch?v=pIA6v6S8RKQ&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=31&pp=iAQB',
            descricao: 'Automatize testes de API e valide requisições HTTP.',
          },
          {
            titulo: 'POST usando HTTParty [Curso Do 0 Ao QA Intermediário#17]',
            duracao: '9:21',
            link: 'https://www.youtube.com/watch?v=R5lkanBRY8I&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=32&pp=iAQB',
            descricao: 'Automatize testes de API e valide requisições HTTP.',
          },
          {
            titulo: 'PUT usando HTTParty [Curso Do 0 Ao QA Intermediário#18]',
            duracao: '8:28',
            link: 'https://www.youtube.com/watch?v=wtZg_eHP10k&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=33&pp=iAQB',
            descricao: 'Automatize testes de API e valide requisições HTTP.',
          },
          {
            titulo: 'Delete Usando HTTParty [Curso Do 0 Ao QA Intermediário#19]',
            duracao: '6:05',
            link: 'https://www.youtube.com/watch?v=Kh5rr54GZM8&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=34&pp=iAQB',
            descricao: 'Automatize testes de API e valide requisições HTTP.',
          },
          {
            titulo: 'Refatoração HTTParty [Curso Do 0 Ao QA Intermediário#20]',
            duracao: '14:53',
            link: 'https://www.youtube.com/watch?v=tOa08y5R_qY&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=35&pp=iAQB',
            descricao: 'Automatize testes de API e valide requisições HTTP.',
          },
          {
            titulo: 'Tudo Que Você Precisa Saber Sobre Automação De Testes',
            duracao: '12:18',
            link: 'https://www.youtube.com/watch?v=yeGyN4wGlWA&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=36&pp=iAQB',
            descricao: 'Aula prática para avançar em qualidade de software e automação de testes.',
          }
        ],
      },
      {
        titulo: 'Módulo 3: Qualidade e automação mobile com Appium',
        descricao: 'Aprenda conceitos de testes mobile, build de app, Appium, BDD, mapeamento e assertions.',
        aulas: [
          {
            titulo: 'O Que Você Precisa Saber Sobre Qualidade De Software Para Apps Mobile [Curso Do 0 Ao QA Avançado#1]',
            duracao: '13:54',
            link: 'https://www.youtube.com/watch?v=8sGE-JU2ZjY&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=37&pp=iAQB',
            descricao: 'Aprenda fundamentos de testes mobile e automação com Appium.',
          },
          {
            titulo: 'Como Buildar Um App [Curso Do 0 Ao QA Avançado#2]',
            duracao: '10:16',
            link: 'https://www.youtube.com/watch?v=THyx3Pwf4oE&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=38&pp=iAQB',
            descricao: 'Aprenda fundamentos de testes mobile e automação com Appium.',
          },
          {
            titulo: 'Como Um App Mobile É Desenvolvido E Testado [Curso Do 0 Ao QA Avançado#3]',
            duracao: '14:06',
            link: 'https://www.youtube.com/watch?v=jxSXUgyvNis&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=39&pp=iAQB',
            descricao: 'Aprenda fundamentos de testes mobile e automação com Appium.',
          },
          {
            titulo: 'Como Um App Mobile É Desenvolvido E Testado [Curso Do 0 Ao QA Avançado#3] part 2',
            duracao: '6:47',
            link: 'https://www.youtube.com/watch?v=MOTim2vYrIM&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=40&pp=iAQB0gcJCToLAYcqIYzv',
            descricao: 'Aprenda fundamentos de testes mobile e automação com Appium.',
          },
          {
            titulo: 'Como Instalar O Appium [Curso Do 0 Ao QA Avançado#4]',
            duracao: '11:47',
            link: 'https://www.youtube.com/watch?v=CUkI5HnPaLY&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=41&pp=iAQB',
            descricao: 'Aprenda fundamentos de testes mobile e automação com Appium.',
          },
          {
            titulo: 'Estruturando O Projeto Appium [Curso Do 0 Ao QA Avançado#5]',
            duracao: '4:44',
            link: 'https://www.youtube.com/watch?v=Fo6PVIp7_CE&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=42&pp=iAQB',
            descricao: 'Aprenda fundamentos de testes mobile e automação com Appium.',
          },
          {
            titulo: 'Appium Capabilities [Curso Do 0 Ao QA Avançado#6]',
            duracao: '7:10',
            link: 'https://www.youtube.com/watch?v=4PkwrtxwbYo&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=43&pp=iAQB',
            descricao: 'Aprenda fundamentos de testes mobile e automação com Appium.',
          },
          {
            titulo: 'BDD Para O Appium [Curso Do 0 Ao QA Avançado#7]',
            duracao: '6:13',
            link: 'https://www.youtube.com/watch?v=20Vy7g4PLvg&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=44&pp=iAQB',
            descricao: 'Use BDD para escrever cenários orientados ao comportamento esperado.',
          },
          {
            titulo: 'Mapeando Elementos No Appium [Curso Do 0 Ao QA Avançado#8]',
            duracao: '7:34',
            link: 'https://www.youtube.com/watch?v=pqI24JxdlsU&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=45&pp=iAQB',
            descricao: 'Aprenda fundamentos de testes mobile e automação com Appium.',
          },
          {
            titulo: 'Usando Metodos Customizados No Appium  [Curso Do 0 Ao QA Avançado#9]',
            duracao: '14:00',
            link: 'https://www.youtube.com/watch?v=WZxRczFYgZE&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=46&pp=iAQB',
            descricao: 'Aprenda fundamentos de testes mobile e automação com Appium.',
          },
          {
            titulo: 'Assertions Para O Appium [Curso Do 0 Ao QA Avançado#10]',
            duracao: '11:55',
            link: 'https://www.youtube.com/watch?v=rkozaGDYwVI&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=47&pp=iAQB',
            descricao: 'Crie validações para confirmar se o sistema respondeu como esperado.',
          },
          {
            titulo: 'Vamos Automatizar Mais Cenarios Com O Appium [Curso Do 0 Ao QA Avançado#11]',
            duracao: '16:23',
            link: 'https://www.youtube.com/watch?v=gGK8EzUyqqM&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=48&pp=iAQB',
            descricao: 'Aprenda fundamentos de testes mobile e automação com Appium.',
          },
          {
            titulo: 'Automação De Cenários Alternativos Com O Appium  [Curso Do 0 Ao QA Avançado#12]',
            duracao: '15:33',
            link: 'https://www.youtube.com/watch?v=KlPiwbqsnmc&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=49&pp=iAQB',
            descricao: 'Entenda quando automatizar testes e como iniciar uma estratégia de automação.',
          },
          {
            titulo: 'Esquema De Cenario No Appium [Curso Do 0 Ao QA Avançado#13]',
            duracao: '15:11',
            link: 'https://www.youtube.com/watch?v=OCBt9wgdop4&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=50&pp=iAQB',
            descricao: 'Aprenda fundamentos de testes mobile e automação com Appium.',
          },
          {
            titulo: 'Automação De Testes Mobile Com Appium Conclusão [Curso Do 0 Ao QA Avançado#14]',
            duracao: '11:31',
            link: 'https://www.youtube.com/watch?v=O5MTY5mIkfE&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=51&pp=iAQB',
            descricao: 'Aprenda fundamentos de testes mobile e automação com Appium.',
          }
        ],
      },
      {
        titulo: 'Módulo 4: CI/CD, Docker, Jenkins e conclusão',
        descricao: 'Integre testes em pipelines com Jenkins, Docker, relatórios e testes regressivos.',
        aulas: [
          {
            titulo: 'Integração Continua [Curso Do 0 Ao QA Avançado#15]',
            duracao: '9:00',
            link: 'https://www.youtube.com/watch?v=yDenHHOfzjc&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=52&pp=iAQB',
            descricao: 'Integre testes em pipelines, Docker, Jenkins e relatórios de execução.',
          },
          {
            titulo: 'Jenkins No Modo Freestyle [Curso Do 0 Ao QA Avançado#16]',
            duracao: '9:09',
            link: 'https://www.youtube.com/watch?v=_v3Ug2_4sto&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=53&pp=iAQB',
            descricao: 'Integre testes em pipelines, Docker, Jenkins e relatórios de execução.',
          },
          {
            titulo: 'Introdução Ao Docker [Curso Do 0 Ao QA Avançado#17]',
            duracao: '11:21',
            link: 'https://www.youtube.com/watch?v=OTHOW6KXyD4&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=54&pp=iAQB',
            descricao: 'Integre testes em pipelines, Docker, Jenkins e relatórios de execução.',
          },
          {
            titulo: 'Docker Para QA\'s Na Pratica [Curso Do 0 Ao QA Avançado#18]',
            duracao: '8:09',
            link: 'https://www.youtube.com/watch?v=Zz_m-WrZCmk&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=55&pp=iAQB',
            descricao: 'Integre testes em pipelines, Docker, Jenkins e relatórios de execução.',
          },
          {
            titulo: 'Pipeline Completa Para Testes Regressivos [Curso Do 0 Ao QA Avançado#19]',
            duracao: '15:53',
            link: 'https://www.youtube.com/watch?v=kikYdYCWKyQ&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=56&pp=iAQB',
            descricao: 'Integre testes em pipelines, Docker, Jenkins e relatórios de execução.',
          },
          {
            titulo: 'Cucumber Reports No Jenkins [Curso Do 0 Ao QA Avançado#20]',
            duracao: '10:18',
            link: 'https://www.youtube.com/watch?v=xQDnmma74CI&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=57&pp=iAQB',
            descricao: 'Integre testes em pipelines, Docker, Jenkins e relatórios de execução.',
          },
          {
            titulo: 'Conclusão Curso Do 0 Ao QA',
            duracao: '7:18',
            link: 'https://www.youtube.com/watch?v=4yBdgYfOxvs&list=PL0nYAInGtru1q0laP62tgjTWohsij782i&index=58&pp=iAQB',
            descricao: 'Encerramento do curso e orientação para próximos passos em QA.',
          }
        ],
      }
    ],
  },
]
