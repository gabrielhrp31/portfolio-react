
export const colorScheme = {
    green: '#16c426',
    softGreen:'#48c558',
    gray:'#3C3C3B',
    offWhite:'#EBF4F8',
}


export const light = {
    dark: false,
    background:colorScheme.offWhite ,
    titles: colorScheme.gray,
    text: colorScheme.gray,
    textAccent:colorScheme.gray,
    inverse:colorScheme.gray ,
    accent:colorScheme.green,
    softAccent: colorScheme.softGreen,
}

export const dark = {
    dark: true,
    background:colorScheme.gray,
    titles: colorScheme.offWhite ,
    text: colorScheme.offWhite ,
    inverse: colorScheme.offWhite ,
    textAccent: colorScheme.gray,
    accent:colorScheme.green,
    softAccent: colorScheme.softGreen,
}


const themes = {
    light,
    dark,
}

export default function getTheme(theme) {
    return themes[theme]
}
