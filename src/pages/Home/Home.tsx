import "./Home.scss";
import { Text } from "../../components/Text/Text";

export const Home = () => {

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
      </div>
    </div>
  );
};
