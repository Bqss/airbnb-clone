import React, { forwardRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
const center = [-7, 112];

const LocationMarker = ({ setLokasi, lokasi }) => {

  const map = useMapEvents({
    locationfound(err) {
      
      fetch(
        `https://api.api-ninjas.com/v1/reversegeocoding?lat=${err.latlng.lat}&lon=${err.latlng.lng}`,
        {
          headers: {
            "X-Api-Key": "bE9H4iA87STTz15LOVjYRA==1zb77iCSWFZDc8ep",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setLokasi({
            name: data[0].name,
            state: data[0].state,
            country: data[0].country,
            latitude: err.latlng.lat,
            longitude: err.latlng.lng,
          });
        });
        map.flyTo(err.latlng, 10);
    },
  });

  return lokasi.name == null ? null : (
    <Marker position={[lokasi.latitude, lokasi.longitude]}>
      <Popup>You location</Popup>
    </Marker>
  )
};

const Map = forwardRef(({ setLokasi, lokasi }, ref) => {
  return (
    <MapContainer
      fadeAnimation={true}
      ref={ref}
      zoom={4}
      center={center}
      className="relative w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker lokasi={lokasi} setLokasi={setLokasi} />
    </MapContainer>
  );
});

export default Map;
