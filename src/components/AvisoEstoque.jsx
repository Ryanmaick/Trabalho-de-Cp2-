import { useState } from 'react'
import { emailValido, jaEstaNaLista, normalizarEmail } from '../utils/listaEspera'

// Formulário "Avisar quando voltar" para produtos esgotados
export default function AvisoEstoque({ produto, listaEspera, onAvisar }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [erros, setErros] = useState({})
  const [confirmado, setConfirmado] = useState('')

  function enviar(evento) {
    evento.preventDefault()
    const novosErros = {}

    if (nome.trim() === '') {
      novosErros.nome = 'Informe seu nome.'
    }
    if (email.trim() === '') {
      novosErros.email = 'Informe seu e-mail.'
    } else if (!emailValido(email)) {
      novosErros.email = 'E-mail inválido.'
    } else if (jaEstaNaLista(listaEspera, produto.id, email)) {
      novosErros.email = 'Este e-mail já está na lista deste produto.'
    }

    setErros(novosErros)
    setConfirmado('')
    if (Object.keys(novosErros).length > 0) return

    onAvisar({ produtoId: produto.id, nome: nome.trim(), email: normalizarEmail(email) })
    setConfirmado(normalizarEmail(email))
    setNome('')
    setEmail('')
  }

  return (
    <form className="aviso-estoque" onSubmit={enviar} noValidate>
      <h2 className="aviso-estoque-titulo">Esgotado no momento</h2>
      <p className="aviso-estoque-texto">Deixe seus dados e avisamos quando o produto voltar.</p>

      <label className="rotulo" htmlFor="aviso-nome">
        Nome
      </label>
      <input
        id="aviso-nome"
        value={nome}
        onChange={(evento) => setNome(evento.target.value)}
        aria-invalid={Boolean(erros.nome)}
      />
      {erros.nome && <p className="campo-erro">{erros.nome}</p>}

      <label className="rotulo" htmlFor="aviso-email">
        E-mail
      </label>
      <input
        id="aviso-email"
        type="email"
        value={email}
        onChange={(evento) => setEmail(evento.target.value)}
        aria-invalid={Boolean(erros.email)}
      />
      {erros.email && <p className="campo-erro">{erros.email}</p>}

      <button className="botao botao-secundario">Avisar quando voltar</button>

      {confirmado && (
        <p className="aviso-estoque-ok">Pronto. Vamos avisar em {confirmado} quando voltar.</p>
      )}
    </form>
  )
}
