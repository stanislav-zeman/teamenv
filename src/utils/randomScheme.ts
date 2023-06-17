const chakraColors = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

export const getRandomScheme = () => {
  return chakraColors[Math.floor(Math.random() * chakraColors.length)];
};

export const getRandomSchemes = (count: number) => {
    const listOfSchemes = [];
    while (count > 0) {
      listOfSchemes.push(getRandomScheme());
      count--;
    }
    return listOfSchemes;
  };