/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import { empresas as empresasBase } from '../dados/empresas'
import { candidatosMock, criarCandidatosDemoEmpresa, criarVagaDemoEmpresa, vagas as vagasBase } from '../dados/vagas'
import { usuarios as usuariosBase } from '../dados/usuarios'
import { lerStorage, removerStorage, salvarStorage } from '../servicos/storage'

const AppContext = createContext(null)

const candidaturaInicial = [
  {
    id: 'cand-app-demo-lucas-devops',
    vagaId: 'vaga-1',
    alunoId: 'aluno-1',
    status: 'Em análise',
    atualizadoEm: '10/06/2026 09:00:00',
  },
  {
    id: 'cand-app-demo-lucas-frontend',
    vagaId: 'vaga-6',
    alunoId: 'aluno-1',
    status: 'Rejeitado',
    atualizadoEm: '11/06/2026 14:30:00',
    feedbackPublicoAluno:
      'Agradecemos sua candidatura. Neste momento, seguimos com perfis mais alinhados a Front-end, especialmente com mais evidências práticas em React e TypeScript. Recomendamos fortalecer projetos nessa stack e manter seu perfil atualizado para futuras oportunidades.',
    observacaoInterna:
      'Perfil interessante para DevOps, mas pouco alinhado à vaga Front-end atual. Considerar para vagas de Cloud ou infraestrutura.',
    motivoInterno: 'Pouca evidência prática em React e TypeScript',
  },
]

const DEMO_ALUNO_ID = 'aluno-1'
const DEMO_EMPRESA_ID = 'empresa-1'
const CONTAS_MOCK_LOGIN = new Set(['empresa-2'])
const CHAVE_RESET_WIZARD_DEMO = 'demoLucasWizardAtualizadoV1'
const CHAVE_DEMO_ALUNO_PERFIL = 'demoLucasPerfilEmEvolucaoCodayV4'
const CHAVE_EMPRESA_DEMO = 'demoNexaCloudEmpresaAtualizadaV2'
const CHAVE_VAGAS_DEMO = 'demoNexaCloudVagasAtualizadasV1'
const CHAVE_CANDIDATOS_DEMO = 'demoNexaCloudCandidatosLucasEmEvolucaoV4'
const CHAVE_DEMO_CANDIDATURAS = 'demoLucasCandidaturasAtualizadasV1'
const VAGAS_MOCK_ANTIGAS = new Set(['vaga-2', 'vaga-3', 'vaga-4', 'vaga-5'])
const CANDIDATOS_MOCK_ANTIGOS = new Set([
  'cand-1',
  'cand-jefferson-avanade',
  'cand-app-demo-jefferson-avanade',
  'cand-3',
  'cand-4',
  'cand-5',
  'cand-6',
  'cand-7',
  'cand-8',
  'cand-9',
  'cand-10',
  'cand-11',
  'cand-12',
  'cand-13',
])

function empresaDemoBase() {
  return empresasBase.find((empresa) => empresa.id === DEMO_EMPRESA_ID)
}

function sincronizarEmpresaDemo(empresa) {
  const base = empresaDemoBase()
  if (!base || empresa?.id !== DEMO_EMPRESA_ID) return empresa

  return {
    ...empresa,
    ...base,
    tipo: empresa.tipo || 'empresa',
  }
}

function sincronizarEmpresaBase(empresa) {
  const base = empresasBase.find((item) => item.id === empresa?.id)
  if (!base) return empresa

  return {
    ...base,
    ...empresa,
    logo: base.logo || empresa.logo,
    logoUrl: base.logoUrl || empresa.logoUrl || '',
    capaUrl: base.capaUrl || empresa.capaUrl || '',
    capa: base.capa || empresa.capa || '',
    especialidades: Array.isArray(empresa.especialidades) && empresa.especialidades.length
      ? empresa.especialidades
      : base.especialidades || [],
    stackDetalhes: Array.isArray(empresa.stackDetalhes) && empresa.stackDetalhes.length
      ? empresa.stackDetalhes
      : base.stackDetalhes || [],
    beneficios: Array.isArray(empresa.beneficios) && empresa.beneficios.length ? empresa.beneficios : base.beneficios || [],
  }
}

