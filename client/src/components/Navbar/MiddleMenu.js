import React, { Fragment, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { UIContext } from '../../App'


import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import useStyles from './styles'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotificationMenu from '../NotificationMenu'
import { Home, HomeOutlined, Person, PersonOutlined,  } from '@material-ui/icons'
import {
  IconButton,
  Badge,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'

function MiddleMenu() {
  const classes = useStyles()
  const location = useLocation()
  
  const { uiState } = useContext(UIContext)
  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))

  
  const defaultPropsNotif = {
    color: 'error',
    children: <FontAwesomeIcon icon={faBell} size={xsScreen ? 'xs' : 'sm' } />,
  }

  return (
    <Fragment>
      <Button
        component={NavLink}
        activeClassName={classes.activeBtn}
        to="/home"
        style={{
          marginLeft: xsScreen ? '12px' : '80px',
          color: !uiState.darkMode ? 'black' : null,
          backgroundColor: !uiState.darkMode ? '#F0F2F5' : null,
        }}
        className={classes.buttonItemMiddle}
      >
        {location.pathname == '/home' ? (
          <Home
            fontSize="large"
            style={{
              color: 'rgb(0,133,243)',
            }}
          />
        ) : (
          <HomeOutlined fontSize="large" />
        )}
      </Button>
      <Button
        component={NavLink}
        activeClassName={classes.activeBtn}
        to="/friends"
        style={{
          marginLeft: xsScreen ? '12px' : '80px',
          color: !uiState.darkMode ? 'black' : null,
          backgroundColor: !uiState.darkMode ? '#F0F2F5' : null,
        }}
        className={classes.buttonItemMiddle}
      >
        {location.pathname == '/friends' ? (
          <Person fontSize="large" style={{ color: 'rgb(0,133,243)' }} />
        ) : (
          <PersonOutlined fontSize="large" />
        )}
      </Button>
      <IconButton
        component={NavLink}
        activeStyle={{ color: 'rgb(1,133,243)' }}
        to="/messenger"
        style={{
          marginLeft: xsScreen ? '12px' : '80px',
          marginRight: xsScreen ? '12px' : '80px',
          color: !uiState.darkMode ? 'black' : null,
          backgroundColor: !uiState.darkMode ? '#F0F2F5' : null,
        }}
      >
        <FontAwesomeIcon
          icon={faFacebookMessenger}
          size={xsScreen ? 'xs' : 'sm'}
        />
      </IconButton>
      <NotificationMenu>
        <Badge overlap="rectangular"
          max={5}
          badgeContent={uiState.notifications.length || '0'}
          {...defaultPropsNotif}
        />
       
      </NotificationMenu>

    </Fragment>
  )
}

export default MiddleMenu
