import { StatsCard } from "./StatsCard";

export function StatsCards({stats}) {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 mt-5">
      <StatsCard
        label="総食品数"
        value={stats.total}
        icon="📦"
        className="total"
      />
      <StatsCard
        label="期限切れ間近"
        value={stats.expiringSoon}
        icon="⚠️"
        className="expiringSoon"
      />
      <StatsCard
        label="期限切れ"
        value={stats.expired}
        icon="🚨"
        className="expired"
      />
    </div>
  );
}
