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
import AnalyzersPage from './analyzers/analyzers.page'
import ScannersPage from './scanners/scanners.page'
import SourcesPage from './sources/sources.page'
import TrendsPage from './trends.page'
import DashboardPage from './dashboard.page'
import { computed, observable } from 'mobx';
import { makeAutoObservable } from 'mobx'
import { Query } from 'mobx-orm'
import { Site, Page, Session, Spider, Article, ArticleSnapshot } from 'src/models/spiders'
import { Tag, TagHistory, AnalyzerSession, Analyzer } from 'src/models/tags'


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

class MainPageState {

    sites: Query<Site> = null
    pages: Query<Page> = null
    sessions: Query<Session> = null
    spiders: Query<Spider> = null
    articles: Query<Article> = null
    // article_snapshots: Query<ArticleSnapshot> = null

    tags: Query<Tag> = null
    tag_histories: Query<TagHistory> = null
    analyzer_sessions: Query<AnalyzerSession> = null
    analyzers: Query<Analyzer> = null

    get is_ready() {
        return (this.sites && this.sites.is_ready)
            && (this.pages && this.pages.is_ready)
            && (this.sessions && this.sessions.is_ready)
            && (this.spiders && this.spiders.is_ready)
            && (this.articles && this.articles.is_ready)
            && (this.tags && this.tags.is_ready)
            && (this.tag_histories && this.tag_histories.is_ready)
            && (this.analyzer_sessions && this.analyzer_sessions.is_ready)
            && (this.analyzers && this.analyzers.is_ready)
    }

    constructor() {
        makeAutoObservable(this)
    }

    init() {
        if (!this.sites) this.sites = Site.load() as any
        if (!this.pages) this.pages = Page.load() as any
        if (!this.sessions) this.sessions = Session.load() as any
        if (!this.spiders) this.spiders = Spider.load() as any
        if (!this.articles) this.articles = Article.load() as any
        if (!this.tags) this.tags = Tag.load() as any
        if (!this.tag_histories) this.tag_histories = TagHistory.load() as any
        if (!this.analyzer_sessions) this.analyzer_sessions = AnalyzerSession.load() as any
        if (!this.analyzers) this.analyzers = Analyzer.load() as any
    }

    destroy() {
        if (this.sites) this.sites.destroy(); this.sites = null
    }
}
let state = new MainPageState()

@observer
class MainPage extends React.Component<RouteComponentProps> {

    @observable is_ready: boolean  = false

    componentDidMount() {
        state.init()
    }

    componentWillUnmount() {
        // state.destroy()
    }

    render() {
        if (!auth.is_authenticated)
            return (<Redirect to="/auth/login"/>)

        const { classes } = this.props;
        const { path, url } = this.props.match;
        const goToDashboard = () => {
            this.props.history.push(`/`);
        }

        if (!state.is_ready) {
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
                        <Route exact path={`/`   }><DashboardPage state={state}/></Route>
                        <Route path={`/scanners` }><ScannersPage state={state}/></Route>
                        <Route path={`/analyzers`}><AnalyzersPage state={state}/></Route>
                        <Route path={`/trends`   }><TrendsPage state={state}/></Route>
                        <Route path={`/sources`  }><SourcesPage state={state} /></Route>
                    </Switch>
                </main>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(MainPage))
