import { get } from './api'

// Formato dos produtos documentado em docs/api.md

// A API nem sempre devolve o preço como número ("89,90", "R$ 89,90", null...).
// Converte para número ou devolve null quando o preço não está definido.
function lerPreco(valor) {
  if (typeof valor === 'number') {
    return Number.isFinite(valor) && valor > 0 ? valor : null
  }

  if (typeof valor === 'string') {
    let texto = valor.replace(/[^\d.,]/g, '')
    const ultimaVirgula = texto.lastIndexOf(',')
    const ultimoPonto = texto.lastIndexOf('.')

    if (ultimaVirgula > ultimoPonto) {
      // "1.299,90" ou "89,90": a vírgula é o separador de centavos
      texto = texto.replace(/\./g, '').replace(',', '.')
    } else if (ultimoPonto > ultimaVirgula) {
      // "1,299.90" ou "89.90": o ponto é o separador de centavos
      texto = texto.replace(/,/g, '')
    }

    const numero = Number(texto)
    return texto !== '' && Number.isFinite(numero) && numero > 0 ? numero : null
  }

  return null
}

// Deixa cada produto no formato que o resto da loja espera.
// Regra de negócio: produto sem preço válido não pode ser vendido (semPreco).
function normalizarProduto(produto) {
  const price = lerPreco(produto.price)
  const precoOriginal = lerPreco(produto.precoOriginal)
  const estoque = Number(produto.estoque)

  return {
    ...produto,
    id: String(produto.id),
    price,
    precoOriginal: precoOriginal !== null && price !== null && precoOriginal > price ? precoOriginal : null,
    semPreco: price === null,
    estoque: Number.isFinite(estoque) && estoque > 0 ? estoque : 0,
    rating: {
      rate: Number(produto.rating?.rate) || 0,
      count: Number(produto.rating?.count) || 0,
    },
  }
}

export function buscarProdutos() {
  return get('/products.json').then((dados) => dados.map(normalizarProduto))
}
