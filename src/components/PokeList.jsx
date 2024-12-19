import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import PokeTiles from "./PokeTiles";

const PokeList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=9"
        );
        const data = await response.json();

        // Fetch details for each Pokémon to get images
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const details = await fetch(pokemon.url).then((res) => res.json());
            return {
              name: pokemon.name,
              types: details.types.map((type) => type.type.name),
              image: details.sprites.other.dream_world.front_default,
            };
          })
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <>
      <Box
        sx={{ flexGrow: 1, py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 4 } }}
      >
        <Grid container spacing={2} columns={{ xs: 2, sm: 4, md: 8 }}>
          {pokemons.map((pokemon, index) => (
            <PokeTiles pokemon={pokemon} key={index} />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default PokeList;
