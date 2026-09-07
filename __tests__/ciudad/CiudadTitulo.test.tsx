import { render } from '@testing-library/react-native';
import CiudadTitulo from '@/components/ui/CiudadTitulo';

describe('yo como usuario quiero ver el nombre de la ciudad', () => {
  test('muestra el nombre de la ciudad en mayúsculas', () => {
    const screen = render(<CiudadTitulo nombre="Tokyo" />);
    expect(screen.getByTestId('header-city').props.children).toBe('TOKYO');
  });
});