import { AlertCircle, CheckCircle2, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

export function RadarProntidaoCard({ prontidao, compacto = false, mostrarChecklist = false, titulo = 'Radar de candidatura', onMelhorar, children }) {
  if (!prontidao) return null
  return (
    <section className={`radar-prontidao-card ${compacto ? 'radar-prontidao-compacto' : ''}`}>
      <header>
        <div><span className="eyebrow">{titulo}</span><h2>{prontidao.titulo}</h2><p>{prontidao.resumo}</p></div>
        <strong>{prontidao.score}%<small>{prontidao.nivel}</small></strong>
      </header>
      <div className="radar-prontidao-barra"><span style={{ width: `${prontidao.score}%` }} /></div>
      {!compacto && (
        <>
          <div className="radar-prontidao-grid">
            <section><h3><CheckCircle2 size={16} /> Pontos fortes</h3><ul>{prontidao.pontosFortes.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section><h3><AlertCircle size={16} /> Falta fortalecer</h3><ul>{prontidao.lacunas.slice(0, 5).map((item) => <li key={item.titulo}>{item.titulo}</li>)}</ul></section>
          </div>
          {!!prontidao.recomendacoes?.projetos?.length && (
            <div className="radar-recomendacoes">
              <strong>Recomendações para avançar</strong>
              <div>
                {prontidao.recomendacoes.projetos.slice(0, 1).map((projeto) => <span key={projeto.id}>Projeto: {projeto.titulo}</span>)}
                {prontidao.recomendacoes.cursos?.slice(0, 1).map((curso) => <Link key={curso.id} to={`/aluno/cursos/${curso.id}`}>Curso: {curso.titulo}</Link>)}
                {prontidao.recomendacoes.trilhas?.slice(0, 1).map((trilha) => <Link key={trilha.id} to={`/aluno/cursos/${trilha.id}`}>Trilha: {trilha.titulo}</Link>)}
              </div>
            </div>
          )}
        </>
      )}
      {mostrarChecklist && (
        <div className="radar-checklist">
          <strong>Antes de se candidatar</strong>
          {prontidao.checklist.map((item) => (
            <span className={item.concluido ? 'concluido' : 'pendente'} key={item.id}>
              {item.concluido ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />} {item.label}
            </span>
          ))}
          {prontidao.projetoSugerido && <span className="radar-projeto-sugerido"><Target size={14} /> Projeto sugerido: {prontidao.projetoSugerido.titulo}</span>}
          <small>O radar orienta, mas não bloqueia sua candidatura.</small>
        </div>
      )}
      <div className="radar-proxima-acao">
        <Target size={18} />
        <div><span>Próxima melhor ação</span><strong>{prontidao.proximaAcao.titulo}</strong><p>{prontidao.proximaAcao.descricao}</p></div>
      </div>
      <footer>
        {onMelhorar ? (
          <button className="botao botao-secondary" type="button" onClick={() => onMelhorar(prontidao.proximaAcao)}>
            Corrigir agora
          </button>
        ) : (
          prontidao.proximaAcao.rota && <Link className="botao botao-secondary" to={prontidao.proximaAcao.rota}>Corrigir agora</Link>
        )}
        {children}
      </footer>
    </section>
  )
}
