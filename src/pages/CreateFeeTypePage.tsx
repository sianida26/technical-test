import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Dropdown, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

enum Language {
	"id" = "id",
	"en" = "en",
	"chn" = "chn",
}

interface FormType {
	code: string;
	translations: {
		[language in Language]: {
			name: string;
			description: string;
		};
	};
}

export default function CreateFeeTypePage() {
	const navigate = useNavigate();

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

	const initialValues: FormType = {
		code: "",
		translations: {
			id: { name: "", description: "" },
			en: { name: "", description: "" },
			chn: { name: "", description: "" },
		},
	};

    const handleSubmit = (formData: FormType) => {
        toast.success(`Record '${formData.translations.en.name}' has been successfully saved.`)
        navigate('/')
    }

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<main>
			<Form noValidate onSubmit={formik.handleSubmit}>
				<h2>Create Fee Type</h2>

				<Card className="shadow p-3">
					<div className="d-flex flex-column gap-2">
						{/* type code */}
						<div className="bg-F3F4F4 rounded p-2">
							<Form.Group>
								<p>
									<strong>For Interface Purpose</strong>
								</p>
								<Form.Label>
									Fee Type Code
									<span className="text-danger">*</span>
									<i
										className="bi bi-info-circle position-relative"
										style={{ bottom: "5px" }}
									/>
								</Form.Label>
								<Form.Control
									type="text"
									className="w-50"
									minLength={1}
									maxLength={36}
									name="code"
									id="code"
									isInvalid={!!formik.errors.code}
									onChange={formik.handleChange}
									value={formik.values.code}
								/>
								<Form.Control.Feedback type="invalid">
									{formik.errors.code}
								</Form.Control.Feedback>
							</Form.Group>
						</div>

						<div className="d-flex flex-column gap-2">
							<Form.Group>
								<Form.Label>
									Fee Type Name
									<span className="text-danger">*</span>
								</Form.Label>
								<Form.Control
									type="text"
									className=""
									name="translations.en.name"
									id="code"
									maxLength={256}
									onChange={formik.handleChange}
									isInvalid={
										!!formik.errors.translations?.en?.name
									}
									value={formik.values.translations.en.name}
								/>
								<Form.Control.Feedback type="invalid">
									{formik.errors.translations?.en?.name}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label>Description</Form.Label>
								<Form.Control
									type="text"
									className=""
									as="textarea"
									name="translations.en.description"
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

						<div className="mt-4 border-bottom">
							<h4>Translation</h4>
							<div className="mt-4">
								<Dropdown>
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
												formik.errors.translations?.id && (
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
												formik.errors.translations?.chn && (
													<i className="bi bi-exclamation-triangle-fill text-danger text-xl" />
                                            )}
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								<Card
									className="shadow p-4 d-flex flex-column gap-2"
									id="card-translation"
								>
									<Form.Group>
										<Form.Label>Fee Type Name</Form.Label>
										<Form.Control
											type="text"
											className=""
											name={`translations.${currentLanguage}.name`}
											id="code"
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
											as="textarea"
											name={`translations.${currentLanguage}.description`}
											id="code"
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
					<Button variant="success" className="px-4" type="submit">
						Save
					</Button>
					<Button variant="outline-dark">Cancel</Button>
				</div>
			</Form>
		</main>
	);
}
