export const formatDate = (date) => {
  const dateObj = new Date(date);
  const parts = date.split("T")[0];
  const time = dateObj.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return `${parts} ${time}`;
};
