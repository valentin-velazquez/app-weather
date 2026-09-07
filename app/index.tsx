import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavegacionDias from '../components/ui/NavegacionDias';
import { useClima } from '../hooks/useClima';
import CiudadTitulo from '../components/ui/CiudadTitulo';
import IconoClima from '../components/ui/IconoClima';
import MetricasClima from '../components/ui/MetricasClima';
import BarraTemperatura from '../components/ui/BarraTemperatura';
import { formatearFecha } from '../lib/utilidades';

export default function App() {
  const { indiceDia, clima, diasClima, irAlDiaAnterior, irAlDiaSiguiente } = useClima();

  const diaActual = diasClima[indiceDia];
  const condicion = diaActual?.day?.condition?.text || '';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.container} testID="screen-weather">

        <NavegacionDias
          fechaAnterior={formatearFecha(diasClima[indiceDia - 1]?.date)}
          fechaActual={formatearFecha(diaActual?.date)}
          fechaSiguiente={formatearFecha(diasClima[indiceDia + 1]?.date)}
          diaAnterior={irAlDiaAnterior}
          siguienteDia={irAlDiaSiguiente}
          indiceDia={indiceDia}
          totalDias={diasClima.length}
        />

        <CiudadTitulo nombre={clima?.location?.name} />

        <IconoClima condicion={condicion} />

        <MetricasClima
          humedad={diaActual?.day?.avghumidity}
          presion={diaActual?.hour?.[12]?.pressure_mb}
          viento={diaActual?.day?.maxwind_kph}
        />

        <BarraTemperatura
          tempAnterior={diasClima[indiceDia - 1]?.day?.avgtemp_c}
          tempActual={diaActual?.day?.avgtemp_c}
          tempSiguiente={diasClima[indiceDia + 1]?.day?.avgtemp_c}
          tempMin={diaActual?.day?.mintemp_c}
          tempMax={diaActual?.day?.maxtemp_c}
          indiceDia={indiceDia}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 28,
    paddingTop: 10,
    paddingBottom: 0,
  },
});