function normalizarAluno(usuario) {
  if (!usuario || usuario.tipo !== 'aluno') return usuario

  const respostasWizard = usuario.respostasWizard && typeof usuario.respostasWizard === 'object' ? usuario.respostasWizard : {}
  const base = usuariosBase.find((aluno) => aluno.id === usuario.id)
  const perfilProfissionalBase = usuario.perfilProfissional && typeof usuario.perfilProfissional === 'object'
    ? usuario.perfilProfissional
    : {}

  return {
    ...usuario,
    fotoUrl: usuario.id === DEMO_ALUNO_ID ? base?.fotoUrl || usuario.fotoUrl || '' : usuario.fotoUrl || base?.fotoUrl || '',
    capaUrl: usuario.id === DEMO_ALUNO_ID ? base?.capaUrl || usuario.capaUrl || '' : usuario.capaUrl || base?.capaUrl || '',
    respostasWizard,
    wizardConcluido: Boolean(usuario.wizardConcluido || Object.keys(respostasWizard).length),
    cursosConcluidos: Array.isArray(usuario.cursosConcluidos) ? usuario.cursosConcluidos : [],
    certificados: Array.isArray(usuario.certificados) ? usuario.certificados : [],
    projetosPraticos: Array.isArray(usuario.projetosPraticos) ? usuario.projetosPraticos : [],
    progresso: usuario.progresso && typeof usuario.progresso === 'object' ? usuario.progresso : {},
    curriculo: usuario.curriculo && typeof usuario.curriculo === 'object' ? usuario.curriculo : {},
    perfilProfissional: {
      telefone: perfilProfissionalBase.telefone || '',
      linkedin: perfilProfissionalBase.linkedin || '',
      github: perfilProfissionalBase.github || '',
      portfolio: perfilProfissionalBase.portfolio || '',
      tecnologiasComNivel: perfilProfissionalBase.tecnologiasComNivel || '',
      idiomas: perfilProfissionalBase.idiomas || '',
      projetos: perfilProfissionalBase.projetos || '',
      formacoes: perfilProfissionalBase.formacoes || '',
      experiencias: perfilProfissionalBase.experiencias || '',
      certificadosExternos: perfilProfissionalBase.certificadosExternos || '',
      certificadosExternosArquivos: Array.isArray(perfilProfissionalBase.certificadosExternosArquivos) ? perfilProfissionalBase.certificadosExternosArquivos : [],
    },
  }
}

function sincronizarCandidatoBase(candidato) {
  const base = candidatosMock.find((item) => item.id === candidato?.id)
  if (!base) return candidato

  return {
    ...base,
    ...candidato,
    foto: candidato.foto || base.foto,
    fotoUrl: base.fotoUrl || candidato.fotoUrl || '',
    capaUrl: base.capaUrl || candidato.capaUrl || '',
    curriculo: {
      ...(base.curriculo || {}),
      ...(candidato.curriculo || {}),
      fotoUrl: base.curriculo?.fotoUrl || base.fotoUrl || candidato.curriculo?.fotoUrl || '',
    },
  }
}

function normalizarUsuarios(lista) {
  return Array.isArray(lista) ? lista.map((usuario) => normalizarAluno(usuario)) : []
}

function substituirAluno(lista, alunoAtualizado) {
  let encontrouAluno = false
  const listaAtualizada = lista.map((usuario) => {
    if (usuario.id !== alunoAtualizado.id) return usuario
    encontrouAluno = true
    return alunoAtualizado
  })

  return encontrouAluno ? listaAtualizada : [...listaAtualizada, alunoAtualizado]
}

function criarIdAluno() {
  return globalThis.crypto?.randomUUID?.() || `usuario-${Date.now()}`
}

function criarIdEmpresa() {
  return globalThis.crypto?.randomUUID?.() || `empresa-${Date.now()}`
}

function normalizarEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function ehContaMockLogin(conta) {
  return CONTAS_MOCK_LOGIN.has(conta?.id)
}

