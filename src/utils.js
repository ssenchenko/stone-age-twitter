/* eslint-disable no-restricted-syntax */

export const mapToArray = (map, callback) => {
  const array = [];
  for (const [key, value] of map.entries()) {
    array.push(callback(key, value));
  }
  return array;
};

// new Map([...left, ...right])
// is not good enough because it depends on the order
// and in case of fetching new objects and updating existing objects
// the order must be different when we need new objects fetched into the top
// consider left as an old map and right as a new map
export const mergeMaps = (left, right, valuesMergeFunc) => {
  // that's a map to return, empty to fetch new objects from right first
  const merged = new Map();
  // update left values and don't mutate left
  // while there is a possibility to find a new object,
  // which should be inserted before objects from left
  const temp = new Map(left);
  for (const [rightKey, rightValue] of right.entries()) {
    // fetch new values in the beginning of the new map
    if (!left.has(rightKey)) {
      merged.set(rightKey, rightValue);
    } else {
      // update values from left, but store them in temp (unmutable left)
      const leftValue = left.get(rightKey);
      const updatedLeftValue = valuesMergeFunc(leftValue, rightValue);
      temp.set(rightKey, updatedLeftValue);
    }
  }
  // copy temp over the merged
  for (const [key, value] of temp.entries()) {
    merged.set(key, value);
  }
  return merged;
};
