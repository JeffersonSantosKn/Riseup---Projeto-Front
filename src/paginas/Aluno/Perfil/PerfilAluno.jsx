import { AlertTriangle, ArrowLeft, Award, BriefcaseBusiness, Camera, CheckCircle2, Clipboard, Download, FileText, GitBranch, Globe2, GraduationCap, Link2, LogOut, Mail, MapPin, Pencil, Phone, Save, Sparkles, X } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MentorPaginaAlunoToast } from '../../../componentes/interface/MentorPaginaAlunoToast'
import { Avatar } from '../../../componentes/perfis/Avatar'
import { ProjetoPraticoCard } from '../../../componentes/projetos/ProjetoPraticoCard'
import { RadarProntidaoCard } from '../../../componentes/candidaturas/RadarProntidaoCard'
import { useApp } from '../../../contextos/AppContext'
import { cursos } from '../../../dados/cursos'
import { mensagensEditarPerfil, mensagensPerfil } from '../../../dados/mensagensMentorAluno'
import { trilhas } from '../../../dados/trilhas'
import { baixarCertificadoPdf } from '../../../servicos/certificados'

import { cursoComoConteudo } from '../../../servicos/conteudosCurso'
import { criarOrientacaoCampoMentor, criarOrientacaoPerfilPublico } from '../../../servicos/mentorAlunoContextual'
import { gerarDicasCurriculo, gerarDicasPerfil, montarContextoMentorAluno } from '../../../servicos/mentorIA'
import { analisarCurriculoAntesExportar, calcularForcaPerfilProfissional, obterSugestoesPerfil } from '../../../servicos/perfilProfissional'
import { calcularProgresso, recomendarCursos, recomendarTrilhas } from '../../../servicos/recomendacoes'
import { calcularProntidaoAluno } from '../../../servicos/prontidaoCandidatura'
import { criarOrientacaoMentorCandidatura, gerarRetornoCandidaturaAluno } from '../../../servicos/retornoCandidaturaAluno'
import { gerarProjetosSugeridosAluno, projetoEhEvidencia, projetoPodeAparecerNoCurriculo, projetoSugeridoParaProjetoAluno } from '../../../servicos/projetosPraticos'

function rotuloTecnologia(tecnologia) {
  const chave = String(tecnologia || '').trim().toLowerCase()
  const nomesNormalizados = {
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    php: 'PHP',
    go: 'Go',
    git: 'Git/GitHub',
    'git-github': 'Git/GitHub',
    'estrutura-de-dados': 'Estruturas de Dados',
    'api-rest': 'APIs REST',
    'java-spring': 'Spring Boot',
    logica: 'Logica de Programacao',
  }
  if (nomesNormalizados[chave]) return nomesNormalizados[chave]

  const rotulos = {
    javascript: 'JavaScript',
    python: 'Python',
    java: 'Java',
    go: 'Go',
    react: 'React',
    node: 'Node.js',
    sql: 'SQL',
    'git-github': 'Git/GitHub',
    'docker-cloud': 'Docker/Cloud',
    informatica: 'Informática',
    logica: 'Lógica',
    qa: 'QA',
    carreira: 'Carreira',
    ingles: 'Inglês',
  }
  return rotulos[tecnologia] || String(tecnologia || '').replaceAll('-', ' ')
}

function professorDaTrilha(trilha) {
  const professores = [
    ...trilha.modulos.flatMap((m) => m.aulas || []).map((a) => a.professor).filter(Boolean),
    ...cursos.filter((c) => c.trilhaIds?.includes(trilha.id)).map((c) => c.professor).filter(Boolean),
  ]
  return [...new Set(professores)].join(', ') || 'Professores externos'
}

function calcularTecnologiasEstudadas(progressoCursos) {
  const mapa = new Map()

  function somar(tecnologia, pontos, total) {
    if (!tecnologia) return
    const atual = mapa.get(tecnologia) || { tecnologia, assistidas: 0, total: 0 }
    mapa.set(tecnologia, { ...atual, assistidas: atual.assistidas + pontos, total: atual.total + total })
  }

  trilhas.forEach((trilha) => {
    const aulas = trilha.modulos.flatMap((m) => m.aulas)
    const assistidas = aulas.filter((a) => progressoCursos[a.id]).length
    trilha.tecnologias?.forEach((t) => somar(t, assistidas, aulas.length))
  })

  cursos.forEach((curso) => {
    const conteudo = cursoComoConteudo(curso)
    const aulas = conteudo.modulos.flatMap((m) => m.aulas)
    const assistidas = aulas.filter((a) => progressoCursos[a.id]).length
    somar(curso.tecnologia, assistidas, aulas.length)
  })

  return [...mapa.values()]
    .map((item) => ({
      ...item,
      rotulo: rotuloTecnologia(item.tecnologia),
      percentual: item.total ? Math.round((item.assistidas / item.total) * 100) : 0,
    }))
    .filter((item) => item.percentual > 0)
    .sort((a, b) => b.percentual - a.percentual)
    .slice(0, 6)
}

const tiposCurriculo = [
  { valor: 'primeira-vaga', rotulo: 'Primeira vaga em TI' },
  { valor: 'frontend', rotulo: 'Front-end' },
  { valor: 'backend', rotulo: 'Back-end' },
  { valor: 'dados', rotulo: 'Dados' },
  { valor: 'qa', rotulo: 'QA' },
  { valor: 'devops', rotulo: 'DevOps' },
  { valor: 'suporte', rotulo: 'Suporte' },
  { valor: 'estagio', rotulo: 'Estagio' },
  { valor: 'freelancer', rotulo: 'Freelancer' },
]

const modelosCurriculo = [
  { valor: 'primeira-vaga', rotulo: 'Primeira vaga' },
  { valor: 'ats', rotulo: 'Simples / ATS' },
  { valor: 'moderno', rotulo: 'Visual moderno' },
]

function primeiroNome(nome = '') {
  return nome.trim().split(' ')[0] || 'humano'
}

