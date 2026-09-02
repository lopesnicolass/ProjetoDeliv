import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores } from '../styles/cores';

const TAXA_ENTREGA = 6.0;

function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

export default function CarrinhoScreen({ carrinho, onAumentar, onDiminuir, onContinuar, onVoltar }) {
  const subtotal = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  const total = carrinho.length > 0 ? subtotal + TAXA_ENTREGA : 0;
  const carrinhoVazio = carrinho.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onVoltar} style={styles.botaoVoltar} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.setaVoltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Meu Carrinho</Text>
      </View>

      <ScrollView contentContainerStyle={styles.lista}>
        {carrinhoVazio && (
          <Text style={styles.vazio}>Seu carrinho está vazio.</Text>
        )}

        {carrinho.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemNome}>{item.nome}</Text>
              <Text style={styles.itemPreco}>{formatarPreco(item.preco)}</Text>
            </View>
            <View style={styles.quantidadeControle}>
              <TouchableOpacity style={styles.botaoQtd} onPress={() => onDiminuir(item.id)}>
                <Text style={styles.botaoQtdTexto}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantidadeTexto}>{item.quantidade}</Text>
              <TouchableOpacity style={styles.botaoQtd} onPress={() => onAumentar(item.id)}>
                <Text style={styles.botaoQtdTexto}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.itemTotal}>
              {formatarPreco(item.preco * item.quantidade)}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.resumo}>
        <View style={styles.linhaResumo}>
          <Text style={styles.labelResumo}>Subtotal</Text>
          <Text style={styles.valorResumo}>{formatarPreco(subtotal)}</Text>
        </View>
        <View style={styles.linhaResumo}>
          <Text style={styles.labelResumo}>Entrega</Text>
          <Text style={styles.valorResumo}>{formatarPreco(carrinhoVazio ? 0 : TAXA_ENTREGA)}</Text>
        </View>
        <View style={styles.linhaResumo}>
          <Text style={styles.labelTotal}>TOTAL</Text>
          <Text style={styles.valorTotal}>{formatarPreco(total)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.botaoContinuar, carrinhoVazio && styles.botaoDesabilitado]}
          onPress={onContinuar}
          disabled={carrinhoVazio}
        >
          <Text style={styles.botaoContinuarTexto}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  botaoVoltar: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setaVoltar: { fontSize: 22, color: cores.textoForte },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.textoForte,
    marginLeft: 4,
  },
  lista: { paddingHorizontal: 16 },
  vazio: { fontSize: 16, color: cores.textoSecundario, textAlign: 'center', marginTop: 40 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.fundoClaro,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  itemInfo: { flex: 1 },
  itemNome: { fontSize: 16, fontWeight: 'bold', color: cores.textoForte },
  itemPreco: { fontSize: 14, color: cores.textoSecundario, marginTop: 2 },
  quantidadeControle: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 },
  botaoQtd: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: cores.primaria,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoQtdTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  quantidadeTexto: { fontSize: 16, marginHorizontal: 10, color: cores.textoForte },
  itemTotal: { fontSize: 15, fontWeight: 'bold', color: cores.textoForte, minWidth: 70, textAlign: 'right' },
  resumo: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 16,
  },
  linhaResumo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  labelResumo: { fontSize: 14, color: cores.textoSecundario },
  valorResumo: { fontSize: 14, color: cores.textoForte },
  labelTotal: { fontSize: 16, fontWeight: 'bold', color: cores.textoForte },
  valorTotal: { fontSize: 16, fontWeight: 'bold', color: cores.primaria },
  botaoContinuar: {
    backgroundColor: cores.primaria,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  botaoDesabilitado: { backgroundColor: '#B0B7C3' },
  botaoContinuarTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});