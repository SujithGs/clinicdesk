use rusqlite::{Connection, Result, params};
use tauri::{AppHandle, Manager};
use std::fs;
use std::path::PathBuf;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct PatientRecord {
    pub id: Option<i64>,
    pub name: String,
    pub phone: String,
    pub address: Option<String>,
    pub visit_date: String,
    pub reason: Option<String>,
    pub clinical_notes: Option<String>,
    pub follow_up_required: bool,
    pub follow_up_date: Option<String>,
}

fn get_db_path(app: &AppHandle) -> PathBuf {
    let dir = app
        .path()
        .app_local_data_dir()
        .expect("Failed to get app local data dir");

    fs::create_dir_all(&dir).expect("Failed to create app data directory");

    dir.join("clinicdesk.db")
}

pub fn init_db(app: &AppHandle) -> Result<()> {
    let conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            address TEXT,
            phone TEXT NOT NULL,
            visit_datetime TEXT NOT NULL,
            reason TEXT,
            clinical_notes TEXT,
            followup_required INTEGER NOT NULL,
            followup_date TEXT
        )
        ",
        [],
    )?;

    Ok(())
}

pub fn insert_patient(app: &AppHandle, patient: PatientRecord) -> Result<()> {
    let conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "
        INSERT INTO patients (
            name, address, phone, visit_datetime,
            reason, clinical_notes, followup_required, followup_date
        )
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)
        ",
        params![
            patient.name,
            patient.address,
            patient.phone,
            patient.visit_date,
            patient.reason,
            patient.clinical_notes,
            patient.follow_up_required as i32,
            patient.follow_up_date
        ],
    )?;

    Ok(())
}

pub fn update_patient(app: &AppHandle, patient: PatientRecord) -> Result<()> {
    let id = patient.id.expect("ID required for update");
    let conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "
        UPDATE patients SET
            name = ?1,
            phone = ?2,
            address = ?3,
            visit_datetime = ?4,
            reason = ?5,
            clinical_notes = ?6,
            followup_required = ?7,
            followup_date = ?8
        WHERE id = ?9
        ",
        params![
            patient.name,
            patient.phone,
            patient.address,
            patient.visit_date,
            patient.reason,
            patient.clinical_notes,
            patient.follow_up_required as i32,
            patient.follow_up_date,
            id
        ],
    )?;

    Ok(())
}

pub fn delete_patient(app: &AppHandle, id: i64) -> Result<()> {
    let conn = Connection::open(get_db_path(app))?;
    conn.execute("DELETE FROM patients WHERE id = ?", [id])?;
    Ok(())
}

pub fn get_patients(app: &AppHandle) -> Result<Vec<PatientRecord>> {
    let conn = Connection::open(get_db_path(app))?;
    let mut stmt = conn.prepare(
        "
        SELECT
            id, name, phone, address, visit_datetime,
            reason, clinical_notes, followup_required, followup_date
        FROM patients
        ",
    )?;

    let rows = stmt.query_map([], |row| {
        Ok(PatientRecord {
            id: row.get(0)?,
            name: row.get(1)?,         
            phone: row.get(2)?,      
            address: row.get(3)?,
            visit_date: row.get(4)?,
            reason: row.get(5)?,
            clinical_notes: row.get(6)?,
            follow_up_required: row.get::<_, i32>(7)? == 1,
            follow_up_date: row.get(8)?
        })
    })?;

    Ok(rows.collect::<Result<Vec<_>>>()?)
}
