import moment from "moment";

export const calcNextBirthday = (userLocalStorage) => {
  const birthdate = moment(userLocalStorage.dateOfBirth).format("YYYY-MM-DD");
  const today = moment().format("YYYY-MM-DD");
  const years = moment().diff(birthdate, "years");
  const adjustToday = birthdate.substring(5) === today.substring(5) ? 0 : 1;
  const nextBirthday = moment(birthdate).add(years + adjustToday, "years");
  const daysUntilBirthday = nextBirthday.diff(today, "days");
  switch (daysUntilBirthday) {
    case 0:
      return "Happy Birthday!";
    case 1:
      return `${daysUntilBirthday} day`;
    default:
      return `${daysUntilBirthday} days`;
  }
};

export const isUserEmpty = (user) => {
  return Object.values(user).filter((value) => value !== "").length === 0;
};
