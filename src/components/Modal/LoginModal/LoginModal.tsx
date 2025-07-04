import { Modal } from "../../Modal/Modal";
import { useTranslation } from "react-i18next";
import { Text } from "../../shared/Text/Text";
import "./LoginModal.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../../services/userService";
import { setActiveUser } from "../../../state/global/globalSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSwitchToRegister: () => void;
}

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }: Props) => {
	const { t } = useTranslation();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
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

		try {
			const user = await loginUser({
				username: formData.email,
				password: formData.password,
			});

			dispatch(setActiveUser(user));

			toast.success(t("loginModal.loginSuccess"));

			setFormData({
				email: "",
				password: "",
			});

			onClose();
		} catch (err: any) {
			setError(t("loginModal.loginFailed"));
		}
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={t("loginModal.login")}>
			<form className="login-form" onSubmit={handleSubmit}>
				<label>
					<Text content={t("loginModal.email")} />
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder={t("loginModal.email")}
					/>
				</label>
				<label>
					<Text content={t("loginModal.password")} />
					<div className="form-password">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							placeholder={t("loginModal.password")}
							value={formData.password}
							onChange={handleChange}
						/>
						<div className="password-eye-icon" onClick={toggleShowPassword}>
							{showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
						</div>
					</div>
				</label>

				{error && <div className="error-message">{error}</div>}

				<button type="submit">
					<Text content={t("loginModal.login")} />
				</button>
				<div className="login-form-register">
					<Text content="loginModal.registerSwitchText" />
					<span className="register-button" onClick={onSwitchToRegister}>
						<Text content="loginModal.registerSwitch" />
					</span>
				</div>
			</form>
		</Modal>
	);
};

export default LoginModal;
