import { supabase } from "./config";

export async function register(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://meriks-todo-list.netlify.app/auth/login.html",
    },
  });

  if (error) {
    throw Error(error?.message || "Something happened with register");
  }

  return data.user;
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw Error(error?.message || "Something happened with login");
  }

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw Error(error?.message || "Something happened with logout");
  }
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
