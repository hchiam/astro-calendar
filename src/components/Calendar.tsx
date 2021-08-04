export default function Calendar() {
  const today = new Date();
  const nextSunday = new Date();
  nextSunday.setDate(today.getDate() + 7 - today.getDay());
  const dates = getNextMonth(nextSunday);

  function getNextMonth(startDateInclusive: Date): Date[] {
    const dates: Date[] = [];
    const thisYear = startDateInclusive.getFullYear();
    const thisMonth = startDateInclusive.getMonth();
    const firstDay = new Date(thisYear, thisMonth, 1);
    const lastDay = new Date(thisYear, thisMonth + 1, 0);
    let nextDate = startDateInclusive;
    dates.push(new Date(nextDate.getTime()));
    while (nextDate.getTime() < lastDay.getTime()) {
      nextDate.setDate(nextDate.getDate() + 1);
      const n = new Date(nextDate.getTime());
      dates.push(n);
    }
    return dates;
  }

  return (
    <div>
      <p>{dates[0].toLocaleString("default", { month: "short" })}</p>
      {dates.map((date) => {
        const dayOfWeek = date
          .toLocaleString("default", { weekday: "short" })
          .replace(".", "");
        const dayOfMonth = date.getDate();
        return (
          <p>
            {dayOfWeek} {dayOfMonth}
          </p>
        );
      })}
    </div>
  );
}
