'use client'

import React, {FC, ReactNode} from 'react'
import {createTheme, ThemeProvider} from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#041F1E',
    },
    secondary: {
      main: '#F1AB86',
    },
  },
})

const MuiThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MuiThemeProvider
