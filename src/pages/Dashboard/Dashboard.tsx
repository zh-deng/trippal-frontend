import { DashboardMap } from "../../components/DashboardMap/DashboardMap";
import { DashboardRoadmap } from "../../components/DashboardRoadmap/DashboardRoadmap";
import "./dashboard.scss";

export const Dashboard = () => {
	return (
    <div className="dashboard">
      <div className="dashboard-left">
        <DashboardRoadmap />
      </div>
      <div className="dashboard-main">
        Dashboard Main
      </div>
      <div className="dashboard-right">
        <DashboardMap />
      </div>
    </div>
  );
};
