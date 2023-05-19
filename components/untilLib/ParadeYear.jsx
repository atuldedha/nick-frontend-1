// This function sets the parade year on the footer
// It checks if the month is between 2 months and either
// adds a year or keeps the same year

export const paradeYear = () => {
  const checkCurrentMonth = new Date().getMonth();
  if (checkCurrentMonth <= 11 && checkCurrentMonth > 6) {
    return new Date().getFullYear() + 1;
  } else {
    return new Date().getFullYear();
  }
};
