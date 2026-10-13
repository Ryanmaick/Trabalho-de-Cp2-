import { Link } from 'react-router'
import { formatarPreco } from '../utils/formatarPreco'

// Card único da loja: lista, relacionados e sugestões do carrinho usam este componente
export default function ProdutoCard({ produto, noCarrinho, onAdicionar }) {
  const esgotado = produto.estoque === 0
  const limiteAtingido = noCarrinho >= produto.estoque
  const bloqueado = esgotado || produto.semPreco || limiteAtingido

  let textoBotao = 'Adicionar ao carrinho'
  if (produto.semPreco) textoBotao = 'Preço em breve'
  else if (esgotado) textoBotao = 'Esgotado'
  else if (limiteAtingido) textoBotao = 'Limite do estoque'

  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="card-imagem" />
        </div>
        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      <p className="card-avaliacao">
        ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
      </p>

      <div className="card-precos">
        {produto.semPreco ? (
          <span className="preco-indefinido">Preço em breve</span>
        ) : (
          <>
            {produto.precoOriginal && (
              <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
            )}
            <span className="preco">{formatarPreco(produto.price)}</span>
          </>
        )}
      </div>

      <div className="card-selos">
        {esgotado && <span className="selo selo-esgotado">Esgotado</span>}
        {produto.semPreco && <span className="selo selo-alerta">Sem preço</span>}
        {noCarrinho > 0 && <span className="selo selo-ok">{noCarrinho} no carrinho</span>}
      </div>

      <button className="botao" onClick={() => onAdicionar(produto)} disabled={bloqueado}>
        {textoBotao}
      </button>
    </article>
  )
}
