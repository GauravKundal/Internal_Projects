import axios from "axios";
import { USER_REGISTER_API, USER_LOGIN_API } from "../constants/APIConstant";

// ✅ Register new user
export function registerUser(formData) {
  return axios.post(USER_REGISTER_API, formData);
}

// ✅ Login user
export function loginUser(formData) {
  return axios.post(USER_LOGIN_API, formData);
}

// ✅ Token helpers
export function storeToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function storeRole(role) {
  localStorage.setItem("role", role);
}

export function getRole() {
  return localStorage.getItem("role");
}

export function removeRole() {
  localStorage.removeItem("role");
}
