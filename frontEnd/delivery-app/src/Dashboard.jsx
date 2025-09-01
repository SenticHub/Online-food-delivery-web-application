import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";

const BASE = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export default function DriverDashboard() {
  const saved = useMemo(() => JSON.parse(localStorage.getItem("delivery") || "null"), []);
  const deliveryId = saved?.deliveryId;

  const [tab, setTab] = useState("pending");
  const [pending, setPending] = useState([]);
  const [active, setActive] = useState([]);

  // Load orders from backend
  const loadPending = async () => {
    const res = await fetch(`${BASE}/delivery/orders/pending`);
    const data = await res.json();
    setPending(data.data || []);
  };

  const loadActive = async () => {
    const res = await fetch(`${BASE}/delivery/orders/my?deliveryId=${deliveryId}`);
    const data = await res.json();
    setActive(data.data || []);
  };

  const load = async () => {
    if (tab === "pending") await loadPending();
    else await loadActive();
  };

  // Fetch on tab change and every 5s as backup
  useEffect(() => {
    load();
    const intervalId = setInterval(load, 5000);
    return () => clearInterval(intervalId);
  }, [tab]);

  // Accept order
  const acceptOrder = async (orderId) => {
    await fetch(`${BASE}/delivery/orders/${orderId}/accept`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deliveryId }),
    });
    setTab("active");
    await load();
  };

  // Advance status
  const advanceStatus = async (orderId, status) => {
    await fetch(`${BASE}/delivery/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
  };

  // Track driver location
  useEffect(() => {
    if (!("geolocation" in navigator) || !deliveryId) return;
    const watchId = navigator.geolocation.watchPosition(async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      try {
        await fetch(`${BASE}/delivery/location`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deliveryId, lat, lng }),
        });
      } catch {}
    });
    return () => navigator.geolocation.clearWatch(watchId);
  }, [deliveryId]);

  // Socket.IO for live updates
  useEffect(() => {
    const socket = io(BASE);

    socket.on("new_order", (order) => {
      setPending(prev => [order, ...prev]);
    });

    socket.on("order_accepted", (order) => {
      // Remove accepted orders from pending
      setPending(prev => prev.filter(o => o._id !== order._id));
      setActive(prev => {
        if (order.deliveryPartner === deliveryId) {
          return [order, ...prev];
        }
        return prev;
      });
    });

    socket.on("order_status_changed", (order) => {
      setActive(prev => prev.map(o => (o._id === order._id ? order : o)));
    });

    socket.on("driver_location_updated", ({ orderId, lat, lng }) => {
      setActive(prev =>
        prev.map(o =>
          o._id === orderId ? { ...o, driverLocation: { lat, lng } } : o
        )
      );
    });

    return () => socket.disconnect();
  }, [deliveryId]);

  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      <h3>Hi {saved?.name || "Driver"}</h3>
      <div>
        <button onClick={() => setTab("pending")} disabled={tab === "pending"}>
          Pending
        </button>
        <button onClick={() => setTab("active")} disabled={tab === "active"} style={{ marginLeft: 8 }}>
          My Active
        </button>
      </div>

      {tab === "pending" &&
        pending.map(o => (
          <div key={o._id} style={{ border: "1px solid #ddd", padding: 10, marginTop: 10 }}>
            <div><b>Order:</b> {o._id}</div>
            <div><b>Total:</b> {o?.summary?.totalAmount}</div>
            <button onClick={() => acceptOrder(o._id)}>Accept</button>
          </div>
        ))}

      {tab === "active" &&
        active.map(o => (
          <div key={o._id} style={{ border: "1px solid #ddd", padding: 10, marginTop: 10 }}>
            <div><b>Order:</b> {o._id}</div>
            <div><b>Status:</b> {o.status}</div>
            <Step order={o} onNext={(next) => advanceStatus(o._id, next)} />
            {o.driverLocation && (
              <div>
                <small>Location: {o.driverLocation.lat.toFixed(5)}, {o.driverLocation.lng.toFixed(5)}</small>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

// Step buttons
function Step({ order, onNext }) {
  const nexts = { ACCEPTED: "PICKED", PICKED: "OUT_FOR_DELIVERY", OUT_FOR_DELIVERY: "DELIVERED" };
  const next = nexts[order.status];
  if (!next) return <span>Completed ✅</span>;
  return <button onClick={() => onNext(next)}>Mark {next.replaceAll("_", " ")}</button>;
}
