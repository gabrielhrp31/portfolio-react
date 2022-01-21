export const light = {
    dark: false,
    background: '#EBF4F8',
    titles: '#000000',
    text: '#000000',
    textAccent: '#EBF4F8',
    inverse: '#3C3C3B',
    accent: '#16c426',
    softAccent: '#48c558',
}

export const dark = {
    dark: true,
    background: '#3C3C3B',
    titles: '#f2f2f2',
    text: '#f2f2f2',
    inverse: '#EBF4F8',
    textAccent: '#3C3C3B',
    accent: '#16c426',
    softAccent: '#48c558',
}


const themes = {
    light,
    dark,
}

export default function getTheme(theme) {
    return themes[theme]
}
