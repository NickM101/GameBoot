import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import ErrorScreen from "../components/ErrorScreen";
import Loading from "../components/Loading";
import { getGenreID } from "../utils/api";
import { categories } from "../utils/BootList";
import Rating from "../components/Rating";
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

const BrowserScreen = ({ navigation }) => {
  const [selectedCategory, setCategory] = React.useState(4);

  const { status, data, error } = useQuery("categories", () =>
    getGenreID(selectedCategory)
  );

  React.useEffect(() => {
    () => useQuery("categories", () => getGenreID(selectedCategory));
  }, [selectedCategory]);

  const renderGames = ({ item }) => {
    return (
      <Pressable
        key={item.id.toString()}
        style={styles.game}
        onPress={() => navigation.push("Game", { item })}
      >
        <Image
          style={styles.gameCover}
          source={{ uri: item.background_image }}
        />
        <View style={styles.gameInfo}>
          <Text style={styles.gameTitle}>{item.name}</Text>
          <Text style={{ color: "white", fontSize: 10, fontWeight: '200' }}>{format(parseISO(item.released), 'do MMMM YYY')}</Text>
          <Rating item={item} />
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView edges={["right", "bottom", "left"]} style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {categories.map((genre, index) => {
          return (
            <View key={index} style={styles.category}>
              <Text
                style={{
                  color: selectedCategory === genre.id ? "#819ee5" : "#9a9a9a",
                  fontWeight: selectedCategory === genre.id ? "700" : "500",
                }}
                onPress={() => setCategory(genre.id)}
              >
                {genre.name}
              </Text>
              {selectedCategory === genre.id && (
                <View style={styles.categoryDot} />
              )}
            </View>
          );
        })}
      </ScrollView>
      {status === "loading" ? (
        <Loading helper={"Loading games..."} />
      ) : status === "error" ? (
        <ErrorScreen helper={error} />
      ) : (
        <FlatList
          data={data.results}
          style={styles.games}
          renderItem={renderGames}
        />
      )}
    </SafeAreaView>
  );
};

export default BrowserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  categories: {
    marginTop: 35,
    flexGrow: 0,
  },
  category: {
    alignItems: "center",
    marginHorizontal: 15,
    height: 32,
  },
  categoryDot: {
    width: 25,
    height: 2,
    borderRadius: 3,
    backgroundColor: "#819ee5",
  },
  games: {
    flex: 1,
    marginTop: 32,
  },
  game: {
    marginBottom: 32,
  },
  gameCover: {
    height: 300,
    width: "100%",
  },
  gameInfo: {
    marginHorizontal: 16,
    marginTop: -30,
    marginBottom: 0,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "rgb(53, 84, 126)",
  },
  gameTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  gameText: {
    color: "white",
  },
});
