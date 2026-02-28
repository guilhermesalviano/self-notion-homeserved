import { Todo } from "@/entities/Todo";
import { TodoRecurrence } from "@/entities/TodoRecurrence";
import { getDatabaseConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const mockTodos = [
    //   { id: 1, text: "Revisar pull request do auth module", done: false, priority: "high" },
    //   { id: 2, text: "Enviar proposta para cliente", done: true, priority: "high" },
    //   { id: 3, text: "Pagar fatura do cartão", done: false, priority: "medium" },
    //   { id: 4, text: "Academia", done: true, priority: "low" },
    //   { id: 5, text: "Comprar café", done: false, priority: "low" },
    // ];
    const db = await getDatabaseConnection();

    const todoRepository = db.getRepository(Todo);
    const todos = await todoRepository.find();

    const todosMapped = todos.map((todo) => {
      return {
        id: todo.id,
        text: todo.title,
        done: todo.checked,
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
    const db = await getDatabaseConnection();

    const todoRecurrence = {
      repeat: true,
      weeklyInterval: 1,
      weeklyDays: [0]
    }
    
    const todoRecurrenceRepository = db.getRepository(TodoRecurrence);
    const todoRecurrenceSaved = await todoRecurrenceRepository.save(todoRecurrence);

    const todo = {
      title: "tarefa de teste",
      checked: false,
      priority: "high",
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