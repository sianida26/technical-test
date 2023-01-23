import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Dropdown, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FeeType, { Language } from "../interfaces/FeeType";
import { useAppSelector } from "../redux/hooks";
import { createFeeType, editFeeType } from "../services/feeTypeService";

interface Props {
	action: "edit" | "create" | "view";
}

export default function CreateFeeTypePage({ action }: Props) {
	const navigate = useNavigate();
	const editData = useAppSelector((state) => state);

	useEffect(() => {
		//Redirect to index if no edit data
		if (action === "create") return;
		if (!editData.code) return navigate("/", { replace: true });
	}, []);

	const [currentLanguage, setCurrentLanguage] = useState<Language>(
		Language.id
	);

	const validationSchema = Yup.object({
		code: Yup.string()
			.max(36, "Fee Type Code must be at most 36 characters")
			.required("Fee Type Code is required."),
		translations: Yup.object().shape({
			en: Yup.object().shape({
				name: Yup.string()
					.max(256, "Fee Type Name must be at most 256 characters")
					.required("Fee Type Name is required."),
			}),
			id: Yup.object().shape({
				name: Yup.string()
					.max(256, "Fee Type Name must be at most 256 characters")
					.required("Fee Type Name is required."),
			}),
			chn: Yup.object().shape({
				name: Yup.string()
					.max(256, "Fee Type Name must be at most 256 characters")
					.required("Fee Type Name is required."),
			}),
		}),
	});

	const initialValues: FeeType = {
		code: "",
		translations: {
			id: { name: "", description: "" },
			en: { name: "", description: "" },
			chn: { name: "", description: "" },
		},
	};

	const handleSubmit = (formData: FeeType) => {
		if (action === "create"){
			createFeeType(formData)
		}
		else if (action === "edit"){
			editFeeType(formData)
		}
		toast.success(
			`Record '${formData.translations.en.name}' has been successfully saved.`
		);
		navigate("/");
	};

	const formik = useFormik({
		initialValues: action === "create" ? initialValues : editData,
		validationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<main>
			<Form noValidate onSubmit={formik.handleSubmit}>
				<h2>
					{action === "view"
						? "Fee Type Details"
						: action === "edit"
						? "Edit Fee Type"
						: "Create Fee Type"}
				</h2>

				<Card className="shadow p-3">
					<div className="d-flex flex-column gap-2">
						<div className="d-flex flex-column gap-2 gap-md-4 flex-md-row-reverse">
							{/* type code */}
							<div className="bg-F3F4F4 rounded p-2">
								<Form.Group>
									<p>
										<strong>For Interface Purpose</strong>
									</p>
									<div className="d-flex flex-column flex-md-row gap-md-2">
										<Form.Label className="whitespace-none flex-nowrap">
											Fee Type Code
											{action !== "view" && (
												<span className="text-danger">
													*
												</span>
											)}
											<i
												className="bi bi-info-circle position-relative"
												style={{ bottom: "5px" }}
											/>
										</Form.Label>
										<div className="d-flex flex-column">
											<Form.Control
												type="text"
												className="w-50 w-md-100"
												minLength={1}
												maxLength={36}
												name="code"
												id="code"
												isInvalid={!!formik.errors.code}
												readOnly={action === "view"}
												onChange={formik.handleChange}
												value={formik.values.code}
											/>
											<Form.Control.Feedback type="invalid">
												{formik.errors.code}
											</Form.Control.Feedback>
										</div>
									</div>
								</Form.Group>
							</div>

							<div className="d-flex flex-column gap-2 flex-md-grow-1">
								<Form.Group className="d-flex flex-column flex-md-row gap-md-2">
									<Form.Label className="w-md-30">
										Fee Type Name
										{action !== "view" && (
											<span className="text-danger">
												*
											</span>
										)}
									</Form.Label>
									<div className="w-md-100">
										<Form.Control
											type="text"
											name="translations.en.name"
											id="code"
											maxLength={256}
											onChange={formik.handleChange}
											readOnly={action === "view"}
											isInvalid={
												!!formik.errors.translations?.en
													?.name
											}
											value={
												formik.values.translations.en
													.name
											}
										/>
										<Form.Control.Feedback type="invalid">
											{
												formik.errors.translations?.en
													?.name
											}
										</Form.Control.Feedback>
									</div>
								</Form.Group>
								<Form.Group className="d-flex flex-column flex-md-row gap-md-2">
									<Form.Label className="w-md-30">
										Description
									</Form.Label>
									<Form.Control
										type="text"
										className="w-md-100"
										as="textarea"
										name="translations.en.description"
										readOnly={action === "view"}
										id="code"
										maxLength={4000}
										onChange={formik.handleChange}
										value={
											formik.values.translations.en
												.description
										}
									/>
								</Form.Group>
							</div>
						</div>

						<div className="mt-4">
							<h4 className="border-bottom">Translation</h4>
							<div className="mt-4 d-flex flex-column flex-md-row">
								<Dropdown className="d-md-none">
									<Dropdown.Toggle
										id="dropdown-translation-sm"
										className="shadow"
									>
										<div className="d-flex gap-2 align-items-center">
											{currentLanguage === Language.id
												? "INDONESIA"
												: "CHINESE SIMPLIFIED"}
											{formik.touched &&
												formik.errors.translations?.[
													currentLanguage
												] && (
													<i className="bi bi-exclamation-triangle-fill text-danger text-xl" />
												)}
										</div>
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item
											onClick={() =>
												setCurrentLanguage(Language.id)
											}
										>
											Indonesia&nbsp;
											{formik.touched &&
												formik.errors.translations
													?.id && (
													<i className="bi bi-exclamation-triangle-fill text-danger text-xl" />
												)}
										</Dropdown.Item>
										<Dropdown.Item
											onClick={() =>
												setCurrentLanguage(Language.chn)
											}
										>
											Chinese Simplified&nbsp;
											{formik.touched &&
												formik.errors.translations
													?.chn && (
													<i className="bi bi-exclamation-triangle-fill text-danger text-xl" />
												)}
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								<div id="translation-tab-container">
									<button
										className={`translation-tab-item ${
											currentLanguage === Language.id &&
											"active"
										}`}
										type="button"
										onClick={() =>
											setCurrentLanguage(Language.id)
										}
									>
										Indonesia&nbsp;
										{formik.touched &&
											formik.errors.translations?.id && (
												<i className="bi bi-exclamation-triangle-fill text-danger text-xl" />
											)}
									</button>
									<button
										className={`translation-tab-item ${
											currentLanguage === Language.chn &&
											"active"
										}`}
										type="button"
										onClick={() =>
											setCurrentLanguage(Language.chn)
										}
									>
										Chinese Simplified &nbsp;
										{formik.touched &&
											formik.errors.translations?.chn && (
												<i className="bi bi-exclamation-triangle-fill text-danger text-xl" />
											)}
									</button>
								</div>
								<Card
									className="shadow p-4 d-flex flex-column gap-2 flex-md-grow-1"
									id="card-translation"
								>
									<Form.Group>
										<Form.Label>Fee Type Name</Form.Label>
										<Form.Control
											type="text"
											className=""
											readOnly={action === "view"}
											name={`translations.${currentLanguage}.name`}
											id="code"
											maxLength={256}
											onChange={formik.handleChange}
											value={
												formik.values.translations[
													currentLanguage
												].name
											}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Description</Form.Label>
										<Form.Control
											type="text"
											className=""
											readOnly={action === "view"}
											as="textarea"
											name={`translations.${currentLanguage}.description`}
											id="code"
											maxLength={4000}
											onChange={formik.handleChange}
											value={
												formik.values.translations[
													currentLanguage
												].description
											}
										/>
									</Form.Group>
								</Card>
							</div>
						</div>
					</div>
					<p className="mt-2">
						<em>
							Note:{" "}
							<i className="bi bi-exclamation-triangle-fill text-danger text-xl" />{" "}
							Incomplete Data
						</em>
					</p>
				</Card>

				<div className="d-flex mt-4 justify-content-center gap-4">
					{action === "view" ? (
						<Button
							onClick={() => navigate(-1)}
							variant="outline-dark"
						>
							Back
						</Button>
					) : (
						<>
							<Button
								variant="success"
								className="px-4"
								type="submit"
							>
								Save
							</Button>
							<Link to="/">
								<Button variant="outline-dark">Cancel</Button>
							</Link>
						</>
					)}
				</div>
			</Form>
		</main>
	);
}
