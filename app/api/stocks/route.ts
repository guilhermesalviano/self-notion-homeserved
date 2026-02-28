import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const mockStocks = [
      { ticker: "PETR4", price: 38.72, change: +1.23, pct: +3.28 },
      { ticker: "VALE3", price: 62.10, change: -0.88, pct: -1.40 },
      { ticker: "MGLU3", price: 9.45, change: +0.32, pct: +3.50 },
      { ticker: "BTC", price: 98420, change: +1820, pct: +1.89 },
      { ticker: "AAPL", price: 189.30, change: -0.55, pct: -0.29 },
    ];
    return NextResponse.json({ message: "Stocks data retrieved successfully", data: mockStocks }, { status: 200 })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ error: "Failed to retrieve stocks data" }, { status: 500 });
  }
}