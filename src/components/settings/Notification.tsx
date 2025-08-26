import { StyleSheet, Text, View, Image, Switch } from "react-native";
import React, { useState } from "react";

const Notification = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(!isEnabled);
  return (
    <View style={styles.details}>
      <View style={styles.outlook}>
        <Image
          source={require("../../../assets/settings/notification-icon.png")}
        />
        <Text style={styles.details_title}>Notification</Text>
      </View>
      <Switch
        trackColor={{ false: "white", true: "#00CC99" }}
        value={isEnabled}
        onValueChange={toggleSwitch}
        thumbColor={isEnabled ? "white" : "#00CC99"}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
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
