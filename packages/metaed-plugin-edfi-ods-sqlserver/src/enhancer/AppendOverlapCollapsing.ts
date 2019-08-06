export function appendOverlapCollapsing(accumulated: string, current: string): string {
  const shortestLength = Math.min(accumulated.length, current.length);
  let indexOfOverlap = -1;

  for (let i = shortestLength; i > 0; i -= 1) {
    if (accumulated.endsWith(current.substring(0, i))) {
      indexOfOverlap = i;
      break;
    }
  }

  if (indexOfOverlap < 0) return accumulated + current;
  if (indexOfOverlap <= current.length) return accumulated + current.substring(indexOfOverlap);
  return accumulated;
}
