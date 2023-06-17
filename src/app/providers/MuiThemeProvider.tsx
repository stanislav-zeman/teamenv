'use client'

import React, { FC, ReactNode, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme()

const MuiThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MuiThemeProvider
