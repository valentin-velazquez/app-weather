import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { obtenerPronostico, obtenerHistorial } from '../services/servicioClima';

export function useClima() {
  const [indiceDia, setIndiceDia] = useState(1);
  const [clima, setClima] = useState<any>(null);
  const [diasClima, setDiasClima] = useState<any[]>([]);

  useEffect(() => {
    const cargarDatosDelClima = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const ubicacion = await Location.getCurrentPositionAsync({});
      const coords = `${ubicacion.coords.latitude},${ubicacion.coords.longitude}`;

      const fechaDeAyer = calcularFechaDeAyer();

      const datosForecast = await obtenerPronostico(coords);
      const datosHistory = await obtenerHistorial(coords, fechaDeAyer);

      setClima(datosForecast);
      setDiasClima([
        datosHistory.forecast.forecastday[0],
        datosForecast.forecast.forecastday[0],
        datosForecast.forecast.forecastday[1]
      ]);
    };

    cargarDatosDelClima();
  }, []);

  const irAlDiaAnterior = () => {
    if (indiceDia > 0) setIndiceDia(prev => prev - 1);
  };

  const irAlDiaSiguiente = () => {
    if (indiceDia < 2) setIndiceDia(prev => prev + 1);
  };

  return { indiceDia, clima, diasClima, irAlDiaAnterior, irAlDiaSiguiente };
}

function calcularFechaDeAyer(): string {
  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1);
  return `${ayer.getFullYear()}-${String(ayer.getMonth() + 1).padStart(2, '0')}-${String(ayer.getDate()).padStart(2, '0')}`;
}