import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { useNavigation } from '@react-navigation/native';

export default function ReleaseList({ data }) {
  const navigation = useNavigation();

  const renderList = ({ item }) => {
    return (
      <Pressable
      style={({ pressed }) => [
        styles.gameContainer,
        pressed && styles.gameContainerPressed,
      ]}
      onPress={() => navigation.push("Game", { item })}
      >
        <Image source={{ uri: item.background_image }} style={styles.game} />

        <View style={styles.gameDetails}>
          <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.gameTitle}>{item.name}</Text>
            <Text style={styles.gameDate}>{format(parseISO(item.released), 'do EEEE')}</Text>
        </View>
      </Pressable>
    );
  };

  const memoizedValue = React.useMemo(() => renderList, [data.results]);
  return (
    <FlatList
      data={data.results}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      // initialNumToRender={7}
      renderItem={memoizedValue}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    marginBottom: 10,
  },
  contentContainer: {
    paddingLeft: 15,
  },
  game: {
    height: 140,
    width: 140,
  },
  gameContainer: {
    width: 140,
    backgroundColor: '#444',
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 15,
  },
  gameContainerPressed: {
    opacity: 0.8,
  },
  gameDetails: {
    padding: 10,
  },
  gameTitle: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  gameDate: {
    fontSize: 10,
    color: 'gray',
    fontWeight: '400',
    alignSelf: 'flex-end'
  }
});
