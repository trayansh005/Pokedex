import { Box, TextField } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { PokemonContext } from "../providers/PokemonContext";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { setSelectedPokemon } = useContext(PokemonContext);

  useEffect(() => {
    // Fetch Pokémon data from API
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=2000"
        );
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const details = await fetch(pokemon.url).then((res) => res.json());
            return {
              name: pokemon.name,
              image: details.sprites.other.dream_world.front_default,
            };
          })
        );

        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemon(filtered);
      setIsDropdownVisible(filtered.length > 0);
    } else {
      setFilteredPokemon([]);
      setIsDropdownVisible(false);
    }
  }, [searchTerm]);

  const handleSearch = (name) => {
    setSearchTerm(name);
    setSelectedPokemon(name);
    setIsDropdownVisible(false);
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownVisible(false), 100);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "320px",
        height: "fit-content",
      }}
    >
      <TextField
        variant="outlined"
        fullWidth={true}
        value={searchTerm}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleBlur}
        onFocus={() => setIsDropdownVisible(filteredPokemon.length > 0)}
      />
      <SearchIcon
        sx={{
          position: "absolute",
          top: "50%",
          right: "15px",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
        onClick={() => handleSearch(searchTerm)}
      />
      {isDropdownVisible && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            backgroundColor: "white",
            boxShadow: 2,
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
            borderRadius: "4px",
            marginTop: 2,
          }}
        >
          <ul style={{ margin: 0, padding: "8px 0", listStyle: "none" }}>
            {filteredPokemon.map((pokemon) => (
              <li
                key={pokemon.name}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "black",
                  display: "flex",
                  alignContent: "center",
                  gap: "25px",
                }}
                onClick={() => handleSearch(pokemon.name)}
              >
                {pokemon.name}
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  style={{ width: "24px", height: "24px", marginLeft: "8px" }}
                />
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
