import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Switch, Route, NavLink } from "react-router-dom"
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ScannerPage from './scanner.page'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Query } from 'mobx-orm'
import { Spider } from 'src/models/spiders'
import { makeAutoObservable } from 'mobx'


class ScannersPageState {

    spiders : Query<Spider> = null

    get is_ready() {
        return this.spiders && this.spiders.is_ready
    }

    constructor() {
        makeAutoObservable(this)
    }

    init() {
        this.spiders = Spider.load() as any
    }

    destroy() {
        if (this.spiders) this.spiders.destroy()
        this.spiders = null
    }
}
let state = new ScannersPageState()

const styles = (theme) => ({
    active: {
        backgroundColor: theme.palette.action.selected
    },
});


@observer
class ScannersPage extends React.Component<RouteComponentProps> {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        state.init()
    }

    componentWillUnmount() {
        state.destroy()
    }

    render() {
        const { classes } = this.props;
        const { path, url } = this.props.match;

        if (!state.is_ready) {
            return (
                <React.Fragment>
                    <CircularProgress color="secondary" />
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper>
                            <List>
                                {state.spiders.items.map(function(spider){
                                    return 
                                    <ListItem button component={NavLink} to={`${url}/1`} activeClassName={classes.active} >
                                        <ListItemText primary="Trash" />
                                    </ListItem>
                                })}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <div>test {state.spiders.items.length}</div>
                            <Switch>
                                <Route exact path={`/`}>Choose a spider</Route>
                                <Route path={`/:scanner_id`}><ScannerPage/></Route>
                            </Switch>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(ScannersPage))
