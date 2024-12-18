import { createContext, useState } from 'react'

export enum Theme {
    LIGHT   = 'light', 
    DARK    = 'dark'
}

export const ThemeContext = createContext(null)

export const useTheme = () => {
    const [theme, _setTheme] = useState(() => {
        const localTheme = localStorage.getItem('theme')
        return Theme[localTheme] in Theme
            ? localTheme 
            : Theme.LIGHT 
    })
    const setTheme = (theme: Theme) => {
        _setTheme(theme)
        localStorage.setItem('theme', theme)
    }
    return [theme, setTheme]
}
