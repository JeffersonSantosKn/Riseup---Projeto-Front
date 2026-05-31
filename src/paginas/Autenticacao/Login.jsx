import { useState } from 'react'
import { LockKeyhole, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contextos/AppContext'
import ilustracaoCadastro3 from '../../ativos/imagens/imagem-teste-9.png'
import ilustracaoCadastro4 from '../../ativos/imagens/imagem-teste-8.png'

const estadoRecuperacaoInicial = {
  email: '',
  senha: '',
  repetirSenha: '',
}

function senhaValida(senha) {
  return senha.length >= 8 && /[A-Z]/.test(senha) && /[^A-Za-z0-9]/.test(senha)
}

export function Login() {
  const navigate = useNavigate()
  const { login, redefinirSenha } = useApp()
  const [form, setForm] = useState({ email: '', senha: '' })
  const [recuperacao, setRecuperacao] = useState(estadoRecuperacaoInicial)
  const [modoRecuperacao, setModoRecuperacao] = useState(false)
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function atualizarRecuperacao(campo, valor) {
    setRecuperacao((atual) => ({ ...atual, [campo]: valor }))
  }

  function enviar(evento) {
    evento.preventDefault()
    setErro('')
    setMensagem('')

    const resposta = login(form.email, form.senha)
    if (!resposta.ok) {
      setErro(resposta.mensagem)
      return
    }

    navigate(resposta.usuario.tipo === 'empresa' ? '/empresa/painel' : '/aluno/painel')
  }

  function enviarRecuperacao(evento) {
    evento.preventDefault()
    setErro('')
    setMensagem('')

    if (!recuperacao.email || !recuperacao.senha || !recuperacao.repetirSenha) {
      setErro('Preencha o e-mail e a nova senha.')
      return
    }

    if (recuperacao.senha !== recuperacao.repetirSenha) {
      setErro('As senhas precisam ser iguais.')
      return
    }

    if (!senhaValida(recuperacao.senha)) {
      setErro('Use uma senha com pelo menos 8 caracteres, uma letra maiúscula e um símbolo.')
      return
    }

    const resposta = redefinirSenha({ email: recuperacao.email, senha: recuperacao.senha })
    if (!resposta.ok) {
      setErro(resposta.mensagem)
      return
    }

    setMensagem(resposta.mensagem)
    setForm({ email: recuperacao.email, senha: '' })
    setRecuperacao(estadoRecuperacaoInicial)
    setModoRecuperacao(false)
  }

  return (
    <section className="auth-html login-page-html">
      <div className="login-hero-html">
        <div className="login-headline-html">
          <h1>
            Seu próximo passo profissional começa <br /> <span className="destaque-login">aqui.</span>
          </h1>
          <p>
            <span className="destaque-login-2">Transforme experiência em novas oportunidades.</span>
          </p>
        </div>

        <div className="login-illustration-html">
          <img src={ilustracaoCadastro4} alt="Ilustração de pessoa estudando com tecnologia" />
        </div>

        <div className="login-illustration-html-center">
          <img src={ilustracaoCadastro3} alt="Ilustração de pessoa usando notebook" />
        </div>

        <form className="login-card-html" onSubmit={modoRecuperacao ? enviarRecuperacao : enviar}>
          <h2>{modoRecuperacao ? 'Recuperar senha' : 'Login'}</h2>
          <p className="subtitle-html">
            {modoRecuperacao ? 'Crie uma nova senha para sua conta cadastrada' : 'Entre para continuar sua jornada'}
          </p>

          {!modoRecuperacao ? (
            <>
              <label className="field-label-html" htmlFor="login-email">
                E-mail
              </label>
              <div className="input-wrap-html">
                <span>
                  <Mail size={16} color="#1a6bff" />
                </span>
                <input
                  id="login-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => atualizar('email', e.target.value)}
                  placeholder="voce@email.com"
                  autoComplete="email"
                  required
                />
              </div>

              <label className="field-label-html" htmlFor="login-senha">
                Senha
              </label>
              <div className="input-wrap-html">
                <span>
                  <LockKeyhole size={16} color="#1a6bff" />
                </span>
                <input
                  id="login-senha"
                  type="password"
                  value={form.senha}
                  onChange={(e) => atualizar('senha', e.target.value)}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <label className="field-label-html" htmlFor="recuperar-email">
                E-mail cadastrado
              </label>
              <div className="input-wrap-html">
                <span>
                  <Mail size={16} color="#1a6bff" />
                </span>
                <input
                  id="recuperar-email"
                  type="email"
                  value={recuperacao.email}
                  onChange={(e) => atualizarRecuperacao('email', e.target.value)}
                  placeholder="voce@email.com"
                  autoComplete="email"
                  required
                />
              </div>

              <label className="field-label-html" htmlFor="recuperar-senha">
                Nova senha
              </label>
              <div className="input-wrap-html">
                <span>
                  <LockKeyhole size={16} color="#1a6bff" />
                </span>
                <input
                  id="recuperar-senha"
                  type="password"
                  value={recuperacao.senha}
                  onChange={(e) => atualizarRecuperacao('senha', e.target.value)}
                  placeholder="Mínimo 8 caracteres, letra maiúscula e símbolo"
                  autoComplete="new-password"
                  required
                />
              </div>

              <label className="field-label-html" htmlFor="recuperar-repetir-senha">
                Repetir nova senha
              </label>
              <div className="input-wrap-html">
                <span>
                  <LockKeyhole size={16} color="#1a6bff" />
                </span>
                <input
                  id="recuperar-repetir-senha"
                  type="password"
                  value={recuperacao.repetirSenha}
                  onChange={(e) => atualizarRecuperacao('repetirSenha', e.target.value)}
                  placeholder="Repita a nova senha"
                  autoComplete="new-password"
                  required
                />
              </div>
            </>
          )}

          {erro && <p className="error-visible-html">{erro}</p>}
          {mensagem && <p className="success-visible-html">{mensagem}</p>}

          <button
            type="button"
            className="forgot-html forgot-button-html"
            onClick={() => {
              setErro('')
              setMensagem('')
              setModoRecuperacao((atual) => !atual)
            }}
          >
            {modoRecuperacao ? 'Voltar para o login' : 'Esqueceu a senha?'}
          </button>

          <button className="btn-submit-html" type="submit">
            {modoRecuperacao ? 'Salvar nova senha' : 'Entrar'}
          </button>
        </form>
      </div>
    </section>
  )
}
