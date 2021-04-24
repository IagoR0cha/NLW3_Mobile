import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title: string;
    showCancel?: boolean;
}

export default function Header(props: HeaderProps) {
    const { title, showCancel = true } = props;
    const navigation = useNavigation();

    const handlerNavigateToLandingPage = () => {
        navigation.navigate('OrphanagesMap');
    };

    const handlerNavigateToPreviousPage = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <BorderlessButton onPress={handlerNavigateToPreviousPage}>
                <Feather 
                    name="arrow-left"
                    size={24}
                    color="#15b5d6"
                />
            </BorderlessButton>
            <Text style={styles.title}>{title}</Text>

            {showCancel ? (
                <BorderlessButton onPress={handlerNavigateToLandingPage}>
                    <Feather 
                        name="x"
                        size={24}
                        color="#ff669d"
                    />
                </BorderlessButton>
            ) : (
                <View />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16,
    }
})