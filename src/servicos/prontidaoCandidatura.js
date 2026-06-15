import { cursos as catalogoCursos } from '../dados/cursos'
import { trilhas as catalogoTrilhas } from '../dados/trilhas'
import { cursoComoConteudo } from './conteudosCurso'
import { projetoEhEvidencia, gerarProjetoPorVaga, gerarProjetosSugeridosAluno } from './projetosPraticos'
import { calcularProgresso, recomendarCursos, recomendarTrilhas } from './recomendacoes'

function normalizar(valor = '') {
  return String(valor).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

function preenchido(valor, minimo = 1) {
  if (Array.isArray(valor)) return valor.length >= minimo
  return String(valor || '').trim().length >= minimo
}

function linkReal(valor = '', tipo = '') {
  const texto = normalizar(valor)
  if (!/^https?:\/\//.test(texto) || /seu-usuario|seu-nome|exemplo|placeholder/.test(texto)) return false
  return !tipo || texto.includes(tipo)
}

function lista(valor) {
  if (Array.isArray(valor)) return valor.filter(Boolean)
  return String(valor || '').split(/[\n,]/).map((item) => item.trim()).filter(Boolean)
}

function nivelDoScore(score) {
  if (score >= 90) return 'Muito forte'
  if (score >= 70) return 'Forte'
  if (score >= 40) return 'Em preparação'
  return 'Inicial'
}

function resumoDoNivel(nivel) {
  if (nivel === 'Muito forte') return 'Seu perfil está bem preparado, com boas evidências e currículo consistente.'
  if (nivel === 'Forte') return 'Seu perfil está competitivo para vagas compatíveis com seu objetivo.'
  if (nivel === 'Em preparação') return 'Você já tem uma base, mas precisa fortalecer evidências práticas.'
  return 'O perfil ainda precisa de informações básicas antes de candidaturas.'
}

function lacuna(tipo, gravidade, titulo, descricao, label, rota = '/aluno/perfil') {
  return { tipo, gravidade, titulo, descricao, acao: { label, rota } }
}

function textoAluno(aluno = {}) {
  const perfil = aluno.perfilProfissional || {}
  const curriculo = aluno.curriculo || {}
  return normalizar([
    aluno.titulo,
    aluno.bio,
    ...lista(aluno.tecnologias),
    perfil.tecnologiasComNivel,
    perfil.projetos,
    curriculo.tecnologias,
    curriculo.projetos,
    ...(aluno.projetosPraticos || []).flatMap((projeto) => [projeto.titulo, projeto.descricao, ...(projeto.tecnologias || [])]),
  ].join(' '))
}

function tagsVaga(vaga = {}) {
  return [...new Set(lista(vaga.tags).map(normalizar).filter(Boolean))]
}

function aprendizadoAluno(aluno = {}, cursos = catalogoCursos, trilhas = catalogoTrilhas) {
  const progresso = aluno.progresso || {}
  const trilhasIniciadas = trilhas.filter((trilha) => calcularProgresso(trilha, progresso) > 0)
  const cursosConcluidos = cursos.filter((curso) => calcularProgresso(cursoComoConteudo(curso), progresso) >= 100)
  return { trilhasIniciadas, cursosConcluidos }
}

export function identificarLacunasAluno({ aluno = {}, vaga = null } = {}) {
  const perfil = aluno.perfilProfissional || {}
  const curriculo = aluno.curriculo || {}
  const projetos = aluno.projetosPraticos || []
  const concluidos = projetos.filter((projeto) => projeto.status === 'concluido')
  const evidencias = projetos.filter(projetoEhEvidencia)
  const lacunas = []

  if (!preenchido(aluno.titulo, 8)) lacunas.push(lacuna('titulo', 'alta', 'Título profissional pouco claro', 'Explique de forma curta como você quer ser visto profissionalmente.', 'Melhorar título'))
  if (!preenchido(aluno.bio, 60)) lacunas.push(lacuna('resumo', 'alta', 'Resumo profissional incompleto', 'Apresente área, objetivo, tecnologias e prática atual.', 'Melhorar resumo'))
  if (!preenchido(aluno.tecnologias) && !preenchido(perfil.tecnologiasComNivel)) lacunas.push(lacuna('tecnologias', 'alta', 'Tecnologias não evidenciadas', 'Liste as tecnologias coerentes com seu objetivo atual.', 'Revisar tecnologias'))
  if (!linkReal(perfil.github || curriculo.github, 'github.com')) lacunas.push(lacuna('github', 'alta', 'GitHub ausente', 'Empresas usam o GitHub para verificar evidências práticas dos seus projetos.', 'Adicionar GitHub'))
  if (!linkReal(perfil.linkedin || curriculo.linkedin, 'linkedin.com')) lacunas.push(lacuna('linkedin', 'media', 'LinkedIn ausente', 'Um LinkedIn atualizado ajuda recrutadores a confirmar sua trajetória.', 'Adicionar LinkedIn'))
  if (!preenchido(curriculo.objetivo, 20) || !preenchido(curriculo.resumo || aluno.bio, 50)) lacunas.push(lacuna('curriculo', 'alta', 'Currículo precisa de revisão', 'Preencha objetivo e resumo coerentes com a vaga desejada.', 'Revisar currículo'))
  if (!projetos.length && !preenchido(perfil.projetos, 30)) lacunas.push(lacuna('projeto', 'alta', 'Nenhum projeto prático', 'Adicione um projeto planejado e transforme seus estudos em uma entrega real.', 'Ver projetos sugeridos'))
  else if (!evidencias.length) {
    lacunas.push(lacuna(
      'projeto-evidencia',
      'alta',
      concluidos.length ? 'Projeto concluído sem evidência forte' : 'Projetos ainda não concluídos',
      concluidos.length ? 'Adicione GitHub ou deploy ao projeto concluído.' : 'Conclua um projeto e registre GitHub ou deploy.',
      'Fortalecer projeto',
    ))
  }

  if (vaga) {
    const texto = textoAluno(aluno)
    const ausentes = tagsVaga(vaga).filter((tag) => !texto.includes(tag))
    if (ausentes.length) {
      lacunas.push(lacuna(
        'tecnologias-vaga',
        ausentes.length >= 3 ? 'alta' : 'media',
        'Tecnologias da vaga ainda pouco evidenciadas',
        `Ainda faltam evidências relacionadas a ${ausentes.slice(0, 4).join(', ')}.`,
        'Ver projeto sugerido',
      ))
    }
  }

  return lacunas
}

export function gerarChecklistCandidatura({ aluno = {}, vaga = null } = {}) {
  const perfil = aluno.perfilProfissional || {}
  const curriculo = aluno.curriculo || {}
  const texto = textoAluno(aluno)
  const tags = vaga ? tagsVaga(vaga) : []
  const compatibilidade = !tags.length || tags.some((tag) => texto.includes(tag))
  return [
    { id: 'perfil', label: 'Perfil profissional preenchido', concluido: preenchido(aluno.titulo, 8) && preenchido(aluno.bio, 60) },
    { id: 'curriculo', label: 'Currículo criado e coerente', concluido: preenchido(curriculo.objetivo, 20) && preenchido(curriculo.resumo || aluno.bio, 50) },
    { id: 'github', label: 'GitHub real informado', concluido: linkReal(perfil.github || curriculo.github, 'github.com') },
    { id: 'projeto', label: 'Projeto concluído com GitHub ou deploy', concluido: (aluno.projetosPraticos || []).some(projetoEhEvidencia) },
    { id: 'vaga', label: vaga ? 'Tecnologias compatíveis com a vaga' : 'Tecnologias alinhadas ao objetivo', concluido: vaga ? compatibilidade : preenchido(aluno.tecnologias) || preenchido(perfil.tecnologiasComNivel) },
  ]
}

export function gerarProximaMelhorAcaoAluno({ aluno = {}, vaga = null, prontidao = null } = {}) {
  const primeira = prontidao?.lacunas?.[0] || identificarLacunasAluno({ aluno, vaga })[0]
  if (!primeira) {
    return { tipo: 'revisao', titulo: 'Revisar dados antes de enviar', descricao: 'Seu perfil está forte. Confira currículo, contatos e requisitos da vaga.', rota: vaga ? `/aluno/vagas/${vaga.id}` : '/aluno/perfil' }
  }
  return {
    tipo: primeira.tipo,
    titulo: primeira.titulo,
    descricao: primeira.descricao,
    rota: primeira.acao.rota,
  }
}

export function calcularProntidaoAluno({ aluno = {}, vagas = [], cursos = catalogoCursos, trilhas = catalogoTrilhas } = {}) {
  const perfil = aluno.perfilProfissional || {}
  const curriculo = aluno.curriculo || {}
  const projetos = aluno.projetosPraticos || []
  const { trilhasIniciadas, cursosConcluidos } = aprendizadoAluno(aluno, cursos, trilhas)
  const respostas = aluno.respostasWizard || {}
  const cursosRecomendados = Object.keys(respostas).length ? recomendarCursos(respostas).slice(0, 3) : cursos.slice(0, 3)
  const trilhasRecomendadas = Object.keys(respostas).length ? recomendarTrilhas(respostas).slice(0, 3) : trilhas.slice(0, 3)
  const pontosFortes = []
  let score = 0

  if (preenchido(aluno.titulo, 8)) { score += 8; pontosFortes.push('Título profissional preenchido') }
  if (preenchido(aluno.bio, 60)) { score += 8; pontosFortes.push('Resumo profissional consistente') }
  if (preenchido(aluno.tecnologias) || preenchido(perfil.tecnologiasComNivel)) { score += 8; pontosFortes.push('Tecnologias principais informadas') }
  if (linkReal(perfil.github || curriculo.github, 'github.com')) { score += 10; pontosFortes.push('GitHub real informado') }
  if (linkReal(perfil.linkedin || curriculo.linkedin, 'linkedin.com')) { score += 5; pontosFortes.push('LinkedIn informado') }
  if (preenchido(curriculo.objetivo, 20)) { score += 8; pontosFortes.push('Objetivo do currículo definido') }
  if (preenchido(curriculo.resumo || aluno.bio, 50)) { score += 7; pontosFortes.push('Resumo do currículo preenchido') }
  if (preenchido(curriculo.tecnologias) || preenchido(perfil.tecnologiasComNivel)) score += 5
  if (projetos.some((projeto) => projeto.status === 'em_andamento' && preenchido(projeto.descricao, 30))) score += 5
  if (projetos.some(projetoEhEvidencia)) { score += 20; pontosFortes.push('Projeto concluído com evidência') }
  else if (projetos.some((projeto) => projeto.status === 'planejado')) score += 2
  if (trilhasIniciadas.length) { score += 7; pontosFortes.push('Trilha principal iniciada') }
  if (cursosConcluidos.length) { score += 5; pontosFortes.push('Curso relacionado concluído') }
  if (lista(aluno.certificados).length) score += 2
  if (preenchido(perfil.formacoes, 20)) { score += 5; pontosFortes.push('Formação informada') }
  if (preenchido(perfil.experiencias, 25)) { score += 4; pontosFortes.push('Experiência anterior descrita') }
  if (preenchido(perfil.idiomas, 10)) score += 3
  if (preenchido(perfil.certificadosExternos, 20)) score += 4
  if (preenchido(perfil.telefone, 8)) score += 2
  if (preenchido(curriculo.competencias, 20)) score += 3

  score = Math.min(100, score)
  const nivel = nivelDoScore(score)
  const lacunas = identificarLacunasAluno({ aluno })
  const recomendacoes = {
    cursos: cursosRecomendados,
    trilhas: trilhasRecomendadas,
    projetos: gerarProjetosSugeridosAluno({ aluno: respostas, cursos: cursosRecomendados, trilhas: trilhasRecomendadas, vagas }),
  }
  const prontidao = {
    score,
    nivel,
    titulo: `Seu perfil está ${score}% pronto para candidaturas`,
    resumo: resumoDoNivel(nivel),
    pontosFortes: pontosFortes.slice(0, 6),
    lacunas,
    alertas: lacunas.filter((item) => item.gravidade === 'alta').slice(0, 4),
    checklist: gerarChecklistCandidatura({ aluno }),
    recomendacoes,
  }
  prontidao.proximaAcao = gerarProximaMelhorAcaoAluno({ aluno, prontidao })
  return prontidao
}

export function calcularProntidaoParaVaga({ aluno = {}, vaga = {}, cursos = catalogoCursos, trilhas = catalogoTrilhas } = {}) {
  const geral = calcularProntidaoAluno({ aluno, vagas: [vaga], cursos, trilhas })
  const tags = tagsVaga(vaga)
  const texto = textoAluno(aluno)
  const compativeis = tags.filter((tag) => texto.includes(tag))
  const alinhamento = tags.length ? Math.round((compativeis.length / tags.length) * 100) : 60
  const projetoAlinhado = (aluno.projetosPraticos || []).some((projeto) =>
    projetoEhEvidencia(projeto) && tags.some((tag) => normalizar([projeto.titulo, ...(projeto.tecnologias || [])].join(' ')).includes(tag)),
  )
  const score = Math.min(100, Math.round(geral.score * .72 + alinhamento * .23 + (projetoAlinhado ? 5 : 0)))
  const nivel = nivelDoScore(score)
  const lacunas = identificarLacunasAluno({ aluno, vaga })
  const prontidao = {
    ...geral,
    score,
    nivel,
    titulo: `Prontidão para esta vaga: ${score}%`,
    resumo: alinhamento >= 70
      ? 'Seu perfil está alinhado aos requisitos principais. Revise os dados antes de enviar.'
      : 'Você pode se candidatar, mas seu perfil ficaria mais forte com evidências relacionadas à stack desta vaga.',
    lacunas,
    alertas: lacunas.filter((item) => item.gravidade === 'alta').slice(0, 4),
    checklist: gerarChecklistCandidatura({ aluno, vaga }),
    compatibilidades: compativeis,
    tecnologiasAusentes: tags.filter((tag) => !compativeis.includes(tag)),
    projetoSugerido: gerarProjetoPorVaga({ vaga, aluno: aluno.respostasWizard || {} }),
  }
  prontidao.proximaAcao = gerarProximaMelhorAcaoAluno({ aluno, vaga, prontidao })
  return prontidao
}
