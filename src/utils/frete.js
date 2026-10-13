import { arredondar } from './carrinho'

// Campanha de frete grátis: compras acima de R$ 200 no valor final (já com cupom)
export const FRETE_GRATIS_MINIMO = 200

export function calcularFrete(totalFinal) {
  const gratis = totalFinal > FRETE_GRATIS_MINIMO

  // Com exatamente R$ 200,00 ainda não vale: falta 1 centavo
  const falta = gratis ? 0 : Math.max(0.01, arredondar(FRETE_GRATIS_MINIMO - totalFinal))

  const progresso = Math.min(100, Math.round((totalFinal / FRETE_GRATIS_MINIMO) * 100))

  return { gratis, falta, progresso }
}
