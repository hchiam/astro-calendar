export default function Circles(props) {
  const {extraNote} = props
  return (
    <>
      <p>〇{extraNote ? ' ' + extraNote:''}</p> <p>〇</p> <p>〇</p>
    </>
  );
}
