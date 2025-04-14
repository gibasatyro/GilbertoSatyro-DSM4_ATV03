import { useState } from 'react';
import { Button, View} from 'react-native';

export default function Subtrair({}) {
    const[subtracao, setSubtrair] = useState(0);
    
    return (
        <View>
            <Button 
                title='-'
                onPress={()=> setSubtrair(5 - 3)}
            />
        </View>
    )
}
