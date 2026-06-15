import { CheckCircle2, Clipboard, Code2, ExternalLink, Rocket, X } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'

export function ProjetoPraticoCard({ projeto, onAdicionar, adicionado = false, compacto = false }) {
  const [detalhesAbertos, setDetalhesAbertos] = useState(false)
  const [copiado, setCopiado] = useState(false)

  async function copiarRoteiro() {
    const roteiro = [
      projeto.titulo,
      `Objetivo: ${projeto.objetivo}`,
      '',
      'Passos:',
      ...projeto.passos.map((passo) => `- ${passo}`),
      '',
      'Entregáveis:',
      ...projeto.entregaveis.map((item) => `- ${item}`),
    ].join('\n')
    await navigator.clipboard.writeText(roteiro)
    setCopiado(true)
  }

  return (
    <>
      <article className={`projeto-pratico-card ${compacto ? 'projeto-pratico-card-compacto' : ''}`}>
        <span className="eyebrow">{projeto.origem === 'trilha' ? 'Projeto final sugerido' : 'Projeto para praticar'}</span>
        <h3>{projeto.titulo}</h3>
        <p>{projeto.objetivo}</p>
        <div className="projeto-pratico-meta"><span>{projeto.area}</span><span>{projeto.nivel}</span></div>
        <div className="projeto-pratico-tags">{projeto.tecnologias.slice(0, 5).map((item) => <span key={item}>{item}</span>)}</div>
        <div className="projeto-pratico-acoes">
          <button className="botao botao-secondary" type="button" onClick={() => setDetalhesAbertos(true)}>Ver detalhes</button>
          <button className="botao botao-primary" type="button" disabled={adicionado} onClick={() => onAdicionar?.(projeto)}>
            <Rocket size={16} /> {adicionado ? 'Adicionado como planejado' : 'Adicionar aos meus projetos'}
          </button>
        </div>
      </article>

      {detalhesAbertos && typeof document !== 'undefined' && createPortal(
        <div className="projeto-pratico-modal-overlay" role="presentation" onMouseDown={() => setDetalhesAbertos(false)}>
          <section className="projeto-pratico-modal" role="dialog" aria-modal="true" onMouseDown={(evento) => evento.stopPropagation()}>
            <header>
              <div><span className="eyebrow">Roteiro de projeto prático</span><h2>{projeto.titulo}</h2></div>
              <button type="button" aria-label="Fechar detalhes" onClick={() => setDetalhesAbertos(false)}><X size={18} /></button>
            </header>
            <p className="projeto-pratico-aviso">Este é um projeto sugerido. Adicione ao perfil como planejado e atualize quando concluir.</p>
            <section><h3>Objetivo</h3><p>{projeto.objetivo}</p><p>{projeto.contexto}</p></section>
            <section><h3><Code2 size={17} /> Tecnologias</h3><div className="projeto-pratico-tags">{projeto.tecnologias.map((item) => <span key={item}>{item}</span>)}</div></section>
            <div className="projeto-pratico-modal-grid">
              <section><h3>Passos</h3><ol>{projeto.passos.map((item) => <li key={item}>{item}</li>)}</ol></section>
              <section><h3>Entregáveis</h3><ul>{projeto.entregaveis.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section><h3>Critérios de conclusão</h3><ul>{projeto.criteriosConclusao.map((item) => <li key={item}><CheckCircle2 size={14} /> {item}</li>)}</ul></section>
              <section><h3>Texto para currículo</h3><p>{projeto.textoParaCurriculo}</p></section>
            </div>
            <footer>
              <button className="botao botao-secondary" type="button" onClick={copiarRoteiro}><Clipboard size={16} /> {copiado ? 'Roteiro copiado' : 'Copiar roteiro'}</button>
              <button className="botao botao-primary" type="button" disabled={adicionado} onClick={() => onAdicionar?.(projeto)}>
                <ExternalLink size={16} /> {adicionado ? 'Adicionado como planejado' : 'Adicionar aos meus projetos'}
              </button>
            </footer>
          </section>
        </div>,
        document.body,
      )}
    </>
  )
}
