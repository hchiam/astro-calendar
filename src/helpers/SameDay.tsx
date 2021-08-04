export function sameDay(dateFromAPI: Date, jsDate: Date): boolean {
  return (
    dateFromAPI.getFullYear() === jsDate.getFullYear() &&
    dateFromAPI.getMonth() === jsDate.getMonth() &&
    dateFromAPI.getDate() === jsDate.getDate()
  );
}
