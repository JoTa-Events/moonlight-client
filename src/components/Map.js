import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// location marker icon
import L from "leaflet";
const locationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2377/2377922.png",
  iconSize: [45, 45],
});

export default function Map({ coords }) {

  return (
    <div>
      <MapContainer
        center={coords}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "750px", height: "300px" }}
      >
        <TileLayer
          attribution="&copy; contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={coords} icon={locationIcon}>
          <Popup>The event is here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
