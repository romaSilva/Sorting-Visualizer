import { swap } from "../utils/swap";

export const getInsertSortAnimations = (arr) => {
  let animations = [];
  let tempArr = arr.slice();
  insertSort(tempArr, animations);

  return [tempArr, animations];
};

const insertSort = (arr, animations) => {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      animations.push({
        type: "color",
        indexes: [j, j - 1],
        color: "#FF00F3",
      });
      if (arr[j] < arr[j - 1]) {
        animations.push({
          type: "swap",
          indexes: [j, j - 1],
          newHeights: [arr[j - 1], arr[j]],
        });
        swap(arr, j, j - 1);
        animations.push({
          type: "color",
          indexes: [j, j - 1],
          color: "white",
        });
      } else {
        animations.push({
          type: "color",
          indexes: [j, j - 1],
          color: "white",
        });
        break;
      }
    }
  }
};
