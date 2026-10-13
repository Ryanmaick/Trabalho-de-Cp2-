// O carrinho guarda uma entrada por unidade adicionada.
// Ex.: duas camisetas iguais = o mesmo produto duas vezes no array.

// Soma em centavos para não acumular erro de ponto flutuante (0.1 + 0.2)
export function arredondar(valor) {
  return Math.round(valor * 100) / 100
}

export function calcularTotal(carrinho) {
  const centavos = carrinho.reduce((total, produto) => {
    const preco = Number(produto.price)
    return Number.isFinite(preco) ? total + Math.round(preco * 100) : total
  }, 0)
  return centavos / 100
}

export function aplicarDesconto(total, desconto) {
  return arredondar(total * (1 - desconto))
}

export function quantidadeNoCarrinho(carrinho, produtoId) {
  return carrinho.filter((produto) => produto.id === produtoId).length
}

export function agruparItens(carrinho) {
  const itens = []
  carrinho.forEach((produto) => {
    const existente = itens.find((item) => item.produto.id === produto.id)
    if (existente) {
      existente.quantidade += 1
    } else {
      itens.push({ produto, quantidade: 1 })
    }
  })
  return itens
}
