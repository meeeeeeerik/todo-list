import { supabase } from "./config";

export async function getTasks() {
  let { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    throw Error(error?.message || "Something happened with getting tasks!");
  }

  return data;
}

export async function getTask(taskId) {
  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("id", taskId)
    .single();

  if (error) {
    throw Error(error?.message || "Something happened with getting task!");
  }

  return data;
}

export async function createTask(taskData) {
  const { data, error } = await supabase
    .from("tasks")
    .insert(taskData)
    .select();

  if (error) {
    throw Error(error?.message || "Something happened with creating task!");
  }

  return data;
}

export async function updateTask(taskData) {
  const { data, error } = await supabase
    .from("tasks")
    .update(taskData)
    .eq("id", taskData.id)
    .select();

  if (error) {
    throw Error(error?.message || "Something happened with updating task!");
  }

  return data;
}

export async function deleteTask(taskId) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    throw Error(error?.message || "Something happened with deleting task!");
  }
}
