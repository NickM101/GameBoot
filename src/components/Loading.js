import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Loading = ({helper}) => {
    return (
        <View style={styles.container}>
            <LottieView
            autoPlay loop
            style={styles.lottie}
            source={require('../assets/pong-game-loader.json')}
            />
            <Text style={{ color: 'white', alignSelf: 'center'}}>{helper}</Text>
        </View>
    )
}

export default Loading;

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