function textoParaLinhas(texto = '') {
  return texto
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function linhasParaTexto(lista = []) {
  return lista.filter(Boolean).join('\n')
}

function FeedbackCampo({ analise, sugestoes = [], onUsarSugestao }) {
  if (!analise) return null
  const problemas = analise.problemas || (analise.valido === false && analise.mensagem ? [analise.mensagem] : [])
  const mensagemBoa = analise.valido === true ? analise.mensagem : ''
  if (!problemas.length && !mensagemBoa) return null

  return (
    <div className={`perfil-validacao ${problemas.length ? 'perfil-validacao-alerta' : 'perfil-validacao-bom'}`}>
      <div className="perfil-validacao-mensagem">
        {problemas.length ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
        <span>{problemas[0] || mensagemBoa}</span>
      </div>
      {!!sugestoes.length && onUsarSugestao && (
        <div className="perfil-sugestoes-acoes">
          {sugestoes.slice(0, 3).map((sugestao) => (
            <button key={sugestao} type="button" onClick={() => onUsarSugestao(sugestao)}>
              <Sparkles size={13} /> Usar: {sugestao}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function normalizarLinhaTecnologia(linha = '') {
  const [nome, ...resto] = linha.split(/\s[-—]\s/)
  const nivel = resto.join(' - ').trim()
  const rotulo = rotuloTecnologia(nome.trim())
  return nivel ? `${rotulo} - ${nivel}` : rotulo
}

function linhasLimpasCurriculo(texto = '') {
  const bloqueados = [
    'https://linkedin.com/in/seu-nome',
    'https://github.com/seu-usuario',
    'https://seuportfolio.com',
    'cargo - empresa',
    'curso - instituição',
    'curso - instituicao',
  ]

  return textoParaLinhas(texto).filter((linha) => {
    const normalizada = linha.toLowerCase()
    return !bloqueados.some((item) => normalizada.includes(item))
  })
}

function formatarTamanhoArquivo(tamanho = 0) {
  if (!Number.isFinite(tamanho) || tamanho <= 0) return ''
  if (tamanho >= 1024 * 1024) return `${(tamanho / (1024 * 1024)).toFixed(1)} MB`
  return `${Math.max(1, Math.round(tamanho / 1024))} KB`
}

function anexosDeArquivos(listaArquivos) {
  return Array.from(listaArquivos || []).map((arquivo, index) => ({
    id: `${Date.now()}-${index}-${arquivo.name}`,
    nome: arquivo.name,
    tipo: arquivo.type || 'arquivo',
    tamanho: arquivo.size || 0,
  }))
}

function nivelTecnologia(percentual = 0) {
  if (percentual >= 80) return 'intermediario'
  if (percentual >= 35) return 'basico'
  return 'estudando'
}

function montarTecnologiasCurriculo(tecnologiasEstudadas, tecnologiasPerfil = []) {
  const automaticas = tecnologiasEstudadas.map((item) => `${item.rotulo} - ${nivelTecnologia(item.percentual)}`)
  const perfil = tecnologiasPerfil.map((item) => `${rotuloTecnologia(item)} - estudando`)
  return [...new Set([...automaticas, ...perfil])].slice(0, 10)
}

function separarTecnologiasPorObjetivo(tecnologias = [], tipo = 'primeira-vaga') {
  const focoPorTipo = {
    frontend: ['html', 'css', 'javascript', 'typescript', 'react', 'angular', 'git'],
    backend: ['java', 'spring', 'node', 'python', 'sql', 'api', 'git'],
    dados: ['python', 'sql', 'power', 'dados', 'excel'],
    qa: ['qa', 'teste', 'testes', 'automacao', 'git'],
    devops: ['docker', 'cloud', 'linux', 'azure', 'aws', 'git'],
    suporte: ['informatica', 'redes', 'linux', 'windows', 'atendimento'],
    estagio: ['html', 'css', 'javascript', 'git', 'logica'],
    'primeira-vaga': ['html', 'css', 'javascript', 'git', 'logica'],
  }
  const foco = focoPorTipo[tipo] || focoPorTipo['primeira-vaga']
  const principais = []
  const estudo = []

  tecnologias.forEach((linha) => {
    const texto = linha.toLowerCase()
    const combinaComObjetivo = foco.some((item) => texto.includes(item))
    if (!combinaComObjetivo && estudo.length >= 4) return
    const destino = combinaComObjetivo ? principais : estudo
    destino.push(linha)
  })

  return { principais, estudo }
}

function linkContato(id, valor) {
  if (!valor) return ''
  if (id === 'email') return `mailto:${valor}`
  if (id === 'telefone') return `tel:${String(valor).replace(/\D/g, '')}`
  if (['linkedin', 'github', 'portfolio'].includes(id)) return valor
  return ''
}

function contatoEhLinkSocial(id) {
  return ['linkedin', 'github', 'portfolio'].includes(id)
}

function montarCurriculoTexto(curriculo, dados) {
  const anexosCertificados = Array.isArray(curriculo.certificadosExternosArquivos) ? curriculo.certificadosExternosArquivos : []
  const linhas = [
    dados.nome,
    curriculo.titulo,
    [curriculo.email, curriculo.telefone, dados.localizacao].filter(Boolean).join(' | '),
    [curriculo.linkedin, curriculo.github, curriculo.portfolio].filter(Boolean).join(' | '),
    '',
    'OBJETIVO',
    curriculo.objetivo,
    '',
    'RESUMO',
    curriculo.resumo,
    '',
    'TECNOLOGIAS',
    ...linhasLimpasCurriculo(curriculo.tecnologias).map((item) => `- ${normalizarLinhaTecnologia(item)}`),
  ]

  if (curriculo.mostrarProjetos !== false && linhasLimpasCurriculo(curriculo.projetos).length) {
    linhas.push('', 'PROJETOS', ...linhasLimpasCurriculo(curriculo.projetos).map((item) => `- ${item}`))
  }

  if (dados.cursos.length || dados.trilhas.length) {
    linhas.push('', 'FORMAÇÃO TRILUM')
    dados.trilhas.forEach((item) => linhas.push(`- ${item.titulo} (${item.progresso}% concluida)`))
    dados.cursos.forEach((item) => linhas.push(`- ${item.titulo} (${item.progresso}% concluido)`))
  }

  if ((curriculo.mostrarCertificadosTrilum !== false && dados.certificados.length) || (curriculo.mostrarCertificadosExternos !== false && (linhasLimpasCurriculo(curriculo.certificadosExternos).length || anexosCertificados.length))) {
    linhas.push('', 'CERTIFICADOS')
    if (curriculo.mostrarCertificadosTrilum !== false) dados.certificados.forEach((item) => linhas.push(`- ${item.titulo} - ${item.tipo} Trilum`))
    if (curriculo.mostrarCertificadosExternos !== false) linhasLimpasCurriculo(curriculo.certificadosExternos).forEach((item) => linhas.push(`- ${item}`))
    if (curriculo.mostrarCertificadosExternos !== false) anexosCertificados.forEach((item) => linhas.push(`- Anexo: ${item.nome}`))
  }

  if (curriculo.mostrarExperiencias !== false && linhasLimpasCurriculo(curriculo.experiencias).length) {
    linhas.push('', 'EXPERIÊNCIAS', ...linhasLimpasCurriculo(curriculo.experiencias).map((item) => `- ${item}`))
  }

  if (linhasLimpasCurriculo(curriculo.formacoes).length) {
    linhas.push('', 'FORMAÇÃO EXTERNA', ...linhasLimpasCurriculo(curriculo.formacoes).map((item) => `- ${item}`))
  }

  if (linhasLimpasCurriculo(curriculo.idiomas).length) {
    linhas.push('', 'IDIOMAS', ...linhasLimpasCurriculo(curriculo.idiomas).map((item) => `- ${item}`))
  }

  if (linhasLimpasCurriculo(curriculo.competencias).length) {
    linhas.push('', 'COMPETÊNCIAS', ...linhasLimpasCurriculo(curriculo.competencias).map((item) => `- ${item}`))
  }

  if (dados.candidaturas.length) {
    linhas.push('', 'CANDIDATURAS NA TRILUM', ...dados.candidaturas.map((item) => `- ${item}`))
  }

  return linhas.filter((item, index, lista) => item !== '' || lista[index - 1] !== '').join('\n')
}

const mapaMentorPerfil = {
  publico: 'perfil-intro',
  aprendizado: 'perfil-aprendizado',
  tecnologias: 'perfil-tecnologias',
  certificados: 'perfil-certificados',
  radar: 'perfil-radar-prontidao',
  projetos: 'perfil-projetos-praticos',
  candidaturas: 'perfil-candidaturas',
}

const mapaMentorEditarPerfil = {
  publico: 'editar-intro',
  nome: 'editar-nome',
  titulo: 'editar-titulo',
  bio: 'editar-bio',
  tecnologias: 'editar-tecnologias',
  salvar: 'editar-salvar',
}

export function PerfilAluno() {
  const navigate = useNavigate()
  const { usuarioAtual, respostasWizard, progressoCursos, candidaturas, vagasEmpresa, empresas, atualizarAluno, adicionarProjetoPratico, atualizarProjetoPratico, logout } = useApp()

  const nome = usuarioAtual?.nome || 'Aluno Trilum Conecta'
  const partesNome = nome.split(' ')
  const perfilProfissional = useMemo(() => usuarioAtual?.perfilProfissional || {}, [usuarioAtual?.perfilProfissional])

  const formInicial = {
    primeiroNome: partesNome[0] || nome,
    sobrenome: partesNome.slice(1).join(' '),
    titulo: usuarioAtual?.titulo || respostasWizard.areaDesejada || 'Estudante de tecnologia',
    bio: usuarioAtual?.bio || 'Adicione uma biografia para completar seu perfil público.',
    tecnologias: (usuarioAtual?.tecnologias || []).join(', '),
    foto: usuarioAtual?.foto || nome.slice(0, 2).toUpperCase(),
    fotoUrl: usuarioAtual?.fotoUrl || '',
    capaUrl: usuarioAtual?.capaUrl || '',
    telefone: perfilProfissional.telefone || '',
    linkedin: perfilProfissional.linkedin || '',
    github: perfilProfissional.github || '',
    portfolio: perfilProfissional.portfolio || '',
    tecnologiasComNivel: perfilProfissional.tecnologiasComNivel || '',
    idiomas: perfilProfissional.idiomas || '',
    projetos: perfilProfissional.projetos || '',
    formacoes: perfilProfissional.formacoes || '',
    experiencias: perfilProfissional.experiencias || '',
    certificadosExternos: perfilProfissional.certificadosExternos || '',
    certificadosExternosArquivos: Array.isArray(perfilProfissional.certificadosExternosArquivos) ? perfilProfissional.certificadosExternosArquivos : [],
  }

  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState(formInicial)
  const [isDragging, setIsDragging] = useState(false)
  const [campoFocadoMentor, setCampoFocadoMentor] = useState('')
  const [alvoMelhoriaRadar, setAlvoMelhoriaRadar] = useState('')

  const refCursosScroll = useRef(null)
  const refCertificadosScroll = useRef(null)
  const dragState = useRef({ isDragging: false, startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 })

  const alterado = JSON.stringify(form) !== JSON.stringify(formInicial)
  const nomeCompleto = `${form.primeiroNome} ${form.sobrenome}`.trim()

  const trilhasComProgresso = trilhas
    .map((t) => ({ ...t, progresso: calcularProgresso(t, progressoCursos) }))
    .filter((t) => t.progresso > 0)

  const cursosComProgresso = cursos
    .map((c) => {
      const conteudo = cursoComoConteudo(c)
      return { ...c, progresso: calcularProgresso(conteudo, progressoCursos) }
    })
    .filter((c) => c.progresso > 0)
  const cursosIniciados = cursosComProgresso
    .filter((curso) => curso.progresso > 0)
    .sort((a, b) => b.progresso - a.progresso)
  const trilhasRelevantesCurriculo = trilhasComProgresso.filter((trilha) => trilha.progresso >= 40)

  const certificados = [
    ...trilhasComProgresso
      .filter((t) => t.progresso >= 80)
      .map((t) => ({ id: t.id, titulo: t.titulo, tipo: 'Trilha', duracao: t.duracao, professor: professorDaTrilha(t), progresso: t.progresso })),
    ...cursosComProgresso
      .filter((c) => c.progresso >= 100)
      .map((c) => ({ id: c.id, titulo: c.titulo, tipo: 'Curso', duracao: c.duracao, professor: c.professor, progresso: c.progresso })),
  ]

  const tecnologiasEstudadas = calcularTecnologiasEstudadas(progressoCursos)
  const candidaturasDoAluno = candidaturas.filter((candidatura) => candidatura.alunoId === usuarioAtual?.id)
  const candidaturasComRetorno = candidaturasDoAluno.map((candidatura) => {
    const vaga = vagasEmpresa.find((item) => item.id === candidatura.vagaId) || {}
    const empresa = empresas.find((item) => item.id === vaga.empresaId) || {}
    return {
      candidatura,
      vaga,
      retorno: gerarRetornoCandidaturaAluno({ candidatura, vaga, empresa, aluno: usuarioAtual }),
    }
  })
  const meusProjetosPraticos = usuarioAtual?.projetosPraticos || []
  const projetosComEvidencia = meusProjetosPraticos.filter(projetoEhEvidencia)
  const projetosParaCurriculo = meusProjetosPraticos.filter(projetoPodeAparecerNoCurriculo)
  const projetosEstruturadosTexto = projetosParaCurriculo
    .map((projeto) => `${projeto.titulo} - ${projeto.tecnologias.slice(0, 5).join(', ')} - ${projeto.status === 'concluido' ? 'concluído' : 'em andamento'}${projeto.github ? ` - ${projeto.github}` : projeto.deploy ? ` - ${projeto.deploy}` : ''}`)
    .join('\n')
  const projetosSugeridos = gerarProjetosSugeridosAluno({
    aluno: respostasWizard,
    cursos: recomendarCursos(respostasWizard).slice(0, 1),
    trilhas: recomendarTrilhas(respostasWizard).slice(0, 1),
  })
  const dadosCurriculo = {
    nome: nomeCompleto,
    localizacao: usuarioAtual?.localizacao || respostasWizard.localizacao || '',
    cursos: cursosComProgresso.filter((curso) => curso.progresso >= 100),
    trilhas: trilhasRelevantesCurriculo,
    certificados,
    candidaturas: candidaturasDoAluno.map((candidatura) => {
      const vaga = vagasEmpresa.find((item) => item.id === candidatura.vagaId)
      const retorno = gerarRetornoCandidaturaAluno({ candidatura, vaga })
      return `${vaga?.titulo || 'Vaga removida'} - ${retorno.status.rotulo}`
    }),
  }

  const curriculoInicial = useMemo(() => {
    const salvo = usuarioAtual?.curriculo || {}
    const tecnologiasAuto = perfilProfissional.tecnologiasComNivel || linhasParaTexto(montarTecnologiasCurriculo(tecnologiasEstudadas, usuarioAtual?.tecnologias || []))
    const tipo = salvo.tipo || respostasWizard.areaDesejada || 'primeira-vaga'
    let anexosCertificadosSalvos = []
    if (Array.isArray(perfilProfissional.certificadosExternosArquivos)) {
      anexosCertificadosSalvos = perfilProfissional.certificadosExternosArquivos
    } else if (Array.isArray(salvo.certificadosExternosArquivos)) {
      anexosCertificadosSalvos = salvo.certificadosExternosArquivos
    }

    return {
      modelo: salvo.modelo || 'primeira-vaga',
      tipo,
      fotoUrl: salvo.fotoUrl || form.fotoUrl,
      titulo: salvo.titulo || form.titulo,
      objetivo: salvo.objetivo || `Conquistar uma oportunidade em ${tiposCurriculo.find((item) => item.valor === tipo)?.rotulo || 'tecnologia'}, aplicando meus estudos e evoluindo com projetos reais.`,
      resumo: salvo.resumo || form.bio,
      mostrarFoto: salvo.mostrarFoto ?? true,
      mostrarExperiencias: salvo.mostrarExperiencias ?? true,
      mostrarProjetos: salvo.mostrarProjetos ?? true,
      mostrarCertificadosExternos: salvo.mostrarCertificadosExternos ?? true,
      mostrarCertificadosTrilum: salvo.mostrarCertificadosTrilum ?? true,
      telefone: perfilProfissional.telefone || '',
      email: salvo.email || usuarioAtual?.email || '',
      linkedin: perfilProfissional.linkedin || '',
      github: perfilProfissional.github || '',
      portfolio: perfilProfissional.portfolio || '',
      idiomas: perfilProfissional.idiomas || 'Inglês - básico',
      tecnologias: salvo.tecnologias || tecnologiasAuto,
      experiencias: perfilProfissional.experiencias || '',
      formacoes: perfilProfissional.formacoes || '',
      certificadosExternos: perfilProfissional.certificadosExternos || '',
      certificadosExternosArquivos: anexosCertificadosSalvos,
      projetos: [perfilProfissional.projetos, projetosEstruturadosTexto].filter(Boolean).join('\n'),
      competencias: perfilProfissional.competencias || salvo.competencias || 'Comunicação\nOrganização\nAprendizado contínuo',
    }
  }, [form.bio, form.fotoUrl, form.titulo, perfilProfissional, projetosEstruturadosTexto, respostasWizard.areaDesejada, tecnologiasEstudadas, usuarioAtual?.curriculo, usuarioAtual?.email, usuarioAtual?.tecnologias])

  const [curriculoAberto, setCurriculoAberto] = useState(false)
  const [curriculoForm, setCurriculoForm] = useState(curriculoInicial)
  const [curriculoCopiado, setCurriculoCopiado] = useState(false)
  const [revisaoExportacao, setRevisaoExportacao] = useState(null)
  const tecnologiasPerfilCurriculo = form.tecnologiasComNivel || linhasParaTexto(montarTecnologiasCurriculo(tecnologiasEstudadas, usuarioAtual?.tecnologias || []))
  const curriculoComPerfil = {
    ...curriculoForm,
    email: usuarioAtual?.email || curriculoForm.email || '',
    telefone: form.telefone,
    linkedin: form.linkedin,
    github: form.github,
    portfolio: form.portfolio,
    idiomas: form.idiomas,
    tecnologias: tecnologiasPerfilCurriculo,
    experiencias: form.experiencias,
    formacoes: form.formacoes,
    certificadosExternos: form.certificadosExternos,
    certificadosExternosArquivos: form.certificadosExternosArquivos || [],
    projetos: form.projetos,
    competencias: curriculoForm.competencias || 'Comunicação\nOrganização\nAprendizado contínuo',
  }
  const curriculoTexto = montarCurriculoTexto(curriculoComPerfil, dadosCurriculo)
  const tecnologiasCurriculo = linhasLimpasCurriculo(curriculoComPerfil.tecnologias).map((item) => normalizarLinhaTecnologia(item))
  const tecnologiasSeparadas = separarTecnologiasPorObjetivo(tecnologiasCurriculo, curriculoComPerfil.tipo)
  const projetosCurriculo = linhasLimpasCurriculo(curriculoComPerfil.projetos)
  const experienciasCurriculo = linhasLimpasCurriculo(curriculoComPerfil.experiencias)
  const formacoesCurriculo = linhasLimpasCurriculo(curriculoComPerfil.formacoes)
  const idiomasCurriculo = linhasLimpasCurriculo(curriculoComPerfil.idiomas)
  const competenciasCurriculo = linhasLimpasCurriculo(curriculoComPerfil.competencias)
  const certificadosExternosCurriculo = linhasLimpasCurriculo(curriculoComPerfil.certificadosExternos)
  const anexosCertificadosCurriculo = Array.isArray(curriculoComPerfil.certificadosExternosArquivos) ? curriculoComPerfil.certificadosExternosArquivos : []
  const sugestoesPerfil = obterSugestoesPerfil(respostasWizard)
  const forcaPerfil = calcularForcaPerfilProfissional({
    titulo: form.titulo,
    bio: form.bio,
    tecnologias: form.tecnologias,
    tecnologiasComNivel: form.tecnologiasComNivel,
    linkedin: form.linkedin,
    github: form.github,
    portfolio: form.portfolio,
    projetos: [form.projetos, projetosEstruturadosTexto].filter(Boolean).join('\n'),
    curriculo: curriculoComPerfil,
    respostasWizard,
  })
  const prontidaoCandidatura = calcularProntidaoAluno({
    aluno: {
      ...usuarioAtual,
      titulo: form.titulo,
      bio: form.bio,
      tecnologias: form.tecnologias.split(',').map((item) => item.trim()).filter(Boolean),
      perfilProfissional: {
        ...perfilProfissional,
        github: form.github,
        linkedin: form.linkedin,
        tecnologiasComNivel: form.tecnologiasComNivel,
        projetos: form.projetos,
      },
      curriculo: curriculoComPerfil,
      projetosPraticos: meusProjetosPraticos,
    },
  })
  const contatosCurriculo = [
    { id: 'telefone', rotulo: 'Telefone', valor: curriculoComPerfil.telefone, Icone: Phone },
    { id: 'email', rotulo: 'E-mail', valor: curriculoComPerfil.email, Icone: Mail },
    { id: 'local', rotulo: 'Local', valor: dadosCurriculo.localizacao, Icone: MapPin },
    { id: 'linkedin', rotulo: 'LinkedIn', valor: curriculoComPerfil.linkedin, Icone: Link2 },
    { id: 'github', rotulo: 'GitHub', valor: curriculoComPerfil.github, Icone: GitBranch },
    { id: 'portfolio', rotulo: 'Portfolio', valor: curriculoComPerfil.portfolio, Icone: Globe2 },
  ].filter((item) => item.valor)
  const dicasCurriculo = [
    !curriculoComPerfil.linkedin && 'preencha seu LinkedIn para recrutadores confirmarem seu perfil profissional',
    !curriculoComPerfil.github && 'adicione seu GitHub, principalmente se você busca vaga técnica',
    !projetosCurriculo.length && 'inclua pelo menos um projeto pessoal para mostrar pratica alem dos cursos',
    tecnologiasCurriculo.length > 10 && 'evite listar tecnologias demais sem prática; destaque as principais para seu objetivo',
    curriculoComPerfil.tipo === 'frontend' && !tecnologiasCurriculo.some((item) => item.toLowerCase().includes('html')) && 'para Front-end, destaque HTML, CSS, JavaScript e Git antes de frameworks',
    !dadosCurriculo.certificados.length && !certificadosExternosCurriculo.length && 'adicione certificados da Trilum ou externos para fortalecer sua formação',
    tecnologiasCurriculo.some((item) => !item.includes('-') && !item.includes('—')) && 'coloque nível nas tecnologias, por exemplo: JavaScript - básico',
  ].filter(Boolean)
  const contextoMentorCurriculo = montarContextoMentorAluno({
    usuarioAtual,
    respostasWizard,
    curriculo: {
      ...curriculoComPerfil,
      tecnologias: tecnologiasCurriculo,
      projetos: projetosCurriculo,
      certificados: [...dadosCurriculo.certificados, ...certificadosExternosCurriculo],
    },
    tecnologiasEstudadas,
  })
  const contextoMentorPerfil = montarContextoMentorAluno({
    usuarioAtual: {
      ...usuarioAtual,
      titulo: form.titulo,
      bio: form.bio,
      tecnologias: form.tecnologias.split(',').map((item) => item.trim()).filter(Boolean),
    },
    respostasWizard,
    curriculo: curriculoComPerfil,
    tecnologiasEstudadas,
  })

  function iniciarDrag(e, ref) {
    if (!ref.current) return
    dragState.current = { isDragging: true, startX: e.clientX, startY: e.clientY, scrollLeft: ref.current.scrollLeft, scrollTop: ref.current.scrollTop }
    setIsDragging(true)
  }

  function movimentarDrag(e, ref) {
    const estado = dragState.current
    if (!estado.isDragging || !ref.current) return
    const dx = e.clientX - estado.startX
    const dy = e.clientY - estado.startY
    if (Math.abs(dx) > Math.abs(dy)) { ref.current.scrollLeft = estado.scrollLeft - dx; e.preventDefault() }
    else { ref.current.scrollTop = estado.scrollTop - dy; e.preventDefault() }
  }

  function finalizarDrag() { dragState.current.isDragging = false; setIsDragging(false) }

  function atualizar(campo, valor) { setForm((f) => ({ ...f, [campo]: valor })) }

  function selecionarFoto(e) {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    const leitor = new FileReader()
    leitor.onload = () => atualizar('fotoUrl', leitor.result)
    leitor.readAsDataURL(arquivo)
  }

  function selecionarCapa(e) {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    const leitor = new FileReader()
    leitor.onload = () => atualizar('capaUrl', leitor.result)
    leitor.readAsDataURL(arquivo)
  }

  function selecionarFotoCurriculo(e) {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    const leitor = new FileReader()
    leitor.onload = () => atualizarCurriculo('fotoUrl', leitor.result)
    leitor.readAsDataURL(arquivo)
  }

  function selecionarCertificadosExternos(e) {
    const anexos = anexosDeArquivos(e.target.files)
    if (!anexos.length) return
    setForm((atual) => ({
      ...atual,
      certificadosExternosArquivos: [...(atual.certificadosExternosArquivos || []), ...anexos],
    }))
    e.target.value = ''
  }

  function removerCertificadoExternoArquivo(id) {
    setForm((atual) => ({
      ...atual,
      certificadosExternosArquivos: (atual.certificadosExternosArquivos || []).filter((anexo) => anexo.id !== id),
    }))
  }

  function voltarSemSalvar() {
    setForm(formInicial)
    setEditando(false)
  }

  function descartarAlteracoes() {
    setForm(formInicial)
  }

  function salvarPerfil() {
    if (!alterado) return
    atualizarAluno({
      nome: nomeCompleto,
      titulo: form.titulo,
      bio: form.bio,
      foto: form.foto,
      fotoUrl: form.fotoUrl,
      capaUrl: form.capaUrl,
      tecnologias: form.tecnologias.split(',').map((t) => t.trim()).filter(Boolean),
      perfilProfissional: {
        telefone: form.telefone,
        linkedin: form.linkedin,
        github: form.github,
        portfolio: form.portfolio,
        tecnologiasComNivel: form.tecnologiasComNivel,
        idiomas: form.idiomas,
        projetos: form.projetos,
        formacoes: form.formacoes,
        experiencias: form.experiencias,
        certificadosExternos: form.certificadosExternos,
        certificadosExternosArquivos: form.certificadosExternosArquivos || [],
      },
    })
    setEditando(false)
  }

  function abrirCurriculo() {
    setCurriculoForm((atual) => ({
      ...curriculoInicial,
      ...atual,
      telefone: form.telefone,
      linkedin: form.linkedin,
      github: form.github,
      portfolio: form.portfolio,
      idiomas: form.idiomas,
      tecnologias: form.tecnologiasComNivel || curriculoInicial.tecnologias,
      experiencias: form.experiencias,
      formacoes: form.formacoes,
      certificadosExternos: form.certificadosExternos,
      certificadosExternosArquivos: form.certificadosExternosArquivos || [],
      projetos: form.projetos,
    }))
    setCurriculoAberto(true)
    setCampoFocadoMentor('objetivoCurriculo')
    window.setTimeout(() => document.getElementById('meu-curriculo')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  function atualizarCurriculo(campo, valor) {
    setCurriculoForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function salvarCurriculo() {
    atualizarAluno({ curriculo: curriculoComPerfil })
  }

  async function copiarCurriculo() {
    await navigator.clipboard.writeText(curriculoTexto)
    setCurriculoCopiado(true)
    window.setTimeout(() => setCurriculoCopiado(false), 1800)
  }

  function imprimirCurriculo() {
    setRevisaoExportacao(null)
    document.body.classList.add('imprimindo-curriculo')
    window.addEventListener('afterprint', () => document.body.classList.remove('imprimindo-curriculo'), { once: true })
    window.print()
    window.setTimeout(() => document.body.classList.remove('imprimindo-curriculo'), 400)
  }

  function exportarCurriculoPdf() {
    const revisao = analisarCurriculoAntesExportar(curriculoComPerfil, perfilProfissional, respostasWizard)
    if (!revisao.pronto) {
      setRevisaoExportacao(revisao)
      return
    }
    imprimirCurriculo()
  }

  function sair() { logout(); navigate('/') }

  function rolarParaSecao(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function corrigirProximaAcaoRadar(acao) {
    const tipo = acao?.tipo || 'github'
    const alvosPerfil = new Set(['github', 'linkedin', 'titulo', 'resumo', 'tecnologias'])
    const alvo = tipo === 'projeto-evidencia' ? 'projeto' : tipo

    setAlvoMelhoriaRadar(alvo)
    setCampoFocadoMentor(alvo === 'resumo' ? 'bio' : alvo === 'projeto' ? 'projetos' : alvo)

    if (alvosPerfil.has(tipo)) {
      setEditando(true)
    } else if (tipo === 'curriculo') {
      setCurriculoAberto(true)
    } else {
      setEditando(false)
    }

    window.setTimeout(() => {
      const elemento = document.querySelector(`[data-melhoria-alvo="${alvo}"]`)
      elemento?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      elemento?.querySelector('input, textarea, select')?.focus({ preventScroll: true })
    }, 120)
    window.setTimeout(() => setAlvoMelhoriaRadar(''), 4200)
  }

  function adicionarProjetoSugerido(projeto) {
    adicionarProjetoPratico(projetoSugeridoParaProjetoAluno(projeto))
  }

  async function copiarSugestao(texto) {
    if (!texto) return
    await navigator.clipboard.writeText(texto)
  }

  const orientacaoCampoBase = useMemo(
    () => criarOrientacaoCampoMentor(campoFocadoMentor, respostasWizard),
    [campoFocadoMentor, respostasWizard],
  )
  const orientacaoCampo = orientacaoCampoBase
    ? {
        ...orientacaoCampoBase,
        acao: orientacaoCampoBase.acao
          ? {
              ...orientacaoCampoBase.acao,
              onClick: () => {
                if (orientacaoCampoBase.acao.tipo === 'aplicar-curriculo') {
                  atualizarCurriculo(orientacaoCampoBase.acao.campo, orientacaoCampoBase.acao.valor)
                } else {
                  atualizar(orientacaoCampoBase.acao.campo, orientacaoCampoBase.acao.valor)
                }
              },
            }
          : null,
        acoes: orientacaoCampoBase.exemplos?.[0]
          ? [{ label: 'Copiar sugestão', onClick: () => copiarSugestao(orientacaoCampoBase.exemplos[0]) }]
          : [],
      }
    : null
  const orientacaoPerfilPublico = criarOrientacaoPerfilPublico({
    usuarioAtual: {
      ...usuarioAtual,
      titulo: form.titulo,
      bio: form.bio,
      tecnologias: form.tecnologias.split(',').map((item) => item.trim()).filter(Boolean),
    },
    perfilProfissional: {
      ...perfilProfissional,
      linkedin: form.linkedin,
      github: form.github,
      portfolio: form.portfolio,
      projetos: form.projetos,
      tecnologiasComNivel: form.tecnologiasComNivel,
    },
    respostasWizard,
    curriculo: curriculoComPerfil,
  })
  const orientacaoPerfilAtiva = {
    ...orientacaoPerfilPublico,
    acao: {
      label: 'Melhorar perfil',
      onClick: () => {
        setEditando(true)
        setCampoFocadoMentor('titulo')
      },
    },
    gerar: (opcoes) => gerarDicasPerfil(contextoMentorPerfil, opcoes),
  }
  const candidaturaMaisRecente = candidaturasComRetorno[0]
  const orientacaoCandidatura = candidaturaMaisRecente
    ? criarOrientacaoMentorCandidatura(candidaturaMaisRecente.retorno, candidaturaMaisRecente.vaga)
    : null
  const mensagensPerfilComCandidaturas = mensagensPerfil.map((mensagem) => {
    if (mensagem.id === 'perfil-publico') return orientacaoPerfilAtiva
    if (mensagem.id === 'perfil-candidaturas' && orientacaoCandidatura) return orientacaoCandidatura
    return mensagem
  }).concat(
    {
      id: 'perfil-radar-prontidao',
      titulo: 'Radar de candidatura',
      msg: `Seu radar está em ${prontidaoCandidatura.score}% (${prontidaoCandidatura.nivel}). A melhor ação agora é ${prontidaoCandidatura.proximaAcao.titulo.toLowerCase()}.`,
      detalhe: `${prontidaoCandidatura.resumo} ${prontidaoCandidatura.proximaAcao.descricao}`,
    },
    {
      id: 'perfil-projetos-praticos',
      titulo: 'Transforme estudo em evidência',
      msg: meusProjetosPraticos.length
        ? 'Atualize seus projetos conforme desenvolver. Eles só aparecem como evidência forte quando possuem entrega real e um link.'
        : 'Seu perfil ainda tem pouca evidência prática. Adicione um projeto sugerido como planejado e desenvolva no seu ritmo.',
      detalhe: 'Projetos planejados não contam como conclusão. Para fortalecer perfil, currículo e candidaturas, registre descrição, tecnologias e GitHub ou deploy quando houver uma entrega real.',
    },
  )
  const orientacaoContextual = editando || curriculoAberto ? orientacaoCampo : null

  return (
    <div className="perfil-gh-wrapper">
      
      <div className="perfil-capa-secao">
        <div
          className="perfil-capa-imagem"
          style={form.capaUrl ? { backgroundImage: `url(${form.capaUrl})` } : {}}
        >
          {editando && (
            <label className="perfil-capa-botao">
              <Camera size={15} />
              <span>Alterar capa</span>
              <input accept="image/*" type="file" onChange={selecionarCapa} />
            </label>
          )}
        </div>

        <div className="perfil-capa-avatar-ancora">
          <div className="perfil-foto-wrap">
            <Avatar
              texto={form.foto || nome.slice(0, 2).toUpperCase()}
              imagem={form.fotoUrl}
              grande
            />
            {editando && (
              <label className="perfil-foto-botao" title="Alterar foto de perfil">
                <Camera size={14} />
                <input accept="image/*" type="file" onChange={selecionarFoto} />
              </label>
            )}
          </div>
        </div>
      </div>
      {/* espaço para o avatar que "sai" da capa */}
      <div className="perfil-capa-espacador" />

      {/* ══ LAYOUT principal ══ */}
      <section className="perfil-udemy-page">

        {/* ── Sidebar ── */}
        <aside className="perfil-udemy-sidebar">
          <strong className="perfil-sidebar-nome">{nomeCompleto}</strong>
          <p className="perfil-sidebar-titulo">{form.titulo}</p>

          <h3>Descrição</h3>
          {form.bio && <p className="perfil-sidebar-bio">{form.bio}</p>}

          <nav>
            <button className="perfil-sidebar-link ativo" type="button" onClick={() => rolarParaSecao('perfil-publico')}>Perfil</button>
            <button className="perfil-sidebar-link" type="button" onClick={() => rolarParaSecao('aprendizado')}>Aprendizado</button>
            <button className="perfil-sidebar-link" type="button" onClick={() => rolarParaSecao('certificados')}>Certificados</button>
            <button className="perfil-sidebar-link" type="button" onClick={() => rolarParaSecao('radar-candidatura')}>Radar de candidatura</button>
            <button className="perfil-sidebar-link" type="button" onClick={() => rolarParaSecao('projetos-praticos')}>Projetos práticos</button>
            <button className="perfil-sidebar-link" type="button" onClick={() => rolarParaSecao('candidaturas')}>Candidaturas</button>
            <Link to="/aluno/questionario">Editar Wizard</Link>
            <button className="perfil-sidebar-link" type="button" onClick={abrirCurriculo}>
              Meu Currículo
            </button>
            <button className="perfil-sidebar-sair" type="button" onClick={sair}>
              <LogOut size={14} /> Sair
            </button>
          </nav>
        </aside>

        <main className="perfil-udemy-conteudo">

          <header className="perfil-udemy-header" id="perfil-publico" data-mentor-pagina-section="publico">
            <div>
              <h1>Perfil público</h1>
              <p>Gerencie suas informações e acompanhe seu progresso</p>
            </div>
            <div className="perfil-edicao-acoes">
              {editando ? (
                <>
                  {/* Voltar — sempre visível em modo edição */}
                  <button className="botao botao-ghost" type="button" onClick={voltarSemSalvar}>
                    <ArrowLeft size={15} /> Voltar
                  </button>

                  {/* Descartar — só aparece se houver alterações pendentes */}
                  {alterado && (
                    <button className="botao botao-secondary" type="button" onClick={descartarAlteracoes}>
                      <X size={15} /> Descartar
                    </button>
                  )}

                  {/* Salvar — desabilitado enquanto não houver mudança */}
                  <button
                    className="botao botao-primary"
                    type="button"
                    disabled={!alterado}
                    title={!alterado ? 'Nenhuma alteração para salvar' : 'Salvar alterações'}
                    onClick={salvarPerfil}
                  >
                    <Save size={15} /> Salvar
                  </button>
                </>
              ) : (
                <button className="botao botao-primary" type="button" onClick={() => setEditando(true)}>
                  <Pencil size={15} /> Editar perfil
                </button>
              )}
            </div>
          </header>

          {/* Formulário de edição */}
          {editando && (
            <section className="perfil-udemy-form" id="dados-basicos">
              <h2>Dados básicos</h2>

              <div className="perfil-campo-grid perfil-campo-2col">
                <label className="perfil-field" data-mentor-pagina-section="nome">
                  <span>Primeiro nome</span>
                  <input
                    aria-label="Primeiro nome"
                    placeholder="Seu primeiro nome"
                    value={form.primeiroNome}
                    onChange={(e) => atualizar('primeiroNome', e.target.value)}
                  />
                </label>
                <label className="perfil-field">
                  <span>Sobrenome</span>
                  <input
                    aria-label="Sobrenome"
                    placeholder="Seu sobrenome"
                    value={form.sobrenome}
                    onChange={(e) => atualizar('sobrenome', e.target.value)}
                  />
                </label>
              </div>

              <label className={`perfil-field ${alvoMelhoriaRadar === 'titulo' ? 'perfil-field-destaque' : ''}`} data-mentor-pagina-section="titulo" data-melhoria-alvo="titulo">
                <span>Título / Profissão</span>
                <div className="perfil-input-contador">
                  <input
                    aria-label="Profissão ou título"
                    maxLength={60}
                    placeholder="Ex: Desenvolvedor Front-end Júnior"
                    value={form.titulo}
                    onChange={(e) => atualizar('titulo', e.target.value)}
                    onFocus={() => setCampoFocadoMentor('titulo')}
                    onClick={() => setCampoFocadoMentor('titulo')}
                  />
                  <span className={form.titulo.length >= 55 ? 'perfil-contador-alerta' : ''}>
                    {form.titulo.length}/60
                  </span>
                </div>
                <small>Use uma frase curta sobre como você quer ser visto. Ex.: {sugestoesPerfil.titulo}.</small>
                <FeedbackCampo
                  analise={forcaPerfil.titulo}
                  sugestoes={sugestoesPerfil.titulos}
                  onUsarSugestao={(valor) => atualizar('titulo', valor)}
                />
              </label>

              <label className={`perfil-field ${alvoMelhoriaRadar === 'resumo' ? 'perfil-field-destaque' : ''}`} data-mentor-pagina-section="bio" data-melhoria-alvo="resumo">
                <span>Biografia</span>
                <textarea
                  aria-label="Biografia"
                  rows={4}
                  placeholder="Conte um pouco sobre você, sua trajetória e objetivos..."
                  value={form.bio}
                  onChange={(e) => atualizar('bio', e.target.value)}
                  onFocus={() => setCampoFocadoMentor('bio')}
                  onClick={() => setCampoFocadoMentor('bio')}
                />
                <small>Escreva de 2 a 4 frases sobre área, tecnologias, objetivo e projetos.</small>
                <FeedbackCampo
                  analise={{ valido: forcaPerfil.resumo.qualidade === 'bom', problemas: forcaPerfil.resumo.problemas }}
                  sugestoes={[sugestoesPerfil.resumo]}
                  onUsarSugestao={(valor) => atualizar('bio', valor)}
                />
              </label>

              <label className={`perfil-field ${alvoMelhoriaRadar === 'tecnologias' ? 'perfil-field-destaque' : ''}`} data-mentor-pagina-section="tecnologias" data-melhoria-alvo="tecnologias">
                <span className="perfil-tech-label-ajustado">Tecnologias principais do perfil</span>
                <span>Tecnologias <em>(separadas por vírgula)</em></span>
                <input
                  aria-label="Tecnologias"
                  placeholder="HTML, CSS, JavaScript, Git"
                  value={form.tecnologias}
                  onChange={(e) => atualizar('tecnologias', e.target.value)}
                  onFocus={() => setCampoFocadoMentor('tecnologias')}
                  onClick={() => setCampoFocadoMentor('tecnologias')}
                />
                <small>Lista curta do que voce quer destacar no perfil. Exemplo: HTML, CSS, JavaScript, Git.</small>
                <FeedbackCampo
                  analise={forcaPerfil.tecnologias}
                  sugestoes={[sugestoesPerfil.tecnologias]}
                  onUsarSugestao={(valor) => atualizar('tecnologias', valor)}
                />
              </label>

              <section className="perfil-form-section">
                <h3>Links profissionais</h3>
                <div className="perfil-campo-grid perfil-campo-2col">
                  <label className={`perfil-field ${alvoMelhoriaRadar === 'linkedin' ? 'perfil-field-destaque' : ''}`} data-melhoria-alvo="linkedin">
                    <span>LinkedIn</span>
                    <input value={form.linkedin} placeholder="https://linkedin.com/in/seu-nome" onChange={(e) => atualizar('linkedin', e.target.value)} onFocus={() => setCampoFocadoMentor('linkedin')} onClick={() => setCampoFocadoMentor('linkedin')} />
                    <FeedbackCampo analise={forcaPerfil.links.linkedin} />
                  </label>
                  <label className={`perfil-field ${alvoMelhoriaRadar === 'github' ? 'perfil-field-destaque' : ''}`} data-melhoria-alvo="github">
                    <span>GitHub</span>
                    <input value={form.github} placeholder="https://github.com/seu-usuario" onChange={(e) => atualizar('github', e.target.value)} onFocus={() => setCampoFocadoMentor('github')} onClick={() => setCampoFocadoMentor('github')} />
                    <FeedbackCampo analise={forcaPerfil.links.github} />
                  </label>
                  <label className="perfil-field">
                    <span>Portfolio / site pessoal</span>
                    <input value={form.portfolio} placeholder="https://seuportfolio.com" onChange={(e) => atualizar('portfolio', e.target.value)} onFocus={() => setCampoFocadoMentor('portfolio')} onClick={() => setCampoFocadoMentor('portfolio')} />
                    <FeedbackCampo analise={forcaPerfil.links.portfolio} />
                  </label>
                  <label className="perfil-field">
                    <span>Telefone profissional</span>
                    <input value={form.telefone} placeholder="(81) 99999-9999" onChange={(e) => atualizar('telefone', e.target.value)} />
                  </label>
                </div>
              </section>

              <section className="perfil-form-section">
                <h3>Informações profissionais</h3>
                <label className="perfil-field">
                  <span>Tecnologias com nivel <em>(uma por linha)</em></span>
                  <textarea rows={4} placeholder={'HTML - basico\nCSS - basico\nJavaScript - estudando\nGit/GitHub - basico'} value={form.tecnologiasComNivel} onChange={(e) => atualizar('tecnologiasComNivel', e.target.value)} onFocus={() => setCampoFocadoMentor('tecnologiasComNivel')} onClick={() => setCampoFocadoMentor('tecnologiasComNivel')} />
                  <small>Liste uma tecnologia por linha e informe seu nível com honestidade.</small>
                  <FeedbackCampo
                    analise={forcaPerfil.tecnologias}
                    sugestoes={[sugestoesPerfil.tecnologiasComNivel]}
                    onUsarSugestao={(valor) => atualizar('tecnologiasComNivel', valor)}
                  />
                </label>
                <div className="perfil-campo-grid perfil-campo-2col">
                  <label className="perfil-field">
                    <span>Idiomas</span>
                    <textarea rows={3} placeholder={'Portugues - nativo\nIngles - basico'} value={form.idiomas} onChange={(e) => atualizar('idiomas', e.target.value)} />
                  </label>
                  <label className="perfil-field">
                    <span>Formação</span>
                    <textarea rows={3} placeholder="Analise e Desenvolvimento de Sistemas - UNIT - cursando" value={form.formacoes} onChange={(e) => atualizar('formacoes', e.target.value)} onFocus={() => setCampoFocadoMentor('formacoes')} onClick={() => setCampoFocadoMentor('formacoes')} />
                  </label>
                </div>
                <label className="perfil-field">
                  <span>Projetos pessoais</span>
                  <textarea rows={4} placeholder="Landing Page Responsiva - HTML, CSS e JavaScript - foco em responsividade - link" value={form.projetos} onChange={(e) => atualizar('projetos', e.target.value)} onFocus={() => setCampoFocadoMentor('projetos')} onClick={() => setCampoFocadoMentor('projetos')} />
                  <small>Inclua nome, objetivo, tecnologias e link do GitHub ou deploy quando existir.</small>
                  <FeedbackCampo
                    analise={forcaPerfil.projetos}
                    sugestoes={[sugestoesPerfil.projeto]}
                    onUsarSugestao={(valor) => atualizar('projetos', valor)}
                  />
                </label>
                <div className="perfil-campo-grid perfil-campo-2col">
                  <label className="perfil-field">
                    <span>Experiências</span>
                    <textarea rows={4} placeholder="Atendente - Empresa X - 2024 - atendimento ao cliente e organizacao" value={form.experiencias} onChange={(e) => atualizar('experiencias', e.target.value)} onFocus={() => setCampoFocadoMentor('experiencias')} onClick={() => setCampoFocadoMentor('experiencias')} />
                  </label>
                  <label className="perfil-field">
                    <span>Certificados externos</span>
                    <textarea rows={4} placeholder="HTML e CSS - Curso em Video - 2026 - 40h - link" value={form.certificadosExternos} onChange={(e) => atualizar('certificadosExternos', e.target.value)} onFocus={() => setCampoFocadoMentor('certificadosExternos')} onClick={() => setCampoFocadoMentor('certificadosExternos')} />
                  </label>
                </div>
                <div className="perfil-certificados-upload">
                  <label className="perfil-field perfil-upload-certificado">
                    <span>PDF ou imagem dos certificados externos</span>
                    <input accept=".pdf,image/*" multiple type="file" onChange={selecionarCertificadosExternos} />
                    <small>Opcional para a demo: selecione PDFs ou imagens. A Trilum registra o nome do arquivo sem deixar o site pesado.</small>
                  </label>
                  {!!form.certificadosExternosArquivos?.length && (
                    <ul className="perfil-certificados-anexos">
                      {form.certificadosExternosArquivos.map((anexo) => (
                        <li key={anexo.id}>
                          <FileText size={14} />
                          <span>{anexo.nome}</span>
                          {formatarTamanhoArquivo(anexo.tamanho) && <small>{formatarTamanhoArquivo(anexo.tamanho)}</small>}
                          <button type="button" onClick={() => removerCertificadoExternoArquivo(anexo.id)}>Remover</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>

              {/* Banner de alterações pendentes */}
              {alterado && (
                <div className="perfil-aviso-pendente" data-mentor-pagina-section="salvar">
                  <span className="perfil-aviso-dot" />
                  Você tem alterações não salvas — clique em <strong>Salvar</strong> para confirmar ou <strong>Descartar</strong> para desfazer.
                </div>
              )}
            </section>
          )}

          {!editando && (
            <div id="radar-candidatura" data-mentor-pagina-section="radar">
              <RadarProntidaoCard prontidao={prontidaoCandidatura} onMelhorar={corrigirProximaAcaoRadar} />
            </div>
          )}

          {!editando && (
            <section className="perfil-udemy-form perfil-profissional-publico">
              <h2>Perfil profissional</h2>
              {(form.linkedin || form.github || form.portfolio || form.telefone) && (
                <div className="perfil-profissional-links">
                  {form.linkedin && <a href={form.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                  {form.github && <a href={form.github} target="_blank" rel="noreferrer">GitHub</a>}
                  {form.portfolio && <a href={form.portfolio} target="_blank" rel="noreferrer">Portfolio</a>}
                  {form.telefone && <span>{form.telefone}</span>}
                </div>
              )}

              <div className="perfil-profissional-grid">
                {!!linhasLimpasCurriculo(form.tecnologiasComNivel).length && (
                  <article>
                    <h3>Tecnologias com nivel</h3>
                    <div className="curriculo-tags">
                      {linhasLimpasCurriculo(form.tecnologiasComNivel).map((item) => (
                        <span key={item}>{normalizarLinhaTecnologia(item)}</span>
                      ))}
                    </div>
                  </article>
                )}
                {!!linhasLimpasCurriculo(form.projetos).length && (
                  <article>
                    <h3>Projetos pessoais</h3>
                    <ul>{linhasLimpasCurriculo(form.projetos).map((item) => <li key={item}>{item}</li>)}</ul>
                  </article>
                )}
                {!!projetosComEvidencia.length && (
                  <article>
                    <h3>Projetos práticos com evidência</h3>
                    <ul>
                      {projetosComEvidencia.map((projeto) => (
                        <li key={projeto.id}>
                          {projeto.titulo} - {projeto.tecnologias.slice(0, 4).join(', ')}
                          {projeto.github && <> - <a href={projeto.github} target="_blank" rel="noreferrer">GitHub</a></>}
                          {projeto.deploy && <> - <a href={projeto.deploy} target="_blank" rel="noreferrer">Deploy</a></>}
                        </li>
                      ))}
                    </ul>
                  </article>
                )}
                {!!linhasLimpasCurriculo(form.formacoes).length && (
                  <article>
                    <h3>Formacao</h3>
                    <ul>{linhasLimpasCurriculo(form.formacoes).map((item) => <li key={item}>{item}</li>)}</ul>
                  </article>
                )}
                {!!linhasLimpasCurriculo(form.experiencias).length && (
                  <article>
                    <h3>Experiencias</h3>
                    <ul>{linhasLimpasCurriculo(form.experiencias).map((item) => <li key={item}>{item}</li>)}</ul>
                  </article>
                )}
                {!!linhasLimpasCurriculo(form.idiomas).length && (
                  <article>
                    <h3>Idiomas</h3>
                    <ul>{linhasLimpasCurriculo(form.idiomas).map((item) => <li key={item}>{item}</li>)}</ul>
                  </article>
                )}
                {!!linhasLimpasCurriculo(form.certificadosExternos).length && (
                  <article>
                    <h3>Certificados externos</h3>
                    <ul>{linhasLimpasCurriculo(form.certificadosExternos).map((item) => <li key={item}>{item}</li>)}</ul>
                  </article>
                )}
                {!!form.certificadosExternosArquivos?.length && (
                  <article>
                    <h3>Anexos dos certificados</h3>
                    <ul>{form.certificadosExternosArquivos.map((item) => <li key={item.id}>{item.nome}</li>)}</ul>
                  </article>
                )}
              </div>
            </section>
          )}

          {/* ── Aprendizado ── */}
          {curriculoAberto && (
            <section className={`perfil-udemy-form curriculo-inteligente ${alvoMelhoriaRadar === 'curriculo' ? 'perfil-field-destaque' : ''}`} id="meu-curriculo" data-melhoria-alvo="curriculo">
              <header className="curriculo-header">
                <div>
                  <span className="eyebrow">Gerador inteligente</span>
                  <h2>Meu Currículo</h2>
                  <p>A Trilum monta uma primeira versão com seu perfil, wizard, cursos e certificados. Você completa com projetos, links e dados externos.</p>
                </div>
                <button className="botao botao-ghost" type="button" onClick={() => setCurriculoAberto(false)}>
                  <X size={15} /> Fechar
                </button>
              </header>

              <div className="curriculo-grid">
                <div className="curriculo-editor">
                  <section className="curriculo-editor-card curriculo-card-config">
                    <header>
                      <h3>Configurações do currículo</h3>
                    </header>
                    <div className="curriculo-tipo-grid">
                    <label className="perfil-field">
                      <span>Objetivo do currículo</span>
                      <select value={curriculoForm.tipo} onChange={(e) => atualizarCurriculo('tipo', e.target.value)}>
                        {tiposCurriculo.map((item) => (
                          <option key={item.valor} value={item.valor}>{item.rotulo}</option>
                        ))}
                      </select>
                    </label>
                    <label className="perfil-field">
                      <span>Modelo</span>
                      <select value={curriculoForm.modelo} onChange={(e) => atualizarCurriculo('modelo', e.target.value)}>
                        {modelosCurriculo.map((item) => (
                          <option key={item.valor} value={item.valor}>{item.rotulo}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="curriculo-auto-box">
                    <strong>Preenchido automaticamente pela Trilum</strong>
                    <div>
                      <span>{dadosCurriculo.cursos.length} cursos concluídos</span>
                      <span>{dadosCurriculo.certificados.length} certificados</span>
                      <span>{tecnologiasEstudadas.length} tecnologias estudadas</span>
                      <span>{dadosCurriculo.candidaturas.length} candidaturas</span>
                    </div>
                  </div>

                  <div className="curriculo-profile-source">
                    Essas informações vêm do seu Perfil Público. Para mudar definitivamente LinkedIn, GitHub, projetos, idiomas, formação, experiências e certificados externos, edite o perfil e salve.
                  </div>

                  </section>

                  <section className="curriculo-editor-card curriculo-card-opcoes">
                    <header>
                      <h3>O que exibir no currículo</h3>
                    </header>
                    <div className="curriculo-opcoes">
                    <label>
                      <input type="checkbox" checked={curriculoForm.mostrarFoto} onChange={(e) => atualizarCurriculo('mostrarFoto', e.target.checked)} />
                      Mostrar foto
                    </label>
                    <label>
                      <input type="checkbox" checked={curriculoForm.mostrarProjetos} onChange={(e) => atualizarCurriculo('mostrarProjetos', e.target.checked)} />
                      Mostrar projetos
                    </label>
                    <label>
                      <input type="checkbox" checked={curriculoForm.mostrarExperiencias} onChange={(e) => atualizarCurriculo('mostrarExperiencias', e.target.checked)} />
                      Mostrar experiências
                    </label>
                    <label>
                      <input type="checkbox" checked={curriculoForm.mostrarCertificadosTrilum} onChange={(e) => atualizarCurriculo('mostrarCertificadosTrilum', e.target.checked)} />
                      Certificados Trilum
                    </label>
                    <label>
                      <input type="checkbox" checked={curriculoForm.mostrarCertificadosExternos} onChange={(e) => atualizarCurriculo('mostrarCertificadosExternos', e.target.checked)} />
                      Certificados externos
                    </label>
                  </div>

                  <label className="perfil-field curriculo-foto-field">
                    <span>Foto específica do currículo</span>
                    <input accept="image/*" type="file" onChange={selecionarFotoCurriculo} />
                  </label>

                  </section>

                  <section className="curriculo-editor-card curriculo-card-conteudo">
                    <header>
                      <h3>Conteúdo do currículo</h3>
                    </header>
                    <div className="perfil-campo-grid">
                    <label className="perfil-field">
                      <span>Título profissional</span>
                      <input value={curriculoForm.titulo} onChange={(e) => atualizarCurriculo('titulo', e.target.value)} onFocus={() => setCampoFocadoMentor('titulo')} onClick={() => setCampoFocadoMentor('titulo')} />
                      <FeedbackCampo
                        analise={forcaPerfil.titulo}
                        sugestoes={sugestoesPerfil.titulos}
                        onUsarSugestao={(valor) => atualizarCurriculo('titulo', valor)}
                      />
                      <small>Por padrão, usamos seu título do perfil. Você pode ajustar só para este currículo.</small>
                    </label>
                  </div>

                  <label className="perfil-field">
                    <span>Objetivo profissional</span>
                    <textarea rows={3} value={curriculoForm.objetivo} onChange={(e) => atualizarCurriculo('objetivo', e.target.value)} onFocus={() => setCampoFocadoMentor('objetivoCurriculo')} onClick={() => setCampoFocadoMentor('objetivoCurriculo')} />
                    <FeedbackCampo
                      analise={!curriculoForm.objetivo ? { problemas: ['Explique qual oportunidade você busca.'] } : null}
                      sugestoes={[sugestoesPerfil.objetivo]}
                      onUsarSugestao={(valor) => atualizarCurriculo('objetivo', valor)}
                    />
                  </label>

                  <label className="perfil-field">
                    <span>Resumo profissional</span>
                    <textarea rows={4} value={curriculoForm.resumo} onChange={(e) => atualizarCurriculo('resumo', e.target.value)} onFocus={() => setCampoFocadoMentor('resumoCurriculo')} onClick={() => setCampoFocadoMentor('resumoCurriculo')} />
                    <FeedbackCampo
                      analise={{ valido: forcaPerfil.resumo.qualidade === 'bom', problemas: forcaPerfil.resumo.problemas }}
                      sugestoes={[sugestoesPerfil.resumo]}
                      onUsarSugestao={(valor) => atualizarCurriculo('resumo', valor)}
                    />
                    <small>Por padrão, usamos sua bio do perfil. Escreva 2 a 4 frases sobre quem você é e o que busca.</small>
                  </label>

                  <div className="perfil-campo-grid perfil-campo-3col curriculo-extra-field">
                    <label className="perfil-field">
                      <span>Portfólio</span>
                    </label>
                  </div>

                  <label className="perfil-field">
                    <span>Tecnologias com nível <em>(uma por linha)</em></span>
                  </label>

                  <label className="perfil-field">
                    <span>Projetos pessoais <em>(um por linha)</em></span>
                    <textarea
                      rows={4}
                      placeholder="Landing Page Responsiva - HTML, CSS e JavaScript - foco em responsividade"
                      value={curriculoForm.projetos}
                      onChange={(e) => atualizarCurriculo('projetos', e.target.value)}
                      onFocus={() => setCampoFocadoMentor('projetos')}
                      onClick={() => setCampoFocadoMentor('projetos')}
                    />
                  </label>

                  <div className="perfil-campo-grid perfil-campo-2col curriculo-extra-field">
                    <label className="perfil-field">
                      <span>Idiomas</span>
                      <textarea rows={3} value={curriculoForm.idiomas} onChange={(e) => atualizarCurriculo('idiomas', e.target.value)} />
                    </label>
                    <label className="perfil-field">
                      <span>Competências comportamentais</span>
                      <textarea rows={3} value={curriculoForm.competencias} onChange={(e) => atualizarCurriculo('competencias', e.target.value)} />
                    </label>
                  </div>

                  <div className="perfil-campo-grid perfil-campo-2col curriculo-extra-field">
                    <label className="perfil-field">
                      <span>Experiências</span>
                      <textarea rows={4} placeholder="Cargo - Empresa - período - principais atividades" value={curriculoForm.experiencias} onChange={(e) => atualizarCurriculo('experiencias', e.target.value)} />
                    </label>
                    <label className="perfil-field">
                      <span>Formação</span>
                      <textarea rows={4} placeholder="Curso - Instituição - ano" value={curriculoForm.formacoes} onChange={(e) => atualizarCurriculo('formacoes', e.target.value)} />
                    </label>
                  </div>

                  <label className="perfil-field">
                    <span>Certificados externos</span>
                    <textarea
                      rows={3}
                      placeholder="HTML e CSS - Curso em Vídeo, 2026 - 40h - link"
                      value={curriculoForm.certificadosExternos}
                      onChange={(e) => atualizarCurriculo('certificadosExternos', e.target.value)}
                    />
                  </label>
                  </section>
                </div>

                <aside className="curriculo-preview-col">
                  <article className={`curriculo-preview curriculo-preview-${curriculoForm.modelo}`}>
                    <header>
                      <div>
                        <h3>{dadosCurriculo.nome}</h3>
                        <p>{curriculoForm.titulo}</p>
                        <div className="curriculo-preview-contatos">
                          {contatosCurriculo.map(({ id, rotulo, valor, Icone }) => {
                            const href = linkContato(id, valor)
                            if (contatoEhLinkSocial(id) && href) {
                              return (
                                <a key={id} href={href} target="_blank" rel="noreferrer" aria-label={rotulo} title={valor}>
                                  <Icone size={12} />
                                  {rotulo}
                                </a>
                              )
                            }

                            return (
                              <span key={id}>
                                <Icone size={12} />
                                {valor}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                      {curriculoForm.mostrarFoto && curriculoForm.fotoUrl && <img src={curriculoForm.fotoUrl} alt="" />}
                    </header>
                    <section>
                      <h4>Objetivo</h4>
                      <p>{curriculoForm.objetivo}</p>
                    </section>
                    <section>
                      <h4>Resumo</h4>
                      <p>{curriculoForm.resumo}</p>
                    </section>
                    <section>
                      <h4>Tecnologias principais</h4>
                      <div className="curriculo-tags">
                        {(tecnologiasSeparadas.principais.length ? tecnologiasSeparadas.principais : tecnologiasCurriculo).map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </section>
                    {!!tecnologiasSeparadas.estudo.length && (
                      <section>
                        <h4>Outras tecnologias em estudo</h4>
                        <div className="curriculo-tags curriculo-tags-soft">
                          {tecnologiasSeparadas.estudo.map((item) => (
                            <span key={item}>{item}</span>
                          ))}
                        </div>
                      </section>
                    )}
                    {curriculoForm.mostrarProjetos && !!projetosCurriculo.length && (
                      <section>
                        <h4>Projetos</h4>
                        <ul>{projetosCurriculo.map((item) => <li key={item}>{item}</li>)}</ul>
                      </section>
                    )}
                    {curriculoForm.mostrarCertificadosTrilum && !!dadosCurriculo.certificados.length && (
                      <section>
                        <h4>Certificados Trilum</h4>
                        <ul>{dadosCurriculo.certificados.map((item) => <li key={`${item.tipo}-${item.id}`}>{item.titulo}</li>)}</ul>
                      </section>
                    )}
                    {curriculoForm.mostrarCertificadosExternos && (!!certificadosExternosCurriculo.length || !!anexosCertificadosCurriculo.length) && (
                      <section>
                        <h4>Certificados externos</h4>
                        <ul>
                          {certificadosExternosCurriculo.map((item) => <li key={item}>{item}</li>)}
                          {anexosCertificadosCurriculo.map((item) => <li key={item.id}>{item.nome}</li>)}
                        </ul>
                      </section>
                    )}
                    {!!idiomasCurriculo.length && (
                      <section>
                        <h4>Idiomas</h4>
                        <ul>{idiomasCurriculo.map((item) => <li key={item}>{item}</li>)}</ul>
                      </section>
                    )}
                    {!!formacoesCurriculo.length && (
                      <section>
                        <h4>Formacao</h4>
                        <ul>{formacoesCurriculo.map((item) => <li key={item}>{item}</li>)}</ul>
                      </section>
                    )}
                    {curriculoForm.mostrarExperiencias && !!experienciasCurriculo.length && (
                      <section>
                        <h4>Experiencias</h4>
                        <ul>{experienciasCurriculo.map((item) => <li key={item}>{item}</li>)}</ul>
                      </section>
                    )}
                  </article>

                  <div className="curriculo-acoes">
                    <button className="botao botao-primary" type="button" onClick={salvarCurriculo}>
                      <Save size={15} /> Salvar currículo
                    </button>
                    <button className="botao botao-secondary" type="button" onClick={copiarCurriculo}>
                      <Clipboard size={15} /> {curriculoCopiado ? 'Copiado' : 'Copiar texto'}
                    </button>
                    <button className="botao botao-secondary" type="button" onClick={exportarCurriculoPdf}>
                      <FileText size={15} /> Exportar PDF
                    </button>
                  </div>
                </aside>
              </div>

              <article className="curriculo-print-area curriculo-documento" aria-hidden="true">
                <header className="curriculo-doc-hero">
                  <div className="curriculo-doc-identidade">
                    {curriculoForm.mostrarFoto && curriculoForm.fotoUrl && (
                      <img src={curriculoForm.fotoUrl} alt="" />
                    )}
                    <div>
                      <h1>{dadosCurriculo.nome}</h1>
                      <h2>{curriculoForm.titulo}</h2>
                    </div>
                  </div>
                  <ul className="curriculo-doc-contato">
                    {contatosCurriculo.map(({ id, rotulo, valor, Icone }) => {
                      const href = linkContato(id, valor)
                      const social = contatoEhLinkSocial(id)

                      return (
                        <li key={id}>
                          <span><Icone size={12} />{rotulo}</span>
                          {social && href ? (
                            <a href={href} target="_blank" rel="noreferrer" title={valor}>
                              {rotulo}
                            </a>
                          ) : (
                            valor
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </header>

                <section className="curriculo-doc-resumo">
                  <p>{curriculoForm.resumo}</p>
                  {curriculoForm.objetivo && <strong>{curriculoForm.objetivo}</strong>}
                </section>

                <div className="curriculo-doc-duas-colunas">
                  <section>
                    <h3>Educação</h3>
                    {formacoesCurriculo.length ? (
                      <ul>
                        {formacoesCurriculo.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    ) : (
                      <p>Formação em desenvolvimento pela Trilum Conecta.</p>
                    )}
                    {!!dadosCurriculo.trilhas.length && (
                      <ul>
                        {dadosCurriculo.trilhas.slice(0, 3).map((item) => (
                          <li key={item.id}>{item.titulo} - {item.progresso}% concluida</li>
                        ))}
                      </ul>
                    )}
                    {!!dadosCurriculo.cursos.length && (
                      <ul>
                        {dadosCurriculo.cursos.slice(0, 4).map((item) => (
                          <li key={item.id}>{item.titulo} - curso Trilum concluido</li>
                        ))}
                      </ul>
                    )}
                  </section>

                  <section>
                    <h3>Tecnologias e competencias</h3>
                    <ul>
                      {(tecnologiasSeparadas.principais.length ? tecnologiasSeparadas.principais : tecnologiasCurriculo).slice(0, 8).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                      {competenciasCurriculo.slice(0, 4).map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    {!!idiomasCurriculo.length && (
                      <div className="curriculo-doc-idiomas">
                        <h3>Idiomas</h3>
                        <ul>{idiomasCurriculo.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                    )}
                  </section>
                </div>

                {curriculoForm.mostrarProjetos && !!projetosCurriculo.length && (
                  <section className="curriculo-doc-secao">
                    <h3>Projetos</h3>
                    <ul>{projetosCurriculo.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul>
                  </section>
                )}

                {curriculoForm.mostrarExperiencias && !!experienciasCurriculo.length && (
                  <section className="curriculo-doc-secao">
                    <h3>Experiências</h3>
                    <ul>{experienciasCurriculo.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul>
                  </section>
                )}

                {((curriculoForm.mostrarCertificadosTrilum && !!dadosCurriculo.certificados.length) || (curriculoForm.mostrarCertificadosExternos && (!!certificadosExternosCurriculo.length || !!anexosCertificadosCurriculo.length))) && (
                  <section className="curriculo-doc-secao">
                    <h3>{curriculoForm.mostrarCertificadosTrilum && dadosCurriculo.certificados.length ? 'Certificados' : 'Certificados externos'}</h3>
                    <ul>
                      {curriculoForm.mostrarCertificadosTrilum && dadosCurriculo.certificados.slice(0, 5).map((item) => (
                        <li key={`${item.tipo}-${item.id}`}>{item.titulo} - {item.tipo} Trilum</li>
                      ))}
                      {curriculoForm.mostrarCertificadosExternos && certificadosExternosCurriculo.slice(0, 5).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                      {curriculoForm.mostrarCertificadosExternos && anexosCertificadosCurriculo.slice(0, 4).map((item) => (
                        <li key={item.id}>Anexo: {item.nome}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </article>
            </section>
          )}

          <section className="perfil-udemy-form perfil-metricas-bloco" id="aprendizado" data-mentor-pagina-section="aprendizado">
            <h2>Aprendizado</h2>
            <div className="metricas perfil-metricas-udemy">
              <article>
                <GraduationCap size={20} />
                <strong>{cursosIniciados.length}</strong>
                <span>Cursos iniciados</span>
              </article>
              <article>
                <Award size={20} />
                <strong>{certificados.length}</strong>
                <span>Certificados</span>
              </article>
              <article>
                <BriefcaseBusiness size={20} />
                <strong>{candidaturasDoAluno.length}</strong>
                <span>Candidaturas</span>
              </article>
            </div>

            <div className="perfil-duas-colunas">
              <section
                className="perfil-subcard"
                ref={refCursosScroll}
                onMouseDown={(e) => iniciarDrag(e, refCursosScroll)}
                onMouseMove={(e) => movimentarDrag(e, refCursosScroll)}
                onMouseUp={finalizarDrag}
                onMouseLeave={finalizarDrag}
                style={{ cursor: isDragging ? 'grabbing' : 'default', overflowY: 'auto', maxHeight: 320 }}
              >
                <h3>Cursos em andamento</h3>
                {cursosIniciados.length ? (
                  cursosIniciados.map((conteudo) => (
                    <div className="linha-progresso" key={conteudo.id}>
                      <div className="linha-progresso-topo">
                        <strong>{conteudo.titulo}</strong>
                        <span>{conteudo.progresso}%</span>
                      </div>
                      <div className="progresso">
                        <span style={{ width: `${conteudo.progresso}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Nenhum curso iniciado ainda.</p>
                )}
              </section>

              <section className="perfil-subcard perfil-metricas-tecnologias" data-mentor-pagina-section="tecnologias">
                <div className="perfil-metricas-tecnologias-header">
                  <div>
                    <h3>Tecnologias estudadas</h3>
                    <p>Mais usadas no seu aprendizado</p>
                  </div>
                  <span>{tecnologiasEstudadas.length} tecnologias</span>
                </div>

                {tecnologiasEstudadas.length ? (
                  <div className="perfil-metricas-tecnologias-layout">
                    <div className="perfil-metricas-bar-chart">
                      {tecnologiasEstudadas.slice(0, 5).map((item) => (
                        <div className="perfil-bar-row" key={item.tecnologia}>
                          <div className="perfil-bar-meta">
                            <strong>{item.rotulo}</strong>
                            <small>{item.percentual}%</small>
                          </div>
                          <div className="perfil-bar-track">
                            <div className="perfil-bar-fill" style={{ width: `${item.percentual}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="perfil-metricas-circle-card">
                      <div className="perfil-metricas-circle-ring">
                        <div className="perfil-metricas-circle-core">
                          <span className="perfil-metricas-circle-icon">
                            {tecnologiasEstudadas[0].rotulo.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="perfil-metricas-circle-label">
                        <strong>{tecnologiasEstudadas[0].rotulo}</strong>
                        <small>Mais estudada</small>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Quando você marcar aulas como concluídas, o gráfico aparece aqui.</p>
                )}
              </section>
            </div>
          </section>

          {/* ── Certificados ── */}
          <section className="perfil-udemy-form" id="certificados" data-mentor-pagina-section="certificados">
            <h2>Certificados</h2>
            {certificados.length ? (
              <div
                className="certificados-lista"
                ref={refCertificadosScroll}
                onMouseDown={(e) => iniciarDrag(e, refCertificadosScroll)}
                onMouseMove={(e) => movimentarDrag(e, refCertificadosScroll)}
                onMouseUp={finalizarDrag}
                onMouseLeave={finalizarDrag}
                style={{ cursor: isDragging ? 'grabbing' : 'default' }}
              >
                {certificados.map((cert) => (
                  <article className="certificado-card" key={`${cert.tipo}-${cert.id}`}>
                    <div className="certificado-card-cabecalho">
                      <span className="certificado-tipo">{cert.tipo}</span>
                      <strong>{cert.titulo}</strong>
                    </div>
                    <div className="certificado-acoes">
                      <button
                        className="botao botao-primary"
                        type="button"
                        onClick={() => baixarCertificadoPdf({ aluno: usuarioAtual?.nome, curso: cert.titulo, professor: cert.professor, horas: cert.duracao })}
                      >
                        <Download size={15} /> Baixar PDF
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p>Certificados aparecem quando uma trilha chega a 80% ou quando um curso da plataforma é concluído.</p>
            )}
          </section>

          <section className={`perfil-udemy-form ${alvoMelhoriaRadar === 'projeto' ? 'perfil-field-destaque' : ''}`} id="projetos-praticos" data-mentor-pagina-section="projetos" data-melhoria-alvo="projeto">
            <div className="secao-cabecalho">
              <span className="eyebrow">Do estudo para o portfólio</span>
              <h2>Meus projetos práticos</h2>
              <p>Projetos sugeridos começam como planejados. Atualize o status e adicione evidências conforme desenvolver.</p>
            </div>

            {meusProjetosPraticos.length > 0 && (
              <div className="meus-projetos-praticos">
                {meusProjetosPraticos.map((projeto) => (
                  <article className="meu-projeto-pratico-card" key={projeto.id}>
                    <header>
                      <div><span className="eyebrow">{projeto.area}</span><h3>{projeto.titulo}</h3></div>
                      <select value={projeto.status} onChange={(evento) => atualizarProjetoPratico(projeto.id, { status: evento.target.value })}>
                        <option value="planejado">Planejado</option>
                        <option value="em_andamento">Em andamento</option>
                        <option value="concluido">Concluído</option>
                      </select>
                    </header>
                    <p>{projeto.objetivo}</p>
                    <div className="projeto-pratico-tags">{projeto.tecnologias.slice(0, 6).map((item) => <span key={item}>{item}</span>)}</div>
                    <div className="meu-projeto-pratico-campos">
                      <label>Descrição<textarea rows="3" value={projeto.descricao || ''} onChange={(evento) => atualizarProjetoPratico(projeto.id, { descricao: evento.target.value })} /></label>
                      <label>GitHub<input placeholder="https://github.com/..." value={projeto.github || ''} onChange={(evento) => atualizarProjetoPratico(projeto.id, { github: evento.target.value })} /></label>
                      <label>Deploy<input placeholder="https://..." value={projeto.deploy || ''} onChange={(evento) => atualizarProjetoPratico(projeto.id, { deploy: evento.target.value })} /></label>
                    </div>
                    <small>
                      {projetoEhEvidencia(projeto)
                        ? 'Evidência forte: este projeto pode aparecer para empresas e no currículo.'
                        : projeto.status === 'planejado'
                          ? 'Planejado: ainda não aparece como realização concluída.'
                          : 'Adicione descrição e GitHub ou deploy para fortalecer esta evidência.'}
                    </small>
                  </article>
                ))}
              </div>
            )}

            <div className="projetos-praticos-recomendados">
              {projetosSugeridos.map((projeto) => (
                <ProjetoPraticoCard
                  key={projeto.id}
                  projeto={projeto}
                  compacto
                  adicionado={meusProjetosPraticos.some((item) => item.templateId === projeto.id)}
                  onAdicionar={adicionarProjetoSugerido}
                />
              ))}
            </div>
          </section>

          {/* ── Candidaturas ── */}
          <section className="perfil-udemy-form" id="candidaturas" data-mentor-pagina-section="candidaturas">
            <h2>Candidaturas</h2>
            {candidaturasComRetorno.length ? (
              candidaturasComRetorno.map(({ candidatura, vaga, retorno }) => (
                <article className="candidatura-item candidatura-acompanhamento" key={candidatura.id}>
                  <header>
                    <div>
                      <span className="candidatura-empresa">{retorno.empresa}</span>
                      <h3>{vaga?.titulo || 'Vaga removida'}</h3>
                      <p>{[vaga?.modalidade, vaga?.nivel].filter(Boolean).join(' · ')}</p>
                    </div>
                    <span className={`candidatura-status candidatura-status-${retorno.status.tipo}`}>
                      {retorno.status.rotulo}
                    </span>
                  </header>

                  <section className="candidatura-feedback">
                    <strong>{candidatura.feedbackPublicoAluno ? 'Feedback da empresa' : 'Atualização da candidatura'}</strong>
                    <p>{retorno.feedback}</p>
                  </section>

                  {retorno.pontos.length > 0 && (
                    <section className="candidatura-pontos">
                      <strong>Pontos para fortalecer</strong>
                      <ul>{retorno.pontos.map((ponto) => <li key={ponto}>{ponto}</li>)}</ul>
                    </section>
                  )}

                  <section className="candidatura-proxima-acao">
                    <strong>Próxima ação sugerida</strong>
                    <h4>{retorno.proximaAcao.titulo}</h4>
                    <p>{retorno.proximaAcao.descricao}</p>
                    {retorno.status.tipo === 'nao-selecionado' && retorno.projetoSugerido.tecnologias.length > 0 && (
                      <div className="candidatura-tags">
                        {retorno.projetoSugerido.tecnologias.map((tecnologia) => <span key={tecnologia}>{tecnologia}</span>)}
                      </div>
                    )}
                  </section>

                  {retorno.status.tipo === 'nao-selecionado' && (retorno.cursos.length > 0 || retorno.trilhas.length > 0) && (
                    <section className="candidatura-relacionados">
                      <strong>Conteúdos que podem ajudar</strong>
                      <div>
                        {retorno.cursos.slice(0, 2).map((curso) => <Link key={curso.id} to={`/aluno/cursos/${curso.id}`}>{curso.titulo}</Link>)}
                        {retorno.trilhas.slice(0, 1).map((trilha) => <Link key={trilha.id} to={`/aluno/cursos/${trilha.id}`}>{trilha.titulo}</Link>)}
                      </div>
                    </section>
                  )}

                  <footer>
                    {vaga?.id && <Link className="botao botao-secondary" to={`/aluno/vagas/${vaga.id}`}>Ver vaga</Link>}
                    <button
                      className="botao botao-primary"
                      type="button"
                      onClick={() => {
                        if (retorno.status.tipo === 'selecionado') {
                          setCurriculoAberto(true)
                          setCampoFocadoMentor('objetivoCurriculo')
                        } else {
                          setEditando(true)
                          setCampoFocadoMentor('projetos')
                        }
                        window.setTimeout(() => rolarParaSecao('perfil-publico'), 0)
                      }}
                    >
                      {retorno.status.tipo === 'selecionado' ? 'Revisar currículo' : 'Melhorar perfil'}
                    </button>
                    <small>Última atualização: {candidatura.atualizadoEm}</small>
                  </footer>
                </article>
              ))
            ) : (
              <p>Nenhuma candidatura registrada ainda.</p>
            )}
          </section>

        </main>
      </section>

      {revisaoExportacao && (
        <div className="perfil-revisao-overlay" role="presentation" onMouseDown={() => setRevisaoExportacao(null)}>
          <section className="perfil-revisao-modal" role="dialog" aria-modal="true" aria-labelledby="titulo-revisao-curriculo" onMouseDown={(evento) => evento.stopPropagation()}>
            <header>
              <div>
                <span>Revisão antes de exportar</span>
                <h2 id="titulo-revisao-curriculo">Seu currículo pode ficar mais forte</h2>
              </div>
              <button type="button" aria-label="Fechar revisão" onClick={() => setRevisaoExportacao(null)}><X size={18} /></button>
            </header>
            <p>Encontrei alguns pontos que podem enfraquecer sua apresentação. A exportação não está bloqueada.</p>
            <ul>
              {revisaoExportacao.problemas.slice(0, 6).map((problema) => <li key={problema}>{problema}</li>)}
            </ul>
            <div className="perfil-revisao-acoes">
              <button className="botao botao-primary" type="button" onClick={() => { setRevisaoExportacao(null); setCurriculoAberto(true); setCampoFocadoMentor('objetivoCurriculo') }}>
                Revisar com mentor
              </button>
              <button className="botao botao-secondary" type="button" onClick={imprimirCurriculo}>
                Exportar mesmo assim
              </button>
            </div>
          </section>
        </div>
      )}

      <MentorPaginaAlunoToast
        mensagens={editando ? mensagensEditarPerfil : mensagensPerfilComCandidaturas}
        mapaSecoes={editando ? mapaMentorEditarPerfil : mapaMentorPerfil}
        orientacaoContextual={orientacaoContextual}
        cenariosInteligentes={[
          {
            id: 'curriculo',
            label: 'Currículo',
            titulo: 'Como fortalecer seu currículo',
            descricao: dicasCurriculo.length
              ? `Ei ${primeiroNome(nomeCompleto)}, encontrei ${dicasCurriculo.length} ponto${dicasCurriculo.length === 1 ? '' : 's'} para fortalecer seu currículo.`
              : `Boa, ${primeiroNome(nomeCompleto)}. Seu currículo já tem uma base consistente para começar a enviar.`,
            gerar: (opcoes) => gerarDicasCurriculo(contextoMentorCurriculo, opcoes),
          },
        ]}
      />
    </div>
  )
}
