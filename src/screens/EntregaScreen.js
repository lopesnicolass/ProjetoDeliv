import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { cores } from '../styles/cores';

export default function EntregaScreen({ totalItens, onVoltar, onFinalizarPedido }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [referencia, setReferencia] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [precisaTroco, setPrecisaTroco] = useState(false);
  const [trocoPara, setTrocoPara] = useState('');
  const [erros, setErros] = useState({});

  // RNF08: só aceitam caracteres válidos
  function tratarTelefone(texto) {
    setTelefone(texto.replace(/[^0-9]/g, '').slice(0, 11));
  }

  function tratarCep(texto) {
    setCep(texto.replace(/[^0-9]/g, '').slice(0, 8));
  }

  function tratarNumero(texto) {
    setNumero(texto.replace(/[^0-9]/g, ''));
  }

  function tratarTroco(texto) {
    setTrocoPara(texto.replace(/[^0-9.,]/g, ''));
  }

  // Seção 4: valida um campo por vez e para no primeiro erro
  function validarPedido() {
    if (totalItens === 0) {
      return setErros({ carrinho: 'Seu carrinho está vazio.' });
    }
    if (nome.trim() === '') {
      return setErros({ nome: 'Informe seu nome.' });
    }
    if (telefone.length < 10) {
      return setErros({ telefone: 'Telefone inválido.' });
    }
    if (cep.length !== 8) {
      return setErros({ cep: 'CEP deve ter 8 dígitos.' });
    }
    if (endereco.trim() === '') {
      return setErros({ endereco: 'Informe o endereço.' });
    }
    if (!/^[0-9]+$/.test(numero)) {
      return setErros({ numero: 'Número inválido.' });
    }
    if (pagamento === '') {
      return setErros({ pagamento: 'Escolha a forma de pagamento.' });
    }

    setErros({});
    onFinalizarPedido({
      nome,
      telefone,
      cep,
      endereco,
      numero,
      complemento,
      referencia,
      pagamento,
      precisaTroco,
      trocoPara,
    });
  }

  function estiloInput(campo) {
    return [styles.input, erros[campo] && styles.inputErro];
  }

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
        <Text style={styles.titulo}>Dados de Entrega</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        {erros.carrinho && <Text style={styles.textoErro}>{erros.carrinho}</Text>}

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={estiloInput('nome')}
          placeholder="Seu nome completo"
          placeholderTextColor={cores.placeholder}
          value={nome}
          onChangeText={setNome}
          keyboardType="default"
        />
        {erros.nome && <Text style={styles.textoErro}>{erros.nome}</Text>}

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={estiloInput('telefone')}
          placeholder="11912345678"
          placeholderTextColor={cores.placeholder}
          value={telefone}
          onChangeText={tratarTelefone}
          keyboardType="phone-pad"
          maxLength={11}
        />
        {erros.telefone && <Text style={styles.textoErro}>{erros.telefone}</Text>}

        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={estiloInput('cep')}
          placeholder="00000000"
          placeholderTextColor={cores.placeholder}
          value={cep}
          onChangeText={tratarCep}
          keyboardType="numeric"
          maxLength={8}
        />
        {erros.cep && <Text style={styles.textoErro}>{erros.cep}</Text>}

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={estiloInput('endereco')}
          placeholder="Rua, avenida..."
          placeholderTextColor={cores.placeholder}
          value={endereco}
          onChangeText={setEndereco}
          keyboardType="default"
        />
        {erros.endereco && <Text style={styles.textoErro}>{erros.endereco}</Text>}

        <Text style={styles.label}>Número</Text>
        <TextInput
          style={estiloInput('numero')}
          placeholder="123"
          placeholderTextColor={cores.placeholder}
          value={numero}
          onChangeText={tratarNumero}
          keyboardType="numeric"
        />
        {erros.numero && <Text style={styles.textoErro}>{erros.numero}</Text>}

        <Text style={styles.label}>Complemento (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Apto, bloco..."
          placeholderTextColor={cores.placeholder}
          value={complemento}
          onChangeText={setComplemento}
          keyboardType="default"
        />

        <Text style={styles.label}>Referência</Text>
        <TextInput
          style={styles.input}
          placeholder="Perto de..."
          placeholderTextColor={cores.placeholder}
          value={referencia}
          onChangeText={setReferencia}
          keyboardType="default"
        />

        <Text style={styles.label}>Forma de pagamento</Text>
        <View
          style={[
            styles.pickerBox,
            erros.pagamento && { borderWidth: 1, borderColor: cores.erro },
          ]}
        >
          <Picker
            selectedValue={pagamento}
            onValueChange={setPagamento}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            mode="dropdown"
          >
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="Cartão" value="cartao" />
            <Picker.Item label="Pix" value="pix" />
            <Picker.Item label="Dinheiro" value="dinheiro" />
          </Picker>
        </View>
        {erros.pagamento && <Text style={styles.textoErro}>{erros.pagamento}</Text>}

        {pagamento === 'dinheiro' && (
          <View style={styles.trocoBox}>
            <View style={styles.trocoLinha}>
              <Text style={styles.label}>Preciso de troco</Text>
              <Switch
                value={precisaTroco}
                onValueChange={setPrecisaTroco}
                trackColor={{ true: cores.primaria }}
              />
            </View>
            {precisaTroco && (
              <>
                <Text style={styles.label}>Troco para</Text>
                <TextInput
                  style={styles.input}
                  placeholder="R$ 0,00"
                  placeholderTextColor={cores.placeholder}
                  value={trocoPara}
                  onChangeText={tratarTroco}
                  keyboardType="numeric"
                />
              </>
            )}
          </View>
        )}

        <TouchableOpacity style={styles.botaoFinalizar} onPress={validarPedido}>
          <Text style={styles.botaoFinalizarTexto}>Finalizar pedido</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.branco },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  botaoVoltar: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  setaVoltar: { fontSize: 22, color: cores.textoForte },
  titulo: { fontSize: 20, fontWeight: 'bold', color: cores.textoForte, marginLeft: 4 },

  form: { paddingHorizontal: 16, paddingBottom: 32 },
  label: { fontSize: 14, color: cores.textoSecundario, marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: cores.textoForte,
    minHeight: 44,
    backgroundColor: cores.branco,
  },
  inputErro: { borderColor: cores.erro },
  textoErro: { color: cores.erro, fontSize: 14, marginTop: 4 },

  // Picker: no iPhone vira uma "roda" e precisa de altura (sem overflow hidden);
  // no Android é um menu suspenso e funciona com 44px.
  pickerBox: {
    borderRadius: 8,
    backgroundColor: cores.branco,
    justifyContent: 'center',
    ...(Platform.OS === 'android'
      ? { borderWidth: 1, borderColor: cores.borda, overflow: 'hidden' }
      : {}),
  },
  picker: {
    color: cores.textoForte,
    ...(Platform.OS === 'ios' ? { height: 120 } : { height: 44 }),
  },
  pickerItem: {
    fontSize: 16,
    height: 120,
    color: cores.textoForte,
  },

  trocoBox: { marginTop: 8 },
  trocoLinha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  botaoFinalizar: {
    backgroundColor: cores.primaria,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    minHeight: 44,
    justifyContent: 'center',
  },
  botaoFinalizarTexto: { color: cores.branco, fontSize: 16, fontWeight: 'bold' },
});