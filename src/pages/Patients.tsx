import { useEffect, useState } from "react";
import { getPatientRecords, deletePatientRecord, PatientRecord } from "../services/patientService";
import PatientTable from "../components/PatientTable";
import BackLink from "../components/BackLink";

export default function Patients() {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      const data = await getPatientRecords();
      setPatients(data);
    } finally {
      setLoading(false);
    }
  }

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.phone.includes(query)
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <BackLink />

      <div className="mt-4 space-y-4">
        <input
          className="border rounded-md px-3 py-2 w-72"
          placeholder="Search by name or phone"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <PatientTable
          patients={filtered}
          onUpdated={refresh}
          onDelete={async (id) => {
            await deletePatientRecord(id);
            refresh();
          }}
          loading={loading}
        />
      </div>
    </div>
  );
}
