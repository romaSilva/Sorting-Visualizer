export const getMergeSortAnimations = (array) => {
  let animations = [];
  let tempArr = array.slice();
  mergeSort(tempArr, 0, tempArr.length - 1, animations);
  return [array, animations];
};

function mergeSort(arr, startIndex, endIndex, animations) {
  if (startIndex === endIndex) return;
  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  mergeSort(arr, startIndex, middleIndex, animations);
  mergeSort(arr, middleIndex + 1, endIndex, animations);
  merge(arr, startIndex, middleIndex, endIndex, animations);
}

function merge(auxillaryArray, startIndex, middleIndex, endIndex, animations) {
  let sortArray = [];
  let i = startIndex;
  let j = middleIndex + 1;
  while (i <= middleIndex && j <= endIndex) {
    animations.push({
      type: "color",
      indexes: [i, j],
      color: "#FF00F3",
    });
    animations.push({
      type: "color",
      indexes: [i, j],
      color: "white",
    });
    if (auxillaryArray[i] <= auxillaryArray[j]) {
      //We should overwrite the value at (i+startIndex)th index with ith index so push them to highlight swap their heights
      //   animations.push([sortArray.length + startIndex, auxillaryArray[i]]);
      animations.push({
        type: "overwrite",
        indexes: [sortArray.length + startIndex, sortArray.length + startIndex],
        newHeights: auxillaryArray[i],
      });
      sortArray.push(auxillaryArray[i++]);
    } else {
      //We should overwrite the value at (i+startIndex)th index with jth index so push them to highlight swap their heights
      //   animations.push([sortArray.length + startIndex, auxillaryArray[j]]);
      animations.push({
        type: "overwrite",
        indexes: [sortArray.length + startIndex, sortArray.length + startIndex],
        newHeights: auxillaryArray[j],
      });
      sortArray.push(auxillaryArray[j++]);
    }
  }
  while (i <= middleIndex) {
    animations.push({
      type: "color",
      indexes: [i, i],
      color: "#FF00F3",
    });
    animations.push({
      type: "color",
      indexes: [i, i],
      color: "white",
    });
    animations.push({
      type: "overwrite",
      indexes: [sortArray.length + startIndex, sortArray.length + startIndex],
      newHeights: auxillaryArray[i],
    });
    // animations.push([sortArray.length + startIndex, auxillaryArray[i]]);
    sortArray.push(auxillaryArray[i++]);
  }
  while (j <= endIndex) {
    animations.push({
      type: "color",
      indexes: [j, j],
      color: "#FF00F3",
    });
    animations.push({
      type: "color",
      indexes: [j, j],
      color: "white",
    });
    animations.push({
      type: "overwrite",
      indexes: [sortArray.length + startIndex, sortArray.length + startIndex],
      newHeights: auxillaryArray[j],
    });
    // animations.push([sortArray.length + startIndex, auxillaryArray[j]]);
    sortArray.push(auxillaryArray[j++]);
  }
  for (let i = startIndex; i <= endIndex; i++) {
    auxillaryArray[i] = sortArray[i - startIndex];
  }
}
