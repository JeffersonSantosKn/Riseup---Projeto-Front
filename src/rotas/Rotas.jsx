import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppLayout } from '../componentes/layout/AppLayout'
import { useApp } from '../contextos/AppContext'
import { modoApresentacao } from '../dados/usuarios'
import { Login } from '../paginas/Autenticacao/Login'
import { CadastroAluno } from '../paginas/Autenticacao/CadastroAluno'
import { CadastroEmpresa } from '../paginas/Autenticacao/CadastroEmpresa'
import { Cursos } from '../paginas/Aluno/Cursos/Cursos'
import { DetalheCurso } from '../paginas/Aluno/DetalheCurso/DetalheCurso'
import { DetalheVaga } from '../paginas/Aluno/DetalheVaga/DetalheVaga'
import { PainelAluno } from '../paginas/Aluno/Painel/PainelAluno'
import { PerfilAluno } from '../paginas/Aluno/Perfil/PerfilAluno'
import { PlayerCurso } from '../paginas/Aluno/PlayerCurso/PlayerCurso'
import { Questionario } from '../paginas/Aluno/Questionario/Questionario'
import { VagasAluno } from '../paginas/Aluno/Vagas/VagasAluno'
import { CriarVaga } from '../paginas/Empresa/CriarVaga/CriarVaga'
import { GerenciarVagas } from '../paginas/Empresa/GerenciarVagas/GerenciarVagas'
import { ListaCandidatos } from '../paginas/Empresa/ListaCandidatos/ListaCandidatos'
import { PainelEmpresa } from '../paginas/Empresa/Painel/PainelEmpresa'
import { PerfilEmpresa } from '../paginas/Empresa/PerfilEmpresa/PerfilEmpresa'
import { LandingPage } from '../paginas/LandingPage/LandingPage'
import { Coday } from '../paginas/Coday/Coday'

function Protegida({ children, tipo }) {
  const { usuarioAtual } = useApp()

  if (!usuarioAtual) return <Navigate to="/entrar" replace />
  if (tipo && usuarioAtual.tipo !== tipo) return <Navigate to="/" replace />
  return children
}

function AlunoIndexRedirect() {
  const { usuarioAtual } = useApp()
  return <Navigate to={usuarioAtual?.wizardConcluido ? '/aluno/painel' : '/aluno/questionario'} replace />
}

function RequerWizardAluno({ children }) {
  const { usuarioAtual } = useApp()
  if (!usuarioAtual?.wizardConcluido) return <Navigate to="/aluno/questionario" replace />
  return children
}

function LoginRoteado() {
  const location = useLocation()
  return <Login key={location.search || 'login-normal'} />
}

export function Rotas() {
  const apresentacaoAtiva = modoApresentacao.ativo

  return (
    <Routes>
      <Route path="coday" element={<Coday />} />

      <Route element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="entrar" element={<LoginRoteado />} />
        <Route path="cadastro/aluno" element={<CadastroAluno />} />
        <Route path="cadastro/empresa" element={apresentacaoAtiva ? <Navigate to="/" replace /> : <CadastroEmpresa />} />
      </Route>

      <Route
        path="aluno"
        element={
          <Protegida tipo="aluno">
            <AppLayout tipo="aluno" />
          </Protegida>
        }
      >
        <Route index element={<AlunoIndexRedirect />} />
        {apresentacaoAtiva ? (
          <>
            <Route path="questionario" element={<Questionario />} />
            <Route path="painel" element={<RequerWizardAluno><PainelAluno /></RequerWizardAluno>} />
            <Route path="cursos" element={<RequerWizardAluno><Cursos /></RequerWizardAluno>} />
            <Route path="*" element={<AlunoIndexRedirect />} />
          </>
        ) : (
          <>
            <Route path="questionario" element={<Questionario />} />
            <Route path="painel" element={<RequerWizardAluno><PainelAluno /></RequerWizardAluno>} />
            <Route path="cursos" element={<RequerWizardAluno><Cursos /></RequerWizardAluno>} />
            <Route path="cursos/:trilhaId" element={<RequerWizardAluno><DetalheCurso /></RequerWizardAluno>} />
            <Route path="cursos/:trilhaId/aula/:aulaId" element={<RequerWizardAluno><PlayerCurso /></RequerWizardAluno>} />
            <Route path="vagas" element={<RequerWizardAluno><VagasAluno /></RequerWizardAluno>} />
            <Route path="vagas/:vagaId" element={<RequerWizardAluno><DetalheVaga /></RequerWizardAluno>} />
            <Route path="perfil" element={<RequerWizardAluno><PerfilAluno /></RequerWizardAluno>} />
          </>
        )}
      </Route>

      {apresentacaoAtiva ? (
        <Route path="empresa/*" element={<Navigate to="/" replace />} />
      ) : (
        <Route
          path="empresa"
          element={
            <Protegida tipo="empresa">
              <AppLayout tipo="empresa" />
            </Protegida>
          }
        >
          <Route index element={<Navigate to="/empresa/painel" replace />} />
          <Route path="painel" element={<PainelEmpresa />} />
          <Route path="criar-vaga" element={<CriarVaga />} />
          <Route path="gerenciar-vagas" element={<GerenciarVagas />} />
          <Route path="vagas/:vagaId/editar" element={<CriarVaga />} />
          <Route path="vagas/:vagaId/candidatos" element={<ListaCandidatos />} />
          <Route path="perfil" element={<PerfilEmpresa />} />
        </Route>
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
