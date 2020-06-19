import { swap } from "../utils/swap";

export const getQuickSortAnimations = (arr) => {
  let animations = [];
  let tempArr = arr.slice();
  quickSort(tempArr, 0, tempArr.length - 1, animations);
  return [tempArr, animations];
};

const quickSort = (arr, start, end, animations) => {
  if (start >= end) {
    if (start === end) {
      animations.push({
        type: "definite",
        indexes: [start, end],
        color: "#18FF00",
      });
    }
    return;
  }
  let index = partition(arr, start, end, animations);
  quickSort(arr, start, index - 1, animations);
  quickSort(arr, index + 1, end, animations);
};

const partition = (arr, start, end, animations) => {
  let pivotIndex = start;
  let pivotValue = arr[end];
  for (let i = start; i < end; i++) {
    animations.push({
      type: "color",
      indexes: [i, end],
      color: "#FF00F3",
    });
    if (arr[i] < pivotValue) {
      animations.push({
        type: "swap",
        indexes: [i, pivotIndex],
        newHeights: [arr[pivotIndex], arr[i]],
      });
      swap(arr, i, pivotIndex);
      pivotIndex++;
    }
    animations.push({
      type: "color",
      indexes: [i, end],
      color: "white",
    });
  }

  animations.push({
    type: "swap",
    indexes: [pivotIndex, end],
    newHeights: [arr[end], arr[pivotIndex]],
  });
  animations.push({
    type: "definite",
    indexes: [pivotIndex, end],
    color: "#18FF00",
  });
  swap(arr, pivotIndex, end);
  return pivotIndex;
};
