export default function LeaderboardsLoading() {
  return (
    <>
      <h3 className="text-30 lh-15" style={{ textAlign: "center" }}>
        Loading Leaderboards...
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/assets/img/general/loading.gif" alt="Loading..." />
      </div>
    </>
  );
}
