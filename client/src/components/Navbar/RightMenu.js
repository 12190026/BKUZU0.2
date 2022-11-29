import React, { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UIContext, UserContext } from '../../App'

import {
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import useStyles from './styles'

import { faBell } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfileMenu from './ProfileMenu'
function RightMenu() {
  const classes = useStyles()
  const { uiState } = useContext(UIContext)
  const { userState } = useContext(UserContext)
  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))

  const defaultPropsNotif = {
    color: 'error',
    children: <FontAwesomeIcon icon={faBell} size={xsScreen ? 'xs' : 'sm'} />,
  }

  return (
    <Fragment>

      
      <ProfileMenu />
    </Fragment>
  )
}

export default RightMenu
