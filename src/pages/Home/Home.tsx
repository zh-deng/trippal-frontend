import { useSelector } from "react-redux";
import "./Home.scss";
import { RootState } from "../../state/store";

export const Home = () => {
	const activeUser = useSelector(
		(state: RootState) => state.global.activeUser
	);

	return (
    <div className="home">
      Home
      <div>
        {
          `Current user: ${JSON.stringify(activeUser)}`
        }
      </div>
    </div>
  );
};
