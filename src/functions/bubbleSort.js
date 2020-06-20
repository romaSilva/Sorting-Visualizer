import { swap } from "../utils/swap";

export const getBubbleSortAnimations = (arr) => {
  let animations = [];
  let tempArr = arr.slice();
  bubbleSort(tempArr, animations);

  return [tempArr, animations];
};

function bubbleSort(arr, animations) {
  const N = arr.length;
  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < N - i - 1; j++) {
      animations.push({
        type: "color",
        indexes: [j, j + 1],
        color: "#FF00F3",
      });
      if (arr[j] > arr[j + 1]) {
        animations.push({
          type: "swap",
          indexes: [j, j + 1],
          newHeights: [arr[j + 1], arr[j]],
        });
        swap(arr, j, j + 1);
      }
      animations.push({
        type: "color",
        indexes: [j, j + 1],
        color: "white",
      });
    }
    animations.push({
      type: "definite",
      indexes: [N - i - 1, N - i - 1],
      color: "#18FF00",
    });
  }
}
