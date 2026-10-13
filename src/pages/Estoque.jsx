import { agruparPorProduto } from '../utils/listaEspera'

// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
// e quem está esperando os produtos esgotados
export default function Estoque({ produtos, listaEspera }) {
  // toSorted cria uma cópia, para o sort não alterar a lista original
  const ordenados = produtos.toSorted((a, b) => a.estoque - b.estoque)
  const esperas = agruparPorProduto(listaEspera, produtos)

  function contarEspera(produtoId) {
    return listaEspera.filter((entrada) => entrada.produtoId === produtoId).length
  }

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Aguardando</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.category}</td>
                <td>{produto.estoque}</td>
                <td>{contarEspera(produto.id)}</td>
                <td>
                  {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Lista de espera</h2>
      {esperas.length > 0 ? (
        <ul className="lista-espera">
          {esperas.map((grupo) => (
            <li key={grupo.produto.id} className="espera-produto">
              <p className="espera-titulo">
                {grupo.produto.title}
                <span className="selo selo-alerta">{grupo.inscritos.length} aguardando</span>
                {grupo.produto.estoque > 0 && <span className="selo selo-ok">Voltou ao estoque</span>}
              </p>
              <ul className="espera-pessoas">
                {grupo.inscritos.map((pessoa) => (
                  <li key={pessoa.email}>
                    {pessoa.nome} <span>{pessoa.email}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <div className="estado-vazio">
          <p>Ninguém está esperando um produto esgotado.</p>
        </div>
      )}
    </section>
  )
}
