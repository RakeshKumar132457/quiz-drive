export const generateDummyData = (metrics: string[]) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month) => {
    const data: any = { month };
    metrics.forEach((metric) => {
      switch (metric) {
        case "Score":
          data[metric] = Math.floor(Math.random() * 100);
          break;
        case "Time Spent":
          data[metric] = Math.floor(Math.random() * 120);
          break;
        case "Completion Status":
          data[metric] = Math.floor(Math.random() * 100);
          break;
        case "Attempts":
          data[metric] = Math.floor(Math.random() * 10);
          break;
        default:
          data[metric] = Math.floor(Math.random() * 1000);
      }
    });
    return data;
  });
};
