import { makeStyles } from "@material-ui/core/styles";
import natcashLogo from "assets/img/logo.png"
// import natcashLogo from "assets/img/gif/natcash-loading.gif";

export default function PageLoader(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <div className="profile-main-loader" {...rest}>
      <div className="loader">
        <img src={natcashLogo} className={classes.imgLogo} />
        <svg className="circular-loader" viewBox="25 25 50 50">
          <circle
            className="loader-path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#5185e4"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}

const styles = {
  imgLogo: {
    position: "absolute",
    width: "40px",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    marginTop: "auto",
    marginBottom: "auto",
    top: 0,
    bottom: 0,
  },
};
