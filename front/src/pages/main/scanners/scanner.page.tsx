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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
                    <TableContainer>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Spider</TableCell>
                                <TableCell>Started</TableCell>
                                <TableCell>Finished</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {state.sessions.items.map((row: Session) => (
                                <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.spider_id}</TableCell>
                                <TableCell>{row.started}</TableCell>
                                <TableCell>{row.finished}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(ScannerPage))
