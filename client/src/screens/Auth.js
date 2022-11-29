import React, { useContext, useState } from 'react'
import "./Auth.css";
import LoginForm from '../components/Auth/LoginForm'
import SignupForm from '../components/Auth/SignupForm'
import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import { UIContext } from '../App'

const Auth = () => {
  const [toggleLoginForm, setToggleLoginForm] = useState(true)
  const { uiState } = useContext(UIContext)
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/bkuzulogo.png" alt="" class="responsive"/>
        
      </div>
      <div className="login_2">
      
      <Container>
      <span>Login</span>

        <Grid container spacing={3} style={{ marginTop: '20px' }}>
  
          <Grid item xs={12} sm={6} md={10}>
            <Paper
              elevation={8}
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {toggleLoginForm ? <LoginForm /> : <SignupForm />}

              <Divider />
              <Button
                onClick={() => setToggleLoginForm(!toggleLoginForm)}
                style={{
                  marginTop: '24px',
                  background: 'rgb(74,183,43)',
                  color: '#fff',
                }}
              >
                {toggleLoginForm
                  ? 'Create New Account'
                  : ' Already have an Account'}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      </div>
    </div>
  )
}

export default Auth
