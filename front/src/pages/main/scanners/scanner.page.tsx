import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'
import { Query } from 'mobx-orm'
import { Session, Spider } from 'src/models/spiders'
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


const styles = (theme) => ({
});

@observer
class ScannerPage extends React.Component<RouteComponentProps> {

    render() {
        const scanner_id = parseInt(this.props.match.params["scanner_id"])
        const { classes } = this.props;
        const { path, url } = this.props.match;
        const state = this.props.state

        let spider: Spider
        for(let s of state.spiders.items) {
            if (s.id === scanner_id) {
                spider = s 
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
                            {/* <TableCell>Spider</TableCell> */}
                            <TableCell>Started</TableCell>
                            <TableCell>Finished</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {spider.sessions.map((row: Session) => (
                            <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            {/* <TableCell>{row.spider_id}</TableCell> */}
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

export default withStyles(styles)(withRouter(ScannerPage))
