export const generateRandomArray = () => {
  const arr = [];
  for (let i = 0; i < 150; i++) {
    arr.push(Math.floor(Math.random() * 500));
  }
  return arr;
};
