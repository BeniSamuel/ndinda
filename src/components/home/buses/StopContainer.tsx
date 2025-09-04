import { StyleSheet, Text, View } from "react-native";
import React from "react";
import stops from "../../../data/stop/stop.data";
import StopCard from "./StopCard";
import dimension from "../../../theme/dimension.theme";

type StopContainerProp = {
  bus_id: number;
};

const StopContainer: React.FC<StopContainerProp> = ({ bus_id }) => {
  return (
    <View style={styles.container}>
      {stops.map((stop) =>
        stop.bus_id === bus_id ? (
          <StopCard
            id={stop.id}
            key={stop.id}
            details={stop.details}
            place={stop.place}
            bus_id={stop.bus_id}
            status={stop.status}
          />
        ) : (
          <></>
        )
      )}
    </View>
  );
};

export default StopContainer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: dimension.width * 0.023,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    paddingVertical: dimension.height * 0.015
  }
});
