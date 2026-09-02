import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CardapioScreen from './src/screens/CardapioScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';

export default function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [telaAtual, setTelaAtual] = useState('cardapio'); // 'cardapio' | 'carrinho'

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
          onContinuar={() => console.log('vai pro checkout na Aula 3')}
          onVoltar={() => setTelaAtual('cardapio')}
        />
      )}
    </SafeAreaProvider>
  );
}