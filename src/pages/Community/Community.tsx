import { useEffect, useState } from "react";
import { Text } from "../../components/Text/Text";
import "./Community.scss";
import { fetchCommunityTrips } from "../../services/communityService";
import { Trip } from "../../types/Trip";
import { CommunityItem } from "./CommunityItem/CommunityItem";

export const Community = () => {
	const [communityTrips, setCommunityTrips] = useState<Trip[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(0);

	const filterCountries = ["Germany", "France", "Spain", "China", "Italy"];

	useEffect(() => {
		fetchCommunityTrips(0)
			.then((response) => {
				setCommunityTrips(response.content);
				setTotalPages(response.totalPages);
			})
			.catch((error) =>
				console.error("Failed to load community trips:", error)
			);
	}, []);

	const handlePreviousPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	return (
		<div className="community">
			<div className="community-container">
				<div className="community-container-header">
					<Text content={"community.header"} isBold />
				</div>
				<div className="community-container-filter">
					{filterCountries.map((country) => (
						<div className="filter-item">{country}</div>
					))}
				</div>
				<div className="community-container-trips">
					{communityTrips.map((trip) => {
						return <CommunityItem trip={trip} key={trip.id} />;
					})}
				</div>
				<div className="community-container-pagination">
					<button
						className={currentPage === 0 ? "hidden" : ""}
						onClick={handlePreviousPage}
					>
						<Text content={"community.previous"} />
					</button>
					<div className="pagination-counter">{`${currentPage} - ${totalPages}`}</div>
					<button
						className={currentPage === totalPages ? "hidden" : ""}
						onClick={handleNextPage}
					>
						<Text content={"community.next"} />
					</button>
				</div>
			</div>
		</div>
	);
};
