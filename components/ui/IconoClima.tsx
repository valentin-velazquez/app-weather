import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { obtenerIconoDelClima } from '../../lib/utilidades';

type Props = {
  condicion: string;
};

export default function IconoClima({ condicion }: Props) {
  return (
    <View style={styles.iconContainer} testID={`icon-weather-${obtenerIconoDelClima(condicion)}`}>
      <Feather
        name={obtenerIconoDelClima(condicion)}
        size={160}
        color="#000000"
        strokeWidth={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 10,
  },
});