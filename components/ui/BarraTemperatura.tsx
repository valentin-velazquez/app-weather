import { View, Text, StyleSheet } from 'react-native';

type Props = {
  tempAnterior: number | undefined;
  tempActual: number | undefined;
  tempSiguiente: number | undefined;
  tempMin: number | undefined;
  tempMax: number | undefined;
  indiceDia: number;
};

export default function BarraTemperatura({ tempAnterior, tempActual, tempSiguiente, tempMin, tempMax, indiceDia }: Props) {
  return (
    <View style={styles.tempBar}>
      <View style={styles.tempBarInner}>
        
        <Text style={styles.tempValueActive} testID="temp-current">
          {tempActual}°
        </Text>
       
      </View>

      <View style={styles.nowContainer}>
        <View style={styles.nowLine} />
        <Text style={styles.nowLabel}>
          {indiceDia === 0 ? 'AYER' : indiceDia === 1 ? 'HOY' : 'MAÑANA'}
        </Text>
        <View style={styles.nowLine} />
      </View>

      <View style={styles.minMaxRow}>
        <Text style={styles.minMaxText} testID="temp-min">
          {tempMin}°
        </Text>
        <Text style={styles.minMaxText} testID="temp-max">
          {tempMax}°
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tempBar: {
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingTop: 12,
    paddingBottom: 20,
  },
  tempBarInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 28,
    marginBottom: 6,
  },
  tempValue: {
    fontSize: 18,
    color: '#aaaaaa',
    fontWeight: '300',
    width: 60,
    textAlign: 'center',
  },
  tempValueActive: {
    fontSize: 32,
    color: '#000000',
    fontWeight: 'bold',
    width: 80,
    textAlign: 'center',
  },
  nowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  nowLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#cccccc',
  },
  nowLabel: {
    fontSize: 10,
    color: '#aaaaaa',
    marginHorizontal: 8,
    letterSpacing: 1,
  },
  minMaxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  minMaxText: {
    fontSize: 13,
    color: '#aaaaaa',
  },
});