import { useEffect, useState } from "react";
import { StatsCard } from "./StatsCard";
import "./styles/StatsCards.css";

export function StatsCards() {
  
  // データ取得用のオブジェクト
  const [stats, setStats] = useState({
    total: 0,
    expiringSoon: 0,
    expired: 0,
  });

  useEffect(() => {
    // データベースからの数量取得
    // fetch('api/stats')
    // .then(res => re.json())
    // .then(data => setStats(data));

    // 現在はダミーデータで実装
    const dummyData = {
      total: 12,
      expiringSoon: 3,
      expired: 1,
    };
    setStats(dummyData);
  }, []);

  return (
    <div>
      <div className="stats-card-container">
        <StatsCard label="総食品数" value={stats.total} icon="📦" className="total" />
        <StatsCard label="期限切れ間近" value={stats.expiringSoon} icon="⚠️" className="expiringSoon" />
        <StatsCard label="期限切れ" value={stats.expired} icon="🚨" className="expired" />
      </div>
    </div>
  );
}