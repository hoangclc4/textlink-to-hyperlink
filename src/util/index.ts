export const removeDuplicateObjectInArray = (array: any[]) => {
  const uniqueArray = array
    .map((e) => JSON.stringify(e))
    .filter((e, i, final) => final.indexOf(e) === i)
    .map((e) => JSON.parse(e));
  return uniqueArray;
};
