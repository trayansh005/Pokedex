import { Box, Chip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useContext } from "react";
import useTypeColor from "../hooks/useTypeColor";
import { PokemonContext } from "../providers/PokemonContext";

const PokeTiles = ({ pokemonData }) => {
  const { setPokemon, pokeCardRef } = useContext(PokemonContext);

  const handlePokemonChange = () => {
    setPokemon(pokemonData.name);
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  const typeColor = useTypeColor(pokemonData?.types?.[0] || "#000000");

  return (
    <>
      <Grid size={2}>
        <Box
          sx={{
            backgroundColor: typeColor,
            px: 3,
            py: 2,
            borderRadius: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
            cursor: "pointer", // Add a pointer cursor to indicate it's clickable
          }}
          onClick={handlePokemonChange}
        >
          <div>
            <Typography variant="h5">
              {pokemonData.name.charAt(0).toUpperCase() +
                pokemonData.name.slice(1)}
            </Typography>
            <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
              {pokemonData.types.map((type, index) => (
                <Chip
                  key={index}
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  sx={{ backgroundColor: "hsla(0, 0%, 100%, .2)" }}
                />
              ))}
            </div>
          </div>

          <img
            src={pokemonData.image}
            alt={pokemonData.name}
            style={{ width: "6rem", height: "7rem" }}
          />
        </Box>
      </Grid>
    </>
  );
};

export default PokeTiles;
