import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native';

const ErrorScreen = ({ helper }) => {
    return (
        <View style={styles.container}>
            <LottieView
            autoplay loop
            style={styles.lottie}
            source={require('../assets/error.json')}
            />
            <Text style={{ color: 'white', alignSelf: 'center'}}>{helper}</Text>
        </View>
    )
}

export default ErrorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222'
    },
    lottie: {
        width:400,
        height:400,
        backgroundColor: '#222'
    }
})
