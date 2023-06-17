export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getRandomColors = (count: number) => {
  const listOfColors = [];
  while (count > 0) {
    listOfColors.push(getRandomColor());
    count--;
  }
  return listOfColors;
};
