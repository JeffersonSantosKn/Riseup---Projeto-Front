import { useState } from 'react'
import { Building2, LockKeyhole, Mail, MapPin, SquareUserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../contextos/AppContext'
import ilustracaoCadastro from '../../ativos/imagens/imagem-teste-4.png'
import ilustracaoCadastro2 from '../../ativos/imagens/imagem-teste-2.png'

const formInicial = {
  nome: '',
  cnpj: '',
  email: '',
  repetirEmail: '',
  senha: '',
  repetirSenha: '',
  localizacao: '',
  site: '',
  descricao: '',
}

function senhaValida(senha) {
  return senha.length >= 8 && /[A-Z]/.test(senha) && /[^A-Za-z0-9]/.test(senha)
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function CadastroEmpresa() {
  const navigate = useNavigate()
  const { cadastrarEmpresa } = useApp()
  const [form, setForm] = useState(formInicial)
  const [erro, setErro] = useState('')

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function enviar(evento) {
    evento.preventDefault()
    setErro('')

    if (!form.nome || !form.cnpj || !form.email || !form.repetirEmail || !form.senha || !form.repetirSenha) {
      return setErro('Preencha todos os campos obrigatórios.')
    }

    if (!emailValido(form.email)) return setErro('Informe um e-mail corporativo válido.')
    if (form.email !== form.repetirEmail) return setErro('Os e-mails precisam ser iguais.')
    if (form.senha !== form.repetirSenha) return setErro('As senhas precisam ser iguais.')
    if (!senhaValida(form.senha)) {
      return setErro('Use uma senha com pelo menos 8 caracteres, uma letra maiúscula e um símbolo.')
    }

    const resposta = cadastrarEmpresa({
      nome: form.nome.trim(),
      cnpj: form.cnpj.trim(),
      email: form.email,
      senha: form.senha,
      localizacao: form.localizacao.trim(),
      site: form.site.trim(),
      descricao: form.descricao.trim(),
    })

    if (!resposta.ok) {
      setErro(resposta.mensagem)
      return
    }

    navigate('/empresa/painel')
  }

  return (
    <section className="auth-html cadastro-page-html">
      <h1 className="cadastro-title-html">
        Cadastre sua empresa <span>e encontre novos talentos.</span>
      </h1>

      <div className="cadastro-container-layout">
        <div className="coluna-imagem lateral-esquerda">
          <img src={ilustracaoCadastro} alt="Ilustração de boas-vindas para empresas" />
        </div>

        <form className="cadastro-card-html" onSubmit={enviar}>
          <div className="tab-switch-html">
            <Link to="/cadastro/aluno">Aluno</Link>
            <button className="active" type="button">
              Empresa
            </button>
          </div>

          <label className="field-label-html" htmlFor="empresa-nome">
            Razão social
          </label>
          <div className="input-wrap-html">
            <span>
              <Building2 size={16} color="#1a6bff" />
            </span>
            <input id="empresa-nome" value={form.nome} onChange={(e) => atualizar('nome', e.target.value)} required />
          </div>

          <label className="field-label-html" htmlFor="empresa-cnpj">
            CNPJ
          </label>
          <div className="input-wrap-html">
            <span>
              <SquareUserRound size={16} color="#1a6bff" />
            </span>
            <input id="empresa-cnpj" value={form.cnpj} onChange={(e) => atualizar('cnpj', e.target.value)} required />
          </div>

          <label className="field-label-html" htmlFor="empresa-email">
            E-mail corporativo
          </label>
          <div className="input-wrap-html">
            <span>
              <Mail size={16} color="#1a6bff" />
            </span>
            <input
              id="empresa-email"
              type="email"
              value={form.email}
              onChange={(e) => atualizar('email', e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <label className="field-label-html" htmlFor="empresa-repetir-email">
            Repetir e-mail
          </label>
          <div className="input-wrap-html">
            <span>
              <Mail size={16} color="#1a6bff" />
            </span>
            <input
              id="empresa-repetir-email"
              type="email"
              value={form.repetirEmail}
              onChange={(e) => atualizar('repetirEmail', e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <label className="field-label-html" htmlFor="empresa-senha">
            Senha
          </label>
          <div className="input-wrap-html">
            <span>
              <LockKeyhole size={16} color="#1a6bff" />
            </span>
            <input
              id="empresa-senha"
              type="password"
              value={form.senha}
              onChange={(e) => atualizar('senha', e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="pw-strength-html">
            <span />
            <span />
            <span />
            <span />
          </div>

          <label className="field-label-html" htmlFor="empresa-repetir-senha">
            Repetir senha
          </label>
          <div className="input-wrap-html">
            <span>
              <LockKeyhole size={16} color="#1a6bff" />
            </span>
            <input
              id="empresa-repetir-senha"
              type="password"
              value={form.repetirSenha}
              onChange={(e) => atualizar('repetirSenha', e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <label className="field-label-html" htmlFor="empresa-localizacao">
            Localização
          </label>
          <div className="input-wrap-html">
            <span>
              <MapPin size={16} color="#1a6bff" />
            </span>
            <input
              id="empresa-localizacao"
              value={form.localizacao}
              onChange={(e) => atualizar('localizacao', e.target.value)}
              placeholder="Ex: Recife, PE"
            />
          </div>

          {erro && <p className="error-visible-html">{erro}</p>}
          <button className="btn-submit-html" type="submit">
            Cadastrar
          </button>
        </form>

        <div className="coluna-imagem lateral-direita">
          <img src={ilustracaoCadastro2} alt="Ilustração de boas-vindas para novas empresas" />
        </div>
      </div>
    </section>
  )
}
