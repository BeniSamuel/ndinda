import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Stop from "../../../types/stop/stop.type";
import dimension from "../../../theme/dimension.theme";
import { Status } from "../../../enums/status.enum";
import { lightTheme } from "../../../theme/color.theme";

const StopCard: React.FC<Stop> = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.indicator,
          {
            backgroundColor:
              props.status === Status.PASSED ? lightTheme.red_status_color : lightTheme.green_status_color,
          },
        ]}
      />
      <View>
        <Text
          style={[
            styles.text,
            {
              color:
                props.status === Status.PASSED
                  ? lightTheme.red_status_color
                  : lightTheme.green_status_color,
            },
          ]}
        >
          {props.place}
        </Text>
      </View>
    </View>
  );
};

export default StopCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center"
  },
  indicator: {
    height: dimension.height * 0.02,
    width: dimension.width * 0.04,
    borderRadius: 100,
  },
  text: {
    fontFamily: "poppins-medium",
  },
});
