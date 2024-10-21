
"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type TodoRow = Database["public"]["Tables"]["todo"]["Row"];
export type TodoRowInsert = Database["public"]["Tables"]["todo"]["Insert"];
export type TodoRowUpdate = Database["public"]["Tables"]["todo"]["Update"];

function handleError(error) {
  console.error(error);
  throw new Error(error.message);
}

export async function getTodos({ searchInput = "" }): Promise<TodoRow[] | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("todo")
    .select("*")
    .like("title", `%${searchInput}%`)
    .order("created_at", { ascending: true });

  if (error) {
    handleError(error);
  }

  return data;
}


export async function createTodo(todo: TodoRowInsert) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from("todo").insert({
    ...todo,
    created_at: new Date().toISOString(),
  });

  if (error) {
    handleError(error);
  }

  return data;
}

export async function updateTodo(todo: TodoRowUpdate) {
  const supabase = await createServerSupabaseClient();

  // id가 존재하는지 먼저 확인
  if (typeof todo.id === 'undefined') {
    throw new Error("Todo ID is undefined. Unable to update.");
  }

  const { data, error } = await supabase
    .from("todo")
    .update({
      ...todo,
      updated_at: new Date().toISOString(),
    })
    .eq("id", todo.id); // 이 부분은 이제 undefined가 아님이 보장됨

  if (error) {
    handleError(error);
  }

  return data;
}


export async function deleteTodo(id: number) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from("todo").delete().eq("id", id);

  if (error) {
    handleError(error);
  }

  return data;
}
