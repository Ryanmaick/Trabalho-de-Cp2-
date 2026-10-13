# Regras de negócio

Última atualização: março de 2026

## Frete grátis

Compras acima de R$ 200 no valor final (já com o desconto do cupom) têm frete grátis. O carrinho mostra quanto falta para chegar lá. Exatamente R$ 200,00 ainda não vale.

O selo "Frete grátis" por produto (preço acima de R$ 100) deixou de existir: o frete passou a depender do valor da compra.

## Produtos sem preço

Produto sem preço definido (ausente, vazio ou inválido na API) não pode ser vendido: aparece como "Preço em breve", com o botão de compra desabilitado, e não entra no carrinho.

## Estoque e carrinho

Cada produto só pode ser adicionado ao carrinho até o limite do estoque. Produto esgotado não aparece na loja, nos relacionados nem nas sugestões, mas continua acessível pelo link direto, onde o cliente pode pedir aviso de reposição.

## Lista de espera

O cliente informa nome e e-mail para ser avisado quando um produto esgotado voltar. O mesmo e-mail não entra duas vezes na lista do mesmo produto. A área interna (`/estoque`) mostra quem espera cada produto, do mais esperado para o menos esperado.

## Cupons

| Cupom | Desconto | Quem pode usar |
|---|---|---|
| `PRIMEIRACOMPRA` | 10% sobre o total | Qualquer cliente |

O cupom não diferencia letras maiúsculas e minúsculas.

## Promoções

Produtos em promoção exibem o preço original riscado ao lado do preço atual.