function emailJaExiste(email, usuarios = [], empresas = []) {
  const alvo = normalizarEmail(email)
  return [...usuarios, ...empresas].some((conta) => normalizarEmail(conta.email) === alvo)
}

function carregarVagasIniciais() {
  const salvas = lerStorage('vagasEmpresa', null)
  if (!Array.isArray(salvas)) {
    salvarStorage(CHAVE_VAGAS_DEMO, true)
    return vagasBase
  }

  if (!lerStorage(CHAVE_VAGAS_DEMO, false)) {
    const idsBase = new Set(vagasBase.map((vaga) => vaga.id))
    const vagasCustomizadas = salvas.filter((vaga) => !idsBase.has(vaga.id) && !VAGAS_MOCK_ANTIGAS.has(vaga.id))
    const listaAtualizada = [...vagasBase, ...vagasCustomizadas]
    salvarStorage('vagasEmpresa', listaAtualizada)
    salvarStorage(CHAVE_VAGAS_DEMO, true)
    return listaAtualizada
  }

  const vagasLimpas = salvas.filter((vaga) => !VAGAS_MOCK_ANTIGAS.has(vaga.id))
  const idsSalvos = new Set(vagasLimpas.map((vaga) => vaga.id))
  const vagasBaseNovas = vagasBase.filter((vaga) => !idsSalvos.has(vaga.id) && !VAGAS_MOCK_ANTIGAS.has(vaga.id))
  const vagasNormalizadas = [...vagasLimpas, ...vagasBaseNovas].filter(Boolean)

  if (vagasNormalizadas.length !== salvas.length || vagasBaseNovas.length) {
    salvarStorage('vagasEmpresa', vagasNormalizadas)
  }

  return vagasNormalizadas
}

function carregarEmpresasIniciais() {
  const salvas = lerStorage('empresas', null)
  if (!Array.isArray(salvas)) {
    salvarStorage(CHAVE_EMPRESA_DEMO, true)
    return empresasBase
  }

  if (!lerStorage(CHAVE_EMPRESA_DEMO, false)) {
    const temEmpresaDemo = salvas.some((empresa) => empresa.id === DEMO_EMPRESA_ID)
    const listaComDemo = temEmpresaDemo
      ? salvas.map((empresa) => sincronizarEmpresaDemo(empresa))
      : [empresaDemoBase(), ...salvas].filter(Boolean)
    const listaComDemoNormalizada = listaComDemo.map((empresa) => sincronizarEmpresaBase(sincronizarEmpresaDemo(empresa)))
    const idsAtualizados = new Set(listaComDemoNormalizada.map((empresa) => empresa.id))
    const listaAtualizada = [
      ...listaComDemoNormalizada,
      ...empresasBase.filter((empresa) => !idsAtualizados.has(empresa.id)),
    ]

    salvarStorage('empresas', listaAtualizada)
    salvarStorage(CHAVE_EMPRESA_DEMO, true)
    return listaAtualizada
  }

  const temEmpresaDemo = salvas.some((empresa) => empresa.id === DEMO_EMPRESA_ID)
  const salvasComDemo = temEmpresaDemo ? salvas : [empresaDemoBase(), ...salvas].filter(Boolean)
  const salvasNormalizadas = salvasComDemo.map((empresa) => sincronizarEmpresaBase(sincronizarEmpresaDemo(empresa)))
  const idsSalvos = new Set(salvasNormalizadas.map((empresa) => empresa.id))
  const empresasBaseNovas = empresasBase.filter((empresa) => !idsSalvos.has(empresa.id))
  const listaFinal = [...salvasNormalizadas, ...empresasBaseNovas]

  if (!temEmpresaDemo || empresasBaseNovas.length || JSON.stringify(listaFinal) !== JSON.stringify(salvas)) {
    salvarStorage('empresas', listaFinal)
  }

  return listaFinal
}

