import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const calendar = [
      { id: 1, time: "09:00", title: "Daily standup", color: "#6EE7B7" },
      { id: 2, time: "11:30", title: "Review PR — frontend", color: "#93C5FD" },
      { id: 3, time: "14:00", title: "Call com cliente XYZ", color: "#FCA5A5" },
      { id: 4, time: "16:00", title: "Sprint planning", color: "#FDE68A" },
    ];

    return NextResponse.json({ message: "Calendar data retrieved successfully", data: calendar }, { status: 200 })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ error: "Failed to retrieve calendar data" }, { status: 500 });
  }
}