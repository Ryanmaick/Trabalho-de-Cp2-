import { Link, useParams } from 'react-router'
import AvisoEstoque from '../components/AvisoEstoque'
import ProdutoCard from '../components/ProdutoCard'
import { quantidadeNoCarrinho } from '../utils/carrinho'
import { formatarPreco } from '../utils/formatarPreco'

export default function PaginaProduto({ produtos, carrinho, listaEspera, onAdicionar, onAvisar }) {
  const { id } = useParams()
  // O id da URL chega como texto e o id do produto também é texto (normalizado no service)
  const produto = produtos.find((item) => item.id === id)

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const esgotado = produto.estoque === 0
  const noCarrinho = quantidadeNoCarrinho(carrinho, produto.id)
  const limiteAtingido = noCarrinho >= produto.estoque
  const bloqueado = esgotado || produto.semPreco || limiteAtingido

  let textoBotao = 'Adicionar ao carrinho'
  if (produto.semPreco) textoBotao = 'Preço em breve'
  else if (esgotado) textoBotao = 'Esgotado'
  else if (limiteAtingido) textoBotao = 'Limite do estoque no carrinho'

  // Relacionados: mesma categoria, sem o próprio produto e sem esgotados
  const relacionados = produtos
    .filter(
      (item) => item.category === produto.category && item.id !== produto.id && item.estoque > 0
    )
    .slice(0, 4)

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>

          {produto.semPreco ? (
            <p className="detalhe-preco detalhe-preco-indefinido">Preço em breve</p>
          ) : (
            <p className="detalhe-preco">{formatarPreco(produto.price)}</p>
          )}

          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">
            {esgotado ? 'Sem unidades disponíveis' : `${produto.estoque} unidades disponíveis`}
          </p>

          <button
            className="botao botao-grande"
            onClick={() => onAdicionar(produto)}
            disabled={bloqueado}
          >
            {textoBotao}
          </button>
          {noCarrinho > 0 && <p className="detalhe-no-carrinho">{noCarrinho} no carrinho</p>}

          {esgotado && (
            <AvisoEstoque
              key={produto.id}
              produto={produto}
              listaEspera={listaEspera}
              onAvisar={onAvisar}
            />
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      {relacionados.length > 0 && (
        <>
          <h2>Produtos relacionados</h2>
          <div className="grade">
            {relacionados.map((item) => (
              <ProdutoCard
                key={item.id}
                produto={item}
                noCarrinho={quantidadeNoCarrinho(carrinho, item.id)}
                onAdicionar={onAdicionar}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
