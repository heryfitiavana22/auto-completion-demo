import pcg from "./pcg_2005_flat_mada_to_fix.json";

export type SimilarityOption = {
  caseSensitive?: boolean;
};

export enum Algo {
  Levenshtein = "levenshtein",
  DamerauLevenshtein = "DamerauLevenshtein",
  JaroWinkler = "JaroWinkler",
}

export type Compte = (typeof pcg)["comptes"][number];
