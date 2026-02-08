import { useEffect, useMemo, useState } from "react";
import Topbar from "../layout/Topbar";
import KpiCard from "../components/KpiCard";
import CountryCard from "../components/CountryCard";
import SalesCard from "../components/SalesCard";
import InventoryHealthTable from "../components/InventoryHealthTable";
import LocationSwitcher from "../components/LocationSwitcher";

import { fetchInventoryHealth, fetchSalesSeries } from "../services/api";
import { buildDashboardFromHealthRows } from "../services/dashboardModel";

export default function Dashboard() {
  // 4 locations
  const locations = [
  { id: 1, name: "Location 1" },
  { id: 2, name: "Location 2" },
  { id: 3, name: "Location 3" },
  { id: 4, name: "Location 4" },
  { id: 5, name: "Location 5" },
];


  const [locationId, setLocationId] = useState(1);
  const [healthRows, setHealthRows] = useState([]);
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setErr("");

    Promise.all([
      fetchInventoryHealth(locationId),
      fetchSalesSeries(locationId),
    ])
      .then(([health, salesSeries]) => {
        if (!alive) return;
        setHealthRows(Array.isArray(health) ? health : []);
        setSales(salesSeries); // can be null if endpoint not ready
      })
      .catch((e) => {
        if (!alive) return;
        setErr(String(e?.message || e));
        setHealthRows([]);
        setSales(null);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => { alive = false; };
  }, [locationId]);

  const view = useMemo(() => buildDashboardFromHealthRows(healthRows), [healthRows]);

  // Sales fallback if backend not available
  const salesSeries = Array.isArray(sales) && sales.length
    ? sales
    : [
        { day:"Sat", sales:3.0 },
        { day:"Sun", sales:5.2 },
        { day:"Mon", sales:3.6 },
        { day:"Tue", sales:4.8 },
        { day:"Wed", sales:5.0 },
        { day:"Thu", sales:4.1 },
        { day:"Fri", sales:3.4 },
      ];

  const totalIngredients = healthRows.length;

  return (
    <div className="main">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Topbar />
      </div>

      {/* Location selector row (fits the screenshot style) */}
      <div style={{ display:"flex", justifyContent:"flex-end", marginTop:-8, marginBottom:14 }}>
        <LocationSwitcher
          locationId={locationId}
          setLocationId={setLocationId}
          locations={locations}
        />
      </div>

      {err && (
        <div className="card p20" style={{ borderColor:"rgba(220,38,38,.25)", marginBottom:16 }}>
          <div style={{ fontWeight:900, marginBottom:6 }}>Backend not reachable</div>
          <div className="muted">{err}</div>
          <div className="muted" style={{ marginTop:8 }}>
            Make sure your Spring Boot server is running and the endpoint
            <b> /api/inventory-health?locationId=1 </b>
            returns JSON like your example.
          </div>
        </div>
      )}

      <div className="grid4" style={{ marginBottom:16 }}>
        <KpiCard title="Total Stock" value={loading ? "…" : view.kpis.totalStock.toLocaleString()} change={+16} icon="dollar" />
        <KpiCard title="Total Daily Burn" value={loading ? "…" : view.kpis.totalBurn.toFixed(1)} change={-24} icon="box" />
        <KpiCard title="Ingredients Tracked" value={loading ? "…" : totalIngredients.toLocaleString()} change={+12} icon="receipt" />
        <KpiCard title="Avg Days Until Stockout" value={loading ? "…" : `${view.kpis.avgDays.toFixed(1)} Days`} change={+18} icon="clock" />
      </div>

      <div className="grid2" style={{ marginBottom:16 }}>
        {/* placeholder but keeps screenshot layout */}
        <CountryCard rows={[
        { name:"Loc 1", value:29 },
        { name:"Loc 2", value:20 },
        { name:"Loc 3", value:14 },
        { name:"Loc 4", value:10 },
        { name:"Loc 5", value:8 },
      ]} />

        <SalesCard data={salesSeries} />
      </div>

      <InventoryHealthTable rows={view.stockouts} />
    </div>
  );
}
