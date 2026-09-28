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

export default function CardapioScreen({ totalItens, onAdicionar, onAbrirCarrinho }) {
  const [busca, setBusca] = useState('');

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>DelivExpress</Text>

        <TouchableOpacity style={styles.botaoCarrinho} onPress={onAbrirCarrinho}>
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>{totalItens}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.buscaContainer}>
        <Text style={styles.iconeBusca}>⌕</Text>
        <TextInput
          style={styles.campoBusca}
          placeholder="Buscar lanche"
          placeholderTextColor={cores.placeholder}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <ScrollView contentContainerStyle={styles.lista}>
        {produtosFiltrados.map((produto) => (
          <ProductCard key={produto.id} produto={produto} onAdicionar={onAdicionar} />
        ))}

        {produtosFiltrados.length === 0 && (
          <Text style={styles.semResultados}>Nenhum lanche encontrado.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.branco },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: cores.primaria,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  titulo: { fontSize: 20, fontWeight: 'bold', color: cores.branco },

  botaoCarrinho: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    paddingHorizontal: 6,
    backgroundColor: cores.sucesso,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTexto: { color: cores.branco, fontSize: 14, fontWeight: 'bold' },

  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    minHeight: 44,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    backgroundColor: cores.branco,
    paddingHorizontal: 12,
  },
  iconeBusca: {
    fontSize: 20,
    color: cores.iconeBusca,
    marginRight: 8,
  },
  campoBusca: {
    flex: 1,
    minHeight: 44,
    fontSize: 14,
    paddingVertical: 0,
    color: cores.textoForte,
  },

  lista: { padding: 16 },

  semResultados: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: cores.textoSecundario,
  },
});