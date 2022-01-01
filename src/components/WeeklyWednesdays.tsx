import { generateNextID } from "../helpers/GenerateNextID";

interface WeeklyWednesdays {
  date: Date;
}

export default function WeeklyWednesdays(props) {
  const { date } = props;
  const isFourDateReference = new Date("2021-08-04T04:00:00.000Z");
  const diff = getDifferenceInTimeInDays(date, isFourDateReference);
  const isFour = diff === 0 || diff % 14 === 0;
  const isFive = diff % 14 !== 0;
  const isFourText = wrapLetters("TRNF");
  const isFiveText = wrapLetters("TGRNF");
  if (isFour === true) {
    return (
      <span className="weekly-wednesdays" key={generateNextID()}>
        {isFourText}
      </span>
    );
  } else if (isFive === true) {
    return (
      <span className="weekly-wednesdays" key={generateNextID()}>
        {isFiveText}
      </span>
    );
  } else {
    return <></>;
  }
}

function wrapLetters(string: string) {
  return string.split("").map((letter) => (
    <span className="letter" key={generateNextID()}>
      {letter}
    </span>
  ));
}

function getDifferenceInTimeInDays(date1: Date, date2: Date): number {
  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const days = Math.floor(diffInMilliseconds / oneDayInMilliseconds);
  return days;
}
