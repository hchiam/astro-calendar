import Month from "./Month";

export default function Calendar() {
  const today = new Date();
  // const firstDayOfNextMonth = getNthDayOfNextMonth(1, today);

  // function getNthDayOfNextMonth(n: number, date: Date) {
  //   if (date.getMonth() == 11) {
  //     return new Date(date.getFullYear() + 1, 0, n);
  //   } else {
  //     return new Date(date.getFullYear(), date.getMonth() + 1, n);
  //   }
  // }

  return (
    <>
      <Month firstDate={today} numberOfMonths={2} />
      {/* <Month firstDate={firstDayOfNextMonth} /> */}
    </>
  );
}
