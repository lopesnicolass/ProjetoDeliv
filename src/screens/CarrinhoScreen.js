import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores } from '../styles/cores';
import { calcularTotais, formatarPreco, TAXA_ENTREGA } from '../utils/calculos';

export default function CarrinhoScreen({
  carrinho,
  cupom,
  onCupomChange,
  onAumentar,
  onDiminuir,
  onContinuar,
  onVoltar,
}) {
  const { subtotal, desconto, cupomValido, carrinhoVazio, total } = calcularTotais(carrinho, cupom);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onVoltar}
          style={styles.botaoVoltar}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.setaVoltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Meu Carrinho</Text>
      </View>

      <ScrollView contentContainerStyle={styles.lista}>
        {carrinhoVazio && <Text style={styles.vazio}>Seu carrinho está vazio.</Text>}

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
            <Text style={styles.itemTotal}>{formatarPreco(item.preco * item.quantidade)}</Text>
          </View>
        ))}

        {!carrinhoVazio && (
          <View style={styles.cupomBox}>
            <TextInput
              style={styles.cupomInput}
              placeholder="Cupom de desconto"
              placeholderTextColor={cores.placeholder}
              value={cupom}
              onChangeText={onCupomChange}
              autoCapitalize="characters"
            />
            {cupom.length > 0 && (
              <Text style={cupomValido ? styles.cupomOk : styles.cupomErro}>
                {cupomValido ? 'Cupom aplicado: -10%' : 'Cupom inválido'}
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.resumo}>
        <View style={styles.linhaResumo}>
          <Text style={styles.labelResumo}>Subtotal</Text>
          <Text style={styles.valorResumo}>{formatarPreco(subtotal)}</Text>
        </View>
        {cupomValido && (
          <View style={styles.linhaResumo}>
            <Text style={styles.labelResumo}>Desconto (ALUNO10)</Text>
            <Text style={styles.valorDesconto}>-{formatarPreco(desconto)}</Text>
          </View>
        )}
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
  container: { flex: 1, backgroundColor: cores.branco },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  botaoVoltar: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  setaVoltar: { fontSize: 22, color: cores.textoForte },
  titulo: { fontSize: 20, fontWeight: 'bold', color: cores.textoForte, marginLeft: 4 },

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

  quantidadeControle: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 6 },
  botaoQtd: {
    width: 40,
    height: 44,
    borderRadius: 6,
    backgroundColor: cores.primaria,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoQtdTexto: { color: cores.branco, fontSize: 20, fontWeight: 'bold' },
  quantidadeTexto: { fontSize: 16, marginHorizontal: 8, color: cores.textoForte },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.textoForte,
    minWidth: 64,
    textAlign: 'right',
  },

  cupomBox: { marginTop: 8, marginBottom: 4 },
  cupomInput: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: cores.textoForte,
    minHeight: 44,
  },
  cupomOk: { color: cores.sucesso, fontSize: 14, marginTop: 4 },
  cupomErro: { color: cores.erro, fontSize: 14, marginTop: 4 },

  resumo: { borderTopWidth: 1, borderTopColor: cores.divisor, padding: 16 },
  linhaResumo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  labelResumo: { fontSize: 14, color: cores.textoSecundario },
  valorResumo: { fontSize: 14, color: cores.textoForte },
  valorDesconto: { fontSize: 14, color: cores.sucesso, fontWeight: 'bold' },
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
  botaoDesabilitado: { backgroundColor: cores.desabilitado },
  botaoContinuarTexto: { color: cores.branco, fontSize: 16, fontWeight: 'bold' },
});