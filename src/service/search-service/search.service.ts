import axios from "axios";
import * as SecureStore from "expo-secure-store";

class SearchService {
  api: string = "https://our-first-service.onrender.com";

  async searchByRouteNumber(route_num: string) {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const response = await axios.get(
        `${this.api}/search/route?query=${route_num}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.routes);
      return response.data.routes;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SearchService();
