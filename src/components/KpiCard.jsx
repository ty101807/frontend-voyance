import { DollarSign, Box, Receipt, Clock } from "lucide-react";

const iconMap = { dollar: DollarSign, box: Box, receipt: Receipt, clock: Clock };

export default function KpiCard({ title, value, change, icon }) {
  const positive = change >= 0;
  const Icon = iconMap[icon] || DollarSign;

  return (
    <div className="card p20" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{
          width:40, height:40, borderRadius:14,
          border:"1px solid var(--line)", display:"grid", placeItems:"center"
        }}>
          <Icon size={18} />
        </div>
        <div>
          <div className="kpiTitle">{title}</div>
          <div className="kpiValue">{value}</div>
        </div>
      </div>

      <span className={`badge ${positive ? "up" : "down"}`}>
        {positive ? "↑" : "↓"} {Math.abs(change)}%
      </span>
    </div>
  );
}
