import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Home from "../screens/tabs/home/Home";
import Notification from "../screens/tabs/notification/Notification";
import Profile from "../screens/tabs/profile/Profile";
import Setting from "../screens/tabs/settings/Setting";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontFamily: "poppins-medium" },
        tabBarActiveTintColor: "#00CC99",
        tabBarIcon: ({ focused, size }) => {
          let icon;

          switch (route.name) {
            case "Home":
              icon = focused
                ? require("../../assets/common/home-active-icon.png")
                : require("../../assets/common/home-inactive-icon.png");
              break;
            case "Notification":
              icon = focused
                ? require("../../assets/common/notification-active-icon.png")
                : require("../../assets/common/notification-inactive-icon.png");
              break;
            case "Profile":
              icon = focused
                ? require("../../assets/common/favorite-active-icon.png")
                : require("../../assets/common/favorite-inactive-icon.png");
              break;
            case "Settings":
              icon = focused
                ? require("../../assets/common/settings-active-icon.png")
                : require("../../assets/common/settings-inactive-icon.png");
              break;
            default:
              icon = require("../../assets/common/default-icon.png");
          }

          return (
            <Image
              source={icon}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          );
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
