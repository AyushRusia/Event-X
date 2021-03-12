import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth";
import Snackbar from "../../context/snackbar";
import list from "./list";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    //marginLeft: drawerWidth,
    //width: `calc(100% - ${drawerWidth}px)`,
    // transition: theme.transitions.create(["width", "margin"], {
    // easing: theme.transitions.easing.sharp,
    // duration: theme.transitions.duration.enteringScreen,
    //}),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    //position: "absolute",
    marginTop: "50px",
    display: "flex",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    //position: "absolute",
    display: "flex",
    marginTop: "50px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  toolbar: {
    alignSelf: "center",
    order: "99",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  btn: {
    marginRight: theme.spacing(4),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const Context = useContext(AuthContext);
  const Context2 = useContext(Snackbar);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  async function Logout() {
    const logout = await axios.get("http://localhost:8000/auth/logout");
    Context2.openbarfun("info", logout.data);
    console.log(logout);
    await Context.getLoggedIn();
    history.push("/");
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: false,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Events Booking Portal
          </Typography>

          <Button
            className={classes.btn}
            variant="contained"
            color="secondary"
            onClick={Logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Divider />

        <List>
          {list.map((object, index) => (
            <ListItem
              button={object.name}
              onClick={() => {
                history.push(object.path);
              }}
            >
              <ListItemIcon
                onClick={() => {
                  history.push(object.path);
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={object.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            button="profile"
            onClick={() => {
              history.push("/profile");
            }}
          >
            <ListItemIcon
              onClick={() => {
                history.push("/profile");
              }}
            >
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        <div className={classes.toolbar}>
          <IconButton onClick={() => setOpen(!open)}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
      </Drawer>
    </div>
  );
}
