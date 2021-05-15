import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Loading = ({helper}) => {
    // const animation = React.useRef(null).current;
    // console.log('animation 1', animation)

    // React.useEffect(() => {
    //     console.log('animation 2', animation)

    //     const play = animation.play()
    //     return play()
    // }, [])
    return (
        <View style={styles.container}>
            <LottieView
            // ref={animation}
            style={styles.lottie}
            source={require('../assets/pong-game-loader.json')}
            />
            <Text>{helper}</Text>
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
