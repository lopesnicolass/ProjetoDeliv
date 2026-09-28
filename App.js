import { useState } from 'react';
import { Alert, Platform, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CardapioScreen from './src/screens/CardapioScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';
import EntregaScreen from './src/screens/EntregaScreen';
import ConfirmacaoScreen from './src/screens/ConfirmacaoScreen';
import { calcularTotais } from './src/utils/calculos';

export default function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [telaAtual, setTelaAtual] = useState('cardapio'); // cardapio | carrinho | checkout | confirmacao
  const [cupom, setCupom] = useState('');
  const [dadosEntrega, setDadosEntrega] = useState(null);
  const [numeroPedido, setNumeroPedido] = useState(null);

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
        .filter((item) => item.quantidade > 0)
    );
  }

  function finalizarPedido(dados) {
    const numero = Math.floor(1000 + Math.random() * 9000); // RF17
    setDadosEntrega(dados);
    setNumeroPedido(numero);
    setTelaAtual('confirmacao');
    Alert.alert('Pedido confirmado!', `Seu pedido #${numero} foi realizado com sucesso.`);
  }

  function novoPedido() {
    setCarrinho([]);
    setCupom('');
    setDadosEntrega(null);
    setNumeroPedido(null);
    setTelaAtual('cardapio'); // RF18
  }

  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  const { total } = calcularTotais(carrinho, cupom);

  return (
    <SafeAreaProvider>
      <View style={styles.wrapper}>
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
            cupom={cupom}
            onCupomChange={setCupom}
            onAumentar={aumentarQuantidade}
            onDiminuir={diminuirQuantidade}
            onContinuar={() => setTelaAtual('checkout')}
            onVoltar={() => setTelaAtual('cardapio')}
          />
        )}
        {telaAtual === 'checkout' && (
          <EntregaScreen
            totalItens={totalItens}
            onVoltar={() => setTelaAtual('carrinho')}
            onFinalizarPedido={finalizarPedido}
          />
        )}
        {telaAtual === 'confirmacao' && (
          <ConfirmacaoScreen
            carrinho={carrinho}
            dadosEntrega={dadosEntrega}
            total={total}
            numeroPedido={numeroPedido}
            onNovoPedido={novoPedido}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: Platform.select({
    web: {
      flex: 1,
      width: '100%',
      maxWidth: 420,
      alignSelf: 'center',
      backgroundColor: '#fff',
    },
    default: {
      flex: 1,
    },
  }),
});