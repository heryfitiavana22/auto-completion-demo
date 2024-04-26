import { SimilarityOption } from "../data-type";

export const defaultOption: SimilarityOption = {
  caseSensitive: false,
};

export abstract class Similarity {
  constructor(private option: SimilarityOption = defaultOption) {}

  abstract distance(s1: string, s2: string): number;

  caseSensitive(s: String) {
    return this.option.caseSensitive ? s.trim() : s.toLowerCase().trim();
  }
}
