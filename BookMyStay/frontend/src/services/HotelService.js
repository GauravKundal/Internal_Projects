import axios from "axios";

const API_BASE_URL = "http://localhost:2323/api"; // adjust to your backend port

// ✅ Fetch all hotels
export const getAllHotels = async () => {
  return axios.get(`${API_BASE_URL}/hotels`);
};

// ✅ Fetch hotels by city ID
export const getHotelsByCity = async (cityId) => {
  return axios.get(`${API_BASE_URL}/hotels?city=${cityId}`);
};
