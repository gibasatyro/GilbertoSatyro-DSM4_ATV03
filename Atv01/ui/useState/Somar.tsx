import { useState } from 'react';
import { Button, View} from 'react-native';

export default function Somar({}) {
    const[soma, setSomar] = useState(0);
    
    return (
        <View>
            <Button
                title='+'
                onPress={()=> setSomar(5 + 3)}
            />
        </View>
    )
}
