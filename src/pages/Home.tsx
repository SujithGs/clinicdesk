import { Link } from "react-router-dom";

interface ActionCardProps {
  to: string;
  title: string;
  description: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ to, title, description }) => (
  <Link
    to={to}
    className="
      group
      relative
      rounded-2xl
      border border-gray-200
      bg-white
      p-8
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-lg
    "
  >
    <div className="absolute inset-0 rounded-2xl bg-blue-50 opacity-0 group-hover:opacity-40 transition pointer-events-none" />
    <h2 className="relative text-lg font-medium text-gray-900 group-hover:text-blue-700">
      {title}
    </h2>
    <p className="relative text-sm text-gray-500 mt-3 leading-relaxed">
      {description}
    </p>
  </Link>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900">ClinicDesk</h1>
          <p className="text-sm text-gray-500 mt-2">
            Patient records & visit management
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ActionCard
            to="/new"
            title="New Visit"
            description="Record a new patient consultation, diagnosis, and prescription."
          />
          <ActionCard
            to="/patients"
            title="Patients"
            description="View, search, and manage saved patient records."
          />
          <ActionCard
            to="/manage"
            title="Manage Clinic"
            description="Control your data, backups, and clinic preferences."
          />
        </div>
      </div>
    </div>
  );
}
