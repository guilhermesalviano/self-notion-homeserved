import WeatherCard from "@/components/cards/weather";
import CalendarCard from "@/components/cards/calendar";
import AlertsCard from "@/components/cards/alerts";
import StocksCard from "@/components/cards/stocks";
import NewsCard from "@/components/cards/news";
import GoalsCard from "@/components/cards/goals";
import FlightsCard from "@/components/cards/flights";
import ProductsCard from "@/components/cards/products";
import TodoCard from "@/components/cards/todo";
import Clock from "@/components/clock";
import SystemsStatus from "@/components/systemsStatus";

export default function Dashboard() {
  return (
    <>
      <div className="header">
        <div className="header-brand">⬡ My Notion Version</div>
        <div className="header-clock"><Clock /></div>
        <div className="header-status w-44">
          <SystemsStatus />
        </div>
      </div>

      <div className="grid">
        {/* Row 1 */}
        <div className="col-4">
          <WeatherCard />
        </div>
        <div className="col-5">
          <NewsCard />
        </div>
        <div className="col-3">
          <TodoCard />
        </div>

        {/* Row 2 */}
        <div className="col-5">
          <CalendarCard  />
        </div>
        <div className="col-4">
          <GoalsCard />
        </div>
        <div className="col-3">
          <StocksCard />
        </div>

        {/* Row 3 */}
        <div className="col-4">
          <FlightsCard />
        </div>
        <div className="col-4">
          <ProductsCard />
        </div>
        <div className="col-4">
          <AlertsCard />
        </div>
      </div>
    </>
  );
}