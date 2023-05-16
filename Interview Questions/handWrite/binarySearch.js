function binarySearch(arr, target, start, end) {
  let targetPosition = -1;

  const median = Math.floor((start + end) / 2);

  if (arr[median] === target) {
    targetPosition = median;
    return targetPosition;
  }

  if (start >= end) {
    return targetPosition;
  }

  if (arr[median] > target) {
    return binarySearch(arr, target, start, median - 1);
  }

  if (arr[median] < target) {
    return binarySearch(arr, target, median + 1, end);
  }
}

function binarySearch(arr, target, start, end) {
  let targetPosition = -1;

  const mid = Math.floor((start + end) / 2);

  if (arr[mid] === target) {
    return mid;
  }

  if (start >= end) {
    return targetPosition;
  }

  if (arr[mid] > target) {
    return binaySearch(arr, target, start, mid - 1);
  }

  if (arr[mid] < target) {
    return binarySearch(arr, target, mid + 1, end);
  }
}
