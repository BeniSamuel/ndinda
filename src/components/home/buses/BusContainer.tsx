import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import available_buses from "../../../data/available/available.data";
import BusCard from "./BusCard";
import dimension from "../../../theme/dimension.theme";

const BusContainer = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      horizontal={false}
      contentContainerStyle={styles.container}
    >
      {available_buses.map((bus) => (
        <BusCard
          key={bus.id}
          id={bus.id}
          company_name={bus.company_name}
          plate_number={bus.plate_number}
          journey_number={bus.journey_number}
          journey_details={bus.journey_details}
        />
      ))}
    </ScrollView>
  );
};

export default BusContainer;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingVertical: dimension.height * 0.025
  },
});
