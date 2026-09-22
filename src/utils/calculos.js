export const TAXA_ENTREGA = 6.0;

export function calcularTotais(carrinho, cupom) {
  const subtotal = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  const cupomValido = cupom.trim().toUpperCase() === 'ALUNO10';
  const desconto = cupomValido ? subtotal * 0.1 : 0;
  const carrinhoVazio = carrinho.length === 0;
  const total = carrinhoVazio ? 0 : subtotal - desconto + TAXA_ENTREGA;
  return { subtotal, desconto, cupomValido, carrinhoVazio, total };
}

export function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}