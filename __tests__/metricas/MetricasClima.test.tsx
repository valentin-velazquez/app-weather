import { render } from '@testing-library/react-native';
import MetricasClima from '@/components/ui/MetricasClima';

jest.mock('@expo/vector-icons', () => ({
  Feather: ({ testID }: any) => {
    const { View } = require('react-native');
    return <View testID={testID} />;
  },
}));

describe('yo como usuario quiero ver las métricas del clima', () => {
  test('renderiza humedad, presión y viento', () => {
    const screen = render(
      <MetricasClima humedad={58} presion={1013} viento={20} />
    );

    expect(screen.getAllByTestId('metric-item').length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByTestId('metric-value').length).toBeGreaterThanOrEqual(3);
  });
});