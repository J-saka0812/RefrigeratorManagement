import { StatsCards } from "../component/StatsCards"
import { Header } from "../component/Header"



export function Home() {
    return (
        <div class="bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 min-h-screen">
            <Header />
            <StatsCards />
        </div>
    )
}