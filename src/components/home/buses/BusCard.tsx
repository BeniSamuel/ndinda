import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Bus from "../../../types/bus/bus.type";
import dimension from "../../../theme/dimension.theme";
import { lightTheme } from "../../../theme/color.theme";
import StopContainer from "./StopContainer";

const BusCard: React.FC<Bus> = (props) => {
  const [hide, setHide] = useState(true);

  const handleShowStops = () => {
    setHide(!hide);
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: hide ? "row" : "column",
          alignItems: hide ? "center" : "flex-start",
        },
      ]}
    >
      <View style={styles.right_wing}>
        <Image
          source={require("../../../../assets/home/bus-icon.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View
          style={[
            styles.content_container,
            { flexDirection: hide ? "column" : "row", gap: hide ? 0 : 20 },
          ]}
        >
          <View>
            <Text style={styles.company_name}>{props.company_name}</Text>
            <Text style={styles.plate_number}>Plate: {props.plate_number}</Text>
          </View>
          <View>
            <Text style={styles.journey_number}>{props.journey_number}: </Text>
            <Text style={styles.journey_description} >
              {props.journey_details}
            </Text>
          </View>
        </View>
      </View>

      {/* Conditionally show stops */}
      {!hide && <StopContainer bus_id={props.id} />}

      <View style={{ width: hide ? "23%" : "100%", alignItems: "flex-end" }}>
        <TouchableOpacity onPress={handleShowStops}>
          <Text style={styles.stop_button_text}>
            {hide ? "View Stops" : "Hide Stops"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BusCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingHorizontal: dimension.width * 0.035,
    paddingVertical: dimension.height * 0.016,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 12,
  },
  right_wing: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  image: {
    height: 25,
    width: 30,
  },
  content_container: {
    flexDirection: "column",
    gap: 2,
  },
  company_name: {
    fontFamily: "poppins-semibold",
  },
  plate_number: {
    fontFamily: "poppins-regular",
    color: "#076e55c3",
  },
  journey_number: {
    fontFamily: "poppins-medium",
  },
  journey_description: {
    fontFamily: "poppins-regular",
  },
  stop_button_text: {
    color: lightTheme.green_color,
    fontFamily: "poppins-medium",
  },
});
