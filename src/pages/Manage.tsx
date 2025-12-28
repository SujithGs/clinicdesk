import BackLink from "../components/BackLink";
import { invoke } from "@tauri-apps/api/core";
import { toast } from "../common/toaster";

export default function Settings() {
  const backupNow = async () => {
    try {
      toast.loading("Backing up...");
      await invoke("backup_to_drive");
      toast.dismiss();
      toast.success("Backup completed successfully");
    } catch (err) {
      toast.dismiss();
      toast.error("Backup failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6 flex flex-col">
      <BackLink />

      <div className="bg-white rounded-lg shadow p-4 space-y-4 max-w-md">
        <h2 className="text-lg font-medium">Backup</h2>

        <p className="text-sm text-gray-600">
          Back up patient data securely to Google Drive.
        </p>

        <button
          onClick={backupNow}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Backup to Google Drive
        </button>
      </div>
    </div>
  );
}
