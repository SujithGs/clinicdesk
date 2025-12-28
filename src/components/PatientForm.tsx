import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enIN } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

import { savePatientRecord } from "../services/patientService";

import { toast } from "../common/toaster";

const PatientForm: React.FC = () => {
	const [patientName, setPatientName] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [phoneError, setPhoneError] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [visitDate, setVisitDate] = useState<Date>(new Date());
	const [followUp, setFollowUp] = useState<boolean>(false);
	const [followUpDate, setFollowUpDate] = useState<Date | null>(null);
	const [reason, setReason] = useState<string>("");
	const [clinicalNotes, setclinicalNotes] = useState<string>("");

	const navigate = useNavigate();

	const inputClass =
		"w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10";
	const labelClass = "block text-xs font-medium text-gray-600 mb-1";

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPhone(value);

		if (!/^\d{0,10}$/.test(value)) {
			setPhoneError("Only numeric values allowed (max 10 digits)");
		} else if (value.length < 10) {
			setPhoneError("Phone number must be 10 digits");
		} else {
			setPhoneError("");
		}
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!patientName.trim()) {
			toast.error("Please enter patient name");
			return;
		}
		if (!phone || phoneError) {
			toast.error("Please enter valid phone number");
			return;
		}

		try {
			await savePatientRecord({
				name: patientName,
				phone,
				address,
				visit_date: visitDate.toISOString(),
				reason,
				clinical_notes: clinicalNotes,
				follow_up_required: followUp,
				follow_up_date: followUpDate
					? followUpDate.toISOString()
					: null,
			});

			toast.success("Patient details saved successfully");

			// Redirect to home after successful save
    		setTimeout(() => navigate("/"), 500);
		} catch (err) {
			toast.error("Failed to save patient details");
			console.error(err);
		}
	};


	const renderVisitInput = (
		value: string,
		onClick: () => void,
		onReset: () => void,
		placeholder = ""
	) => (
		<div className="relative w-full">
			<input
				type="text"
				readOnly
				value={value || ""}
				onClick={onClick}
				className={inputClass + " cursor-pointer"}
				placeholder={placeholder}
			/>
			{value && (
				<span
					title="Reset to current date/time"
					className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer select-none"
					onClick={(e) => {
						e.stopPropagation();
						onReset();
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 4v6h6M20 20v-6h-6M4 14a8 8 0 0112-6.9M20 10a8 8 0 01-12 6.9"
						/>
					</svg>
				</span>
			)}
		</div>
	);

	const renderFollowUpInput = (
		value: string,
		onClick: () => void,
		onClear: () => void,
		placeholder = ""
	) => (
		<div className="relative w-full">
			<input
				type="text"
				readOnly
				value={value || ""}
				onClick={onClick}
				className={inputClass + " cursor-pointer"}
				placeholder={placeholder}
			/>
			{value && (
				<span
					title="Clear follow-up date"
					className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer select-none"
					onClick={(e) => {
						e.stopPropagation();
						onClear();
					}}
				>
					&#10005;
				</span>
			)}
		</div>
	);

	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
			<div className="w-full max-w-3xl bg-white rounded-2xl border border-gray-200 shadow-md">
				{/* Header */}
				<div className="px-8 pt-8 pb-6 border-b rounded-t-2xl border-gray-200 bg-slate-50">
					<h1 className="text-2xl font-semibold text-gray-900">Patient Record</h1>
					<p className="text-sm text-gray-500 mt-1">
						Consultation details, prescription & history
					</p>
				</div>

				{/* Form Body */}
				<div className="px-8 py-8 space-y-10 bg-slate-50">
					{/* Patient Info */}
					<section>
						<h3 className="text-sm font-semibold text-gray-700 mb-4">Patient Information</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div>
								<label className={labelClass}>
									Patient Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									className={inputClass}
									value={patientName}
									onChange={(e) => setPatientName(e.target.value)}
									placeholder="Enter patient name"
								/>
							</div>
							<div>
								<label className={labelClass}>Phone Number</label>
								<input
									type="tel"
									className={inputClass + (phoneError ? " border-red-500" : "")}
									value={phone}
									onChange={handlePhoneChange}
									placeholder="Enter 10-digit number"
								/>
								{phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
							</div>
							<div className="md:col-span-2">
								<label className={labelClass}>Address</label>
								<input
									type="text"
									className={inputClass}
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									placeholder="Enter address"
								/>
							</div>
						</div>
					</section>

					{/* Visit Details */}
					<section>
						<label className={labelClass}>Visit Date & Time</label>
						<DatePicker
							selected={visitDate}
							onChange={(date: Date) => setVisitDate(date)}
							showTimeSelect
							dateFormat="dd/MM/yyyy, HH:mm"
							locale={enIN}
							customInput={renderVisitInput(
								visitDate
									? visitDate.toLocaleString("en-IN", {
										day: "2-digit",
										month: "2-digit",
										year: "numeric",
										hour: "2-digit",
										minute: "2-digit"
									})
									: "",
								() => { },
								() => setVisitDate(new Date()),
								"Select visit date & time"
							)}
						/>
					</section>

					{/* Medical Notes */}
					<section>
						<h3 className="text-sm font-semibold text-gray-700 mb-4">Medical Notes</h3>
						<div className="space-y-5">
							<div>
								<label className={labelClass}>Reason / Health Issue</label>
								<textarea
									rows={4}
									className={`${inputClass} resize-none`}
									value={reason}
									onChange={(e) => setReason(e.target.value)}
									placeholder="Enter reason or health issue"
								/>
							</div>
							<div>
								<label className={labelClass}>Medical History / Medications</label>
								<textarea
									rows={4}
									className={`${inputClass} resize-none`}
									value={clinicalNotes}
									onChange={(e) => setclinicalNotes(e.target.value)}
									placeholder="Enter clinical notes"
								/>
							</div>
						</div>
					</section>

					{/* Follow-up 
					<section>
						<div className="flex items-center gap-6">
							<label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
								<input
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									checked={followUp}
									onChange={(e) => setFollowUp(e.target.checked)}
								/>
								Follow-up required
							</label>

							{followUp && (
								<div className="transition-all flex items-end gap-3">
									<div>
										<DatePicker
											selected={followUpDate}
											onChange={(date: Date | null) => setFollowUpDate(date)}
											showTimeSelect
											dateFormat="dd/MM/yyyy, HH:mm"
											locale={enIN}
											placeholderText="Select follow-up date"
											customInput={renderFollowUpInput(
												followUpDate
													? followUpDate.toLocaleString("en-IN", {
														day: "2-digit",
														month: "2-digit",
														year: "numeric",
														hour: "2-digit",
														minute: "2-digit"
													})
													: "",
												() => { },
												() => setFollowUpDate(null),
												"Select follow-up date"
											)}
										/>
									</div>
								</div>
							)}
						</div>
					</section>*/}
				</div>

				{/* Action Bar */}
				<div className="px-8 py-4 border-t border-gray-200 bg-slate-50 rounded-b-2xl flex justify-end">
					<button
						onClick={handleSave}
						className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
					>
						Save Visit
					</button>
				</div>
			</div>
		</div>
	);
};

export default PatientForm;
