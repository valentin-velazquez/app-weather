export function obtenerIconoDelClima(condicion: string): any {
  if (!condicion) return 'sun';
  const c = condicion.toLowerCase();
  if (c.includes('sunny') || c.includes('clear')) return 'sun';
  if (c.includes('thunder') || c.includes('storm')) return 'cloud-lightning';
  if (c.includes('snow') || c.includes('blizzard')) return 'cloud-snow';
  if (c.includes('rain') || c.includes('drizzle')) return 'cloud-rain';
  if (c.includes('overcast') || c.includes('cloud')) return 'cloud';
  if (c.includes('fog') || c.includes('mist')) return 'cloud-drizzle';
  return 'sun';
}

export function formatearFecha(fecha: string): string {
  if (!fecha) return '';
  const [, mes, dia] = fecha.split('-');
  return `${parseInt(mes)}/${parseInt(dia)}`;
}