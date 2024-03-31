import { AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <div className="flex grow">
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/about" color="inherit">
            About us
          </Button>
          <Button component={Link} to="/demo" color="inherit">
            Demo
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Navigation;
