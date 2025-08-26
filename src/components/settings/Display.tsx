import { StyleSheet, Text, View, Image, Switch } from "react-native";
import React, { useState } from "react";
import dimension from "../../theme/dimension.theme";

const Display = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Display</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.outlook}>
          <Image
            source={require("../../../assets/settings/display-icon.png")}
          />
          <View>
            <Text style={styles.details_title}>Theme</Text>
            <Text style={styles.details_text}>System Default (Light Mode)</Text>
          </View>
        </View>
        <Switch
          trackColor={{ false: "white", true: "#00CC99" }}
          value={isEnabled}
          onValueChange={toggleSwitch}
          thumbColor={isEnabled ? "white" : "#00CC99"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    </View>
  );
};

export default Display;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    paddingHorizontal: dimension.width * 0.04,
    paddingVertical: dimension.height * 0.035,
  },
  title: {
    fontFamily: "poppins-semibold",
    color: "#ABABAB",
  },
  outlook: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  details: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details_title: {
    fontFamily: "poppins-medium",
    color: "#000",
  },
  details_text: {
    fontFamily: "poppins-regular",
    color: "#ABABAB",
  },
});
