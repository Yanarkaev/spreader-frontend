import { apiInstance } from "./base.service";

export const UserService = {
  BASE_URL: "users/",

  getAll: () => apiInstance.get(UserService.BASE_URL),

  getWorker: (id) => apiInstance.get(UserService.BASE_URL + id),

  signUp: (data) => apiInstance.post("signup", data),

  signIn: (data) => apiInstance.post("signin", data),
};
