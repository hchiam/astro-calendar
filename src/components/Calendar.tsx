import { useState } from "react";

import Month from "./Month";

export default function Calendar() {
  const today = new Date();
  const [numberOfMonths, setNumberOfMonths] = useState(4);
  return (
    <>
      {/* <input
        type="number"
        value={numberOfMonths}
        min="1"
        step="1"
        onChange={(e) => setNumberOfMonths(e.target.value)}
      /> */}
      <Month firstDate={today} numberOfMonths={numberOfMonths} />
    </>
  );
}
