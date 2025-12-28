import { invoke } from "@tauri-apps/api/core";

export async function tauriInvoke<T>(
  command: string,
  payload?: Record<string, unknown>
): Promise<T> {
  return await invoke<T>(command, payload);
}

