// import React from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// export default function MapWithMarker() {
//   // Hardcoded location → New Delhi, India
//   const center = { lat: 22.5726, lng: 88.3639};

//   const { isLoaded, loadError } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: 'AIzaSyBBIEEA8Znag_CuP6Hf7EDuDWjdFtde7aY' // replace with your key
//   });

//   if (loadError) {
//     return <div className="p-4 text-red-600">Failed to load Google Maps script. Check your API key & billing.</div>;
//   }

//   if (!isLoaded) {
//     return <div className="p-4">Loading map…</div>;
//   }

//   return (
//     <div style={{ height: "400px", width: "100%" }}>
//       <GoogleMap
//         mapContainerStyle={{ height: "100%", width: "100%" }}
//         center={center}
//         zoom={12}
//         options={{ mapTypeControl: false, streetViewControl: false }}
//       >
//         <Marker position={center} />
//       </GoogleMap>
//     </div>
//   );
// }

// /**
//  * Usage:
//  * Just import and use <MapWithMarker />
//  *
//  * Location is hardcoded to New Delhi (28.6139, 77.2090).
//  */
import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function MapWithMarker() {
  // Start with no coordinates
  const [center, setCenter] = useState({ lat: "", lng: "" });

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: 'AIzaSyBBIEEA8Znag_CuP6Hf7EDuDWjdFtde7aY' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCenter((prev) => ({ ...prev, [name]: value }));
  };

  if (loadError) {
    return <div>Failed to load Google Maps script. Check API key & billing.</div>;
  }

  if (!isLoaded) {
    return <div>Loading map…</div>;
  }

  return (
    <div>
      {/* Input fields for user to set latitude and longitude */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          name="lat"
          value={center.lat}
          onChange={handleChange}
          placeholder="Enter Latitude"
        />
        <input
          type="number"
          name="lng"
          value={center.lng}
          onChange={handleChange}
          placeholder="Enter Longitude"
        />
      </div>

      {/* Only render map when both lat & lng are provided */}
      {center.lat && center.lng && (
        <div style={{ height: "400px", width: "100%" }}>
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={{ lat: parseFloat(center.lat), lng: parseFloat(center.lng) }}
            zoom={12}
          >
            <Marker
              position={{
                lat: parseFloat(center.lat),
                lng: parseFloat(center.lng)
              }}
            />
          </GoogleMap>
        </div>
      )}
    </div>
  );
}
