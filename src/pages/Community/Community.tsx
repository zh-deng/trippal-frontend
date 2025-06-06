import { useEffect, useState } from "react";
import { Text } from "../../components/Text/Text";
import "./Community.scss";
import { fetchCommunityTrips } from "../../services/communityService";
import { Comment, TripExtended } from "../../types/Trip";
import { CommunityItem } from "../../components/CommunityItem/CommunityItem";
import { AnimatePresence } from "framer-motion";
import { ExpandedView } from "../../components/ExpandedView/ExpandedView";
import React from "react";

export const Community = () => {
	const [communityTrips, setCommunityTrips] = useState<TripExtended[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [filteredCountry, setFilteredCountry] = useState<string | null>(null);
	const [expandedId, setExpandedId] = useState<number | null>(null);

	const filterCountries = ["Germany", "France", "Spain", "China", "Italy"];

	const itemsPerPage = 6;
	const loadedItems = communityTrips.length;
	const expectedItems = currentPage * itemsPerPage;

	const isPageDataMissing = loadedItems < expectedItems;
	const isLastPageWithRemainingItems =
		currentPage === totalPages && loadedItems > (totalPages - 1) * itemsPerPage;

	const isInRange = (index: number) => {
		return (
			(currentPage - 1) * itemsPerPage <= index &&
			index < currentPage * itemsPerPage
		);
	};

	useEffect(() => {
		if (isPageDataMissing && !isLastPageWithRemainingItems) {
			fetchPublicTrips(currentPage - 1, filteredCountry);
		}
	}, [currentPage, filteredCountry]);

	const fetchPublicTrips = (page: number, country: string | null) => {
		fetchCommunityTrips(page, country)
			.then((response) => {
				setCommunityTrips((prev) => [...prev, ...response.content]);
				setTotalPages(response.totalPages);
			})
			.catch((error) =>
				console.error("Failed to load community trips:", error)
			);
	};

	const handlePreviousPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const handleFilterCountry = (country: string) => {
		setFilteredCountry(filteredCountry === country ? null : country);
		setCurrentPage(1);
		setCommunityTrips([]);
	};

	const updateTripComments = (comment: Comment) => {
		setCommunityTrips((prev) => {
			return [
				...prev.map((trip) => {
					if (trip.id !== comment.tripId) {
						return trip;
					} else {
						return { ...trip, comments: [...trip.comments, comment] };
					}
				}),
			];
		});
	};

	return (
		<div className="community">
			<div className="community-container">
				<div className="community-container-header">
					<Text content={"community.header"} isBold />
				</div>
				<div className="community-container-filter">
					{filterCountries.map((country, index) => (
						<button
							className={`filter-item ${
								filteredCountry === country ? "active" : ""
							}`}
							key={index}
							onClick={() => handleFilterCountry(country)}
						>
							{country}
						</button>
					))}
				</div>
				<div className="community-container-trips">
					{communityTrips.map((trip, index) => {
						return isInRange(index) ? (
							<CommunityItem
								trip={trip}
								key={trip.id}
								onClick={setExpandedId}
							/>
						) : (
							<React.Fragment key={`empty-${trip.id}`}></React.Fragment>
						);
					})}
				</div>
				<AnimatePresence>
					{expandedId !== null && (
						<ExpandedView
							trip={communityTrips.find((trip) => trip.id === expandedId)!}
							onClose={() => setExpandedId(null)}
							expandedId={expandedId}
							onCommentUpdate={updateTripComments}
						/>
					)}
				</AnimatePresence>
				<div className="community-container-pagination">
					<button
						className={currentPage === 1 ? "hidden" : ""}
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
