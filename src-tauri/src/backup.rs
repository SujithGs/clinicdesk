use tauri::{AppHandle, Manager};
use chrono::Local;
use std::fs;

#[tauri::command]
pub async fn backup_to_drive(app: AppHandle) -> Result<(), String> {
    // 1. Locate DB (Tauri v2)
    let db_path = app
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?
        .join("clinicdesk.db");

    if !db_path.exists() {
        return Err("Database not found".into());
    }

    // 2. Create temp backup
    let date = Local::now().format("%Y-%m-%d");
    let backup_name = format!("clinicdesk_{}.db", date);

    let temp_dir = app
        .path()
        .temp_dir()
        .map_err(|e| e.to_string())?;

    let backup_path = temp_dir.join(&backup_name);

    fs::copy(&db_path, &backup_path)
        .map_err(|e| format!("Failed to copy DB: {}", e))?;

    println!("Backup ready at {:?}", backup_path);

    Ok(())
}
