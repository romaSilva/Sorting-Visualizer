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
    // These are the values that we're comparing; we push them once
    // to change their color.
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
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push({
        type: "overwrite",
        indexes: [k, k],
        newHeights: auxiliaryArray[i],
      });
      //   animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      //   animations.push([k, auxiliaryArray[j]]);
      animations.push({
        type: "overwrite",
        indexes: [k, k],
        newHeights: auxiliaryArray[j],
      });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
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
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push({
      type: "overwrite",
      indexes: [k, k],
      newHeights: auxiliaryArray[i],
    });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
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
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push({
      type: "overwrite",
      indexes: [k, k],
      newHeights: auxiliaryArray[j],
    });
    mainArray[k++] = auxiliaryArray[j++];
  }
}
