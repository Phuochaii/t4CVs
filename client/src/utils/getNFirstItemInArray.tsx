const getNFirstItemInArray = (currentArray, n: number) => {
  const resultArray = [];
  for (let i = 0; i < n; i++) {
    resultArray.push(currentArray[i]);
  }
  return resultArray;
};

export default getNFirstItemInArray;
