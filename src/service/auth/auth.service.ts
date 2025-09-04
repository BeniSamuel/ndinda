import axios, { Axios } from "axios";
import * as SecureStore from "expo-secure-store";

class AuthService {
  api: string = "https://our-first-service.onrender.com";

  async handleLogin(user: { email: string; password: string }) {
    try {
        console.log(user);
      const response = await axios.post(`${this.api}/account/passenger/login`, {
        passengerEmail: user.email,
        passengerPassword: user.password,
      });
      if (response.status === 200) {
        await SecureStore.setItemAsync("userToken", response.data.token);
        return response.data.user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleSignup(user: { name: string; email: string; password: string }) {
    console.log(user)
    try {
      const response = await axios.post(`${this.api}/account/passenger/signup`, {
        passengerName: user.name,
        passengerEmail: user.email,
        passengerPassword: user.password,
      });
      console.log(response)
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();
export default authService;
