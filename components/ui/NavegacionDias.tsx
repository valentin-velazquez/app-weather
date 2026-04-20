import { View, Text, TouchableOpacity } from 'react-native';

export default function NavegacionDias({
fecha,
diaAnterior,
siguienteDia
}: any){

return(

<View style={{
flexDirection:'row',
gap:20,
marginBottom:20
}}>

<TouchableOpacity
testID="button-prev-day"
onPress={diaAnterior}
>
<Text>←</Text>
</TouchableOpacity>

<Text testID="navigation-current-day">
{fecha}
</Text>

<TouchableOpacity
testID="button-next-day"
onPress={siguienteDia}
>
<Text>→</Text>
</TouchableOpacity>

</View>

);

}