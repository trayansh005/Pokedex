import {
  Box,
  Chip,
  Typography,
  Tab,
  Tabs,
  Card,
  CardContent,
} from "@mui/material";

import { useState } from "react";
import useTypeColor from "../hooks/useTypeColor";

const PokeCard = ({ pokemonData }) => {
  const [tab, setTab] = useState(0);
  const typeColor = useTypeColor(pokemonData?.types[0]);

  if (!pokemonData || !pokemonData.name) {
    return <div>Loading Pokémon data...</div>;
  }

  return (
    <Card
      sx={{
        width: 500,
        margin: "auto",
        borderRadius: 4,
        boxShadow: 3,
        overflow: "visible",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: typeColor,
          px: 3,
          py: 6,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          color: "white",
        }}
      >
        <div>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {pokemonData?.name.charAt(0).toUpperCase() +
              pokemonData?.name.slice(1)}
          </Typography>
          <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
            {pokemonData?.types.map((type, index) => (
              <Chip
                key={index}
                label={type.charAt(0).toUpperCase() + type.slice(1)}
                sx={{
                  backgroundColor: "hsla(0, 0%, 100%, .2)",
                  color: "white",
                }}
              />
            ))}
          </div>
        </div>
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            right: "0",
            transform: "translateY(-50%)",
          }}
        >
          <img
            src={pokemonData?.image}
            alt={pokemonData?.name}
            style={{
              width: "10rem",
              height: "10rem",
            }}
          />
        </Box>
      </Box>

      {/* Body Section */}
      <CardContent
        sx={{
          position: "relative",
          backgroundColor: "#1E2223",
          color: "white",
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.4)",
          marginTop: "-2rem",
          borderRadius: 8,
          px: 3,
          pt: 3,
        }}
      >
        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          sx={{ marginBottom: 3 }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#4A90E2",
            },
          }}
        >
          <Tab
            label="About"
            sx={{ color: "white", textTransform: "capitalize" }}
          />
          <Tab
            label="Base Stats"
            sx={{ color: "white", textTransform: "capitalize" }}
          />
        </Tabs>

        {/* Tab Content */}
        {tab === 0 && (
          <>
            <Typography sx={{ marginBottom: 2 }}>
              {pokemonData?.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#353A3B",
                padding: 2,
                borderRadius: 4,
                marginBottom: 3,
              }}
            >
              <div>
                <Typography variant="caption" color="#A9ACAE">
                  Code
                </Typography>
                <Typography variant="body1">{pokemonData?.code}</Typography>
              </div>
              <div>
                <Typography variant="caption" color="#A9ACAE">
                  Height
                </Typography>
                <Typography variant="body1">{pokemonData?.height}</Typography>
              </div>
              <div>
                <Typography variant="caption" color="#A9ACAE">
                  Weight
                </Typography>
                <Typography variant="body1">{pokemonData?.weight}</Typography>
              </div>
            </Box>
            <Typography variant="h6">Abilities</Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                marginTop: 1,
                marginBottom: 3,
                flexWrap: "wrap",
              }}
            >
              {pokemonData?.abilities.map((ability, index) => (
                <Chip
                  key={index}
                  label={ability}
                  sx={{
                    backgroundColor: "#53595B",
                    color: "white",
                  }}
                />
              ))}
            </Box>
            <Typography variant="h6">Weaknesses</Typography>
            <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
              {pokemonData?.weaknesses.map((weakness, index) => (
                <Chip
                  key={index}
                  label={weakness}
                  sx={{
                    backgroundColor:
                      weakness === "Grass" ? "#77CC55" : "#FFCC33",
                    color: "black",
                    fontWeight: "bold",
                  }}
                />
              ))}
            </Box>
          </>
        )}
        {tab === 1 && (
          <>
            {pokemonData.stats.map((stats, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    padding: 1, // p-2
                    width: "66.6667%", // w-2/3
                    color: "slategray", // text-slate-400
                    fontSize: "0.875rem", // text-sm (14px)
                    fontWeight: 500, // font-medium
                    whiteSpace: "nowrap", // whitespace-nowrap
                    textTransform: "capitalize", // capitalize
                  }}
                >
                  <strong>{stats.name}:</strong>
                </Typography>

                {/* New Typography for the value */}
                <Typography
                  sx={{
                    padding: 1, // p-2
                    color: "darkslategray", // text color for the value
                    fontSize: "1rem", // text-base (16px)
                    fontWeight: 400, // font-normal
                    textAlign: "left",
                  }}
                >
                  {stats.value}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: ".25rem",
                    position: "relative",
                    backgroundColor: "divider",
                    marginLeft: "10px",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      position: "absolute",
                      backgroundColor: "#4A90E2",
                      width: stats.value + "%",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      zIndex: 10,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box />
                    <Box />
                    <Box />
                    <Box />
                    <Box />
                    <Box />
                  </Box>
                </Box>
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PokeCard;
