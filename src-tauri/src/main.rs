#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod backup;

use tauri_plugin_store::StoreBuilder;
use backup::backup_to_drive;

#[tauri::command]
fn save_patient(
    app: tauri::AppHandle,
    patient: db::PatientRecord,
) -> Result<(), String> {
    db::insert_patient(&app, patient).map_err(|e| e.to_string())
}

#[tauri::command]
fn update_patient(app: tauri::AppHandle, patient: db::PatientRecord) -> Result<(), String> {
    db::update_patient(&app, patient).map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_patient(app: tauri::AppHandle, id: i64) -> Result<(), String> {
    db::delete_patient(&app, id).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_patients(
    app: tauri::AppHandle,
) -> Result<Vec<db::PatientRecord>, String> {
    db::get_patients(&app).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            db::init_db(app.handle()).expect("DB init failed");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            save_patient,
            get_patients,
            update_patient,
            delete_patient,
            backup_to_drive
        ])
        .run(tauri::generate_context!())
        .expect("error while running ClinicDesk");
}

