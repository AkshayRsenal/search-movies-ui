// import logo from './logo.svg';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './App.css';
import routesMap from './imports/routesMap';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";


const drawerWidth = 190;

function App(props) {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        // margin: theme.spacing(1),
        width: '25ch',
      },
      display: 'flex',

    },
    drawer: {
      width: 0,

      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      width: `100%`,

      [theme.breakpoints.up('sm')]: {
        width: `calc(100%)`,
        marginLeft: drawerWidth,
        zIndex: '9999999',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: `50%`,

      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
      },

    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        width: `100%`,
      },
    },

  }));

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleBreadcrumbs = function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }


  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {
          routesMap.map((routeElement) => (
            <ListItem button key={routeElement.tabName} component="a" href={routeElement.route}>
              <ListItemIcon>{routeElement.iconComponent}</ListItemIcon>
              <ListItemText primary={routeElement.tabName} />
            </ListItem>
          ))
        }
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const LinkRouter = (props) => <Link {...props} component={RouterLink} />;
  let BreadcrumbTrail;
  let AnycrumbTrail;
  let currentPathElements;
  // let pointToUrl;
  return (
    <div className={classes.root}>

      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            KinoKlick
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          
          <Route exact component={BreadcrumbTrail = (componentPath) => {
            return (
              <Breadcrumbs aria-label="breadcrumb">
                {currentPathElements = useLocation().pathname.split("/").filter((isAnElement) => isAnElement)}


                <LinkRouter color="inherit" to={"/"} > Home </LinkRouter>
                {
                  currentPathElements.map((value, index) => {
                    let lastElement = index === (currentPathElements.length - 1)
                    let pointToUrl = "/" + (currentPathElements.slice(0, index + 1).join("/"))
                    let routeData = routesMap.filter(objectRoute => { return objectRoute.route === pointToUrl });
                    return (
                      // <LinkRouter color="inherit" to={ routeData[0].route } >
                      //   {routeData[0].tabName}
                      // </LinkRouter>
                      // lastElement ? (
                      //   <Typography>
                      //     {routeData[0].tabName}
                      //   </Typography>
                      // ) : (
                      <LinkRouter color="inherit" to={routeData[0].route} >
                        {routeData[0].tabName}
                      </LinkRouter>
                      // )
                    );
                  })
                }
              </Breadcrumbs>
            )
          }} />

          <Divider />
          <Divider />
          <Divider />

          {
            routesMap.map((components) => (
              <Route path={components.route} exact component={components.componentName} />
            ))
          }
        </Router>

      </main>
    </div>
  );
}

// App.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default App;
