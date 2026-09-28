import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../styles/cores';

export default function ProductCard({ produto, onAdicionar }) {
  const precoFormatado = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
  const temImagem = Boolean(produto.imagem);
  // string = URL remota (uri); número = resultado de require() (asset local)
  const fonteImagem = typeof produto.imagem === 'string' ? { uri: produto.imagem } : produto.imagem;

  return (
    <View style={styles.card}>
      {temImagem ? (
        <Image source={fonteImagem} style={styles.imagem} />
      ) : (
        <View style={[styles.imagem, styles.imagemPlaceholder]}>
          <Text style={styles.imagemPlaceholderTexto}>sem foto</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.descricao}>{produto.descricao}</Text>
        <Text style={styles.preco}>{precoFormatado}</Text>
      </View>
      <TouchableOpacity style={styles.botao} onPress={() => onAdicionar(produto)}>
        <Text style={styles.botaoTexto}>+ Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: cores.fundoClaro,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  imagem: { width: 64, height: 64, borderRadius: 6 },
  imagemPlaceholder: {
    backgroundColor: '#E0E4EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagemPlaceholderTexto: { fontSize: 10, color: cores.textoSecundario },
  info: { flex: 1, marginLeft: 12 },
  nome: { fontSize: 16, fontWeight: 'bold', color: cores.textoForte },
  descricao: { fontSize: 14, color: cores.textoSecundario },
  preco: { fontSize: 14, color: cores.textoForte, marginTop: 4 },
  botao: {
    backgroundColor: cores.sucesso,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    minHeight: 44,
    justifyContent: 'center',
  },
  botaoTexto: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});