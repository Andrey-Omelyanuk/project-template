import React from 'react'
import { RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles';
import LoginForm from 'src/components/auth/login.form';

const styles = (theme) => ({
    root: {
    }
});


@observer
class LoginPage extends React.Component<RouteComponentProps> {
  render() {
    const { classes } = this.props;
    return (
      <LoginForm></LoginForm>
    )
  }
}

export default withStyles(styles)(LoginPage)
