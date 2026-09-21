import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { cores } from '../styles/cores';

export default function EntregaScreen({ onVoltar, onFinalizarPedido }) {
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

  function handleFinalizar() {
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onVoltar}
          style={styles.botaoVoltar}
        >
          <Text style={styles.setaVoltar}>←</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Dados de Entrega</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome completo"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="11912345678"
          value={telefone}
          onChangeText={tratarTelefone}
          keyboardType="phone-pad"
          maxLength={11}
        />

        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          placeholder="00000000"
          value={cep}
          onChangeText={tratarCep}
          keyboardType="numeric"
          maxLength={8}
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          placeholder="Rua, avenida..."
          value={endereco}
          onChangeText={setEndereco}
        />

        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          placeholder="123"
          value={numero}
          onChangeText={tratarNumero}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Complemento (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Apto, bloco..."
          value={complemento}
          onChangeText={setComplemento}
        />

        <Text style={styles.label}>Referência</Text>
        <TextInput
          style={styles.input}
          placeholder="Perto de..."
          value={referencia}
          onChangeText={setReferencia}
        />

        <Text style={styles.label}>Forma de pagamento</Text>

        <View style={styles.pickerBox}>
          <Picker
            selectedValue={pagamento}
            onValueChange={setPagamento}
          >
            <Picker.Item
              label="Selecione..."
              value=""
            />
            <Picker.Item
              label="Cartão"
              value="cartao"
            />
            <Picker.Item
              label="Pix"
              value="pix"
            />
            <Picker.Item
              label="Dinheiro"
              value="dinheiro"
            />
          </Picker>
        </View>

        {pagamento === 'dinheiro' && (
          <View style={styles.trocoBox}>

            <View style={styles.trocoLinha}>
              <Text style={styles.label}>
                Preciso de troco
              </Text>

              <Switch
                value={precisaTroco}
                onValueChange={setPrecisaTroco}
                trackColor={{
                  true: cores.primaria,
                }}
              />
            </View>

            {precisaTroco && (
              <>
                <Text style={styles.label}>
                  Troco para
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="R$ 0,00"
                  value={trocoPara}
                  onChangeText={tratarTroco}
                  keyboardType="numeric"
                />
              </>
            )}

          </View>
        )}

        <TouchableOpacity
          style={styles.botaoFinalizar}
          onPress={handleFinalizar}
        >
          <Text style={styles.botaoFinalizarTexto}>
            Finalizar pedido
          </Text>
        </TouchableOpacity>

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
    alignItems: 'center',
    padding: 16,
  },

  botaoVoltar: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  setaVoltar: {
    fontSize: 22,
    color: cores.textoForte,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.textoForte,
    marginLeft: 4,
  },

  form: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  label: {
    fontSize: 14,
    color: cores.textoSecundario,
    marginTop: 12,
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: cores.textoForte,
    minHeight: 44,
    backgroundColor: '#fff',
  },

  pickerBox: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    overflow: 'hidden',
  },

  trocoBox: {
    marginTop: 8,
  },

  trocoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  botaoFinalizar: {
    backgroundColor: cores.primaria,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    minHeight: 44,
    justifyContent: 'center',
  },

  botaoFinalizarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});