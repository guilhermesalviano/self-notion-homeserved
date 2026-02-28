import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const mockNews = [
      { id: 1, source: "Valor Econômico", title: "Selic mantida em 10,5% pelo Copom pela terceira reunião", tag: "MACRO" },
      { id: 2, source: "TechCrunch", title: "OpenAI anuncia novo modelo GPT-5 com raciocínio avançado", tag: "TECH" },
      { id: 3, source: "Folha", title: "Brasil registra superávit primário de R$12bi em outubro", tag: "BRASIL" },
      { id: 4, source: "Reuters", title: "S&P 500 atinge nova máxima histórica impulsionado por tech", tag: "MERCADO" },
    ];
    
    return NextResponse.json({ message: "News data retrieved successfully", data: mockNews }, { status: 200 })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ error: "Failed to retrieve news data" }, { status: 500 });
  }
}