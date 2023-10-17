export const calculateNewRating = (averageRating: number, averageCount:number, newRating:number) => {
  const totalRating = averageRating * averageCount + newRating;
  const newAverageCount = averageCount + 1;
  const newAverageRating = totalRating / newAverageCount;

  return newAverageRating;
};
