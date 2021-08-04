import { useEffect, useContext } from "react";

import Bubbles from "./Bubbles";
import WeeklyWednesdays from "./WeeklyWednesdays";
import { generateNextID } from "../helpers/GenerateNextID";
import { StatHolidaysContext, getStatHolidayName } from "./StatHolidays";

export default function Month(props) {
  const { firstDate, numberOfMonths } = props;
  const sundayThisWeek = new Date();
  sundayThisWeek.setDate(firstDate.getDate() - (firstDate.getDay() % 7));
  const startMonthName = sundayThisWeek
    .toLocaleString("default", { month: "short" })
    .replace(".", "");
  const dates = getNextMonth(sundayThisWeek, numberOfMonths);
  const weeks = getWeeks(dates);

  const statHolidays = useContext(StatHolidaysContext);

  function getNextMonth(
    startDateInclusive: Date,
    numberOfMonths: number = 1
  ): Date[] {
    const dates: Date[] = [];
    const thisYear = startDateInclusive.getFullYear();
    const thisMonth = startDateInclusive.getMonth() + numberOfMonths;
    const lastDay = new Date(thisYear, thisMonth, 0);
    let nextDate = startDateInclusive;
    dates.push(new Date(nextDate.getTime()));
    while (nextDate.getTime() < lastDay.getTime()) {
      nextDate.setDate(nextDate.getDate() + 1);
      const n = new Date(nextDate.getTime());
      dates.push(n);
    }
    return dates;
  }

  function getWeeks(dates: Date[]): Date[][] {
    const weeks: Date[][] = [];
    let chunk = 7;
    for (let i = 0, j = dates.length; i < j; i += chunk) {
      weeks.push(dates.slice(i, i + chunk));
    }
    return weeks;
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
            return (
              <tr key={generateNextID()}>
                {week.map((date, i) => {
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
                      {holidayNote}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
