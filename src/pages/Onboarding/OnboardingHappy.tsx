import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { RectButton } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import worldImage from '../../images/OnboardingImages/world.png';
import kidsImage from '../../images/OnboardingImages/kids.png';

export default function OnboardingHappy() {
  const navigation = useNavigation();

  const TitleFirstPage = (): JSX.Element => {

    return (
      <Text style={styles.titleFirst} >
        Leve a felicidade para o mundo
      </Text>
    );
  }

  const TitleSecondPage = (): JSX.Element => {
    return (
      <Text style={styles.titleSecond} >
        Escolha um orfanato no mapa e faça uma visita
      </Text>
    );
  }

  const SubtitleFirstPage = (): JSX.Element => {
    return (
      <Text style={styles.subtitleFirst} >
        Visite orfanatos e mude o dia de muitas crianças
      </Text>
    );
  }

  const ImageFirstPage = (): JSX.Element => {
    return (
      <Image style={styles.worldImage} source={worldImage}></Image>
    );
  }
  
  const ImageSecondPage = (): JSX.Element => {
    return (
      <Image style={styles.kidsImage} source={kidsImage}></Image>
    );
  }
  const navigationMap = () => {
    navigation.navigate('OrphanagesMap');
  }

  const NextButton = () => {
    return (
      <RectButton
        style={styles.nextButton}
        onPress={navigationMap}
      >
        <AntDesign name="arrowright" size={24} color="#15B6D6" />
      </RectButton>
    );
  }

  return (
    <Onboarding
      showSkip={false}
      NextButtonComponent={NextButton}
      DoneButtonComponent={NextButton}
      bottomBarHighlight={false}
      pages={[
        {
          title: TitleFirstPage(),
          subtitle: SubtitleFirstPage(),
          image: ImageFirstPage(),
          backgroundColor: '#F2F3F5'
        },
        {
          title: TitleSecondPage(),
          subtitle: '',
          image: ImageSecondPage(),
          backgroundColor: '#F2F3F5'
        },
      ]}
    >

    </Onboarding>
  );
};

const styles = StyleSheet.create({
  worldImage: {
    height: 279,
    width: 256.22,
    marginTop: -90
  },

  titleFirst: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 40,
    color: '#0089A5',
    marginTop: -60,
    marginHorizontal: 50,
    lineHeight: 42
  },

  subtitleFirst: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5C8599',
    fontSize: 17,
    marginTop: 10,
    marginHorizontal: 50,
  },

  nextButton: {
    height: 56,
    width: 56,
    backgroundColor: '#D1EDF2',
    borderRadius: 20,
    marginRight: 30,
    marginBottom: 40,
    elevation: 4,

    alignItems: 'center',
    justifyContent: 'center',
  },

  kidsImage: {
    height: 427,
    width: 295,
    marginTop: -70
  },

  titleSecond: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 28,
    textAlign: 'right',
    color: '#0089A5',
    marginTop: -60,
    marginHorizontal: 50,
    lineHeight: 35
  },
});
