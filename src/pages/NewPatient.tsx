import BackLink from "../components/BackLink";
import PatientForm from "../components/PatientForm";

export default function NewPatient() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <BackLink />

      <div className="mt-4">
        <PatientForm />
      </div>
    </div>
  );
}
