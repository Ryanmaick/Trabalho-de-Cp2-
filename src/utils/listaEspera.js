// A lista de espera guarda uma entrada por pessoa e produto:
// { produtoId, nome, email }

export function normalizarEmail(email) {
  return email.trim().toLowerCase()
}

export function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function jaEstaNaLista(listaEspera, produtoId, email) {
  const emailNormalizado = normalizarEmail(email)
  return listaEspera.some(
    (entrada) => entrada.produtoId === produtoId && entrada.email === emailNormalizado
  )
}

// Produtos com gente esperando, do mais esperado para o menos esperado
export function agruparPorProduto(listaEspera, produtos) {
  const grupos = produtos
    .map((produto) => ({
      produto,
      inscritos: listaEspera.filter((entrada) => entrada.produtoId === produto.id),
    }))
    .filter((grupo) => grupo.inscritos.length > 0)

  return grupos.toSorted((a, b) => b.inscritos.length - a.inscritos.length)
}
