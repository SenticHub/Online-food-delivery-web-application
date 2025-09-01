import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function DriverApp() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          socket.emit("driverLocation", {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return <h2>Driver app sending live location...</h2>;
}

export default DriverApp;
