import { Similarity } from "./similarity";

export class JaroWinkler extends Similarity {
  distance(s1: string, s2: string): number {
    const p = 0.1;
    let m = 0;
    let transposition = 0;
    let commonPrefix = 0;
    let hasCommonPrefix = true;
    const maxLength = Math.max(s1.length, s2.length);
    let matchsS1 = Array(maxLength).fill(0);
    let matchsS2 = Array(maxLength).fill(0);
    s1 = this.caseSensitive(s1);
    s2 = this.caseSensitive(s2);

    const maxDistance = Math.max(s1.length, s2.length) / 2 - 1;
    for (let i = 0; i < s1.length; i++) {
      // correspondant et ne depasse pas le maximum d'eloignment
      // difference de i et j <= maxDistance
      const min = Math.max(0, i - maxDistance);
      const max = Math.min(s2.length, i + maxDistance + 1);
      for (let j = min; j < max; j++) {
        if (s1[i] == s2[j] && matchsS2[j] == 0) {
          matchsS1[i] = 1;
          matchsS2[j] = 1;
          m++;
          break;
        }
      }
      if (hasCommonPrefix && s1[i] == s2[i] && commonPrefix < 4) commonPrefix++;
      else hasCommonPrefix = false;
    }

    let nextS2 = 0;
    for (let i = 0; i < maxLength; i++) {
      if (matchsS1[i]) {
        while (matchsS2[nextS2] == 0) nextS2++;

        if (s1[i] != s2[nextS2++]) transposition++;
      }
    }
    transposition /= 2;

    const a = m / s1.length;
    const b = m / s2.length;
    const c = (m - transposition) / m;
    const dj = (1 / 3) * (a + b + c);
    const dw = dj + commonPrefix * p * (1 - dj);
    return dw;
  }
}
