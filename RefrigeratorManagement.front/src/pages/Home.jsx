import { StatsCards } from "component/StatsCards";
import { Header } from "component/Header";
import { SearchBarContainer } from "component/SearchBarContainer";

export function Home() {
  return (
    <div className="bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 min-h-screen p-3">
      <Header />
      <StatsCards />
      <SearchBarContainer />
    </div>
  );
}
