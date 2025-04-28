import { DashboardMap } from "../../components/DashboardMap/DashboardMap";
import { DashboardRoadmap } from "../../components/DashboardRoadmap/DashboardRoadmap";
import { DashboardTabMenu } from "../../components/DashboardTabMenu/DashboardTabMenu";
import "./dashboard.scss";

export const Dashboard = () => {
	return (
    <div className="dashboard">
      <div>
        <DashboardTabMenu />
      </div>
      <div className="dashboard-main">
        <div className="dashboard-main-left">
          <DashboardRoadmap />
        </div>
        <div className="dashboard-main-center">
          Dashboard Main
        </div>
        <div className="dashboard-main-right">
          <DashboardMap />
        </div>
      </div>
    </div>
  );
};
