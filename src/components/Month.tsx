import { useContext } from "react";

import Bubbles from "./Bubbles";
import Circles from "./Circles";
import WeeklyWednesdays from "./WeeklyWednesdays";
import { generateNextID } from "../helpers/GenerateNextID";
import { StatHolidaysContext, getStatHolidayName } from "./StatHolidays";

export default function Month(props) {
  const { firstDate, numberOfMonths } = props;
  const sundayThisWeek = new Date(); // today
  sundayThisWeek.setDate(firstDate.getDate() - (firstDate.getDay() % 7));
  sundayThisWeek.setHours(0, 0, 0, 0);
  const startMonthName = sundayThisWeek
    .toLocaleString("default", { month: "short" })
    .replace(".", "");
  const dates = getDates(sundayThisWeek, numberOfMonths);
  const weeks = getWeeks(dates);
  const nthLastSunday = getNthLastSunday(sundayThisWeek, numberOfMonths, 4);

  const statHolidays = useContext(StatHolidaysContext);

  function getDates(
    startDateInclusive: Date,
    numberOfMonths: number = 1
  ): Date[] {
    const dates: Date[] = [];
    const lastDay = getLastDay(startDateInclusive, numberOfMonths);
    let nextDate = cloneDate(startDateInclusive);
    dates.push(new Date(nextDate.getTime()));
    while (nextDate.getTime() < lastDay.getTime()) {
      nextDate.setDate(nextDate.getDate() + 1);
      const n = new Date(nextDate.getTime());
      dates.push(n);
    }
    return dates;
  }

  function getLastDay(
    startDateInclusive: Date,
    numberOfMonths: number = 1
  ): Date {
    const thisYear = startDateInclusive.getFullYear();
    const thisMonth = startDateInclusive.getMonth() + numberOfMonths;
    const lastDay = new Date(thisYear, thisMonth, 0);
    return lastDay;
  }

  function cloneDate(date: Date): Date {
    return new Date(date.getTime());
  }

  function getWeeks(dates: Date[]): Date[][] {
    const weeks: Date[][] = [];
    let chunk = 7;
    for (let i = 0, j = dates.length; i < j; i += chunk) {
      weeks.push(dates.slice(i, i + chunk));
    }
    return weeks;
  }

  function getNthLastSunday(
    startDateInclusive: Date,
    numberOfMonths: number = 1,
    nthLast: number = 4
  ): Date {
    nthLast = Math.max(nthLast, 1);
    const lastDay = getLastDay(startDateInclusive, numberOfMonths);
    const sundayOfLastDay = cloneDate(lastDay);
    sundayOfLastDay.setDate(lastDay.getDate() - (lastDay.getDay() % 7));
    sundayOfLastDay.setHours(0, 0, 0, 0);
    const nthLastSunday = cloneDate(sundayOfLastDay);
    nthLastSunday.setDate(nthLastSunday.getDate() - 7 * (nthLast - 1));
    return nthLastSunday;
  }

  function isNLastSunday(date: Date): boolean {
    return date.getTime() === nthLastSunday.getTime();
  }

  return (
    <div>
      {!numberOfMonths && <h2>{startMonthName.toUpperCase()}</h2>}
      <table>
        <thead>
          <tr>
            {weeks[0].map((date) => {
              const dayOfWeek = date.toLocaleString("default", {
                weekday: "short",
              })[0];
              return <th key={generateNextID()}>{dayOfWeek}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => {
            const hasSpacer = (weekIndex - 3) % 8 === 0;
            return (
              <>
                <tr key={generateNextID()}>
                  {week.map((date) => {
                    const dayOfMonth = date.getDate();
                    let monthText = <></>;
                    if (dayOfMonth === 1) {
                      monthText = (
                        <span className="month-text">
                          {date
                            .toLocaleString("default", { month: "short" })
                            .replace(".", "")
                            .toUpperCase()}
                        </span>
                      );
                    }

                    const isWednesday = date.getDay() === 3;
                    let wednesdayNote = <></>;
                    if (isWednesday) {
                      wednesdayNote = (
                        <>
                          <br />
                          <WeeklyWednesdays date={date} />
                        </>
                      );
                    }

                    let nthLastSundayNote = <></>;
                    if (isNLastSunday(date)) {
                      nthLastSundayNote = (
                        <>
                          <br />
                          <div>print calendar?</div>
                        </>
                      );
                    }

                    const holidayName = getStatHolidayName(date, statHolidays);
                    const holidayNote = holidayName ? (
                      <span className="holiday-name">{holidayName}</span>
                    ) : (
                      <></>
                    );

                    return (
                      <td
                        className={dayOfMonth === 1 ? "first-day-of-month" : ""}
                        key={generateNextID()}
                      >
                        {dayOfMonth}&nbsp;
                        <Bubbles number={8} />
                        &nbsp;{monthText}
                        {wednesdayNote}
                        {nthLastSundayNote}
                        {holidayNote}
                        <Circles />
                      </td>
                    );
                  })}
                </tr>
                {hasSpacer && (
                  <tr key={generateNextID()}>
                    <td colSpan={7}>Notes/Defer:</td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
