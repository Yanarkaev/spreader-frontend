import { apiInstance } from "./base.service";

export const TaskService = {
  BASE_URL: "tasks/",

  getAll: () => apiInstance.get(TaskService.BASE_URL),

  getNew: () => apiInstance.get(TaskService.BASE_URL + "new"),

  getById: (id) => apiInstance.get(TaskService.BASE_URL + id),

  getByUser: (id) => apiInstance.get(TaskService.BASE_URL + "user/" + id),

  editNotes: ({ taskId, text }) =>
    apiInstance.patch(TaskService.BASE_URL + taskId, { notes: text }),

  takeToWork: ({ taskId, userId, branchId }) =>
    apiInstance.patch(TaskService.BASE_URL + "take/" + taskId, {
      userId,
      branchId,
    }),

  closeTask: (taskId) =>
    apiInstance.patch(TaskService.BASE_URL + "close/" + taskId),

  timeUpdate: ({ taskId, time }) =>
    apiInstance.patch(TaskService.BASE_URL + taskId, { time }),

  addTask: (data) =>
    apiInstance.post(TaskService.BASE_URL, {
      ...data,
      userId: data.userId === "Все" ? undefined : data.userId,
      branchId: data.branchId === "Все" ? undefined : data.branchId,
      state: data.userId !== "Все" ? "inWork" : "new",
    }),
};
