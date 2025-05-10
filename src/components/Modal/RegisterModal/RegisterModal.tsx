import { Modal } from "../../Modal/Modal";
import { useTranslation } from "react-i18next";
import { Text } from "../../Text/Text";
import "./RegisterModal.scss";
import { useState } from "react";
import { registerUser } from "../../../services/userService";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../../../state/global/globalSlice";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSwitchToLogin: () => void;
}

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }: Props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordRepeat: "",
	});

	const [error, setError] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.password !== formData.passwordRepeat) {
			setError(t("registerModal.passwordMismatch"));
			return;
		}

		try {
			await registerUser({
				name: formData.name,
				password: formData.password,
				email: formData.email,
				roles: "ROLE_USER",
			});
			
			onClose();
		} catch (err: any) {
			setError(t("registerModal.registrationFailed"));
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={t("registerModal.signUp")}>
			<form className="register-form" onSubmit={handleSubmit}>
				<label>
					<Text content={t("registerModal.username")} />
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder={t("registerModal.username")}
					/>
				</label>
				<label>
					<Text content={t("registerModal.email")} />
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder={t("registerModal.email")}
					/>
				</label>
				<label>
					<Text content={t("registerModal.password")} />
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder={t("registerModal.password")}
					/>
				</label>
				<label>
					<Text content={t("registerModal.passwordRepeat")} />
					<input
						type="password"
						name="passwordRepeat"
						value={formData.passwordRepeat}
						onChange={handleChange}
						placeholder={t("registerModal.passwordRepeat")}
					/>
				</label>

				{error && <div className="error-message">{error}</div>}

				<button type="submit">
					<Text content={t("registerModal.signUp")} />
				</button>
				<div className="register-form-login">
					<Text content="registerModal.loginSwitchText" />
					<span className="login-button" onClick={onSwitchToLogin}>
						<Text content="registerModal.loginSwitch" />
					</span>
				</div>
			</form>
		</Modal>
	);
};

export default RegisterModal;
