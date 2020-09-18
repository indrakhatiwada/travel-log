import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { ListLogEntries } from "./API";
import EntryForm from "./EntryForm";

const App = () => {
  const [logEntries, SetLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntry, setAddEntry] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });
  const getEntries = async () => {
    const logEntries = await ListLogEntries();
    SetLogEntries(logEntries);
  };
  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntry({
      longitude,
      latitude,
    });
    console.log(event);
  };
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/indra00/ckeznadi611ph19mme6ou523v"
      mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
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
            <div
              onClick={() =>
                setShowPopup({
                  showPopup,
                  [entry._id]: true,
                })
              }
            >
              <svg
                viewBox="0 0 24 24"
                style={{
                  width: "24px",
                  height: "24px",
                  transform: "translate(-50% , -100%)",
                }}
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              anchor="top"
              onClose={() => setShowPopup({})}
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                {entry.image && <img src={entry.image} alt={entry.title} />}
                <small>
                  Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </>
      ))}
      {addEntry ? (
        <>
          <Popup
            latitude={addEntry.latitude}
            longitude={addEntry.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            anchor="top"
            onClose={() => setAddEntry(null)}
          >
            <div className="popup">
              <EntryForm
                location={addEntry}
                onClose={() => {
                  setAddEntry(null);
                  getEntries();
                }}
              />
            </div>
          </Popup>
          <Marker
            latitude={addEntry.latitude}
            longitude={addEntry.longitude}
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
                stroke="red"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                class="css-i6dzq1"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
