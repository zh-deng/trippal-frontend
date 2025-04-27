import { RoadmapItem } from "../../types/Roadmap";
import "./DashboardRoadmap.scss";

export const DashboardRoadmap = () => {
  const mockItems: RoadmapItem[] = [
    {
      id: 1,
      content: "First Item"
    },
    {
      id: 1,
      content: "Second Item"
    },
    {
      id: 1,
      content: "Third Item"
    },
    {
      id: 1,
      content: "Fourth Item"
    }
  ]


	return (
    <div className="dashboard-roadmap">
      DashboardRoadmap
    </div>
  );
};
