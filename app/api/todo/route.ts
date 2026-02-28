import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const mockTodos = [
      { id: 1, text: "Revisar pull request do auth module", done: false, priority: "high" },
      { id: 2, text: "Enviar proposta para cliente", done: true, priority: "high" },
      { id: 3, text: "Pagar fatura do cartão", done: false, priority: "medium" },
      { id: 4, text: "Academia", done: true, priority: "low" },
      { id: 5, text: "Comprar café", done: false, priority: "low" },
    ];
    
    return NextResponse.json({ message: "Todos data retrieved successfully", data: mockTodos }, { status: 200 })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ error: "Failed to retrieve todos data" }, { status: 500 });
  }
}