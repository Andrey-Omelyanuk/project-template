import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'
import { Query } from 'mobx-orm'
import { Session } from 'src/models/spiders'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CircularProgress from '@material-ui/core/CircularProgress'


class ScannerPageState {

    sessions: Query<Session> = null

    get is_ready() {
        return this.sessions && this.sessions.is_ready
    }

    constructor() {
        makeAutoObservable(this)
    }

    init() {
        // if (this.sessions)
        //     this.sessions.destroy()
        if (!this.sessions)
            this.sessions = Session.load() as any
    }

    destroy() {
        if (this.sessions) this.sessions.destroy()
        this.sessions = null
    }
}
let state = new ScannerPageState()

const styles = (theme) => ({
});

@observer
class ScannerPage extends React.Component<RouteComponentProps> {

    componentDidMount() {
        state.init()
    }

    componentWillUnmount() {
        // state.destroy()
    }

    render() {
        const scanner_id = this.props.match.params["scanner_id"]
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
                <p>Scanner {scanner_id}</p>
                {state.sessions ? <p>{state.sessions.items.length}</p> : <p>No Sessions</p>}
                {state.sessions && 
                    <List>
                        {state.sessions.items.map(function(session: Session){
                            return  <ListItem key={session.id}>
                                        <ListItemText primary={session.id} />
                                    </ListItem>
                        })}
                    </List>
                }
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(ScannerPage))
