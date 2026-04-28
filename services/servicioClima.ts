const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export async function obtenerPronostico(coords: string) {
  const respuesta = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${coords}&days=2`
  );
  return respuesta.json();
}

export async function obtenerHistorial(coords: string, fecha: string) {
  const respuesta = await fetch(
    `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${coords}&dt=${fecha}`
  );
  return respuesta.json();
}