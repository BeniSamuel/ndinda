import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import Login from "../screens/stacks/login/Login";
import Signup from "../screens/stacks/signup/Signup";
import Onboarding from "../screens/stacks/onboarding/Onboarding";
import ContactUs from "../screens/stacks/contact-us/ContactUs";
import AboutUs from "../screens/stacks/about-us/AboutUs";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Contact" component={ContactUs} />
      <Stack.Screen name="About" component={AboutUs} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
