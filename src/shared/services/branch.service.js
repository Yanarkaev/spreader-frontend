import { apiInstance } from "./base.service";

export const BranchService = {
  BASE_URL: "branch/",

  getAll: () => apiInstance.get(BranchService.BASE_URL),

  addBranch: () => apiInstance.post(BranchService.BASE_URL, {}),
};
