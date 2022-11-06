import { SystemThemeIcon, LightThemeIcon, DarkThemeIcon, HighContrastThemeIcon, DebugThemeIcon } from '../icons';
import messages from '../messages';

const isDarkTheme = () => 
    window.matchMedia("(prefers-color-scheme: dark)").matches;

//All themes near to have a corresponding entry in index.css
const themes = {
    system: {
        getThemeClass: () => {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                return themes.dark.getThemeClass();
            }
            return themes.light.getThemeClass();
        },
        displayName: messages.system(),
        isAccessibilityTheme: false,
        isDeveloperTheme: false,
        icon: <SystemThemeIcon />,
        id: "system"
    },
    dark: {
        getThemeClass: () => 'theme-dark',
        displayName: messages.dark(),
        isAccessibilityTheme: false,
        isDeveloperTheme: false,
        icon: <DarkThemeIcon />,
        id: "dark"
    },
    light: {
        getThemeClass: () => 'theme-light',
        displayName: messages.light(),
        isAccessibilityTheme: false,
        isDeveloperTheme: false,
        icon: <LightThemeIcon />,
        id: "light"
    },
    highcontrast: {
        getThemeClass: () => 'theme-highcontrast',
        displayName: messages.highContrast(),
        isAccessibilityTheme: true,
        isDeveloperTheme: false,
        icon: <HighContrastThemeIcon />,
        id: "contrast"
    },
    outline: {
        getThemeClass: () => 'theme-outline',
        displayName: messages.debug(),
        isAccessibilityTheme: false,
        isDeveloperTheme: true,
        icon: <DebugThemeIcon />,
        id: "outline"
    }
}

const getTheme = () => {
    const id = localStorage.getItem('theme-id') || 'system';
    return themes[id];
}

const setTheme = (newThemeId) => {
    localStorage.setItem('theme-id', newThemeId);
    document.documentElement.setAttribute('data-theme', themes[newThemeId].getThemeClass())
}

export default isDarkTheme;

export { getTheme, setTheme, themes }