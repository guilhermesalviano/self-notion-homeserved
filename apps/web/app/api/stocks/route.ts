import { STOCKS } from "@/constants/stocks";
import { fetchBrapiAPI } from "@/services/brapi-api";
import { fetchYahooPrice } from "@/services/yahoo-finance";
import { NextRequest, NextResponse } from "next/server";

interface StockResult {
  symbol: string;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
}

function mapStocks(results: StockResult[]) {
  return results.map((stock) => ({
    ticker: stock.symbol,
    price: stock.regularMarketPrice,
    priceOpened: stock.regularMarketDayHigh,
    change: stock.regularMarketChange,
    pct: stock.regularMarketChangePercent,
  }));
}

export async function GET(req: NextRequest) {
  try {
    const symbols = Object.values(STOCKS).flat();

    const brapiData = await fetchBrapiAPI(symbols.join(","));
    if (brapiData?.results?.length) {
      return NextResponse.json({
        message: "Stocks data retrieved successfully",
        source: "brapi",
        data: mapStocks(brapiData.results),
      }, { status: 200 });
    }

    const yahooSymbols = symbols.map((s) => `${s}.SA`);
    const yahooData = await fetchYahooPrice(yahooSymbols);
    if (yahooData?.results?.length) {
      return NextResponse.json({
        message: "Stocks data retrieved successfully",
        source: "yahoo",
        data: mapStocks(yahooData.results as StockResult[]),
      }, { status: 200 });
    }

    return NextResponse.json(
      { message: "Nenhuma ação encontrada no momento" },
      { status: 404 }
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to retrieve stocks data" },
      { status: 500 }
    );
  }
}