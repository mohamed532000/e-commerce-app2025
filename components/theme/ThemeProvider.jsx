"use client=/"
import React from 'react'
import {ThemeProvider} from "next-themes"
function AppThemeProvider({children}) {
  return (
    <ThemeProvider attribute={"class"} defaultTheme='system' enableSystem>
        {children}
    </ThemeProvider>
  )
}

export default AppThemeProvider