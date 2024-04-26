import { Algo, Compte } from "./data-type";
import { SimilarityFactory } from "./models/similarity-factory";
import pcg from "./pcg_2005_flat_mada_to_fix.json";

const similarity = SimilarityFactory.algo(Algo.JaroWinkler);
export function autoCompletion(input: string) {
  const similarityThreshold = 0.75;
  const suggestions: Suggestion[] = [];

  for (let compte of pcg.comptes) {
    const distance = similarity.distance(input, compte.nom);

    if (distance >= similarityThreshold) {
      suggestions.push({ compte, distance });
    }
  }
  suggestions.sort((a, b) => b.distance - a.distance);
  return suggestions.map((suggestion) => suggestion.compte);
}

type Suggestion = {
  compte: Compte;
  distance: number;
};
