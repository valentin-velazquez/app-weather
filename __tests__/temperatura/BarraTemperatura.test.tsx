import { render } from '@testing-library/react-native';
import BarraTemperatura from '@/components/ui/BarraTemperatura';

describe('yo como usuario quiero ver la temperatura del día', () => {
  test('muestra la temperatura actual, mínima y máxima', () => {
    const screen = render(
      <BarraTemperatura
        tempAnterior={20}
        tempActual={25}
        tempSiguiente={22}
        tempMin={18}
        tempMax={28}
        indiceDia={1}
      />
    );

    expect(screen.getByTestId('temp-current')).toBeTruthy();
    expect(screen.getByTestId('temp-min')).toBeTruthy();
    expect(screen.getByTestId('temp-max')).toBeTruthy();
  });
});