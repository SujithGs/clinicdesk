export function hasTauriBackend(): boolean {
  return "__TAURI__" in window;
}