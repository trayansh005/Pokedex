import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  FormControlLabel,
  styled,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import PokemonLogo from "./assets/pokemon.svg";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PokeList from "./components/PokeList";
import PokeCard from "./components/PokeCard";
import Grid from "@mui/material/Grid2";
import { PokemonContext } from "./providers/PokemonContext";

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& + .MuiSwitch-track": {
        backgroundColor: "#8796A5",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
  },
}));

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Fetch the main Pokémon details
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        const data = await response.json();

        // Fetch additional details from the species URL
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        // Extract the description from flavor_text_entries
        const description = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en" // Ensure the description is in English
        )?.flavor_text;

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
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, [pokemon]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#063157" : "#FFFFFF", // Black for dark mode, white for light mode
        paper: darkMode ? "#1E1E1E" : "#F5F5F5", // Paper color
      },
    },
  });

  const handleToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <PokemonContext.Provider value={{ pokemon, setPokemon }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            px: { xs: 2, sm: 4, md: 8 },
            py: { xs: 2, sm: 3, md: 4 },
            height: "100vh",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <AppBar position="static" elevation={0}>
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.palette.background.default,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ color: theme.palette.text.secondary }}
              >
                News
              </Typography>
              <img
                src={PokemonLogo}
                alt="Pokemon Logo"
                style={{ width: "8rem" }}
              />
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    checked={darkMode}
                    onChange={handleToggle}
                  />
                }
              />
            </Toolbar>
          </AppBar>

          <Grid container spacing={2} sx={{ p: 3, marginTop: "4rem" }}>
            <Grid size={7}>
              <h1>PokeDex</h1>
              <TextField
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 8,
                  },
                }}
                onChange={(e) => setPokemon(e.target.value)}
              />
            </Grid>
            <PokeCard pokemonData={pokemon} />
          </Grid>
          <Box sx={{ backgroundColor: theme.palette.background.default }}>
            <PokeList />
          </Box>
        </Container>
      </ThemeProvider>
    </PokemonContext.Provider>
  );
}

export default App;
