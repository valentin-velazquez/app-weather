import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import datosClima from '../data/datosClima';
import NavegacionDias from '../components/ui/NavegacionDias';

export default function App() {

const [indiceDia, setIndiceDia] = useState(1);

const diaAnterior = () => {
if(indiceDia > 0){
setIndiceDia(indiceDia -1);
}
};

const siguienteDia = () => {
if(indiceDia < datosClima.length -1){
setIndiceDia(indiceDia +1);
}
};

const climaActual = datosClima[indiceDia];

return (

<View style={styles.container} testID="screen-weather">

<NavegacionDias
fecha={climaActual.date}
diaAnterior={diaAnterior}
siguienteDia={siguienteDia}
/>

<Text
style={styles.city}
testID="header-city"
>
TOKYO
</Text>


<View
style={styles.icon}
testID={`icon-weather-${climaActual.condition}`}
>

<Text style={styles.weatherIcon}>
{climaActual.condition === 'Sunny' && '☀'}
{climaActual.condition === 'Rain' && '☂'}
{climaActual.condition === 'Cloudy' && '☁'}
</Text>

</View>


<Text
style={styles.temp}
testID="temp-current"
>
{climaActual.current}°
</Text>


<View style={styles.minMax}>
<Text testID="temp-min">
{climaActual.min}°
</Text>

<Text testID="temp-max">
{climaActual.max}°
</Text>
</View>


<View style={styles.metrics}>

<View style={styles.metricBox} testID="metric-item">
<Text>💧 {climaActual.humidity}</Text>
</View>

<View style={styles.metricBox} testID="metric-item">
<Text>🌡 {climaActual.pressure}</Text>
</View>

<View style={styles.metricBox} testID="metric-item">
<Text>🌬 {climaActual.wind}</Text>
</View>

</View>

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:'#2977E3',
justifyContent:'center',
alignItems:'center'
},

city:{
fontSize:24,
fontWeight:'bold',
marginBottom:20
},

icon:{
marginBottom:20
},

weatherIcon:{
fontSize:100
},

temp:{
fontSize:48,
fontWeight:'bold'
},

minMax:{
flexDirection:'row',
gap:20,
marginBottom:20
},

metrics:{
gap:10
},

metricBox:{
marginBottom:10
}

});