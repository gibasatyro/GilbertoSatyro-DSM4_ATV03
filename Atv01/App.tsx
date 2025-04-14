import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import CustomTextInput from './components/TextInput/CustonTextInput';

const courseCalculo = [
  '', 'Adição', 'Subtração', 'Multiplicação', 'Divisão'
];

function tipoCalculo(Som:boolean, Sub:boolean, Mul:boolean, Div:boolean) {
  var item = 0
  if (Som) {item = 1} else {
  if (Sub) {item = 2} else {
  if (Mul) {item = 3} else {
  if (Div) {item = 4}}}}
  return item
}

function calcular(valor1: string, valor2: string, item: number): string {
  const num1 = parseFloat(valor1);
  const num2 = parseFloat(valor2);

  if (isNaN(num1) || isNaN(num2)) {
    return "Erro: valores inválidos!";
  }

  let resultado = 0;

  switch (item) {
    case 1:
      resultado = num1 + num2;
      break;
    case 2:
      resultado = num1 - num2;
      break;
    case 3:
      resultado = num1 * num2;
      break;
    case 4:
      if (num2 === 0) return "Erro: divisão por zero!";
      resultado = num1 / num2;
      break;
    default:
      return "Erro: operação não selecionada!";
  }
  return resultado.toString();
}

export default function App() {
  const [valor1, setValor1] = useState('0');
  const [valor2, setValor2] = useState('0');
  const [soma, setSomar] = useState(false);
  const [subtracao, setSubtrair] = useState(false);
  const [multiplicaçao, setMultiplicar] = useState(false);
  const [divisao, setDividir] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calculadora</Text>
      <Text style={styles.label}>Valor 1</Text>
      <CustomTextInput
        hint="Digite o 1º valor..."
        inputStyle={styles.customInput}
        onChangeText={setValor1}
      />
      <Text style={styles.label}>Valor 2</Text>
      <CustomTextInput
        hint="Digite o 2º valor..."
        inputStyle={styles.customInput}
        onChangeText={setValor2}
      />
      <Text> </Text>

      <View style={styles.row}>
        <Button 
            title=' + '
            onPress={()=> {
              setSomar(true)
              setSubtrair(false)
              setMultiplicar(false)
              setDividir(false)
            }}
        />
        <Text>  </Text>
        <Button 
            title=' - '
            onPress={()=> {
              setSomar(false)
              setSubtrair(true)
              setMultiplicar(false)
              setDividir(false)
            }}
        />
        <Text>  </Text>
        <Button 
            title=' * '
            onPress={()=> {
              setSomar(false)
              setSubtrair(false)
              setMultiplicar(true)
              setDividir(false)
            }}
        />
        <Text>  </Text>
        <Button 
            title=' / '
            onPress={()=> {
              setSomar(false)
              setSubtrair(false)
              setMultiplicar(false)
              setDividir(true)
            }}
        />
      </View>
      <Text style={styles.label}>{courseCalculo[tipoCalculo(soma, subtracao, multiplicaçao, divisao)]}</Text>
      <Text> </Text>

      <Text style={styles.label}>Resultado = {calcular(valor1, valor2, tipoCalculo(soma, subtracao, multiplicaçao, divisao))}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 60
  },
  label: {
    fontSize: 30,
  },
  customInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  row: {
    flexDirection: 'row', // Alinha os botões na horizontal
    justifyContent: 'space-around', // Distribui os botões com espaço entre eles
  },
});
