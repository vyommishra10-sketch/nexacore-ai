import { createContext, useContext } from 'react'

const ThemeContext = createContext({
  colors: {
    bgDeep:      '#060B14',
    bgCard:      '#0D1A2A',
    bgPanel:     '#0F2040',
    cyan:        '#00D4FF',
    purple:      '#7B2FBE',
    teal:        '#00D4AA',
    textPrimary: '#E2EEFF',
    textMuted:   '#7B9EC7',
  },
})

export const useTheme = () => useContext(ThemeContext)

export default ThemeContext