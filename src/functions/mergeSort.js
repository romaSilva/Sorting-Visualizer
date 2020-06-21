export function getMergeSortAnimations(tempArr) {
  const animations = [];
  if (tempArr.length <= 1) return tempArr;
  const auxArr = tempArr.slice();
  mergeSortHelper(tempArr, 0, tempArr.length - 1, auxArr, animations);
  return [tempArr, animations];
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
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
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({
        type: "overwrite",
        indexes: [k, k],
        newHeights: auxiliaryArray[i],
      });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({
        type: "overwrite",
        indexes: [k, k],
        newHeights: auxiliaryArray[j],
      });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
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
      indexes: [k, k],
      newHeights: auxiliaryArray[i],
    });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
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
      indexes: [k, k],
      newHeights: auxiliaryArray[j],
    });
    mainArray[k++] = auxiliaryArray[j++];
  }
}
