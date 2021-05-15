import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ErrorScreen = () => {
    const animation = React.useRef(null).current;

    React.useEffect(() => {
        const play = animation.play()
        return play()
    }, [])
    return (
        <View style={styles.container}>
            <LottieView
            ref={animation}
            style={styles.lottie}
            source={require('../assets/error.json')}
            />
            <Text>{helper}</Text>
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
