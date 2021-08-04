export function sameDay(dateFromAPI: Date, jsDate: Date): boolean {
  return (
    dateFromAPI.getFullYear() === jsDate.getFullYear() &&
    dateFromAPI.getMonth() === jsDate.getMonth() + 1 &&
    dateFromAPI.getDate() === jsDate.getDate()
  );
}
