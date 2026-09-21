import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProductCard from '../components/ProductCard';
import { produtos } from '../data/Produtos';
import { cores } from '../styles/cores';

export default function CardapioScreen({
  totalItens,
  onAdicionar,
  onAbrirCarrinho,
}) {
  const [busca, setBusca] = useState('');

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>DelivExpress</Text>

        <TouchableOpacity
          style={styles.badge}
          onPress={onAbrirCarrinho}
        >
          <Text style={styles.badgeTexto}>{totalItens}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buscaContainer}>
        <Text style={styles.iconeBusca}>⌕</Text>

        <TextInput
          style={styles.campoBusca}
          placeholder="Buscar lanche"
          placeholderTextColor="#9A9A9A"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <ScrollView contentContainerStyle={styles.lista}>
        {produtosFiltrados.map((produto) => (
          <ProductCard
            key={produto.id}
            produto={produto}
            onAdicionar={onAdicionar}
          />
        ))}

        {produtosFiltrados.length === 0 && (
          <Text style={styles.semResultados}>
            Nenhum lanche encontrado.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: cores.primaria,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: cores.sucesso,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 4,
    height: 36,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
  },

  iconeBusca: {
    width: 20,
    height: 20,
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
    color: '#8A8A8A',
    marginRight: 5,
  },

  campoBusca: {
    flex: 1,
    height: 36,
    fontSize: 12,
    paddingVertical: 0,
    color: '#202A44',
  },

  lista: {
    padding: 12,
  },

  semResultados: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
});