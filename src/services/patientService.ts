import { tauriInvoke } from "./tauriInvoke";

export interface PatientRecord {
  id?: number;
  name: string;
  phone: string;
  address?: string;
  visit_date: string;
  reason?: string;
  clinical_notes?: string;
  follow_up_required: boolean;
  follow_up_date?: string | null;
}

export async function savePatientRecord(patient: PatientRecord): Promise<void> {
  if (!patient.name.trim()) {
    throw new Error("Name is required");
  }

  if (!patient.phone.trim()) {
    throw new Error("Phone is required");
  }

  await tauriInvoke<void>("save_patient", { patient });
}

export async function updatePatientRecord(patient: PatientRecord): Promise<void> {
  if (!patient.id) {
    throw new Error("Patient ID is required for update");
  }

  await tauriInvoke<void>("update_patient", { patient });
}

export async function deletePatientRecord(id: number): Promise<void> {
  await tauriInvoke<void>("delete_patient", { id });
}

export async function getPatientRecords(): Promise<PatientRecord[]> {
  return await tauriInvoke<PatientRecord[]>("get_patients");
}
