import { Modal } from "../../Modal/Modal";
import { useTranslation } from "react-i18next";
import { Text } from "../../Text/Text";
import "./LoginModal.scss"

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSwitchToRegister: () => void;
}

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }: Props) => {
	const { t } = useTranslation();

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={t("loginModal.login")}>
			<form className="login-form">
				<label>
					<Text content={t("loginModal.email")} />
					<input type="email" placeholder={t("loginModal.email")} />
				</label>
				<label>
					<Text content={t("loginModal.password")} />
					<input type="password" placeholder={t("loginModal.password")} />
				</label>
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