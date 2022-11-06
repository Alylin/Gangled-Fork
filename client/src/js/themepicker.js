import { setTheme, getTheme, themes } from './utilities/theme';
import { MoreThemeIcon } from './icons';
import classNames from 'classnames';
import { useState } from 'react';
import messages from './messages';

function ThemeOption(props) {
    return (
        <button 
            className="cursor-pointer rounded-lg group"
            tabIndex={0}
        >
            <div 
                className="w-14 h-20 p-1"
                onClick={props.onClick}
            >
                <div className="flex flex-col items-center">
                    <span className={classNames("mb-2 rounded-full", props.isSelected && 'shadow-indentstronger')}>
                        {props.icon}
                    </span>
                    <div title={props.displayName} className="overflow-hidden text-xs w-full text-center overflow-ellipsis line-clamp-2 text-primary relative opacity-0 transition-opacity group-hover:opacity-100 group-hover:animate-fadeInDown group-focus-visible:opacity-100 group-focus-visible:animate-fadeInDown">
                        {props.displayName}
                    </div>
                </div>
            </div>
        </button>
    );
}

function ThemePicker() {
    const [themeId, setThemeId] = useState(getTheme().id);
    return (
        <div>
            <h2 className="px-6 pb-1 font-bold font-title">
                {messages.themes()}
            </h2>
            <div className="flex flex-wrap py-2 mx-6">
                {
                    Object.keys(themes).map((key) => {
                        const theme = themes[key];
                        return (
                            <ThemeOption 
                                isSelected={theme.id === themeId}
                                displayName={theme.displayName} 
                                icon={theme.icon} 
                                onClick={() => {
                                    setThemeId(themes[key].id)
                                    setTheme(key);
                                }}
                            />
                        );
                    })
                }
                <ThemeOption displayName={'More'} icon={<MoreThemeIcon />} onClick={() => {
                    alert('Community themes are not yet supported.')
                }}/>
            </div>
        </div>
    );
}

export default ThemePicker;