import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState, useCallback, useContext } from "react";
import PokeTiles from "./PokeTiles";

const PokeList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPokemons = useCallback(async (currentOffset) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${currentOffset}`
      );
      const data = await response.json();

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

      setPokemons((prevPokemons) =>
        currentOffset === 0
          ? pokemonDetails
          : [...prevPokemons, ...pokemonDetails]
      );
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemons(0); // Load initial Pokémon
  }, [fetchPokemons]);

  const handleLoadMore = () => {
    const newOffset = offset + 12;
    setOffset(newOffset);
    fetchPokemons(newOffset);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 4 },
        textAlign: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        columns={{ xs: 2, sm: 4, md: 10 }}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {pokemons.map((pokemon, index) => (
          <PokeTiles pokemonData={pokemon} key={index} />
        ))}
      </Grid>
      <Button
        variant="outlined"
        sx={{ marginTop: 3 }}
        onClick={handleLoadMore}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load More"}
      </Button>
    </Box>
  );
};

export default PokeList;
