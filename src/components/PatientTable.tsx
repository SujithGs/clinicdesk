import PatientRow from "./PatientRow";
import { PatientRecord } from "../services/patientService";

interface PatientTableProps {
  patients: PatientRecord[];
  onUpdated: () => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export default function PatientTable({ patients, onUpdated, onDelete }: PatientTableProps) {
  if (!patients.length) return <p>No patients found</p>;

  return (
    <table className="w-full bg-white rounded-lg shadow border">
      <thead className="bg-slate-100 text-left text-sm uppercase text-gray-600">
        <tr>
          <th className="p-3">Name</th>
          <th className="p-3">Phone</th>
          <th className="p-3">Visit Date</th>
          <th className="p-3">Follow-up Date</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p) => (
          <PatientRow key={p.id} patient={p} onUpdated={onUpdated} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}
