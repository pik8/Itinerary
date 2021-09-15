import React from "react";
import Day from "./Day.js";

export default function Madeira() {
  // not working
  // const [lng] = useState(-16.91008776203678);
  // const [lat] = useState(32.64982501913757);
  // const [zoom] = useState(12);

  // create map here

  /*
  useEffect(() => {
    if (!map.current) return;

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  
  <div className="sidebar">
    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
  </div>
  */

  return (
    <div>
      <Day />
    </div>
  );
}
