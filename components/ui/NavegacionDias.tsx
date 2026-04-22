import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function NavegacionDias({
  fechaAnterior,
  fechaActual,
  fechaSiguiente,
  diaAnterior,
  siguienteDia,
  indiceDia,
  totalDias
}: any) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingVertical: 8,
    }}>

      <TouchableOpacity
        testID="button-prev-day"
        onPress={diaAnterior}
        disabled={indiceDia === 0}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
      >
        <Feather name="chevron-left" size={14} color={indiceDia === 0 ? '#dddddd' : '#aaaaaa'} />
        <Text style={{ fontSize: 12, color: indiceDia === 0 ? '#dddddd' : '#aaaaaa' }}>
          {fechaAnterior || ''}
        </Text>
      </TouchableOpacity>

      <Text
        testID="navigation-current-day"
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#000000',
          letterSpacing: 1,
        }}
      >
        {fechaActual}
      </Text>

      <TouchableOpacity
        testID="button-next-day"
        onPress={siguienteDia}
        disabled={indiceDia === totalDias - 1}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
      >
        <Text style={{ fontSize: 12, color: indiceDia === totalDias - 1 ? '#dddddd' : '#aaaaaa' }}>
          {fechaSiguiente || ''}
        </Text>
        <Feather name="chevron-right" size={14} color={indiceDia === totalDias - 1 ? '#dddddd' : '#aaaaaa'} />
      </TouchableOpacity>

    </View>
  );
}