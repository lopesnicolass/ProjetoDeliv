import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { produtos } from '../data/Produtos';
import { cores } from '../styles/cores';

export default function CardapioScreen({ totalItens, onAdicionar, onAbrirCarrinho }) {  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>DelivExpress</Text>
       <TouchableOpacity style={styles.badge} onPress={onAbrirCarrinho}>
  <Text style={styles.badgeTexto}>{totalItens}</Text>
</TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.lista}>
        {produtos.map((produto) => (
          <ProductCard key={produto.id} produto={produto} onAdicionar={onAdicionar} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: cores.primaria,
    padding: 16,
  },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  badge: {
    backgroundColor: cores.sucesso,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeTexto: { color: '#fff', fontWeight: 'bold' },
  lista: { padding: 16 },
});