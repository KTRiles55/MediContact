const MainTheme = {
    fonts: {
        eb_garamond = EB_Garamond({
        weight: '600', 
        variable: '--font-eb-garamond',
        style: 'italic',
        subsets: ['latin'],
        preload: true,
        display: 'auto',
    },
    ),
        lora = Lora({
        weight: '400',
        variable: '--font-lora',
        style: 'normal',
        subsets: ['latin'],
        preload: true,
        display: 'auto',
    }
    )
}
};

export default MainTheme;