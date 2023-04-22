export const getValidTasksCounterWord = (n) => {
  const modulo = n % 10;
  if (modulo === 0 || (modulo >= 5 && modulo <= 10)) {
    return "задач";
  }
  if (modulo === 1) {
    return "задача";
  }
  if (modulo > 1 && modulo < 5) {
    return "задачи";
  }
};
