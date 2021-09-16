import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import itinerary from "./../utilities/itinerary.json";
import { getStartLocationCoordinates, getNextRoutePoints, getNextLocationCoordinates } from "./../utilities/planner.js";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export default function Day() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 14;
  const startCoordinates = getStartLocationCoordinates("day1");

  let [currentPointIndex, setCurrentPointIndex] = useState(2);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: startCoordinates,
      zoom: zoom,
    });
  });

  // Directions request
  async function getRoute() {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${
        itinerary.day1[currentPointIndex - 2].commute
      }/${getNextRoutePoints("day1", currentPointIndex)}?steps=true&geometries=geojson&access_token=${
        mapboxgl.accessToken
      }`,
      { method: "GET" }
    );

    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;

    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };

    // if the route already exists on the map, we'll reset it using setData
    if (map.current.getSource("route")) {
      map.current.getSource("route").setData(geojson);

      map.current.flyTo({
        center: getNextLocationCoordinates("day1", currentPointIndex),
        zoom: 16,
      });
    } else {
      // otherwise, we'll make a new request
      map.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }

    // INSTRUCTIONS
    const instructions = document.getElementById("instructions");
    const steps = data.legs[0].steps;

    let tripInstructions = "";
    for (const step of steps) {
      tripInstructions += `<li>${step.maneuver.instruction}</li>`;
    }
    instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
      data.duration / 60
    )} min 🚶 </strong></p><ol>${tripInstructions}</ol>`;
  }

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("load", () => {
      getRoute();
      itinerary.day1.map((item) => {
        map.current.addLayer({
          id: item.id,
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: item.coordinates,
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 8,
            "circle-color": item.color,
          },
        });

        return (
          <div key={item.id}>
            <span>{item.name}</span>
            <span>{item.coordinates}</span>
          </div>
        );
      });
    });
  });

  function getNextDirection() {
    setCurrentPointIndex(currentPointIndex++);

    if (itinerary.day1[currentPointIndex - 1]) {
      getRoute();
    } else {
      alert("Congrats! You've reached the end of the day");
    }
  }

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
      <div className="instructions-container">
        <div id="destination">
          At: <b>{itinerary.day1[currentPointIndex-1].name}</b>
          <br />
          To: <b>{itinerary.day1[currentPointIndex].name}</b>
        </div>
        <div id="instructions" />
        <button className="next" onClick={getNextDirection}>
          Next &#10140;
        </button>
        ({currentPointIndex})
        {itinerary.day1[currentPointIndex - 1].notes && (
          <div id="notes">Notes: {itinerary.day1[currentPointIndex - 1].notes}</div>
        )}
      </div>
    </div>
  );
}
