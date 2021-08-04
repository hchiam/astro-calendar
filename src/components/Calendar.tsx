import { useState } from "react";

import { generateNextID } from "../helpers/GenerateNextID";
import Month from "./Month";
import StatHolidaysWrapper from "../components/StatHolidays";

export default function Calendar() {
  const today = new Date();
  const [numberOfMonths, setNumberOfMonths] = useState(6);
  return (
    <>
      {/* <input
        type="number"
        value={numberOfMonths}
        min="1"
        step="1"
        onChange={(e) => setNumberOfMonths(e.target.value)}
      /> */}
      <StatHolidaysWrapper>
        <Month
          firstDate={today}
          numberOfMonths={numberOfMonths}
          key={generateNextID()}
        />
      </StatHolidaysWrapper>
    </>
  );
}
