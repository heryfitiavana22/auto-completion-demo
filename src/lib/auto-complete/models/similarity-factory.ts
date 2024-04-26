import { Algo } from "../data-type";
import { DamerauLevenshtein } from "./damerau-levenshtein";
import { JaroWinkler } from "./jaro-winkler";
import { Levenshtein } from "./levenshtein";

export class SimilarityFactory {
  static algo(type: Algo) {
    if (type == Algo.DamerauLevenshtein) return new DamerauLevenshtein();
    if (type == Algo.Levenshtein) return new Levenshtein();
    return new JaroWinkler();
  }
}
