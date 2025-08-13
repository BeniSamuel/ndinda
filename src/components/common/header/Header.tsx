import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

type HeaderProp = {
  screen_name: string;
};

const Header: React.FC<HeaderProp> = ({ screen_name }) => {
  return (
    <View>
      <View>
        <TouchableOpacity></TouchableOpacity>
        <Text>{screen_name}</Text>
      </View>
      <View></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
