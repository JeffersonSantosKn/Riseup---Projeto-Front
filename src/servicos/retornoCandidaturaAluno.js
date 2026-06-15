import { cursos } from '../dados/cursos'
import { trilhas } from '../dados/trilhas'
import { gerarProjetoPorVaga } from './projetosPraticos'
import { calcularProntidaoParaVaga } from './prontidaoCandidatura'

const STATUS_ALUNO = {
  enviado: 'Candidatura enviada',
  candidatura_enviada: 'Candidatura enviada',
  em_analise: 'Em análise',
  analise: 'Em análise',
  entrevista: 'Em próxima etapa',
  selecionado: 'Selecionado para próxima etapa',
  aprovado: 'Selecionado para próxima etapa',
  rejeitado: 'Não selecionado',
  reprovado: 'Não selecionado',
  nao_selecionado: 'Não selecionado',
  banco_talentos: 'Banco de talentos',
}

function normalizar(valor = '') {
  return String(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, '_')
}

function lista(valor) {
  if (Array.isArray(valor)) return valor.filter(Boolean)
  return String(valor || '').split(',').map((item) => item.trim()).filter(Boolean)
}

function textoBusca(item = {}) {
  return normalizar([
    item.id,
    item.titulo,
    item.tecnologia,
    item.categoria,
    ...lista(item.tags),
    ...lista(item.tecnologias),
  ].flat().join(' '))
}

function tagsDaVaga(vaga = {}) {
  return [...new Set(lista(vaga.tags).map((tag) => normalizar(tag)).filter(Boolean))]
}

function encontrarRelacionados(fonte, tags, limite) {
  if (!tags.length) return []
  return fonte
    .map((item) => ({
      item,
      pontos: tags.reduce((total, tag) => total + (textoBusca(item).includes(tag) ? 1 : 0), 0),
    }))
    .filter(({ pontos }) => pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, limite)
    .map(({ item }) => ({ id: item.id, titulo: item.titulo }))
}

export function obterStatusCandidaturaAluno(status = '') {
  const chave = normalizar(status)
  const rotulo = STATUS_ALUNO[chave] || status || 'Candidatura enviada'
  const tipo = /nao_selecionado|rejeitado|reprovado/.test(chave)
    ? 'nao-selecionado'
    : /selecionado|aprovado|entrevista/.test(chave)
      ? 'selecionado'
      : /banco/.test(chave)
        ? 'banco-talentos'
        : /analise/.test(chave)
          ? 'em-analise'
          : 'enviado'

  return { chave, rotulo, tipo }
}

export function sugerirEvolucaoPorTagsVaga(vaga = {}) {
  const tags = tagsDaVaga(vaga)
  const projetoSugerido = gerarProjetoPorVaga({ vaga })

  return {
    cursos: encontrarRelacionados(cursos, tags, 3),
    trilhas: encontrarRelacionados(trilhas, tags, 2),
    projetoSugerido,
  }
}

function pontosParaFortalecer(candidatura = {}, vaga = {}) {
  const feedbackPublico = normalizar(candidatura.feedbackPublicoAluno)
  const tags = tagsDaVaga(vaga).slice(0, 3).map((tag) => tag.replaceAll('_', ' '))

  if (/perfil|github|linkedin/.test(feedbackPublico)) {
    return ['Completar informações do perfil', 'Adicionar GitHub e LinkedIn', 'Destacar projetos com evidências práticas']
  }
  if (/curriculo/.test(feedbackPublico)) {
    return ['Alinhar o objetivo do currículo à vaga', 'Destacar projetos relacionados', 'Revisar tecnologias e links profissionais']
  }
  if (/evidencia|tecnologia|projeto|pratica/.test(feedbackPublico) && tags.length) {
    return tags.map((tag) => `Fortalecer evidências práticas em ${tag}`)
  }
  if (tags.length) {
    return [`Destacar projetos relacionados a ${tags.join(', ')}`, 'Manter GitHub e currículo atualizados']
  }
  return ['Manter perfil e currículo atualizados', 'Destacar projetos e resultados práticos']
}

