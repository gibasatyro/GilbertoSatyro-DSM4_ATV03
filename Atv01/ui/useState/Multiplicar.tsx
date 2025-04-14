import { useState } from 'react';
import { Button, View} from 'react-native';

export default function Multiplicar({}) {
  const[multiplicaçao, setMultiplicar] = useState(0);
    
  return (
    <View>
      <Button
         title='-'
         onPress={()=> setMultiplicar(5 * 3)}
      />
    </View>
  )
}
