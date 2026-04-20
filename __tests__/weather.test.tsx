import { render, fireEvent } from '@testing-library/react-native';
import App from '../app/index';

test('renderiza la pantalla principal', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('screen-weather')).toBeTruthy();
});

test('muestra la ciudad', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('header-city').props.children).toBe('TOKYO');
});

test('muestra temperatura actual', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('temp-current')).toBeTruthy();
});

test('navega al siguiente día', () => {
  const { getByTestId } = render(<App />);

  fireEvent.press(getByTestId('button-next-day'));

  expect(getByTestId('navigation-current-day')).toBeTruthy();
});

test('renderiza métricas', () => {
  const { getAllByTestId } = render(<App />);
  expect(getAllByTestId('metric-item').length).toBeGreaterThanOrEqual(3);
});