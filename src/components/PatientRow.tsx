import { useState } from "react";
import DatePicker from "react-datepicker";
import { enIN } from "date-fns/locale";
import { updatePatientRecord, PatientRecord } from "../services/patientService";

import { toast } from "../common/toaster";

interface PatientRowProps {
	patient: PatientRecord;
	onUpdated: () => void;
	onDelete: (id: number) => void;
}

export default function PatientRow({ patient, onUpdated, onDelete }: PatientRowProps) {
	const [editing, setEditing] = useState(false);
	const [name, setName] = useState(patient.name);
	const [phone, setPhone] = useState(patient.phone);
	const [followUpDate, setFollowUpDate] = useState<Date | null>(patient.follow_up_date ? new Date(patient.follow_up_date) : null);
	const [showConfirm, setShowConfirm] = useState(false);

	async function save() {
		try {
			const formattedDate = followUpDate ? followUpDate.toISOString() : null;
			const updatedFollowUpRequired = formattedDate?.trim() !== "";

			await updatePatientRecord({
				...patient,
				name,
				phone,
				follow_up_required: updatedFollowUpRequired,
				follow_up_date: formattedDate,
			});

			patient.name = name;
			patient.phone = phone;
			patient.follow_up_date = formattedDate || null;
			patient.follow_up_required = updatedFollowUpRequired;

			setEditing(false);
			onUpdated();
			toast.success("Patient updated successfully!");
		} catch (err) {
			console.error(err);
			toast.error("Failed to update patient");
		}
	}

	async function confirmDelete() {
		try {
			if(!patient.id) throw new Error('Patient ID is unknown!');
			await onDelete(patient.id);
			setShowConfirm(false);
			toast.success("Patient deleted successfully!");
		} catch (err) {
			console.error(err);
			toast.error("Failed to delete patient");
		}
	}

	return (
		<>
			<tr className="border-t hover:bg-gray-50 transition-colors">
				<td className="p-3 font-medium">
					{editing ? (
						<input
							type="text"
							className="border rounded px-2 py-1 w-full"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					) : name}
				</td>

				<td className="p-3">
					{editing ? (
						<input
							type="text"
							className="border rounded px-2 py-1 w-full"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					) : phone}
				</td>

				<td className="p-3">{new Date(patient.visit_date).toLocaleDateString("en-IN", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				})}</td>

				<td className="p-3">
					{editing ? (
						<DatePicker
							selected={followUpDate}
							onChange={(date: Date | null) => setFollowUpDate(date)}
							dateFormat="dd/MM/yyyy"
							placeholderText="Select follow-up date"
							className="border rounded px-2 py-1 w-full cursor-pointer"
							isClearable
							popperPlacement="bottom-start"
							locale={enIN}
						/>
					) : followUpDate ? (
						followUpDate.toLocaleDateString("en-IN", {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
						})
					) : (
						<span className="text-gray-400">—</span>
					)}
				</td>

				<td className="p-3 flex space-x-2">
					{editing ? (
						<>
							<button
								onClick={save}
								className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition cursor-pointer"
							>
								Save
							</button>
							<button
								onClick={() => setEditing(false)}
								className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition cursor-pointer"
							>
								Cancel
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => setEditing(true)}
								className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100 transition cursor-pointer"
							>
								Edit
							</button>
							<button
								onClick={() => setShowConfirm(true)}
								className="bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 transition cursor-pointer"
							>
								Delete
							</button>
						</>
					)}
				</td>
			</tr>

			{/* Delete Confirmation Modal */}
			{showConfirm && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					{/* Translucent backdrop */}
					<div
						className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
						onClick={() => setShowConfirm(false)}
					></div>

					{/* Modal content */}
					<div className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-6 w-80">
						<h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
						<p className="mb-6">
							Are you sure you want to delete <span className="font-medium">{patient.name}</span>?
						</p>
						<div className="flex justify-end space-x-3">
							<button
								onClick={() => setShowConfirm(false)}
								className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
							>
								Cancel
							</button>
							<button
								onClick={confirmDelete}
								className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
