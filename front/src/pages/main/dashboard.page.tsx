import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { observer, useLocalObservable } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { observable } from 'mobx'


const styles = (theme) => ({
});

type DashboardState = {
    is_ready: boolean
}

@observer
class DashboardPage extends React.Component<RouteComponentProps, DashboardState> {

    constructor(props) {
        super(props)
        this.state = {
            is_ready: false
        }
        setTimeout(() => {
            this.setState({ is_ready: true  })
        }, 2000)
    }
    render() {
        const { classes } = this.props;
    
        if (!this.state.is_ready) {
            return (
                <React.Fragment>
                    <CircularProgress color="secondary" />
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <h3>Dashboard</h3>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(DashboardPage))
