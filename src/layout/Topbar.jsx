import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
      <h1 className="h1">Dashboard</h1>

      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div className="card" style={{ padding:"10px 12px", display:"flex", alignItems:"center", gap:10, borderRadius:999, minWidth:320 }}>
          <Search size={18} color="#6B7280" />
          <input placeholder="Search anything..." style={{ border:"none", outline:"none", width:"100%", fontSize:14, background:"transparent" }} />
        </div>

        <div className="card" style={{ width:40, height:40, borderRadius:12, display:"grid", placeItems:"center" }}>
          <Bell size={18} />
        </div>

        <div style={{ width:40, height:40, borderRadius:999, background:"#F59E0B", display:"grid", placeItems:"center", fontWeight:800, color:"#111827" }}>
          T
        </div>
      </div>
    </div>
  );
}
