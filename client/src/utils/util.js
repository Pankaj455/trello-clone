export const customScrollbar = {
  "&::-webkit-scrollbar": {
    width: "0.5em",
  },
  "&::-webkit-scrollbar-track": {
    display: "none",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#82828255",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#82828288",
  },
  "&::-webkit-scrollbar-thumb:active": {
    backgroundColor: "#828282b1",
  },
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (date) => {
  if (date) {
    date = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("en-us", {
      dateStyle: "full",
    }).format(date);
    return formattedDate.split(", ").slice(1).join(", ");
  }
  return date;
};
