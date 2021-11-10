
export const light = {
    background: '#EBF4F8',
    titles: '#2C2738',
    text: '#2C2738',
    accentText: '#FFFFFF',
    accent: '#1a237e',
}

export const dark = {
    background: '#1C2025',
    titles: '#D6E1DF',
    text: '#D6E1DF',
    accentText: '#FFFFFF',
    accent: '#1a237e',
}


const themes = {
    light,
    dark,
}

export default function getTheme(theme) {
    return themes[theme]
}