import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores } from '../styles/cores';
import { formatarPreco } from '../utils/calculos';

const LABEL_PAGAMENTO = { cartao: 'Cartão', pix: 'Pix', dinheiro: 'Dinheiro' };

export default function ConfirmacaoScreen({
  carrinho,
  dadosEntrega,
  total,
  numeroPedido,
  onNovoPedido,
}) {
  const enderecoCompleto = dadosEntrega
    ? `${dadosEntrega.endereco}, ${dadosEntrega.numero}${
        dadosEntrega.complemento ? ' - ' + dadosEntrega.complemento : ''
      }`
    : '';

  const pagamentoTexto = dadosEntrega ? LABEL_PAGAMENTO[dadosEntrega.pagamento] : '';
  const mostrarTroco =
    dadosEntrega &&
    dadosEntrega.pagamento === 'dinheiro' &&
    dadosEntrega.precisaTroco &&
    dadosEntrega.trocoPara !== '';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.icone}>
          <Text style={styles.iconeTexto}>✓</Text>
        </View>
        <Text style={styles.titulo}>Pedido confirmado!</Text>
        <Text style={styles.numeroPedido}>Pedido #{numeroPedido}</Text>

        <View style={styles.resumoBox}>
          {carrinho.map((item) => (
            <Text key={item.id} style={styles.itemTexto}>
              {item.quantidade}x {item.nome}
            </Text>
          ))}
        </View>

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total pago</Text>
          <Text style={styles.totalValor}>{formatarPreco(total)}</Text>
        </View>

        <Text style={styles.infoEntrega}>Entrega: {enderecoCompleto}</Text>
        <Text style={styles.infoEntrega}>Pagamento: {pagamentoTexto}</Text>
        {mostrarTroco && (
          <Text style={styles.infoEntrega}>Troco para: R$ {dadosEntrega.trocoPara}</Text>
        )}

        <TouchableOpacity style={styles.botaoNovoPedido} onPress={onNovoPedido}>
          <Text style={styles.botaoNovoPedidoTexto}>Fazer novo pedido</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.branco },
  conteudo: { padding: 24, alignItems: 'center' },

  icone: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: cores.sucesso,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  iconeTexto: { color: cores.branco, fontSize: 32, fontWeight: 'bold' },
  titulo: { fontSize: 20, fontWeight: 'bold', color: cores.textoForte },
  numeroPedido: { fontSize: 14, color: cores.primaria, marginTop: 4, marginBottom: 20 },

  resumoBox: {
    width: '100%',
    backgroundColor: cores.fundoClaro,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  itemTexto: { fontSize: 14, color: cores.textoForte, marginBottom: 4 },

  totalBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: cores.textoForte },
  totalValor: { fontSize: 16, fontWeight: 'bold', color: cores.sucesso },

  infoEntrega: {
    fontSize: 14,
    color: cores.textoSecundario,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },

  botaoNovoPedido: {
    backgroundColor: cores.sucesso,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 24,
    minHeight: 44,
    justifyContent: 'center',
  },
  botaoNovoPedidoTexto: { color: cores.branco, fontSize: 16, fontWeight: 'bold' },
});