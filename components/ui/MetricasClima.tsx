import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  humedad: number | undefined;
  presion: number | undefined;
  viento: number | undefined;
};

export default function MetricasClima({ humedad, presion, viento }: Props) {
  return (
    <View style={styles.metrics}>
      <View style={styles.metricRow} testID="metric-item">
        <Feather testID="metric-icon" name="droplet" size={14} color="#000000" />
        <Text testID="metric-value" style={styles.metricValue}>{humedad}%</Text>
      </View>
      <View style={styles.metricRow} testID="metric-item">
        <Feather testID="metric-icon" name="activity" size={14} color="#000000" />
        <Text testID="metric-value" style={styles.metricValue}>{presion} hPa</Text>
      </View>
      <View style={styles.metricRow} testID="metric-item">
        <Feather testID="metric-icon" name="wind" size={14} color="#000000" />
        <Text testID="metric-value" style={styles.metricValue}>{viento} m/s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  metrics: {
    marginBottom: 20,
    gap: 6,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricValue: {
    fontSize: 13,
    color: '#000000',
  },
});