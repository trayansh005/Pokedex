import { Box, Chip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";

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
    // <div>
    //   <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
    //     {pokemons.map((pokemon, index) => (
    //       <li key={index}>
    //         <img src={pokemon.image} alt={pokemon.name} />
    //         {pokemon.types.map((type, index) => (
    //           <span key={index} className={`pokemon-type ${type}`}>
    //             {type}
    //           </span>
    //         ))}
    //         <p>
    //           {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
    //         </p>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <>
      <Box
        sx={{ flexGrow: 1, py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 4 } }}
      >
        <Grid container spacing={2} columns={{ xs: 2, sm: 4, md: 8 }}>
          {pokemons.map((pokemon, index) => (
            <Grid size={2} key={index}>
              <Box
                sx={{
                  backgroundColor: "#1e2223",
                  px: 3,
                  py: 2,
                  borderRadius: 4,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "white",
                  boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div>
                  <Typography variant="h5">
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </Typography>
                  <div
                    style={{ marginTop: "12px", display: "flex", gap: "8px" }}
                  >
                    {pokemon.types.map((type, index) => (
                      <Chip
                        key={index}
                        label={type.charAt(0).toUpperCase() + type.slice(1)}
                        sx={{ backgroundColor: "#53595B" }}
                      />
                    ))}
                  </div>
                </div>

                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  style={{ width: "6rem", height: "7rem" }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default PokeList;
