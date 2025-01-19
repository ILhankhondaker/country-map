'use client';
import { useState, useEffect } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

// Define the countries you want to include
const countries = {
  US: "United States",
  CA: "Canada",
  MX: "Mexico",
  DE: "Germany",
  ES: "Spain",
  TH: "Thailand",
};

const disabledColor = "#808080"; // Gray color for disabled countries
const colorScale = ["#C8EEFF", "#0071A4", "#008000"]; // Green for selected countries

function CountryMap() {
  const [regionColors, setRegionColors] = useState({
    US: 100, // Green for United States
    CA: 100, // Green for Canada
    MX: 100, // Green for Mexico
    DE: 100, // Green for Germany
    ES: 100, // Green for Spain
    TH: 100, // Green for Thailand
  });

  const [mapPaths, setMapPaths] = useState(null);

  // Dynamically set the map paths after the component has mounted
  useEffect(() => {
    if (worldMill && worldMill.paths) {
      setMapPaths(worldMill.paths);
    }
  }, []);

  function handleRegionClick(event, code) {
    // If the country is not in the list, prevent interaction by returning early
    if (!countries[code]) {
    //   console.log(`You clicked on a disabled country: ${code}`);
      alert("Sorry This Country not allow ");
      return; // Disable the click interaction
    }

    const countryName = countries[code] || "Unknown Country";

    // Update the clicked region's color (for visual feedback)
    setRegionColors((prevColors) => ({
      ...prevColors,
      [code]: 50, // Color changed to show interaction (can be adjusted)
      
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
    <div style={{ margin: "auto", width: "990px", height: "600px" }}>
      <VectorMap
        map={worldMill}
        containerStyle={{
          width: "700px",
          height: "600px",
        }}
        backgroundColor="#DBDDDF"
        series={{
          regions: [
            {
              scale: colorScale, // Color scale for countries
              values: {
                // Check if mapPaths is available
                ...(mapPaths
                  ? Object.keys(mapPaths).reduce((acc, key) => {
                      // If the country code is in the `countries` list, set color to green
                      if (countries[key]) {
                        acc[key] = 100; // Green for selected countries
                      } else {
                        acc[key] = disabledColor; // Gray for disabled countries
                   
                      }
                      return acc;
                    }, {})
                  : {}),
                ...regionColors, // Override the enabled countries' colors (green for selected)
              },
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

export default CountryMap;
