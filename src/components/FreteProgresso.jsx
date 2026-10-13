import { FRETE_GRATIS_MINIMO } from '../utils/frete'
import { formatarPreco } from '../utils/formatarPreco'

// Mostra quanto falta para o frete grátis (regra em utils/frete.js)
export default function FreteProgresso({ frete }) {
  return (
    <div className="frete">
      <p className={frete.gratis ? 'frete-texto frete-gratis' : 'frete-texto'}>
        {frete.gratis
          ? 'Esta compra tem frete grátis.'
          : `Faltam ${formatarPreco(frete.falta)} para o frete grátis.`}
      </p>
      <div
        className="frete-barra"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={frete.progresso}
        aria-label="Progresso para o frete grátis"
      >
        <div className="frete-barra-cheia" style={{ width: `${frete.progresso}%` }} />
      </div>
      <p className="frete-regra">Frete grátis acima de {formatarPreco(FRETE_GRATIS_MINIMO)} no valor final.</p>
    </div>
  )
}
