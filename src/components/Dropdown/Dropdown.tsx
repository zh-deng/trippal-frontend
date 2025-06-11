import { useEffect, useRef, useState } from "react";
import "./Dropdown.scss";
import { FaCaretLeft, FaCaretDown } from "react-icons/fa";

type DropdownProps = {
	defaultValue?: any;
	value?: any;
	options: any[];
	onChange?: (selectedOption: any) => void;
};

export const Dropdown = ({
	defaultValue = "Default",
	value,
	options = [],
	onChange,
}: DropdownProps) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleExpansion = () => {
		setIsExpanded(!isExpanded);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsExpanded(false);
			}
		};

		if (isExpanded) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isExpanded]);

	const handleOptionSelect = (option: string) => {
		setIsExpanded(false);
		onChange?.(option);
	};

	const selectedLabel = value?.name ?? value ?? defaultValue;

	return (
		<div className="dropdown" ref={dropdownRef}>
			<div className="dropdown-current" onClick={toggleExpansion}>
				<button>{selectedLabel}</button>
				{isExpanded ? <FaCaretDown size={22} /> : <FaCaretLeft size={22} />}
			</div>
			<div
				className={`dropdown-option-container ${
					isExpanded ? "" : "options-hidden"
				}`}
			>
				{options.map(
					(option: any, index: number) =>
						option !== value && (
							<div
								className="dropdown-option-item"
								key={option.name ?? option + index}
								onClick={() => handleOptionSelect(option)}
							>
								<button>{option.name ?? option}</button>
							</div>
						)
				)}
			</div>
		</div>
	);
};
