import { Todo } from "@/entities/Todo";
import { TodoRecurrence } from "@/entities/TodoRecurrence";
import { getDatabaseConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const db = await getDatabaseConnection();

    const todoRepository = db.getRepository(Todo);
    const todos = await todoRepository.find();

    const todosMapped = todos.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        checked: todo.checked,
        priority: todo.priority
      }
    })

    return NextResponse.json({ message: "Todos data retrieved successfully", data: todosMapped }, { status: 200 })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ error: "Failed to retrieve todos data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, checked, priority, repeat, weeklyInterval, weeklyDays, weeklyEnd } = body;

    const db = await getDatabaseConnection();

    const todoRecurrence = {
      repeat,
      weeklyInterval,
      weeklyDays,
      weeklyEnd
    }
    const todoRecurrenceRepository = db.getRepository(TodoRecurrence);
    const todoRecurrenceSaved = await todoRecurrenceRepository.save(todoRecurrence);

    const todo = {
      title,
      checked,
      priority,
      recurrence: todoRecurrenceSaved
    }

    const todoRepository = db.getRepository(Todo);
    const todoSaved = await todoRepository.save(todo);

    return NextResponse.json({ message: "Todos saved successfully", data: todoSaved }, { status: 200 })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ error: "Failed to save todos data" }, { status: 500 });
  }
}