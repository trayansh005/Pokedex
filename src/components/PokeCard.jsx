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
  const typeColor = useTypeColor(pokemonData?.types?.[0] || "#000000");

  if (!pokemonData || !pokemonData.name) {
    return <div>Loading Pokémon data...</div>;
  }

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const formatNumber = (num) => `#${String("00" + num).slice(-3)}`;

  const TabContent = () => {
    if (tab === 0) {
      return (
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
            {[
              { label: "Code", value: formatNumber(pokemonData?.code) },
              { label: "Height", value: pokemonData?.height },
              { label: "Weight", value: pokemonData?.weight },
            ].map((item, index) => (
              <div key={index}>
                <Typography variant="caption" color="#A9ACAE">
                  {item.label}
                </Typography>
                <Typography variant="body1">{item.value}</Typography>
              </div>
            ))}
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
                label={capitalize(ability)}
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
                label={capitalize(weakness)}
                sx={{
                  backgroundColor: useTypeColor(weakness),
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            ))}
          </Box>
        </>
      );
    }

    if (tab === 1) {
      return (
        <>
          {pokemonData.stats.map((stat, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
            >
              <Typography
                sx={{
                  padding: 1,
                  width: "40%",
                  color: "slategray",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                }}
              >
                <strong>{stat.name}:</strong>
              </Typography>

              <Typography
                sx={{
                  padding: 1,
                  color: "darkslategray",
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                {stat.value}
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  height: "0.25rem",
                  backgroundColor: "divider",
                  marginLeft: 2,
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    backgroundColor: "#4A90E2",
                    width: `${stat.value}%`,
                  }}
                />
              </Box>
            </Box>
          ))}
        </>
      );
    }

    return null;
  };

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
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {capitalize(pokemonData?.name)}
        </Typography>
        <Box sx={{ marginTop: 2, display: "flex", gap: 1 }}>
          {pokemonData?.types.map((type, index) => (
            <Chip
              key={index}
              label={capitalize(type)}
              sx={{
                backgroundColor: "hsla(0, 0%, 100%, .2)",
                color: "white",
              }}
            />
          ))}
        </Box>
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
            style={{ width: "10rem", height: "10rem" }}
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
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          sx={{ marginBottom: 3 }}
          TabIndicatorProps={{ style: { backgroundColor: "#4A90E2" } }}
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

        <TabContent />
      </CardContent>
    </Card>
  );
};

export default PokeCard;
