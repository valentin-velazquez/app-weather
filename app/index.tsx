import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';
import NavegacionDias from '../components/ui/NavegacionDias';

export default function App() {

  const [indiceDia, setIndiceDia] = useState(1);
  const [clima, setClima] = useState<any>(null);
  const [diasClima, setDiasClima] = useState<any[]>([]);

  useEffect(() => {
    const obtenerClima = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const ubicacion = await Location.getCurrentPositionAsync({});
      const coords = `${ubicacion.coords.latitude},${ubicacion.coords.longitude}`;

      const respuestaForecast = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&q=${coords}&days=2`
      );2
      const datosForecast = await respuestaForecast.json();

      const ayer = new Date();
      ayer.setDate(ayer.getDate() - 1);
      const fechaAyer = `${ayer.getFullYear()}-${String(ayer.getMonth()+1).padStart(2,'0')}-${String(ayer.getDate()).padStart(2,'0')}`;

      const respuestaHistory = await fetch(
        `https://api.weatherapi.com/v1/history.json?key=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&q=${coords}&dt=${fechaAyer}`
      );
      const datosHistory = await respuestaHistory.json();

      setClima(datosForecast);
      setDiasClima([
        datosHistory.forecast.forecastday[0],
        datosForecast.forecast.forecastday[0],
        datosForecast.forecast.forecastday[1]
      ]);
    };

    obtenerClima();
  }, []);

  const diaAnterior = () => {
    if (indiceDia > 0) setIndiceDia(prev => prev - 1);
  };

  const siguienteDia = () => {
    if (indiceDia < 2) setIndiceDia(prev => prev + 1);
  };

  const diaActual = diasClima[indiceDia];

  const getIconoClima = (condicion: string): any => {
    if (!condicion) return 'sun';
    const c = condicion.toLowerCase();
    if (c.includes('sunny') || c.includes('clear')) return 'sun';
    if (c.includes('thunder') || c.includes('storm')) return 'cloud-lightning';
    if (c.includes('snow') || c.includes('blizzard')) return 'cloud-snow';
    if (c.includes('rain') || c.includes('drizzle')) return 'cloud-rain';
    if (c.includes('overcast') || c.includes('cloud')) return 'cloud';
    if (c.includes('fog') || c.includes('mist')) return 'cloud-drizzle';
    return 'sun';
  };

  const formatearFecha = (fecha: string) => {
    if (!fecha) return '';
    const [, mes, dia] = fecha.split('-');
    return `${parseInt(mes)}/${parseInt(dia)}`;
  };

  const condicion = diaActual?.day?.condition?.text || '';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.container} testID="screen-weather">

        <NavegacionDias
          fechaAnterior={formatearFecha(diasClima[indiceDia - 1]?.date)}
          fechaActual={formatearFecha(diaActual?.date)}
          fechaSiguiente={formatearFecha(diasClima[indiceDia + 1]?.date)}
          diaAnterior={diaAnterior}
          siguienteDia={siguienteDia}
          indiceDia={indiceDia}
          totalDias={diasClima.length}
        />

        <Text style={styles.city} testID="header-city">
          {clima?.location?.name?.toUpperCase()}
        </Text>

        <View style={styles.iconContainer} testID="icon-weather">
          <Feather
            name={getIconoClima(condicion)}
            size={160}
            color="#000000"
            strokeWidth={1}
          />
        </View>

        <View style={styles.metrics}>
          <View style={styles.metricRow} testID="metric-item">
            <Feather name="droplet" size={14} color="#000000" />
            <Text style={styles.metricValue}>{diaActual?.day?.avghumidity}%</Text>
            
          </View>
          <View style={styles.metricRow} testID="metric-item">
            <Feather name="activity" size={14} color="#000000" />
            <Text style={styles.metricValue}>{diaActual?.hour?.[12]?.pressure_mb} hPa</Text>
          </View>
          <View style={styles.metricRow} testID="metric-item">
            <Feather name="wind" size={14} color="#000000" />
            <Text style={styles.metricValue}>{diaActual?.day?.maxwind_kph} m/s</Text>
          </View>
        </View>

        {/* Barra inferior */}
        <View style={styles.tempBar}>

          <View style={styles.tempBarInner}>

            {/* Izquierda: día anterior */}
            <Text style={styles.tempValue}>
              {diasClima[indiceDia - 1]?.day?.avgtemp_c != null
                ? `${diasClima[indiceDia - 1].day.avgtemp_c}°`
                : ''}
            </Text>

            {/* Centro: día actual */}
            <Text style={styles.tempValueActive} testID="temp-current">
              {diaActual?.day?.avgtemp_c}°
            </Text>

            {/* Derecha: día siguiente */}
            <Text style={styles.tempValue}>
              {diasClima[indiceDia + 1]?.day?.avgtemp_c != null
                ? `${diasClima[indiceDia + 1].day.avgtemp_c}°`
                : ''}
            </Text>

          </View>

          <View style={styles.nowContainer}>
            <View style={styles.nowLine} />
            <Text style={styles.nowLabel}>
  {indiceDia === 0 ? 'AYER' : indiceDia === 1 ? 'HOY' : 'MAÑANA'}
</Text>
            <View style={styles.nowLine} />
          </View>

          <View style={styles.minMaxRow}>
            <Text style={styles.minMaxText} testID="temp-min">
              {diaActual?.day?.mintemp_c}°
            </Text>
            <Text style={styles.minMaxText} testID="temp-max">
              {diaActual?.day?.maxtemp_c}°
            </Text>
          </View>

        </View>

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
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 10,
  },
  metrics: {
    marginBottom: 20,
    gap: 6,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricValue: {
    fontSize: 13,
    color: '#000000',
  },
  tempBar: {
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingTop: 12,
    paddingBottom: 20,
  },
  tempBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 28,
    marginBottom: 6,
  },
  tempValue: {
    fontSize: 18,
    color: '#aaaaaa',
    fontWeight: '300',
    width: 60,
    textAlign: 'center',
  },
  tempValueActive: {
    fontSize: 32,
    color: '#000000',
    fontWeight: 'bold',
    width: 80,
    textAlign: 'center',
  },
  nowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  nowLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#cccccc',
  },
  nowLabel: {
    fontSize: 10,
    color: '#aaaaaa',
    marginHorizontal: 8,
    letterSpacing: 1,
  },
  minMaxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  minMaxText: {
    fontSize: 13,
    color: '#aaaaaa',
  },
});