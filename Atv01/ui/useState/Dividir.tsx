import { useState } from 'react';
import { Button, View} from 'react-native';

export default function Dividir({}) {
  const[divisao, setDividir] = useState(0);

  return (
    <View>
      <Button 
          title='-'
          onPress={()=> setDividir(5 / 3)}
      />
    </View>
  )
}
