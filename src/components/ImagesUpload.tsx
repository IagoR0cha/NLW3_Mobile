import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

interface ImageProps {
  image: string;
  handleClick: Function;
}

export default function ImagesUpload(props: ImageProps) {
  const { image, handleClick } = props;

  const returnTitleImage = (uri: string, wordSize: number) => {
    const arrayUri = uri.split('/');
    const title = arrayUri[arrayUri.length - 1].split('');
    return `${title.splice(0, wordSize).join('')}...`;
  }

  return (
    <LinearGradient
      style={styles.imagesContainer}
      colors={['#FCF0F4', '#EDFFF6']}
      start={{ x: 1, y: 0 }}
    >
      <View style={styles.infoImages}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.title} >{returnTitleImage(image, 13)}</Text>
      </View>
      <BorderlessButton onPress={() => handleClick(image)}>
        <AntDesign name="close" size={20} color="#FF669D" />
      </BorderlessButton>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  imagesContainer: {
    height: 72,
    marginBottom: 16,
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: '#A4FAFF',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 5
  },

  infoImages: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    height: 60,
    width: 60,
    borderRadius: 16
  },

  title: {
    marginLeft: 10,
    fontFamily: 'Nunito_600SemiBold',
    color: '#37C77F',
    fontSize: 16,
  }
});