import { useEffect, useState } from "react";
import io from "socket.io-client";
import MapComponent from "./MapComponent";

const socket = io("http://localhost:3000"); // your backend server

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
      <MapComponent userCoords={userCoords} driverCoords={driverCoords} />
    </div>
  );
}

export default OrderTracking;