function carregarCandidatosIniciais() {
  const salvos = lerStorage('candidatos', null)
  if (!Array.isArray(salvos)) {
    salvarStorage(CHAVE_CANDIDATOS_DEMO, true)
    return candidatosMock
  }

  if (!lerStorage(CHAVE_CANDIDATOS_DEMO, false)) {
    const idsBase = new Set(candidatosMock.map((candidato) => candidato.id))
    const customizados = salvos.filter(
      (candidato) => !idsBase.has(candidato.id) && !CANDIDATOS_MOCK_ANTIGOS.has(candidato.id) && candidato.vagaId,
    )
    const listaAtualizada = [...candidatosMock, ...customizados]
    salvarStorage('candidatos', listaAtualizada)
    salvarStorage(CHAVE_CANDIDATOS_DEMO, true)
    return listaAtualizada
  }

  const salvosLimpos = salvos.filter((candidato) => !CANDIDATOS_MOCK_ANTIGOS.has(candidato.id)).map(sincronizarCandidatoBase)
  const idsSalvos = new Set(salvosLimpos.map((candidato) => candidato.id))
  const novosBase = candidatosMock.filter((candidato) => !idsSalvos.has(candidato.id))
  const normalizados = [...salvosLimpos, ...novosBase]

  if (novosBase.length || salvosLimpos.length !== salvos.length) {
    salvarStorage('candidatos', normalizados)
  }

  return normalizados
}

function carregarCandidaturasIniciais() {
  const salvas = lerStorage('candidaturas', null)
  if (!Array.isArray(salvas)) {
    salvarStorage(CHAVE_DEMO_CANDIDATURAS, true)
    return candidaturaInicial
  }

  if (!lerStorage(CHAVE_DEMO_CANDIDATURAS, false)) {
    const idsDemo = new Set(candidaturaInicial.map((candidatura) => candidatura.id))
    const idsAntigos = new Set(['cand-app-demo-jefferson-avanade'])
    const customizadas = salvas.filter((candidatura) => !idsDemo.has(candidatura.id) && !idsAntigos.has(candidatura.id))
    const atualizadas = [...candidaturaInicial, ...customizadas]
    salvarStorage('candidaturas', atualizadas)
    salvarStorage(CHAVE_DEMO_CANDIDATURAS, true)
    return atualizadas
  }

  return salvas
}

function carregarEstadoInicial() {
  const usuariosSalvos = lerStorage('usuarios', null)
  const usuariosSalvosNormalizados = Array.isArray(usuariosSalvos) ? usuariosSalvos : []
  const usuariosBaseComSalvos = usuariosBase.map((usuarioBase) => {
    const usuarioSalvo = usuariosSalvosNormalizados.find((usuario) => usuario.id === usuarioBase.id)
    return usuarioSalvo ? { ...usuarioBase, ...usuarioSalvo } : usuarioBase
  })
  const idsBase = new Set(usuariosBaseComSalvos.map((usuario) => usuario.id))
  const usuariosCustomizados = usuariosSalvosNormalizados.filter((usuario) => !idsBase.has(usuario.id))
  let usuarios = normalizarUsuarios([...usuariosBaseComSalvos, ...usuariosCustomizados]).filter(
    (usuario) => !ehContaMockLogin(usuario),
  )
  let usuarioAtual = lerStorage('usuarioAtual', null)

  if (!Array.isArray(usuariosSalvos) || JSON.stringify(usuarios) !== JSON.stringify(usuariosSalvos)) {
    salvarStorage('usuarios', usuarios)
  }

  if (lerStorage('wizard', null) !== null) {
    removerStorage('wizard')
  }

  if (ehContaMockLogin(usuarioAtual)) {
    usuarioAtual = null
    removerStorage('usuarioAtual')
  }

  if (usuarioAtual?.id === DEMO_EMPRESA_ID) {
    usuarioAtual = { ...usuarioAtual, ...empresaDemoBase(), tipo: 'empresa' }
    salvarStorage('usuarioAtual', usuarioAtual)
  }

  if (!lerStorage(CHAVE_RESET_WIZARD_DEMO, false)) {
    const alunoDemoBase = usuariosBase.find((usuario) => usuario.id === DEMO_ALUNO_ID)
    usuarios = usuarios.map((usuario) =>
      usuario.id === DEMO_ALUNO_ID
        ? normalizarAluno({
            ...usuario,
            respostasWizard: alunoDemoBase?.respostasWizard || {},
            wizardConcluido: true,
          })
        : usuario,
    )
    salvarStorage('usuarios', usuarios)
    salvarStorage(CHAVE_RESET_WIZARD_DEMO, true)
  }

  if (!lerStorage(CHAVE_DEMO_ALUNO_PERFIL, false)) {
    const alunoDemoBase = usuariosBase.find((usuario) => usuario.id === DEMO_ALUNO_ID)

    if (alunoDemoBase) {
      usuarios = usuarios.map((usuario) =>
        usuario.id === DEMO_ALUNO_ID
          ? normalizarAluno({
              ...usuario,
              ...alunoDemoBase,
            })
          : usuario,
      )

      if (usuarioAtual?.id === DEMO_ALUNO_ID) {
        usuarioAtual = usuarios.find((usuario) => usuario.id === DEMO_ALUNO_ID) || usuarioAtual
        salvarStorage('usuarioAtual', usuarioAtual)
      }

      salvarStorage('usuarios', usuarios)
    }

    salvarStorage(CHAVE_DEMO_ALUNO_PERFIL, true)
  }

  if (usuarioAtual?.tipo === 'aluno') {
    const usuarioNaLista = usuarios.find((usuario) => usuario.id === usuarioAtual.id)
    if (usuarioNaLista) {
      usuarioAtual = normalizarAluno(usuarioNaLista)
    } else {
      usuarioAtual = null
      removerStorage('usuarioAtual')
    }
  }

  return { usuarios, usuarioAtual }
}

