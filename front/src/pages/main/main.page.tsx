import React from 'react'
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useRouteMatch
} from "react-router-dom";
import { observer } from 'mobx-react'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import settings from 'src/services/settings'
import auth from 'src/services/auth'
import AnalyzersPage from './analyzers.page'
import ScannersPage from './scanners/scanners.page'
import SourcesPage from './sources.page'
import TrendsPage from './trends.page'
import DashboardPage from './dashboard.page'
import { computed, observable } from 'mobx';


const drawerWidth = 240;
const styles = (theme) => ({
    // all auth things should be in the center 
    root: {
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    active: {
        backgroundColor: theme.palette.action.selected
    },
    main: {
        padding: '10px 10px 10px 250px'
    },
    link: {
        cursor: 'pointer'
    }
});


@observer
class MainPage extends React.Component<RouteComponentProps> {

    @observable is_ready: boolean  = false

    constructor(props) {
        super(props)
        this.is_ready = true 
        setTimeout(() => {
            this.is_ready = true
        }, 2000)
    }

    render() {
        if (!auth.is_authenticated)
            return (<Redirect to="/auth/login"/>)

        const { classes } = this.props;
        const { path, url } = this.props.match;
        const goToDashboard = () => {
            this.props.history.push(`/`);
        }

        if (!this.is_ready) {
            return (
                <React.Fragment>
                    <CircularProgress color="secondary" />
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <AppBar position="relative" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap onClick={goToDashboard} className={classes.link}> Dashboard </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }} >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button key="Scanners" component={NavLink} to="/scanners" activeClassName={classes.active} >
                            <ListItemIcon><InboxIcon/></ListItemIcon>
                            <ListItemText primary="Scanners" />
                        </ListItem>
                        <ListItem button key="Analyzers" component={NavLink} to="/analyzers" activeClassName={classes.active} >
                            <ListItemIcon><InboxIcon/></ListItemIcon>
                            <ListItemText primary="Analyzers" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key="Trends" component={NavLink} to="/trends" activeClassName={classes.active} >
                            <ListItemIcon><MailIcon/></ListItemIcon>
                            <ListItemText primary="Trends" />
                        </ListItem>
                        <ListItem button key="Sources" component={NavLink} to="/sources" activeClassName={classes.active} >
                            <ListItemIcon><MailIcon/></ListItemIcon>
                            <ListItemText primary="Sources" />
                        </ListItem>
                    </List>
                    </div>
                </Drawer>
                <main className={classes.main}>
                    <Switch>
                        <Route exact path={`/`   }><DashboardPage/></Route>
                        <Route path={`/scanners` }><ScannersPage/></Route>
                        <Route path={`/analyzers`}><AnalyzersPage/></Route>
                        <Route path={`/trends`   }><TrendsPage/></Route>
                        <Route path={`/sources`  }><SourcesPage/></Route>
                    </Switch>
                </main>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(MainPage))
