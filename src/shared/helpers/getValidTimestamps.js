export const getValidTimestamps = (timestamps) => {
  return timestamps && timestamps.split("T")[0].split("-").reverse().join(".");
  
};
