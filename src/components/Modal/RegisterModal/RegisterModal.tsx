import { Modal } from "../../Modal/Modal";
import { useTranslation } from "react-i18next";
import { Text } from "../../Text/Text";
import "./RegisterModal.scss";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSwitchToLogin: () => void;
}

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }: Props) => {
	const { t } = useTranslation();

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={t("registerModal.signUp")}>
			<form className="register-form">
				<label>
					<Text content={t("registerModal.username")} />
					<input type="text" placeholder={t("registerModal.username")} />
				</label>
				<label>
					<Text content={t("registerModal.email")} />
					<input type="email" placeholder={t("registerModal.email")} />
				</label>
				<label>
					<Text content={t("registerModal.password")} />
					<input type="password" placeholder={t("registerModal.password")} />
				</label>
				<label>
					<Text content={t("registerModal.passwordRepeat")} />
					<input
						type="password"
						placeholder={t("registerModal.passwordRepeat")}
					/>
				</label>
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
