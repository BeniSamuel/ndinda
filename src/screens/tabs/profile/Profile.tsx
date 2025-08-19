import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TabLayout from "../../../layout/TabLayout";

const Profile = () => {
  return (
    <TabLayout screen_name="User Profile">
      <View>
        <Text>Profile</Text>
      </View>
    </TabLayout>
  );
};

export default Profile;

const styles = StyleSheet.create({});
