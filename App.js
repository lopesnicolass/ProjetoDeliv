import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CardapioScreen from './src/screens/CardapioScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';
import EntregaScreen from './src/screens/EntregaScreen';

export default function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [telaAtual, setTelaAtual] = useState('cardapio'); // 'cardapio' | 'carrinho' | 'checkout'
  const [dadosEntrega, setDadosEntrega] = useState(null);

  function adicionarAoCarrinho(produto) {
    setCarrinho((atual) => {
      const existente = atual.find((item) => item.id === produto.id);
      if (existente) {
        return atual.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...atual, { ...produto, quantidade: 1 }];
    });
  }

  function aumentarQuantidade(id) {
    setCarrinho((atual) =>
      atual.map((item) => (item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item))
    );
  }

  function diminuirQuantidade(id) {
    setCarrinho((atual) =>
      atual
        .map((item) => (item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item))
        .filter((item) => item.quantidade > 0) // RF07: remove ao chegar em 0
    );
  }

  function finalizarPedido(dados) {
    setDadosEntrega(dados);
    // A tela de Confirmação (T4) entra na Aula 4 — por enquanto só guardamos os dados.
    console.log('Dados de entrega:', dados);
  }

  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);

  return (
    <SafeAreaProvider>
      {telaAtual === 'cardapio' && (
        <CardapioScreen
          totalItens={totalItens}
          onAdicionar={adicionarAoCarrinho}
          onAbrirCarrinho={() => setTelaAtual('carrinho')}
        />
      )}
      {telaAtual === 'carrinho' && (
        <CarrinhoScreen
          carrinho={carrinho}
          onAumentar={aumentarQuantidade}
          onDiminuir={diminuirQuantidade}
          onContinuar={() => setTelaAtual('checkout')}
          onVoltar={() => setTelaAtual('cardapio')}
        />
      )}
      {telaAtual === 'checkout' && (
        <EntregaScreen
          onVoltar={() => setTelaAtual('carrinho')}
          onFinalizarPedido={finalizarPedido}
        />
      )}
    </SafeAreaProvider>
  );
}