import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TabLayout from "../../../layout/TabLayout";
import notifications from "../../../data/notification/notification.data";
import Empty from "../../../components/notification/empty-notification/Empty";
import Full from "../../../components/notification/full-notification/Full";

const Notification = () => {
  return (
    <TabLayout
      screen_name="Notification"
      image={require("../../../../assets/onboarding/user-profile-image.png")}
    >
      {notifications.length === 0 ? <Empty /> : <Full />}
    </TabLayout>
  );
};

export default Notification;

const styles = StyleSheet.create({});
