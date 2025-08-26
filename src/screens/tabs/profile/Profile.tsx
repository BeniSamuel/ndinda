import { StyleSheet, View } from "react-native";
import React from "react";
import TabLayout from "../../../layout/TabLayout";
import UserImage from "../../../components/profile/UserImage";
import UserInform from "../../../components/profile/UserInform";
import UserPass from "../../../components/profile/UserPass";
import DeleteAccount from "../../../components/profile/DeleteAccount";
import Logout from "../../../components/profile/Logout";

const Profile = () => {
  return (
    <TabLayout screen_name="User Profile">
      <View style={styles.container}>
        <UserImage />
        <UserInform />
        <UserPass />
        <DeleteAccount />
        <Logout />
      </View>
    </TabLayout>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
});
