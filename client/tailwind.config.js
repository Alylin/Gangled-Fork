const plugin = require('tailwindcss/plugin');
const { join } = require('path');

function withOpacity(variableName) {
    return ({ opacityValue }) => {
        if (opacityValue >= 0) {
            return `rgb(var(${variableName}), ${opacityValue})`;
        }
        return `rgb(var(${variableName}))`;
    };
}

module.exports = {
  content: [
    join(__dirname, '/src/**/*.{js,ts,jsx,tsx,html}')
  ],
  theme: {
    extend: {
        minWidth: {
            '48': '12rem',
        },
        keyframes: {
            expandHorizontalFull: {
                '0%': {
                    width: '0px'
                },
                '100%': {
                    width: '100%'
                }
            },
            collapseHorizontalFull: {
                '0%': {
                    width: '100%'
                },
                '100%': {
                    width: '0px'
                }
            },
            fadeInDown: {
                '0%': {
                    'margin-top': '-10px',
                    opacity: 0
                },
                '100%': {
                    opacity: 1
                }
            }
        },
        animation: {
            expandHorizontalFull: 'expandHorizontalFull 0.25s ease-in-out 1',
            collapseHorizontalFull: 'collapseHorizontalFull 0.25s ease-in-out 1',
            fadeInDown: 'fadeInDown 0.25s ease-in-out 1'
        },
        boxShadow: {
            'indent': 'var(--indent)',
            'indentstronger': 'var(--indentstronger)'
        },
        fontFamily: {
            title: ['archivo', 'sans-serif'],
            content: ['nimbus_sans_l', 'sans-serif'],
            abstract: ['flowcircular', 'sans-serif']
        },
        colors: {
            base: withOpacity('--base'),
            primary: withOpacity('--primary'),
            secondary: withOpacity('--secondary'),
            tertiary: withOpacity('--tertiary'),
            inverted: withOpacity('--inverted')
        },
        fill: {
            primary: withOpacity('--primaryfill'),
            inverted: withOpacity('--invertedfill')
        },
        backgroundColor: {
            primary: withOpacity('--primary'),
            secondary: withOpacity('--secondary'),
            tertiary: withOpacity('--tertiary'),
            hover: withOpacity('--hover')
        },
        textColor: {
            primary: withOpacity('--text'),
            inverted: withOpacity('--invertedtext'),
        },
        borderColor: {
            primary: withOpacity('--primaryborder'),
            secondary: withOpacity('--secondaryborder'),
            bgtertiary: withOpacity('--tertiary'),
            bgprimary: withOpacity('--primary')
        },
        cursor: {
            none: 'none',
            grabbing: 'grabbing',
            grab: 'grab'
        }
    }
  },
  plugins: [
    plugin(({addUtilities}) => {
        addUtilities({
            '.reserveBoldWidth::after': {
                display: 'block',
                content: 'attr(name)',
                'font-weight': 'bold',
                height: '1px',
                color: 'transparent', 
                overflow: 'hidden',
                visibility: 'hidden'
            },
            '.blurThing' : {
                'backdrop-filter': 'blur(10px)',
                '-webkit-backdrop-filter': 'blur(10px)'
            },
            
           '.hideScrollBar::-webkit-scrollbar': {
                display:'none'
            },
            '.hideScrollBar': {
                /* Hide scrollbar for IE, Edge and Firefox */
                '-ms-overflow-style': 'none',  /* IE and Edge */
                'scrollbar-width': 'none'  /* Firefox */
            },
            '.dynamicFontSize': {
                'font-size': '4vw',
                'line-height': 1
            }
        })
    }),
    require('@tailwindcss/line-clamp')
  ]
}
