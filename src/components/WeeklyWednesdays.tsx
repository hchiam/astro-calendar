import { generateNextID } from "../helpers/GenerateNextID";

interface WeeklyWednesdays {
  date: Date;
}

export default function WeeklyWednesdays(props) {
  const { date } = props;
  const isFourDateReference = new Date("2021-08-05T02:41:05.841Z");
  const diff = Math.round(
    (date.getTime() - isFourDateReference.getTime()) / 24 / 60 / 60 / 1000
  );
  const isFive = diff % 14 !== 0;
  const isFour = diff % 14 === 0;
  const isFiveText = addBrackets("TGRNF");
  const isFourText = addBrackets("TRNF");
  if (isFive === true) {
    return (
      <span className="weekly-wednesdays" key={generateNextID()}>
        {isFiveText}
      </span>
    );
  } else if (isFour === true) {
    return (
      <span className="weekly-wednesdays" key={generateNextID()}>
        {isFourText}
      </span>
    );
  } else {
    return <></>;
  }
}

function addBrackets(string: string) {
  return (
    <>
      {string.split("").map((letter) => (
        <>
          {"["}
          <span className="letter" key={generateNextID()}>
            {letter}
          </span>
          {"]"}
        </>
      ))}
    </>
  );
}
