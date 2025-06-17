import { Modal } from "../../Modal/Modal";
import { useTranslation } from "react-i18next";
import { Text } from "../../shared/Text/Text";
import "./RegisterModal.scss";
import { useState } from "react";
import { registerUser } from "../../../services/userService";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSwitchToLogin: () => void;
}

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }: Props) => {
	const { t } = useTranslation();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
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

			toast.success(t("registerModal.registrationSuccess"));

			setFormData({
				name: "",
				email: "",
				password: "",
				passwordRepeat: "",
			});

			onClose();
		} catch (err: any) {
			setError(t("registerModal.registrationFailed"));
		}
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const toggleShowRepeatPassword = () => {
		setShowRepeatPassword(!showRepeatPassword);
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
					<div className="form-password">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder={t("registerModal.password")}
						/>
						<div className="password-eye-icon" onClick={toggleShowPassword}>
							{showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
						</div>
					</div>
				</label>
				<label>
					<Text content={t("registerModal.passwordRepeat")} />
					<div className="form-password-repeat">
						<input
							type={showRepeatPassword ? "text" : "password"}
							name="passwordRepeat"
							value={formData.passwordRepeat}
							onChange={handleChange}
							placeholder={t("registerModal.passwordRepeat")}
						/>
						<div
							className="password-eye-icon"
							onClick={toggleShowRepeatPassword}
						>
							{showRepeatPassword ? (
								<FaEyeSlash size={22} />
							) : (
								<FaEye size={22} />
							)}
						</div>
					</div>
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
