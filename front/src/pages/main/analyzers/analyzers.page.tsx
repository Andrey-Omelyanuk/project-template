import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Switch, Route, NavLink } from "react-router-dom"
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import AnalyzerPage from './analyzer.page'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Analyzer } from 'src/models/tags'


const styles = (theme) => ({
    active: {
        backgroundColor: theme.palette.action.selected
    },
});


@observer
class AnalyzersPage extends React.Component<RouteComponentProps> {

    render() {
        const { classes } = this.props;
        const { path, url } = this.props.match;
        const state = this.props.state

        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper>
                            <List>
                                {state.analyzers.items.map(function(analyzer: Analyzer){
                                    return  <ListItem button key={analyzer.id} component={NavLink} to={`${url}/${analyzer.id}`} activeClassName={classes.active} >
                                                <ListItemText primary={analyzer.name} />
                                            </ListItem>
                                })}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <Switch>
                                <Route exact path={url}><p>Choose a analyzer</p></Route>
                                <Route path={`${url}/:analyzer_id`}><AnalyzerPage state={state}/></Route>
                            </Switch>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(AnalyzersPage))
