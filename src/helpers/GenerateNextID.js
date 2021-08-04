let iterator;

export function generateNextID() {
  function* generator() {
    let number = 0;
    while (true) yield `id-${number++}`;
  }
  iterator = iterator ?? generator();
  return iterator.next().value;
}
