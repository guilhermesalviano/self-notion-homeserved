export default function SystemsStatus() {
  const isLive = !!true;
  const statusColor = isLive ? "#6EE7B7" : "#F87171";
  const statusText = isLive ? "all systems live" : "systems partially down";

  return (
    <>
      <span className="status-dot" style={{ background: statusColor }} />
      {statusText}
    </>
  )
}