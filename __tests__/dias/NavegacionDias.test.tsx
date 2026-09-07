import { fireEvent, render } from '@testing-library/react-native';
import NavegacionDias from '@/components/ui/NavegacionDias';

describe('yo como usuario quiero ver que se pueda mover entre días', () => {
  test('permite navegar al día anterior y siguiente', () => {
    const irAlDiaAnterior = jest.fn();
    const irAlDiaSiguiente = jest.fn();

    const screen = render(
      <NavegacionDias
        fechaAnterior="dom"
        fechaActual="hoy"
        fechaSiguiente="mar"
        diaAnterior={irAlDiaAnterior}
        siguienteDia={irAlDiaSiguiente}
        indiceDia={1}
        totalDias={3}
      />
    );

    fireEvent.press(screen.getByTestId('button-prev-day'));
    expect(irAlDiaAnterior).toHaveBeenCalled();

    fireEvent.press(screen.getByTestId('button-next-day'));
    expect(irAlDiaSiguiente).toHaveBeenCalled();
  });
});