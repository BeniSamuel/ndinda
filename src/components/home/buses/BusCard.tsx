import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Bus from "../../../types/bus/bus.type";
import dimension from "../../../theme/dimension.theme";
import { lightTheme } from "../../../theme/color.theme";

const BusCard: React.FC<Bus> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.right_wing}>
        <View>
          <Image
            source={require("../../../../assets/home/bus-icon.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.content_container}>
          <View>
            <Text style={styles.company_name}>{props.company_name}</Text>
            <Text style={styles.plate_number}>Plate: {props.plate_number}</Text>
          </View>
          <View>
            <Text style={styles.journey_number}>{props.journey_number}: </Text>
            <Text style={styles.journey_description}>
              {props.journey_details}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <Text style={styles.stop_button_text}>View Stops</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BusCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: dimension.width * 0.035,
    paddingVertical: dimension.height * 0.016,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 12,
    alignItems: "center",
  },
  right_wing: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  image: {
    height: 25,
    width: 30,
  },
  content_container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  company_name: {
    fontFamily: "poppins-semibold",
  },
  plate_number: {
    fontFamily: "poppins-regular",
    color: "#076e55c3"
  },
  journey_number: {
    fontFamily: "poppins-medium",
  },
  journey_description: {
    fontFamily: "poppins-regular",
  },
  stop_button_text: {
    color: lightTheme.green_color,
    fontFamily: "poppins-medium"
  }
});
