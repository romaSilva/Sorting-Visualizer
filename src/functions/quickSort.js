import { swap } from "../utils/swap";

export const getQuickSortAnimations = (arr) => {
  let animations = [];
  let tempArr = arr.slice();
  quickSort(tempArr, 0, tempArr.length - 1, animations);
  return [tempArr, animations];
};

const quickSort = (arr, start, end, animations) => {
  if (start >= end) return;
  let index = partition(arr, start, end, animations);
  quickSort(arr, start, index - 1, animations);
  quickSort(arr, index + 1, end, animations);
};

const partition = (arr, start, end, animations) => {
  let pivotIndex = start;
  let pivotValue = arr[end];
  for (let i = start; i < end; i++) {
    animations.push([i, end]);
    animations.push([i, end]);
    if (arr[i] < pivotValue) {
      animations.push([i, arr[pivotIndex]]);
      animations.push([pivotIndex, arr[i]]);
      swap(arr, i, pivotIndex);
      pivotIndex++;
    } else {
      animations.push([-1, -1]);
      animations.push([-1, -1]);
    }
    animations.push([-1, -1]);
    animations.push([-1, -1]);
  }
  animations.push([-1, -1]);
  animations.push([-1, -1]);
  animations.push([-1, -1]);
  animations.push([-1, -1]);
  animations.push([pivotIndex, arr[end]]);
  animations.push([end, arr[pivotIndex]]);
  swap(arr, pivotIndex, end);
  return pivotIndex;
};
