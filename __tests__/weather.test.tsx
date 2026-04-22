import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../app/index';

// Mock de fetch para que no llame a la API real
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      location: { name: 'Villa Lugano', region: 'Buenos Aires', country: 'Argentina' },
      current: {
        condition: { icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' },
        humidity: 80,
        pressure_mb: 1015,
        wind_kph: 10,
      },
      forecast: {
        forecastday: [{
          date: '2026-04-21',
          day: {
            avgtemp_c: 18,
            mintemp_c: 14,
            maxtemp_c: 22,
            avghumidity: 80,
            maxwind_kph: 10,
            condition: { text: 'Partly cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' },
          },
          hour: Array(24).fill({ pressure_mb: 1015 }),
        },
        {
          date: '2026-04-22',
          day: {
            avgtemp_c: 20,
            mintemp_c: 15,
            maxtemp_c: 24,
            avghumidity: 75,
            maxwind_kph: 12,
            condition: { text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
          },
          hour: Array(24).fill({ pressure_mb: 1013 }),
        }]
      }
    })
  })
) as jest.Mock;

test('renderiza la pantalla principal', async () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('screen-weather')).toBeTruthy();
});

test('muestra la ciudad', async () => {
  const { getByTestId } = render(<App />);
  await waitFor(() => {
    expect(getByTestId('header-city')).toBeTruthy();
  });
});

test('muestra temperatura actual', async () => {
  const { getByTestId } = render(<App />);
  await waitFor(() => {
    expect(getByTestId('temp-current')).toBeTruthy();
  });
});

test('navega al siguiente día', async () => {
  const { getByTestId } = render(<App />);
  await waitFor(() => {
    expect(getByTestId('button-next-day')).toBeTruthy();
  });
  fireEvent.press(getByTestId('button-next-day'));
  expect(getByTestId('navigation-current-day')).toBeTruthy();
});

test('renderiza métricas', async () => {
  const { getAllByTestId } = render(<App />);
  await waitFor(() => {
    expect(getAllByTestId('metric-item').length).toBeGreaterThanOrEqual(3);
  });
});

test('muestra temperatura mínima y máxima', async () => {
  const { getByTestId } = render(<App />);
  await waitFor(() => {
    expect(getByTestId('temp-min')).toBeTruthy();
    expect(getByTestId('temp-max')).toBeTruthy();
  });
});

test('la app expone todos los testID obligatorios', async () => {
  const { getByTestId } = render(<App />);
  const ids = [
    'screen-weather',
    'header-city',
    'button-prev-day',
    'button-next-day',
    'temp-current',
    'temp-min',
    'temp-max',
  ];
  await waitFor(() => {
    ids.forEach(id => {
      expect(getByTestId(id)).toBeTruthy();
    });
  });
});