import { BriefcaseBusiness, CheckCircle2, MapPin, MessageSquare } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Badge } from '../../../componentes/interface/Badge'
import { Botao } from '../../../componentes/interface/Botao'
import { RadarProntidaoCard } from '../../../componentes/candidaturas/RadarProntidaoCard'
import { useApp } from '../../../contextos/AppContext'
import { gerarRetornoCandidaturaAluno } from '../../../servicos/retornoCandidaturaAluno'
import { calcularProntidaoParaVaga } from '../../../servicos/prontidaoCandidatura'

export function DetalheVaga() {
  const { vagaId } = useParams()
  const { empresas, usuarioAtual, candidaturas, vagasEmpresa, candidatar, cancelarCandidatura } = useApp()
  const vaga = vagasEmpresa.find((item) => item.id === vagaId)
  const empresa = empresas.find((item) => item.id === vaga?.empresaId)
  const candidatura = candidaturas.find((item) => item.vagaId === vagaId && item.alunoId === usuarioAtual?.id)
  const retornoCandidatura = candidatura ? gerarRetornoCandidaturaAluno({ candidatura, vaga, empresa }) : null
  const prontidaoVaga = vaga ? calcularProntidaoParaVaga({ aluno: usuarioAtual, vaga }) : null

  if (!vaga) return <section className="pagina">Vaga nao encontrada.</section>

  return (
    <section className="pagina detalhe-vaga">
      <div className="vaga-hero">
        <div>
          <Badge tone={vaga.status === 'ativa' ? 'success' : 'neutral'}>{vaga.status}</Badge>
          <h1>{vaga.titulo}</h1>
          <p>{vaga.descricao}</p>
          <div className="meta-linha grande">
            <span>
              <BriefcaseBusiness size={18} />
              {vaga.tipo} · {vaga.nivel}
            </span>
            <span>
              <MapPin size={18} />
              {vaga.localizacao} · {vaga.modalidade}
            </span>
            <span>{vaga.salario}</span>
          </div>
          <RadarProntidaoCard prontidao={prontidaoVaga} compacto mostrarChecklist titulo="Prontidão para esta vaga" />
          <div className="linha-acoes">
            {candidatura ? (
              <Botao variant="secondary" onClick={() => cancelarCandidatura(vaga.id)}>
                Cancelar candidatura
              </Botao>
            ) : (
              <Botao disabled={vaga.status !== 'ativa'} onClick={() => candidatar(vaga.id)}>
                Candidatar-se
              </Botao>
            )}
            <Botao variant="ghost" disabled={!candidatura}>
              <MessageSquare size={18} /> Chat com recrutador
            </Botao>
          </div>
          {candidatura && (
            <div className="candidatura-status-discreto">
              <CheckCircle2 />
              <div>
                <strong>{retornoCandidatura.status.rotulo}</strong>
                <span>Candidatura atualizada em {candidatura.atualizadoEm}</span>
              </div>
            </div>
          )}
        </div>
        <aside className="empresa-box detalhe-vaga-empresa">
          <div
            className="detalhe-vaga-empresa-capa"
            style={
              empresa?.capaUrl
                ? { backgroundImage: `linear-gradient(120deg, rgba(15, 23, 42, 0.12), rgba(15, 23, 42, 0.48)), url(${empresa.capaUrl})` }
                : { background: empresa?.capa || 'linear-gradient(120deg, #0f172a, #2563eb)' }
            }
          >
            <span className="detalhe-vaga-empresa-logo">
              {empresa?.logoUrl ? <img src={empresa.logoUrl} alt={`Logo da ${empresa.nome}`} /> : empresa?.logo || 'UP'}
            </span>
          </div>
          <div className="detalhe-vaga-empresa-conteudo">
            <h3>{empresa?.nome}</h3>
            <p>{empresa?.descricao}</p>
            <small>{empresa?.localizacao}</small>
          </div>
        </aside>
      </div>

      <div className="grade-2">
        <section className="info-card">
          <h2>Requisitos</h2>
          <ul className="lista-check compacta">
            {vaga.requisitos.map((item) => (
              <li key={item}>
                <CheckCircle2 /> {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="info-card">
          <h2>Atividades</h2>
          <ul className="lista-check compacta">
            {vaga.atividades.map((item) => (
              <li key={item}>
                <CheckCircle2 /> {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}
