import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/icon-marker.png';

interface Position {
  latitude: number,
  longitude: number,
}

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [selectionPosition, setSelectionPosition] = useState<Position>();

  function handleNextStep() {
    if(selectionPosition){
      navigation.navigate('OrphanageData', selectionPosition);
    }
  };

  const setMarkerLocation = (location: MapEvent) => {
    setSelectionPosition(location.nativeEvent.coordinate);
  };

  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude: -21.13477612735577,
          longitude: -44.25117887556553,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={setMarkerLocation}
      >
        {selectionPosition && (
          <Marker 
          icon={mapMarkerImg}
          coordinate={{ 
            latitude: selectionPosition.latitude,
            longitude: selectionPosition.longitude
          }}
        />
        )

        }
      </MapView>

      <RectButton 
        style={[styles.nextButton, !selectionPosition && styles.nextButtonDisable]} 
        onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonDisable: {
    backgroundColor: '#83DBE6'
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
})