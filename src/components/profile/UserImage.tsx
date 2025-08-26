import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const { height, width } = Dimensions.get("window");

const UserImage = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== "granted") {
      alert("Sorry, we need camera roll permission to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {image !== null ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image
            source={require("../../../assets/home/profile-picture.png")}
            style={styles.image}
          />
        )}
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Image
          source={require("../../../assets/profile/edit-icon.png")}
          style={styles.button_image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default UserImage;

const styles = StyleSheet.create({
  container: {
    paddingVertical: height * 0.055,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  button: {},
  button_image: {
    position: "absolute",
    bottom: 0,
    left: 25,
  },
});
