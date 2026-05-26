import { Globe2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { Campo } from '../../../componentes/interface/Campo'
import { Avatar } from '../../../componentes/perfis/Avatar'
import { useApp } from '../../../contextos/AppContext'
import { contarCandidatosDaVaga } from '../../../servicos/candidaturas'

function listaParaTexto(valor) {
  return Array.isArray(valor) ? valor.join(', ') : valor || ''
}

function textoParaLista(valor) {
  if (Array.isArray(valor)) return valor.filter(Boolean)
  return String(valor || '')
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function dadosEmpresa(usuario) {
  return {
    nome: usuario?.nome || '',
    nomeOficial: usuario?.nomeOficial || usuario?.nome || '',
    descricao: usuario?.descricao || '',
    descricaoCurta: usuario?.descricaoCurta || '',
    setor: usuario?.setor || '',
    tamanho: usuario?.tamanho || '',
    sede: usuario?.sede || '',
    localizacao: usuario?.localizacao || '',
    hub: usuario?.hub || '',
    site: usuario?.site || '',
    instagram: usuario?.instagram || '',
    linkedin: usuario?.linkedin || '',
    youtube: usuario?.youtube || '',
    logo: usuario?.logo || '',
    logoUrl: usuario?.logoUrl || '',
    capa: usuario?.capa || '',
    capaUrl: usuario?.capaUrl || '',
    especialidades: listaParaTexto(usuario?.especialidades),
    stackDetalhes: listaParaTexto(usuario?.stackDetalhes),
    beneficios: listaParaTexto(usuario?.beneficios),
  }
}

function statusClasse(status) {
  return status === 'ativa' ? 'status-chip status-ativa' : 'status-chip status-encerrada'
}

function statusRotulo(status) {
  return status === 'ativa' ? 'Ativa' : 'Encerrada'
}

function classeModalidade(modalidade = '') {
  const texto = modalidade.toLowerCase()
  if (texto.includes('presencial')) return 'presencial'
  if (texto.includes('híbrido') || texto.includes('hibrido')) return 'hibrido'
  return 'remoto'
}

function previewEmpresa(form) {
  return {
    ...form,
    especialidades: textoParaLista(form.especialidades),
    stackDetalhes: textoParaLista(form.stackDetalhes),
    beneficios: textoParaLista(form.beneficios),
  }
}

export function PerfilEmpresa() {
  const navigate = useNavigate()
  const { usuarioAtual, atualizarEmpresa, vagasEmpresa, candidatos, candidaturas, logout } = useApp()
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState(() => dadosEmpresa(usuarioAtual))
  const perfil = previewEmpresa(form)
  const vagas = vagasEmpresa.filter((vaga) => vaga.empresaId === usuarioAtual?.id)

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function salvar() {
    const atualizado = {
      ...form,
      especialidades: textoParaLista(form.especialidades),
      stackDetalhes: textoParaLista(form.stackDetalhes),
      beneficios: textoParaLista(form.beneficios),
    }
    atualizarEmpresa(atualizado)
    setForm(dadosEmpresa(atualizado))
    setEditando(false)
  }

  function cancelar() {
    setForm(dadosEmpresa(usuarioAtual))
    setEditando(false)
  }

  function selecionarImagem(campo, evento) {
    const arquivo = evento.target.files?.[0]
    if (!arquivo) return
    const leitor = new FileReader()
    leitor.onload = () => atualizar(campo, leitor.result)
    leitor.readAsDataURL(arquivo)
  }

  function sair() {
    logout()
    navigate('/')
  }

  return (
    <section className="pagina perfil-empresa-page">
      <div className="perfil-empresa-hero" style={{ background: perfil.capaUrl ? undefined : perfil.capa || usuarioAtual?.capa }}>
        {perfil.capaUrl && <img className="empresa-capa-img" src={perfil.capaUrl} alt="" />}
        <div className="perfil-empresa-overlay">
          <Avatar texto={perfil.logo || 'EM'} imagem={perfil.logoUrl} grande />
          <div>
            <span className="eyebrow">Perfil da empresa</span>
            <h1>{perfil.nome}</h1>
            <p>{perfil.descricaoCurta || perfil.descricao}</p>
          </div>
          <div className="perfil-empresa-acoes">
            <Botao className="botao botao-primary botao-quadrado" onClick={() => setEditando(true)}>
              Atualizar perfil
            </Botao>
            <Botao className="botao botao-secondary botao-quadrado" variant="secondary" onClick={sair}>
              Sair
            </Botao>
          </div>
        </div>
      </div>

      <div className="perfil-empresa-conteudo">
        <section className="perfil-empresa-info-card perfil-empresa-sobre">
          <h2>Sobre</h2>
          <p>{perfil.descricao}</p>

          <div className="perfil-empresa-info-lista">
            {perfil.setor && (
              <div>
                <span>Setor</span>
                <strong>{perfil.setor}</strong>
              </div>
            )}
            {perfil.tamanho && (
              <div>
                <span>Tamanho</span>
                <strong>{perfil.tamanho}</strong>
              </div>
            )}
            {perfil.sede && (
              <div>
                <span>Sede</span>
                <strong>{perfil.sede}</strong>
              </div>
            )}
            {perfil.hub && (
              <div>
                <span>Hub principal</span>
                <strong>{perfil.hub}</strong>
              </div>
            )}
          </div>

          {(perfil.site || perfil.linkedin || perfil.instagram || perfil.youtube) && (
            <div className="perfil-empresa-links">
              {perfil.site && (
                <a href={perfil.site} target="_blank" rel="noreferrer" aria-label="Site oficial" title="Site oficial">
                  <Globe2 size={18} />
                </a>
              )}
              {perfil.linkedin && (
                <a href={perfil.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                  <span className="social-logo social-logo-linkedin">in</span>
                </a>
              )}
              {perfil.instagram && (
                <a href={perfil.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                  <span className="social-logo social-logo-instagram">◎</span>
                </a>
              )}
              {perfil.youtube && (
                <a href={perfil.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube">
                  <span className="social-logo social-logo-youtube">▶</span>
                </a>
              )}
            </div>
          )}
        </section>

        <aside className="perfil-empresa-info-card perfil-empresa-lateral">
          <h2>Stack e Cultura</h2>
          {!!perfil.especialidades.length && (
            <>
              <span className="perfil-empresa-label">Especialidades</span>
              <div className="perfil-empresa-chips">
                {perfil.especialidades.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </>
          )}
          {!!perfil.stackDetalhes.length && (
            <>
              <span className="perfil-empresa-label">Stack em prática</span>
              <ul>
                {perfil.stackDetalhes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
          {!!perfil.beneficios.length && (
            <>
              <span className="perfil-empresa-label">Diferenciais</span>
              <ul>
                {perfil.beneficios.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>

      {editando && (
        <section className="empresa-editar-perfil empresa-editar-inline">
          <header>
            <div>
              <span className="eyebrow">Editar</span>
              <h2>Atualizar perfil</h2>
              <p>Revise as informações sem sair da visualização pública do perfil.</p>
            </div>
            <button type="button" onClick={cancelar} aria-label="Fechar edição">
              Fechar
            </button>
          </header>

          <div className="empresa-editar-grid">
            <label className="empresa-upload-box">
              <span>Logo da empresa</span>
              <strong>Escolher logo</strong>
              <small>PNG ou JPG até 2MB</small>
              <input accept="image/*" type="file" onChange={(evento) => selecionarImagem('logoUrl', evento)} />
            </label>

            <label className="empresa-upload-box empresa-upload-bg">
              <span>Imagem de capa</span>
              <strong>Escolher capa</strong>
              <small>Use uma imagem ampla para o topo do perfil</small>
              <input accept="image/*" type="file" onChange={(evento) => selecionarImagem('capaUrl', evento)} />
            </label>

            <Campo label="Nome da empresa" value={form.nome} onChange={(e) => atualizar('nome', e.target.value)} />
            <Campo label="Nome oficial" value={form.nomeOficial} onChange={(e) => atualizar('nomeOficial', e.target.value)} />
            <Campo label="Logo em iniciais" value={form.logo} onChange={(e) => atualizar('logo', e.target.value)} />
            <Campo label="Setor" value={form.setor} onChange={(e) => atualizar('setor', e.target.value)} />
            <Campo label="Descrição curta" value={form.descricaoCurta} onChange={(e) => atualizar('descricaoCurta', e.target.value)} />
            <Campo label="Tamanho" value={form.tamanho} onChange={(e) => atualizar('tamanho', e.target.value)} />
            <Campo
              label="Descrição da empresa"
              textarea
              rows="5"
              value={form.descricao}
              onChange={(e) => atualizar('descricao', e.target.value)}
            />
            <Campo label="Sede" value={form.sede} onChange={(e) => atualizar('sede', e.target.value)} />
            <Campo label="Localização" value={form.localizacao} onChange={(e) => atualizar('localizacao', e.target.value)} />
            <Campo label="Hub principal" value={form.hub} onChange={(e) => atualizar('hub', e.target.value)} />
            <Campo label="Website" value={form.site} onChange={(e) => atualizar('site', e.target.value)} />
            <Campo label="LinkedIn" value={form.linkedin} onChange={(e) => atualizar('linkedin', e.target.value)} />
            <Campo label="Instagram" value={form.instagram} onChange={(e) => atualizar('instagram', e.target.value)} />
            <Campo label="YouTube" value={form.youtube} onChange={(e) => atualizar('youtube', e.target.value)} />
            <Campo
              label="Especialidades"
              textarea
              rows="3"
              value={form.especialidades}
              onChange={(e) => atualizar('especialidades', e.target.value)}
            />
            <Campo
              label="Stack em prática"
              textarea
              rows="4"
              value={form.stackDetalhes}
              onChange={(e) => atualizar('stackDetalhes', e.target.value)}
            />
            <Campo
              label="Diferenciais"
              textarea
              rows="3"
              value={form.beneficios}
              onChange={(e) => atualizar('beneficios', e.target.value)}
            />
          </div>

          <div className="empresa-editar-acoes">
            <Botao variant="secondary" onClick={cancelar}>
              Cancelar
            </Botao>
            <Botao onClick={salvar}>Atualizar perfil</Botao>
          </div>
        </section>
      )}

      <section className="perfil-empresa-vagas">
        <div className="secao-cabecalho linha">
          <h2>Vagas divulgadas</h2>
          <Botao className="botao botao-secondary botao-quadrado" to="/empresa/gerenciar-vagas" variant="secondary">
            Gerenciar vagas
          </Botao>
        </div>
        <div className="perfil-empresa-vagas-grid">
          {vagas.map((vaga) => {
            const total = contarCandidatosDaVaga(vaga.id, candidatos, candidaturas)

            return (
              <Link className="perfil-empresa-vaga-card empresa-mini-job-card" key={vaga.id} to={`/empresa/vagas/${vaga.id}/candidatos`}>
                <header>
                  <div className="empresa-job-badges">
                    <span className="empresa-job-badge-status">{statusRotulo(vaga.status)}</span>
                    <span className={`empresa-job-badge-${classeModalidade(vaga.modalidade)}`}>{vaga.modalidade}</span>
                    <span>{vaga.tipo}</span>
                    <span>{vaga.nivel}</span>
                  </div>
                  <h3>{vaga.titulo}</h3>
                  <small>{vaga.salario || 'A combinar'}</small>
                </header>
                <p>{vaga.descricao}</p>
                <footer>
                  <strong>{total} {total === 1 ? 'candidato' : 'candidatos'}</strong>
                  <b className={statusClasse(vaga.status)}>{statusRotulo(vaga.status)}</b>
                </footer>
              </Link>
            )
          })}
        </div>
      </section>
    </section>
  )
}
