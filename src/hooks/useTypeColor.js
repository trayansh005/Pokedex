import { useState, useEffect } from 'react';

const useTypeColor = (type) => {
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const types = {
      all: "#3e75c3",
      bug: "#9bba48",
      dark: "#4a3d80",
      dragon: "#1a6bdb",
      electric: "#ffb303",
      fairy: "#e673e4",
      fighting: "#d11332",
      fire: "#f20202",
      flying: "#7fa3f0",
      ghost: "#616EB7",
      grass: "#52e02d",
      ground: "#ce8056",
      ice: "#67ebd1",
      normal: "#A0A29F",
      poison: "#8b38b0",
      psychic: "#e36b64",
      rock: "#66d9c2",
      steel: "#4b9cb3",
      water: "#379cfa",
    };

    setColor(types[type] || "#000000");
  }, [type]); // Re-run when the type changes

  return color;
};

export default useTypeColor;