function normalizarLista(valor) {
  if (Array.isArray(valor)) return valor.filter(Boolean)
  return String(valor || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function normalizarTags(valor) {
  if (Array.isArray(valor)) return valor.map((tag) => String(tag).trim().toLowerCase()).filter(Boolean)
  return String(valor || '')
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
}

export function AppProvider({ children }) {
  const [estadoInicial] = useState(() => carregarEstadoInicial())
  const [usuarios, setUsuarios] = useState(() => estadoInicial.usuarios)
  const [empresas, setEmpresas] = useState(() => carregarEmpresasIniciais())
  const [usuarioAtual, setUsuarioAtual] = useState(() => estadoInicial.usuarioAtual)
  const [candidaturas, setCandidaturas] = useState(() => carregarCandidaturasIniciais())
  const [vagasEmpresa, setVagasEmpresa] = useState(() => carregarVagasIniciais())
  const [candidatos, setCandidatos] = useState(() => carregarCandidatosIniciais())

  function persistir(chave, setter) {
    return (valorOuFn) => {
      setter((atual) => {
        const proximo = typeof valorOuFn === 'function' ? valorOuFn(atual) : valorOuFn
        salvarStorage(chave, proximo)
        return proximo
      })
    }
  }

  const setUsuariosPersistido = persistir('usuarios', setUsuarios)
  const setEmpresasPersistido = persistir('empresas', setEmpresas)
  const setCandidaturasPersistidas = persistir('candidaturas', setCandidaturas)
  const setVagasPersistidas = persistir('vagasEmpresa', setVagasEmpresa)
  const setCandidatosPersistidos = persistir('candidatos', setCandidatos)

  function login(email, senha) {
    const emailNormalizado = normalizarEmail(email)
    const aluno = usuarios.find(
      (item) => !ehContaMockLogin(item) && normalizarEmail(item.email) === emailNormalizado && item.senha === senha,
    )
    const empresa = empresas.find(
      (item) => !ehContaMockLogin(item) && normalizarEmail(item.email) === emailNormalizado && item.senha === senha,
    )
    const conta = aluno ? normalizarAluno(aluno) : empresa ? { ...empresa, tipo: 'empresa' } : null

    if (!conta) {
      return { ok: false, mensagem: 'E-mail ou senha inválidos.' }
    }

    const contaAtualizada = conta

    if (contaAtualizada.tipo === 'aluno') {
      setUsuariosPersistido((lista) => substituirAluno(lista, contaAtualizada))
    }

    setUsuarioAtual(contaAtualizada)
    salvarStorage('usuarioAtual', contaAtualizada)
    return {
      ok: true,
      usuario: contaAtualizada,
      redirecionarPara:
        contaAtualizada.tipo === 'empresa'
          ? '/empresa/painel'
          : contaAtualizada.wizardConcluido
            ? '/aluno/painel'
            : '/aluno/questionario',
    }
  }

  function logout() {
    setUsuarioAtual(null)
    removerStorage('usuarioAtual')
  }

  function cadastrarAluno(dados) {
    if (emailJaExiste(dados.email, usuarios, empresas)) {
      return { ok: false, mensagem: 'Este e-mail já está cadastrado.' }
    }

    const novo = {
      ...dados,
      id: criarIdAluno(),
      tipo: 'aluno',
      email: normalizarEmail(dados.email),
      foto: dados.nome
        .split(' ')
        .slice(0, 2)
        .map((parte) => parte[0])
        .join('')
        .toUpperCase(),
      tecnologias: [],
      respostasWizard: {},
      wizardConcluido: false,
      cursosConcluidos: [],
      certificados: [],
      progresso: {},
      curriculo: {},
      perfilProfissional: {},
    }
    setUsuariosPersistido((lista) => [...lista, novo])
    setUsuarioAtual(novo)
    salvarStorage('usuarioAtual', novo)
    return { ok: true, usuario: novo }
  }

  function cadastrarEmpresa(dados) {
    if (emailJaExiste(dados.email, usuarios, empresas)) {
      return { ok: false, mensagem: 'Este e-mail já está cadastrado.' }
    }

    const nova = {
      id: criarIdEmpresa(),
      tipo: 'empresa',
      logo: dados.nome
        .split(' ')
        .slice(0, 2)
        .map((parte) => parte[0])
        .join('')
        .toUpperCase(),
      capa:
        'linear-gradient(120deg, rgba(15, 23, 42, 0.95), rgba(20, 184, 166, 0.72))',
      descricao: dados.descricao || '',
      localizacao: dados.localizacao || 'Brasil',
      site: dados.site || '',
      ...dados,
      email: normalizarEmail(dados.email),
    }
    const vagaDemo = criarVagaDemoEmpresa(nova.id)
    const candidatosDemo = criarCandidatosDemoEmpresa(vagaDemo.id)

    setEmpresasPersistido((lista) => [...lista, nova])
    setVagasPersistidas((lista) => [vagaDemo, ...lista])
    setCandidatosPersistidos((lista) => [...candidatosDemo, ...lista])
    setUsuarioAtual(nova)
    salvarStorage('usuarioAtual', nova)
    return { ok: true, usuario: nova }
  }

  function redefinirSenha({ email, senha }) {
    const emailNormalizado = normalizarEmail(email)
    const aluno = usuarios.find((item) => !ehContaMockLogin(item) && normalizarEmail(item.email) === emailNormalizado)
    const empresa = empresas.find((item) => !ehContaMockLogin(item) && normalizarEmail(item.email) === emailNormalizado)

    if (!aluno && !empresa) {
      return { ok: false, mensagem: 'Não encontramos uma conta cadastrada com este e-mail.' }
    }

    if (aluno) {
      setUsuariosPersistido((lista) =>
        lista.map((usuario) => (usuario.id === aluno.id ? { ...usuario, senha } : usuario)),
      )
    } else {
      setEmpresasPersistido((lista) =>
        lista.map((item) => (item.id === empresa.id ? { ...item, senha } : item)),
      )
    }

    return { ok: true, mensagem: 'Senha atualizada. Você já pode entrar com a nova senha.' }
  }

  function salvarWizard(respostas) {
    if (!usuarioAtual || usuarioAtual.tipo !== 'aluno') return

    const atualizado = normalizarAluno({
      ...usuarioAtual,
      respostasWizard: respostas,
      wizardConcluido: true,
    })

    setUsuarioAtual(atualizado)
    salvarStorage('usuarioAtual', atualizado)
    setUsuariosPersistido((lista) => substituirAluno(lista, atualizado))
  }

  function pularWizard() {
    if (!usuarioAtual || usuarioAtual.tipo !== 'aluno') return

    const atualizado = normalizarAluno({
      ...usuarioAtual,
      respostasWizard: {},
      wizardConcluido: true,
    })

    setUsuarioAtual(atualizado)
    salvarStorage('usuarioAtual', atualizado)
    setUsuariosPersistido((lista) => substituirAluno(lista, atualizado))
  }

  function alternarAula(aulaId) {
    if (!usuarioAtual || usuarioAtual.tipo !== 'aluno') return

    const progressoAtual = usuarioAtual.progresso && typeof usuarioAtual.progresso === 'object'
      ? usuarioAtual.progresso
      : {}
    const atualizado = normalizarAluno({
      ...usuarioAtual,
      progresso: {
        ...progressoAtual,
        [aulaId]: !progressoAtual[aulaId],
      },
    })

    setUsuarioAtual(atualizado)
    salvarStorage('usuarioAtual', atualizado)
    setUsuariosPersistido((lista) => substituirAluno(lista, atualizado))
  }

  function candidatar(vagaId) {
    const jaCandidatou = candidaturas.some((item) => item.vagaId === vagaId && item.alunoId === usuarioAtual?.id)
    if (jaCandidatou) return

    setCandidaturasPersistidas((lista) => [
      ...lista,
      {
        id: `cand-app-${Date.now()}`,
        vagaId,
        alunoId: usuarioAtual?.id || 'aluno-demo',
        status: 'Candidatura enviada',
        atualizadoEm: new Date().toLocaleString('pt-BR'),
        perfilSnapshot: usuarioAtual
          ? {
              nome: usuarioAtual.nome,
              titulo: usuarioAtual.titulo || usuarioAtual.cargoAtual,
              cargoAtual: usuarioAtual.cargoAtual,
              localizacao: usuarioAtual.localizacao,
              bio: usuarioAtual.bio,
              foto: usuarioAtual.foto,
              fotoUrl: usuarioAtual.fotoUrl,
              capaUrl: usuarioAtual.capaUrl,
              tecnologias: usuarioAtual.tecnologias,
              cursosConcluidos: usuarioAtual.cursosConcluidos,
              certificados: usuarioAtual.certificados,
              projetosPraticos: usuarioAtual.projetosPraticos,
              progresso: usuarioAtual.progresso,
              respostasWizard: usuarioAtual.respostasWizard,
            }
          : null,
      },
    ])
    setVagasPersistidas((lista) =>
      lista.map((vaga) => (vaga.id === vagaId ? { ...vaga, candidatos: Number(vaga.candidatos || 0) + 1 } : vaga)),
    )
  }

  function cancelarCandidatura(vagaId) {
    const tinhaCandidatura = candidaturas.some((item) => item.vagaId === vagaId && item.alunoId === usuarioAtual?.id)
    setCandidaturasPersistidas((lista) =>
      lista.filter((item) => !(item.vagaId === vagaId && item.alunoId === usuarioAtual?.id)),
    )
    if (tinhaCandidatura) {
      setVagasPersistidas((lista) =>
        lista.map((vaga) =>
          vaga.id === vagaId ? { ...vaga, candidatos: Math.max(0, Number(vaga.candidatos || 0) - 1) } : vaga,
        ),
      )
    }
  }

  function publicarVaga(dados) {
    const empresaId = usuarioAtual?.id || 'empresa-1'
    const nova = {
      id: `vaga-${Date.now()}`,
      empresaId,
      ...dados,
      status: 'ativa',
      publicadaEm: new Date().toISOString().slice(0, 10),
      candidatos: 0,
      tags: normalizarTags(dados.tags),
      requisitos: normalizarLista(dados.requisitos),
      atividades: normalizarLista(dados.atividades),
    }
    setVagasPersistidas((lista) => [nova, ...lista])
    return nova
  }
  function atualizarVaga(vagaId, dados) {
    const atualizada = {
      ...dados,
      tags: normalizarTags(dados.tags),
      requisitos: normalizarLista(dados.requisitos),
      atividades: normalizarLista(dados.atividades),
    }
    setVagasPersistidas((lista) =>
      lista.map((vaga) => (vaga.id === vagaId ? { ...vaga, ...atualizada } : vaga)),
    )
  }

  function atualizarStatusVaga(vagaId, status) {
    setVagasPersistidas((lista) => lista.map((vaga) => (vaga.id === vagaId ? { ...vaga, status } : vaga)))
  }

  function excluirVaga(vagaId) {
    setVagasPersistidas((lista) => lista.filter((vaga) => vaga.id !== vagaId))
  }

  function atualizarStatusCandidato(candidatoId, status, detalhes = {}) {
    const atualizacao = {
      status,
      ...detalhes,
      atualizadoEm: new Date().toLocaleString('pt-BR'),
    }
    setCandidatosPersistidos((lista) =>
      lista.map((candidato) => (candidato.id === candidatoId ? { ...candidato, ...atualizacao } : candidato)),
    )
    setCandidaturasPersistidas((lista) =>
      lista.map((candidatura) =>
        candidatura.id === candidatoId ? { ...candidatura, ...atualizacao } : candidatura,
      ),
    )
  }

  function atualizarEmpresa(dados) {
    if (!usuarioAtual) return
    const atualizada = { ...usuarioAtual, ...dados }
    setUsuarioAtual(atualizada)
    salvarStorage('usuarioAtual', atualizada)
    setEmpresasPersistido((lista) => lista.map((empresa) => (empresa.id === atualizada.id ? atualizada : empresa)))
  }

  function atualizarAluno(dados) {
    if (!usuarioAtual) return
    const atualizado = normalizarAluno({ ...usuarioAtual, ...dados })
    setUsuarioAtual(atualizado)
    salvarStorage('usuarioAtual', atualizado)
    setUsuariosPersistido((lista) => substituirAluno(lista, atualizado))
  }

  function adicionarProjetoPratico(projeto) {
    if (!usuarioAtual || usuarioAtual.tipo !== 'aluno' || !projeto) return
    const existentes = Array.isArray(usuarioAtual.projetosPraticos) ? usuarioAtual.projetosPraticos : []
    if (existentes.some((item) => item.templateId === projeto.templateId || item.id === projeto.id)) return
    atualizarAluno({ projetosPraticos: [...existentes, projeto] })
  }

  function atualizarProjetoPratico(projetoId, dados) {
    if (!usuarioAtual || usuarioAtual.tipo !== 'aluno') return
    const agora = new Date().toLocaleString('pt-BR')
    atualizarAluno({
      projetosPraticos: (usuarioAtual.projetosPraticos || []).map((projeto) =>
        projeto.id === projetoId ? { ...projeto, ...dados, atualizadoEm: agora } : projeto,
      ),
    })
  }

  const respostasWizard = usuarioAtual?.tipo === 'aluno' ? usuarioAtual.respostasWizard || {} : {}
  const progressoCursos = usuarioAtual?.tipo === 'aluno' ? usuarioAtual.progresso || {} : {}

  const valor = {
    usuarios,
    empresas,
    usuarioAtual,
    respostasWizard,
    progressoCursos,
    candidaturas,
    vagasEmpresa,
    candidatos,
    login,
    logout,
    cadastrarAluno,
    cadastrarEmpresa,
    redefinirSenha,
    salvarWizard,
    pularWizard,
    alternarAula,
    candidatar,
    cancelarCandidatura,
    publicarVaga,
    atualizarVaga,
    atualizarStatusVaga,
    excluirVaga,
    atualizarStatusCandidato,
    atualizarAluno,
    adicionarProjetoPratico,
    atualizarProjetoPratico,
    atualizarEmpresa,
  }

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>
}

export function useApp() {
  const contexto = useContext(AppContext)
  if (!contexto) throw new Error('useApp deve ser usado dentro de AppProvider')
  return contexto
}
