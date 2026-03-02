"use client";

import { useStatus } from "@/contexts/statusContext";

export default function SystemsStatus() {
  const { isAllLive } = useStatus();
  
  const statusColor = isAllLive ? "#6EE7B7" : "#F87171";
  const statusText = isAllLive ? "all systems live" : "systems partially down";

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span className="status-dot" style={{ 
        background: statusColor, 
        width: '10px', 
        height: '10px', 
        borderRadius: '50%',
        display: 'inline-block' 
      }} />
      {statusText}
    </div>
  );
}