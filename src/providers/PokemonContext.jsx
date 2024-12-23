import { createContext, useState, useEffect, useRef } from "react";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState("pikachu");
  const [pokemon, setPokemon] = useState({});
  const pokeCardRef = useRef(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Fetch the main Pokémon details
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
        );
        const data = await response.json();

        // Fetch additional details from the species URL
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        // Extract the description from flavor_text_entries
        const description = speciesData.flavor_text_entries[8].flavor_text;

        const weaknessResponse = await fetch(data.types[0].type.url);
        const weaknessData = await weaknessResponse.json();

        const weakness = weaknessData.damage_relations.double_damage_from.map(
          (name) => name.name
        );

        // Combine details
        const pokemonDetails = {
          name: data.name,
          code: data.id,
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map((ability) => ability.ability.name),
          moves: data.moves.map((move) => move.move.name),
          weaknesses: weakness,
          types: data.types.map((type) => type.type.name),
          image: data.sprites.other.dream_world.front_default,
          description: description || "No description available",
          stats: data.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
        };

        setPokemon(pokemonDetails);
        console.log("Rendering pokemon details");
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, [selectedPokemon]);

  return (
    <PokemonContext.Provider
      value={{ pokemon, setPokemon, pokeCardRef, setSelectedPokemon }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
