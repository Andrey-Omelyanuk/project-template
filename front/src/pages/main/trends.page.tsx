import React from 'react'
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'


const styles = (theme) => ({
});


@observer
class TrendsPage extends React.Component<RouteComponentProps> {
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <h3>Trends</h3>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(TrendsPage))
