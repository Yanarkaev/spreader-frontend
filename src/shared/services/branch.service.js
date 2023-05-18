import { apiInstance } from "./base.service";

export const BranchService = {
  BASE_URL: "branch/",

  getAll: () => apiInstance.get(BranchService.BASE_URL),

  addBranch: (name) => apiInstance.post(BranchService.BASE_URL, { name }),

  deleteBranch: (id) => apiInstance.delete(BranchService.BASE_URL + id),
};
