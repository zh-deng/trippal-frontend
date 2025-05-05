import { useEffect } from "react";
import "./Modal.scss";
import ReactDOM from "react-dom";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
}) => {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [onClose]);

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
				<div className="modal-body">{children}</div>
			</div>
		</div>,
		document.body
	);
};
