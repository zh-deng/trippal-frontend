import { RoadmapItem } from "../../../types/Roadmap";
import { Trip } from "../../../types/Trip";
import "./CommunityItem.scss";
import { FaStar, FaCommentAlt  } from "react-icons/fa";

type CommunityItemProps = {
	trip: Trip;
};

export const CommunityItem: React.FC<CommunityItemProps> = ({ trip }) => {
  const roadmapItems: RoadmapItem[] = trip.roadmapItems ?? []

	return <div className="community-item">
    <div className="community-item-title">
      {
        trip.title
      }
    </div>
    <div className="community-item-data">
      {
        roadmapItems.map((roadmapItem, index) => {
          return index < 6 ? <div className="data-item" key={roadmapItem.id}>
            <span>{roadmapItem.title}</span>
          </div> : <></>
        })
      }
    </div>
    <div className="community-item-metadata">
      <div className="metadata-stars">
        {/* { trip.stars ?? 0 }  */}
        0
        <FaStar />
      </div>
      <div className="metadata-comments">
        {/* { trip.comments.length ?? 0 } */}
        0 
        <FaCommentAlt />
      </div>
    </div>
  </div>;
};
