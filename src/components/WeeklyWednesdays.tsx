import { generateNextID } from "../helpers/GenerateNextID";

interface WeeklyWednesdays {
  date: Date;
}

export default function WeeklyWednesdays(props) {
  const { date } = props;
  const isFourDateReference = new Date("2021-08-04T00:00:00.000Z");
  const diff = Math.round(
    Math.abs(date.getTime() - isFourDateReference.getTime()) /
      24 /
      60 /
      60 /
      1000
  );

  const isFive = diff % 14 !== 0;
  const isFour = diff % 14 === 0;
  const isFiveText = wrapLetters("TGRNF");
  const isFourText = wrapLetters("TRNF");
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

function wrapLetters(string: string) {
  return (
    <>
      {string.split("").map((letter) => (
        <>
          <span className="letter" key={generateNextID()}>
            {letter}
          </span>
        </>
      ))}
    </>
  );
}