function fallbackPorStatus(tipo) {
  if (tipo === 'nao-selecionado') {
    return 'A empresa optou por seguir com outros perfis neste momento. Continue evoluindo seu perfil, projetos e currículo para aumentar suas chances em futuras oportunidades.'
  }
  if (tipo === 'selecionado') {
    return 'Seu perfil avançou nesta oportunidade. A empresa poderá entrar em contato ou atualizar o status conforme o processo continuar.'
  }
  if (tipo === 'banco-talentos') {
    return 'Seu perfil foi mantido no banco de talentos para oportunidades futuras. Continue atualizando suas experiências, projetos e currículo.'
  }
  if (tipo === 'em-analise') {
    return 'Sua candidatura está sendo avaliada. Enquanto isso, mantenha seu perfil atualizado para fortalecer sua apresentação.'
  }
  return 'Sua candidatura foi enviada. Acompanhe as atualizações e mantenha seus dados profissionais em dia.'
}

export function gerarRetornoCandidaturaAluno({ candidatura = {}, vaga = {}, empresa = {}, aluno = null } = {}) {
  const status = obterStatusCandidaturaAluno(candidatura.status)
  const evolucao = sugerirEvolucaoPorTagsVaga(vaga)
  const feedback = String(candidatura.feedbackPublicoAluno || '').trim() || fallbackPorStatus(status.tipo)
  const pontos = status.tipo === 'nao-selecionado' ? pontosParaFortalecer(candidatura, vaga) : []
  const prontidao = aluno && vaga?.id ? calcularProntidaoParaVaga({ aluno, vaga }) : null

  let proximaAcao = {
    titulo: 'Manter perfil e currículo atualizados',
    descricao: 'Revise seus dados profissionais enquanto acompanha o andamento da candidatura.',
    tipo: 'perfil',
  }
  if (status.tipo === 'nao-selecionado') {
    proximaAcao = prontidao?.proximaAcao
      ? { ...prontidao.proximaAcao, tipo: prontidao.proximaAcao.tipo || 'radar' }
      : {
          titulo: evolucao.projetoSugerido.titulo,
          descricao: evolucao.projetoSugerido.objetivo,
          tipo: 'projeto',
        }
  } else if (status.tipo === 'selecionado') {
    proximaAcao = {
      titulo: 'Preparar-se para a próxima etapa',
      descricao: 'Revise currículo, projetos, contatos e os principais requisitos da vaga.',
      tipo: 'curriculo',
    }
  }

  return {
    status,
    empresa: empresa.nomeOficial || empresa.nome || 'Empresa',
    feedback,
    pontos,
    proximaAcao,
    prontidao,
    ...evolucao,
  }
}

export function criarOrientacaoMentorCandidatura(retorno, vaga = {}) {
  if (!retorno) return null
  if (retorno.status.tipo === 'nao-selecionado') {
    return {
      id: `candidatura-${vaga.id || 'atual'}-nao-selecionado`,
      titulo: 'Transforme o retorno em evolução',
      resumo: 'Essa candidatura não avançou, mas dá para transformar o retorno em um plano prático para próximas vagas.',
      detalhe: `${retorno.feedback} Próximo passo sugerido: ${retorno.proximaAcao.titulo}.`,
    }
  }
  if (retorno.status.tipo === 'selecionado') {
    return {
      id: `candidatura-${vaga.id || 'atual'}-selecionado`,
      titulo: 'Prepare-se para a próxima etapa',
      resumo: 'Boa! Seu perfil avançou nesta vaga. Revise currículo, projetos e contatos para estar preparado.',
      detalhe: retorno.feedback,
    }
  }
  return {
    id: `candidatura-${vaga.id || 'atual'}-${retorno.status.tipo}`,
    titulo: 'Acompanhe sua candidatura',
    resumo: retorno.status.tipo === 'em-analise'
      ? 'Sua candidatura está em análise. Enquanto isso, mantenha seu perfil e currículo atualizados.'
      : 'Sua candidatura foi registrada. Continue fortalecendo seu perfil enquanto acompanha as atualizações.',
    detalhe: retorno.feedback,
  }
}
