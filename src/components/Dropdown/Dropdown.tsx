import { useEffect, useRef, useState } from "react";
import "./Dropdown.scss";

type DropdownProps = {
	defaultValue?: any;
	options: any[];
	onChange?: (selectedOption: any) => void;
};

export const Dropdown = ({
	defaultValue = "Default",
	options = [],
	onChange,
}: DropdownProps) => {
	const [selectedOption, setSelectedOption] = useState<any>(defaultValue);
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
		setSelectedOption(option);
		setIsExpanded(false);
		onChange?.(option);
	};

	return (
		<div className="dropdown" ref={dropdownRef}>
			<div className="dropdown-current">
				<button onClick={toggleExpansion}>{selectedOption.name ?? defaultValue}</button>
			</div>
			<div
				className={`dropdown-option-container ${
					isExpanded ? "" : "options-hidden"
				}`}
			>
				{options.map(
					(option: any) =>
						option !== selectedOption && (
							<div
								className="dropdown-option-item"
								key={option.name}
								onClick={() => handleOptionSelect(option)}
							>
								<button>{option.name}</button>
							</div>
						)
				)}
			</div>
		</div>
	);
};
