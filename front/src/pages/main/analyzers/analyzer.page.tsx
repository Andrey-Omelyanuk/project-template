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
import { Analyzer, AnalyzerSession } from 'src/models/tags'


const styles = (theme) => ({
});

@observer
class AnalyzerPage extends React.Component<RouteComponentProps> {

    render() {
        const analyzer_id = parseInt(this.props.match.params["analyzer_id"])
        const { classes } = this.props;
        const { path, url } = this.props.match;
        const state = this.props.state

        let analyzer: Analyzer 
        for(let s of state.analyzers.items) {
            if (s.id === analyzer_id) {
                analyzer = s 
                break
            }
        }
        return (
            <React.Fragment>
                {/* {state.sessions ? <p>{state.sessions.items.length}</p> : <p>No Sessions</p>} */}
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            {/* <TableCell>Analyzer</TableCell> */}
                            <TableCell>Started</TableCell>
                            <TableCell>Finished</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {analyzer.sessions.map((row: Session) => (
                            <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            {/* <TableCell>{row.analyzer_id}</TableCell> */}
                            <TableCell>{row.started}</TableCell>
                            <TableCell>{row.finished}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(AnalyzerPage))
