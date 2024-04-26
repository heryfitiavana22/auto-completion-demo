import { useEffect, useState } from "react";
import { autoCompletion } from "./lib/auto-complete/auto-completion";
import { Compte } from "./lib/auto-complete/data-type";

export function App() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Compte[]>([]);

  useEffect(() => {
    const sugg = autoCompletion(inputValue);
    setSuggestions(sugg);
  }, [inputValue]);

  return (
    <div className="flex flex-col items-center h-screen py-10 bg-gray-100">
      <div className="w-full max-w-md space-y-4">
        <p className="text-gray-500">Rechercher un compte dans le PCG</p>
        <input
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          placeholder="Nom du compte..."
          type="text"
          value={inputValue}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setInputValue(value);
          }}
        />
        {inputValue.length > 0 && (
          <ul className="bg-white p-2 rounded-md divide-y">
            {suggestions.map((suggestion) => (
              <li key={suggestion.numero}>
                <div className="px-4 py-3 flex items-center justify-between gap-3 shadow-sm">
                  <span className="text-gray-800 line-clamp-1">
                    {suggestion.nom}
                  </span>
                  <span className="text-gray-400">{suggestion.numero}</span>
                </div>
              </li>
            ))}
            {suggestions.length == 0 && <li>Aucun compte trouvé</li>}
          </ul>
        )}
      </div>
    </div>
  );
}
