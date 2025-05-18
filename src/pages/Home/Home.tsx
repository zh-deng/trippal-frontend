import { useSelector } from "react-redux";
import "./Home.scss";
import { RootState } from "../../state/store";
import { Text } from "../../components/Text/Text";

export const Home = () => {
	const activeUser = useSelector(
		(state: RootState) => state.global.activeUser
	);

	return (
    <div className="home">
      <div className="home-container">
        <div className="home-hero">
          <span className="home-hero-header">
            <Text content={"home.hero.header"} />
          </span>
          <span className="home-hero-description">
            <Text content={"home.hero.description"} />
          </span>
        </div>
        {
          `Current user: ${JSON.stringify(activeUser)}`
        }
      </div>
    </div>
  );
};
