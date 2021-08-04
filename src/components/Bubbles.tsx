export default function Bubbles(props) {
  const { number } = props;
  const bubble = "▢";
  let b = bubble.repeat(number);
  if (b.length === 8) {
    b = b.substring(0, 4) + " " + b.substring(4, 8);
  }
  return <span className="bubble">{b}</span>;
}
