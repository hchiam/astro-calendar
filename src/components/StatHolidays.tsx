import { useState, useEffect, createContext, useContext } from "react";

export const StatHolidaysContext = createContext();

interface StatHolidays {
  [key: string]: string;
}

export default function StatHolidaysWrapper(props) {
  const [statHolidays, setStatHolidays] = useState({});
  useEffect(() => {
    fetch("https://canada-holidays.ca/api/v1/provinces/ON")
      .then((res) => res.json())
      .then((res) => {
        const holidays = res?.province?.holidays;
        const holidaysHashTable: StatHolidays = {};
        if (holidays) {
          holidays.forEach((d) => {
            const [year, month, dayOfMonth] = d.date.split("-"); // d.observedDate ?
            const date = getDateKey(new Date(year, month - 1, dayOfMonth));
            const name = d.nameEn;
            holidaysHashTable[date] = name;
          });
          setStatHolidays(holidaysHashTable);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <StatHolidaysContext.Provider value={statHolidays}>
      {Object.keys(statHolidays).length ? (
        props.children
      ) : (
        <h2>Fetching holidays...</h2>
      )}
    </StatHolidaysContext.Provider>
  );
}

export function getStatHolidayName(
  date: Date,
  statHolidays: StatHolidays
): string {
  const key = getDateKey(date);
  const holidayName = statHolidays[key];
  return holidayName;
}

function getDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  return `${year}-${month}-${dayOfMonth}`;
}
