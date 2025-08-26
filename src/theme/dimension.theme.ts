import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const dimension = {
  height: height,
  width: width,
};

export default dimension;
