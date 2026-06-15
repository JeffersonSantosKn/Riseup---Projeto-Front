import { BookOpen, Code2, PlayCircle, Rocket } from 'lucide-react'
import { useLocation, useParams } from 'react-router-dom'
import { ModulosAccordion } from '../../../componentes/cursos/ModulosAccordion'
import { Badge } from '../../../componentes/interface/Badge'
import { Botao } from '../../../componentes/interface/Botao'
import { MentorPaginaAlunoToast } from '../../../componentes/interface/MentorPaginaAlunoToast'
import { ProjetoPraticoCard } from '../../../componentes/projetos/ProjetoPraticoCard'
import { useApp } from '../../../contextos/AppContext'
import { cursosDaTrilha, encontrarConteudo } from '../../../servicos/conteudosCurso'
import { analisarConteudoNoContexto, analisarTrilhaNoContexto } from '../../../servicos/mentorConteudoContextual'
import { calcularProgresso, recomendarCursos, recomendarTrilhas } from '../../../servicos/recomendacoes'
import { gerarProjetoPorCurso, gerarProjetoPorTrilha, projetoSugeridoParaProjetoAluno } from '../../../servicos/projetosPraticos'

export function DetalheCurso() {
  const { trilhaId } = useParams()
  const location = useLocation()
  const { usuarioAtual, progressoCursos, respostasWizard, adicionarProjetoPratico } = useApp()
  const conteudo = encontrarConteudo(trilhaId)

  if (!conteudo) return <section className="pagina">Curso ou trilha nao encontrada.</section>

  const progresso = calcularProgresso(conteudo, progressoCursos)
  const primeiraAula = conteudo.modulos[0]?.aulas[0]
  const totalAulas = conteudo.modulos.flatMap((modulo) => modulo.aulas).length
  const cursosRelacionados = conteudo.tipoConteudo === 'trilha' ? cursosDaTrilha(conteudo.id) : []
  const rotuloTipo = conteudo.tipoConteudo === 'trilha' ? 'Trilha completa' : 'Curso'
  const tempoSecundario = conteudo.tempoSugerido && conteudo.tempoSugerido !== conteudo.duracao ? conteudo.tempoSugerido : ''
  const professoresDasAulas = conteudo.modulos.flatMap((modulo) => modulo.aulas || []).map((aula) => aula.professor).filter(Boolean)
  const professores = [...new Set(professoresDasAulas.length ? professoresDasAulas : [conteudo.professor].filter(Boolean))]
  const professoresTexto = professores.length ? professores.join(', ') : 'Professores externos'
  const iniciaisProfessores = professores.length === 1 ? professores[0].slice(0, 2).toUpperCase() : `${professores.length}P`
  const parametros = new URLSearchParams(location.search)
  const origem = parametros.get('origem') || 'catalogo'
  const trilhaOrigem = encontrarConteudo(parametros.get('trilhaOrigem'))
  const trilhasRecomendadas = recomendarTrilhas(respostasWizard)
  const cursosRecomendados = recomendarCursos(respostasWizard)
  const orientacaoContextual =
    conteudo.tipoConteudo === 'trilha'
      ? analisarTrilhaNoContexto({ trilhaAtual: conteudo, respostasWizard, trilhasRecomendadas, progresso })
      : analisarConteudoNoContexto({
          cursoAtual: conteudo,
          trilhaAtual: trilhaOrigem?.tipoConteudo === 'trilha' ? trilhaOrigem : null,
          origem,
          respostasWizard,
          trilhasRecomendadas,
          cursosRecomendados,
          progresso,
        })
  const projetoSugerido = conteudo.tipoConteudo === 'trilha'
    ? gerarProjetoPorTrilha({ trilha: conteudo, aluno: respostasWizard })
    : gerarProjetoPorCurso({ curso: conteudo, aluno: respostasWizard, trilha: trilhaOrigem })
  const projetoAdicionado = (usuarioAtual?.projetosPraticos || []).some((projeto) => projeto.templateId === projetoSugerido.id)

  function adicionarProjeto(projeto) {
    adicionarProjetoPratico(projetoSugeridoParaProjetoAluno(projeto))
  }

  function cursoRelacionadoDoModulo(modulo) {
    if (!cursosRelacionados.length) return null
    if (modulo.cursoId) return cursosRelacionados.find((curso) => curso.id === modulo.cursoId) || null

    const aulasDoModulo = new Set((modulo.aulas || []).map((aula) => aula.id))
    const relacionadoPorAula = cursosRelacionados.find((curso) => (curso.aulas || []).some((aula) => aulasDoModulo.has(aula.id)))

    return relacionadoPorAula || null
  }

  return (
    <section className="pagina detalhe-curso">
      <header className="curso-hero curso-hero-apresentacao">
        <div>
          <Badge tone="brand">{rotuloTipo}</Badge>
          <h1>{conteudo.titulo}</h1>
          <p>{conteudo.descricao}</p>

          <div className="curso-features">
            <span>
              <BookOpen size={20} />
              {totalAulas} {totalAulas === 1 ? 'aula' : 'aulas'}
            </span>
            <span>
              <Code2 size={20} />
              {conteudo.nivel}
            </span>
            <span>
              <Rocket size={20} />
              {conteudo.destaque}
            </span>
          </div>
        </div>

        <div className="curso-resumo curso-resumo-destaque">
          <strong>{conteudo.categoria}</strong>
          <span>{conteudo.duracao}</span>
          {tempoSecundario && <span>{tempoSecundario}</span>}
          <div>
            <small>Progresso: {progresso}%</small>
            <div className="progresso">
              <span style={{ width: `${progresso}%` }} />
            </div>
          </div>
          {primeiraAula && (
            <Botao to={`/aluno/cursos/${conteudo.id}/aula/${primeiraAula.id}`}>
              <PlayCircle size={18} /> {progresso ? 'Continuar' : 'Comecar'}
            </Botao>
          )}
        </div>
      </header>

      <main className="curso-conteudo-grid">
        <article className="course-info">
          <span className="eyebrow">Apresentacao</span>
          <h2>O que voce vai desenvolver</h2>
          <p>{conteudo.descricao}</p>
          <p>{conteudo.destaque}</p>
          <div className="professor-card">
            <span>{iniciaisProfessores}</span>
            <div>
              <strong>{professoresTexto}</strong>
              <small>Professor(es) responsavel(is) pelos videos selecionados para este conteudo.</small>
            </div>
          </div>
        </article>

        <aside className="curso-modulos-sidebar">
          <ModulosAccordion
            conteudo={conteudo}
            progressoCursos={progressoCursos}
            cursoRelacionadoDoModulo={conteudo.tipoConteudo === 'trilha' ? cursoRelacionadoDoModulo : undefined}
            mostrarQuiz={conteudo.tipoConteudo === 'trilha'}
          />
        </aside>
      </main>
      <section className="projeto-pratico-secao" data-mentor-pagina-section="projeto-pratico">
        <div className="secao-cabecalho">
          <span className="eyebrow">Transforme estudo em evidência</span>
          <h2>{conteudo.tipoConteudo === 'trilha' ? 'Projeto final sugerido para esta trilha' : 'Projeto para praticar este curso'}</h2>
          <p>Adicione como planejado, desenvolva no seu ritmo e registre GitHub ou deploy quando tiver uma entrega real.</p>
        </div>
        <ProjetoPraticoCard projeto={projetoSugerido} adicionado={projetoAdicionado} onAdicionar={adicionarProjeto} />
      </section>
      <MentorPaginaAlunoToast
        mensagens={[
          {
            id: 'conteudo-aberto',
            titulo: orientacaoContextual?.titulo,
            msg: orientacaoContextual?.resumo,
            detalhe: orientacaoContextual?.detalhe,
          },
          {
            id: 'conteudo-projeto-pratico',
            titulo: 'Transforme estudo em evidência',
            msg: 'Depois deste conteúdo, crie um projeto pequeno para praticar. Ele começa como planejado e só vira evidência quando você realmente desenvolver e documentar.',
            detalhe: `O projeto sugerido é “${projetoSugerido.titulo}”. Ele foi adaptado ao conteúdo e ao seu nível atual.`,
          },
        ]}
        orientacaoContextual={orientacaoContextual}
      />
    </section>
  )
}
