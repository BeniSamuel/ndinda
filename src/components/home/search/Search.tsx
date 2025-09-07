import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import dimension from "../../../theme/dimension.theme";
import searchService from "../../../service/search-service/search.service";

const { height, width } = Dimensions.get("window");

const Search = () => {
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const handleSearchService = async () => {
      if (!search.trim()) {
        setSearchResults([]);
        setVisibility(false);
        return;
      }

      try {
        const results = await searchService.searchByRouteNumber(search);
        setSearchResults(results || []);
        setVisibility(true); // show results as soon as we get them
      } catch (err) {
        console.log("Error fetching search:", err);
        setSearchResults([]);
        setVisibility(false);
      }
    };

    handleSearchService();
  }, [search]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label_text}>Which Bus Are You Going To Take?</Text>
      </View>

      <View style={styles.input_container}>
        <Image source={require("../../../../assets/home/search-icon.png")} />
        <TextInput
          placeholder="Search by RouteNumber..."
          placeholderTextColor={"#BCC5D2"}
          onChangeText={(text) => setSearch(text)}
          value={search}
          style={styles.input_text}
        />
      </View>

      {visibility && (
        <View style={styles.search_result_container}>
          <View style={styles.search_response}>
            {searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text style={{ fontFamily: "poppins-regular" }}>
                    {item.routeNumber} - {item.routeName}
                  </Text>
                )}
              />
            ) : (
              <Text style={{ fontFamily: "poppins-regular" }}>
                No routes found for "{search}"
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    shadowColor: "#9BACD859",
    shadowOpacity: 0.35,
    left: width * 0.07,
    bottom: height * -0.09,
    width: width * 0.85,
    height: height * 0.16,
    borderRadius: 12,
    paddingHorizontal: width * 0.045,
    paddingVertical: height * 0.015,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    zIndex: 12,
  },
  label_text: {
    fontFamily: "poppins-medium",
    color: "#004B39",
  },
  input_text: {
    fontFamily: "poppins-regular",
    flex: 1,
  },
  input_container: {
    borderColor: "#9BACD859",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.025,
    gap: 8,
    borderRadius: 12,
  },
  search_result_container: {
    position: "relative",
    backgroundColor: "green",
    height: dimension.height * 0.045,
  },
  search_response: {
    backgroundColor: "#FFFDFD",
    height: dimension.height * 0.2,
    position: "absolute",
    top: 0,
    width: dimension.width * 0.76,
    padding: 8,
  },
});
