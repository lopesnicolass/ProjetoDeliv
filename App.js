// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CardapioScreen from './src/screens/CardapioScreen';

export default function App() {
  const [carrinho, setCarrinho] = useState([]);

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

  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);

  return (
    <SafeAreaProvider>
      <CardapioScreen totalItens={totalItens} onAdicionar={adicionarAoCarrinho} />
    </SafeAreaProvider>
  );
}