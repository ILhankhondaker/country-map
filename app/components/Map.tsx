//@ts-nocheck
'use client'
import { useState } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

// Add Bangladesh to the countries object
const countries = {
  US: "United States",
  IN: "India",
  CN: "China",
  BR: "Brazil",
  RU: "Russia",
  BD: "Bangladesh", // Add Bangladesh
};

const colorScale = ["#C8EEFF", "#0071A4"];
const missingCountries = [
  { latLng: [37.77, -122.41], name: "San Francisco" },
  { latLng: [28.61, 77.20], name: "Delhi" },
];

function WorldMap() {
  // State to manage region colors
  const [regionColors, setRegionColors] = useState({
    US: 80,
    IN: 60,
    CN: 90,
    BD: 70,
  });

  function handleRegionClick(event, code) {
    const countryName = countries[code] || "Unknown Country";

    // Update the clicked region's color to green
    setRegionColors((prevColors) => ({
      ...prevColors,
      [code]: 100, // Set to max value (100) to indicate "green"
    }));

    console.log(`You clicked on: ${countryName}`);
  }

  function handleRegionTipShow(event, label, code) {
    const countryName = countries[code] || "Unknown Country";
    label.html(`
      <div style="background-color: black; border-radius: 6px; min-height: 50px; width: 150px; color: white; padding: 10px;">
        <p><b>${countryName}</b></p>
      </div>
    `);
  }

  return (
    <div style={{ margin: "auto", width: "700px", height: "600px" }}>
      <VectorMap
        map={worldMill}
        containerStyle={{
          width: "700px",
          height: "600px",
        }}
        backgroundColor="#282c34"
        markers={missingCountries}
        markerStyle={{
          initial: {
            fill: "red",
          },
        }}
        series={{
          regions: [
            {
              scale: [...colorScale, "#008000"], // Adding green to the color scale
              values: regionColors, // Use dynamic region colors
              min: 0,
              max: 100,
            },
          ],
        }}
        onRegionTipShow={handleRegionTipShow}
        onRegionClick={handleRegionClick}
      />
    </div>
  );
}

export default WorldMap;
