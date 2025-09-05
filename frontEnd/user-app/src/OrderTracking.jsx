import { useEffect, useState } from "react";
import io from "socket.io-client";
import MapWithMarker from "./MapWithMarker";
const url=import.meta.env.VITE_BASE_URL;
const socket = io(url); 

function OrderTracking() {
  const [userCoords, setUserCoords] = useState(null);
  const [driverCoords, setDriverCoords] = useState(null);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      });
    }
  }, []);

  // Listen for driver updates
  useEffect(() => {
    socket.on("updateDriverLocation", (data) => {
      setDriverCoords({ lat: data.lat, lng: data.lng });
    });

    return () => socket.off("updateDriverLocation");
  }, []);

  return (
    <div>
      <h2>Track Your Order</h2>
      <MapWithMarker userCoords={userCoords} driverCoords={driverCoords} />
    </div>
  );
}

export default OrderTracking;
