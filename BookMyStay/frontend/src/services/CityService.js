import axios from "axios";

const API_BASE_URL = "http://localhost:2323/api";

export const getAllCities = async () => {
  return axios.get(`${API_BASE_URL}/cities`);
};
