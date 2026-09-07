import { Text, StyleSheet } from 'react-native';

type Props = {
  nombre: string;
};

export default function CiudadTitulo({ nombre }: Props) {
  return (
    <Text style={styles.city} testID="header-city">
      {nombre?.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 20,
  },
});