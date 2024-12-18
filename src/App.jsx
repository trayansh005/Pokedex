import { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  FormControlLabel,
  styled,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import PokemonLogo from "./assets/pokemon.svg";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PokeList from "./components/PokeList";

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
                <MaterialUISwitch checked={darkMode} onChange={handleToggle} />
              }
            />
          </Toolbar>
          <Box sx={{ backgroundColor: theme.palette.background.default }}>
            <PokeList />
          </Box>
        </AppBar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
