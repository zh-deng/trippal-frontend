import { ReactElement } from "react";
import "./FallbackWrapper.scss";
import { Text } from "../Text/Text";

export enum FallBackType {
	EmptyTrips,
	ImageGallery,
	DashboardNoUser,
}

type FallbackWrapperProps = {
	children: ReactElement;
	fallbackType: FallBackType;
	shouldRender: boolean;
};

export const FallbackWrapper: React.FC<FallbackWrapperProps> = ({
	children,
	fallbackType,
	shouldRender,
}) => {
	let fallback: ReactElement;

	switch (fallbackType) {
		case FallBackType.EmptyTrips:
			fallback = (
				<div className="empty-trips-fallback">
					<Text content={"dashboard.emptyTripFallback"} />
				</div>
			);
			break;
		case FallBackType.ImageGallery:
			fallback = (
				<div className="image-gallery-fallback">
					<Text content={"dashboard.center.imageGallery.fallback"} />
				</div>
			);
			break;
		case FallBackType.DashboardNoUser:
			fallback = (
				<div className="dashboard-fallback">
					<div className="dashboard-fallback-text">
						<Text isBold content={"dashboard.fallback"} />
					</div>
				</div>
			);
	}

	return shouldRender ? children : fallback;
};
