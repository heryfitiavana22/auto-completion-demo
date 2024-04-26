import { Similarity } from "./similarity";

export class Levenshtein extends Similarity {
  distance(M: string, P: string): number {
    const matrix = [];
    M = this.caseSensitive(M);
    P = this.caseSensitive(P);

    for (let i = 0; i < M.length + 1; i++) {
      matrix[i] = [i];
      for (let j = 1; j < P.length + 1; j++) {
        if (i == 0) {
          matrix[i].push(j);
        } else {
          const costSubstitution =
            this.caseSensitive(M[i - 1]) === this.caseSensitive(P[j - 1])
              ? 0
              : 1;
          matrix[i].push(
            Math.min(
              matrix[i - 1][j] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j - 1] + costSubstitution
            )
          );
        }
      }
    }
    return matrix[M.length][P.length];
  }
}
