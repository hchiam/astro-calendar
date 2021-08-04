import { useState, useEffect, createContext, useContext } from "react";

import { sameDay } from "../helpers/SameDay";

interface StatHoliday {
  date: Date;
  name: string;
}

export const StatHolidaysContext = createContext();

export default function StatHolidaysWrapper(props) {
  const [statHolidays, setStatHolidays] = useState([]);
  useEffect(() => {
    fetch("https://canada-holidays.ca/api/v1/provinces/ON")
      .then((res) => res.json())
      .then((res) => {
        let holidays = res?.province?.holidays;
        if (holidays) {
          holidays = holidays.map((d) => {
            const [year, month, date] = d.date.split("-"); // d.observedDate ?
            const holiday: StatHoliday = {
              date: new Date(Number(year), Number(month) - 1, Number(date)),
              name: d.nameEn,
            };
            return holiday;
          });
          setStatHolidays(holidays);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <StatHolidaysContext.Provider value={statHolidays}>
      {statHolidays.length ? props.children : <h2>Fetching holidays...</h2>}
    </StatHolidaysContext.Provider>
  );
}

export function getStatHolidayName(
  date: Date,
  statHolidays: StatHoliday[]
): string {
  return statHolidays.filter((holiday) => sameDay(holiday.date, date))[0]?.name;
}
