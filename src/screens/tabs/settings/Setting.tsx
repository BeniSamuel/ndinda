import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TabLayout from "../../../layout/TabLayout";
import Display from "../../../components/settings/Display";
import Others from "../../../components/settings/Others";

const Setting = () => {
  return (
    <TabLayout
      screen_name="Settings"
      image={require("../../../../assets/onboarding/user-profile-image.png")}
    >
      <View>
        <Display />
        <Others />
      </View>
    </TabLayout>
  );
};

export default Setting;

const styles = StyleSheet.create({});
