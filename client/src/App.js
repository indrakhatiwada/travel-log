import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { ListLogEntries } from "./API";
const App = () => {
  const [logEntries, SetLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });
  useEffect(() => {
    (async () => {
      const logEntries = await ListLogEntries();
      SetLogEntries(logEntries);
      console.log(logEntries);
    })();
  }, []);
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/indra00/ckeznadi611ph19mme6ou523v"
      mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {logEntries.map((entry) => (
        <>
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
            // offsetLeft={-12}
            // offsetTop={-24}
          >
            <div>
              <svg
                viewBox="0 0 24 24"
                style={{
                  width: "24px",
                  height: "24px",
                  transform: "translate(-50% , -100%)",
                }}
                stroke="white"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="css-i6dzq1"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={37.78}
              longitude={-122.41}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup(false)}
              anchor="top"
            >
              <div>You are here</div>
            </Popup>
          ) : null}
        </>
      ))}
    </ReactMapGL>
  );
};

export default App;
