import { Lora } from 'next/font/google';
import { EB_Garamond } from 'next/font/google';

export const lora = Lora({
    weight: '400',
    variable: '--font-lora',
    style: 'normal',
    subsets: ['latin'],
    preload: true,
    display: 'auto',
}
);

export const eb_garamond = EB_Garamond({
    weight: '600', 
    variable: '--font-eb-garamond',
    style: ['normal', 'italic'],
    subsets: ['latin'],
    preload: true,
    display: 'auto',
}
);