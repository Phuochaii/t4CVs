import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <p>
        <Link to="about">About Us</Link>
      </p>
      <p>
        <Link to="demo">Demo</Link>
      </p>
    </div>
  );
};
export default HomePage;
