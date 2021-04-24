import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import mapMarkerImg from '../images/icon-marker.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api';

interface OrphanageDetailsRoutesParams {
  id: number;
}

interface OrphanageImages {
  id: number;
  url: string
};

interface OrphanageDetails {
  name: string;
  about: string;
  latitude: number;
  longitude: number;
  instructions: number;
  opening_hours: string;
  open_on_weekends: boolean;
  images: OrphanageImages[];
};

export default function OrphanageDetails() {
  const routes = useRoute();
  const { id } = routes.params as OrphanageDetailsRoutesParams;

  const [orphanageDetails, setOrphanageDetails] = useState<OrphanageDetails>();

  useEffect(() => {
    api.get(`orphanages/${id}`).then(res => {
      setOrphanageDetails(res.data);
    });
  }, [id]);

  if (!orphanageDetails) {
    return (
      <View>
        <ShimmerPlaceHolder style={styles.imagesContainerShimmer} />
        <View style={styles.detailsContainer}>
          <ShimmerPlaceHolder style={styles.titleShimmer} />
          <ShimmerPlaceHolder style={styles.aboutShimmer} />
          <ShimmerPlaceHolder style={styles.mapShimmer} />
        </View>
      </View>
    )
  }

  const handleOpenGoogleMapsRoutes = () => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanageDetails?.latitude},${orphanageDetails?.longitude}`)
  };
 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {orphanageDetails.images.map((image: OrphanageImages) => {
            return (
              <Image key={image.id} style={styles.image} source={{ uri: image.url }} />
            )
          })}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanageDetails.name}</Text>
        <Text style={styles.description}>{orphanageDetails.about}</Text>

          <View style={styles.mapContainer}>
            <MapView
              initialRegion={{
                latitude: orphanageDetails.latitude,
                longitude: orphanageDetails.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}
              zoomEnabled={false}
              pitchEnabled={false}
              scrollEnabled={false}
              rotateEnabled={false}
              style={styles.mapStyle}
            >
              <Marker
                icon={mapMarkerImg}
                coordinate={{
                  latitude: orphanageDetails.latitude,
                  longitude: orphanageDetails.longitude
                }}
              />
            </MapView>

            <TouchableOpacity onPress={handleOpenGoogleMapsRoutes} style={styles.routesContainer}>
              <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          <Text style={styles.title}>Instruções para visita</Text>
          <Text style={styles.description}>{orphanageDetails.instructions}</Text>

          <View style={styles.scheduleContainer}>
            <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
              <Feather name="clock" size={40} color="#2AB5D1" />
              <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>{ orphanageDetails.opening_hours }</Text>
            </View>
            {orphanageDetails.open_on_weekends ? 
            (
              <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                <Feather name="info" size={40} color="#39CC83" />
                <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
              </View>
            ): (
              <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
                <Feather name="info" size={40} color="#FF669D" />
                <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não Atendemos fim de semana</Text>
              </View>
            )}
          </View>

          {/* <RectButton style={styles.contactButton} onPress={() => { }}>
            <FontAwesome name="whatsapp" size={24} color="#FFF" />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainerShimmer: {
    height: 240,
    width: Dimensions.get('window').width
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  titleShimmer: {
    height: 40,
    borderRadius: 10
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },

  aboutShimmer: {
    borderRadius: 10,
    marginTop: 16,
    height: 70,
    width: '100%'
  },

  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapShimmer: {
    borderRadius: 20,
    marginTop: 40,
    height: 500,
    width: '100%'
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5'
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: '#FCF0F4',
    borderWidth: 1,
    borderColor: '#FFBCD4',
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599'
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },

  scheduleTextRed: {
    color: '#FF79A9'
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  }
})