import moment from "moment";

// DASHBOARD
export const calcNextBirthday = (dateOfBirth) => {
  const birthdate = moment(dateOfBirth).format("YYYY-MM-DD");
  const today = moment().format("YYYY-MM-DD");
  const years = moment().diff(birthdate, "years");
  const adjustToday = birthdate.substring(5) === today.substring(5) ? 0 : 1;
  const nextBirthday = moment(birthdate).add(years + adjustToday, "years");
  const daysUntilBirthday = nextBirthday.diff(today, "days");
  switch (daysUntilBirthday) {
    case 0:
      return "Happy Birthday!";
    case 1:
      return `${daysUntilBirthday} Day Until Your Birthday.`;
    default:
      return `${daysUntilBirthday} Days Until Your Birthday.`;
  }
};

export const getFirstName = (displayName) => {
  return displayName.split(" ")[0];
};

// APP
export const parseUserFromLocalStorage = (user) => {
  return user === undefined ? null : JSON.parse(user);
};

// GLOBAL
export const capitalizeFirstLetter = (string) => {
  return (
    string.toLowerCase().charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  );
};
