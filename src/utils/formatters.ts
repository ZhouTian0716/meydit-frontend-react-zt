export const timeAgo = (createdAt: Date) => {
  const now = new Date();
  const created = new Date(createdAt);
  const elapsed = now.getTime() - created.getTime();
  const msPerMin = 60 * 1000;
  const msPerHour = msPerMin * 60;
  const msPerDay = msPerHour * 24;
  if (elapsed < msPerMin) {
    return "just now";
  } else if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed / msPerMin);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.round(elapsed / msPerDay);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
};
