import classNames from "classnames";
import { MdUpcoming, MdDashboard, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdFullscreen, MdFullscreenExit, MdHelpOutline } from 'react-icons/md';

export function CompanyIcon() {
    return (
        <span className="inline-block h-8 w-8 mt-1" style={{
            background: 'center / contain no-repeat url(../icon.svg)'
        }}>
        </span>
    )
}
 //test108 pointer is wrong
export function CloseIcon(props) {
    return (
        <svg className="w-6 h-6 fill-primary cursor-pointer">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
    );
}

export function SearchIcon(props) {
    return (
        <svg className="w-6 h-6 fill-primary">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
    );
}

export function MenuIcon(props) {
    return (
        <svg className="w-6 h-6 fill-primary">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
    );
}

export function ProfileIcon(props) {
    return (
        <svg className="w-6 h-6 fill-primary">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/>
        </svg>
    );
}

export function SettingsIcon(props) {
    return (
        <svg className="w-6 h-6 fill-primary">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
    );
}

export function DebugThemeIcon(props) {
    return (
        <svg className={classNames('w-8 h-8 fill-primary', props.extraClasses)} viewBox="0 0 880.17 880.17">
            <path d="M751.27,128.9C579.41-43,300.76-43,128.9,128.9S-43,579.41,128.9,751.27s450.51,171.86,622.37,0S923.13,300.76,751.27,128.9Zm.46,487.52a40.23,40.23,0,0,1-48.24,30.33l-81.94-18.67a169.08,169.08,0,0,1-150,91H422.16a169.09,169.09,0,0,1-150.92-92.79l-95,20.59a40.29,40.29,0,1,1-17.07-78.76L253,547.74V515.66h-85.3a40.3,40.3,0,0,1,0-80.6H253V403l-93.83-20.35a40.29,40.29,0,1,1,17.07-78.76l88.91,19.28a169.75,169.75,0,0,1,61.45-76.61L304.72,201a40.29,40.29,0,0,1,72.64-34.9l25,52.1A169.81,169.81,0,0,1,422.16,217h49.42a169.64,169.64,0,0,1,19.76,1.19l25-52.1A40.3,40.3,0,0,1,589,201l-21.91,45.59a169.67,169.67,0,0,1,60.69,74.67L703.49,304a40.29,40.29,0,0,1,17.91,78.57l-80.68,18.39v34.13h71.72a40.3,40.3,0,0,1,0,80.6H640.72v34.13l80.68,18.38A40.31,40.31,0,0,1,751.73,616.42Z"/>
        </svg>
    );
}

export function SystemThemeIcon(props) {
    return (
        <svg className={classNames('w-8 h-8 fill-primary', props.extraClasses)}  viewBox="0 0 880.17 880.17">
            <path d="M440.08,0C197,0,0,197,0,440.08S197,880.17,440.08,880.17s440.09-197,440.09-440.09S683.13,0,440.08,0ZM708.87,628.73H498.64v48.66h48.91c5.74,0,10.39,7,10.39,15.54v16.42c0,8.59-4.65,15.55-10.39,15.55H332.76c-5.74,0-10.4-7-10.4-15.55V692.93c0-8.58,4.66-15.54,10.4-15.54h48.77V628.73H171.29a49.83,49.83,0,0,1-49.84-49.83V271.15a49.86,49.86,0,0,1,49.84-49.87H708.87a49.86,49.86,0,0,1,49.84,49.87V578.9A49.83,49.83,0,0,1,708.87,628.73Z"/>
         </svg>
    );
}

export function DarkThemeIcon(props) {
    return (
        <svg className={classNames('w-8 h-8 fill-primary', props.extraClasses)} viewBox="0 0 880.17 880.17">
            <path d="M440.08,0C197,0,0,197,0,440.08S197,880.16,440.08,880.16s440.08-197,440.08-440.08S683.11,0,440.08,0ZM627.63,627.63c-112,112-293.48,112-405.45,0a286,286,0,0,1-53.62-74.29c107.38,53.81,241.51,35.91,331.1-53.68s107.49-223.72,53.69-331.14a286.07,286.07,0,0,1,74.28,53.65C739.6,334.15,739.6,515.65,627.63,627.63Z"/>
        </svg>
    );
}

export function LightThemeIcon(props) {
    return (
        <svg className={classNames('w-8 h-8 fill-primary', props.extraClasses)} viewBox="0 0 880.17 880.17">
            <path d="M751.27,128.9C579.41-43,300.76-43,128.9,128.9S-43,579.41,128.9,751.27s450.51,171.86,622.37,0S923.13,300.76,751.27,128.9ZM643.54,521.77,662,655.71,528,637.29,446.33,745,364.64,637.29,230.7,655.71l18.42-133.94L141.38,440.08,249.12,358.4,230.7,224.46l133.94,18.41,81.69-107.73L528,242.87,662,224.46,643.54,358.4l107.73,81.68Z"/>
        </svg>
    );
}

export function HighContrastThemeIcon(props) {
    return ( // test108 use tailwind fill stuffs dummy
        <svg className={classNames('w-8 h-8 fill-primary', props.extraClasses)} viewBox="0 0 880.17 880.17">
            <path d="M128.9,128.9C-43,300.76-43,579.41,128.9,751.27s450.51,171.86,622.37,0,171.86-450.51,0-622.37S300.76-43,128.9,128.9Zm71.22,551.15c-132.53-132.53-132.53-347.4,0-479.93s347.4-132.53,479.93,0Z"/>
        </svg>
    );
}

export function MoreThemeIcon(props) {
    return (
        <svg className={classNames('w-8 h-8 fill-primary', props.extraClasses)} viewBox="0 0 880.17 880.17">
            <path d="M751.27,128.88C579.43-43,300.76-43,128.92,128.88s-171.89,450.52,0,622.4,450.51,171.84,622.35,0S923.16,300.77,751.27,128.88ZM689,491.09a10.78,10.78,0,0,1-10.78,10.78H501.88V678.23A10.77,10.77,0,0,1,491.11,689h-102a10.77,10.77,0,0,1-10.77-10.77V501.87H201.94a10.78,10.78,0,0,1-10.77-10.78v-102a10.77,10.77,0,0,1,10.77-10.77H378.31V201.93a10.77,10.77,0,0,1,10.77-10.77h102a10.77,10.77,0,0,1,10.77,10.77V378.3H678.24A10.78,10.78,0,0,1,689,389.07Z"/>
        </svg>
    );
}

export function DashboardIcon(props) {
    return (
        <MdDashboard className="w-8 h-8 fill-primary" />
    );
}

export function ToDoIcon(props) {
    return (
        <MdUpcoming className="w-8 h-8 fill-primary" />
    );
}

export function LeftArrowIcon(props) {
    return (
        <MdKeyboardArrowLeft className="w-8 h-8 fill-primary" />
    );
}

export function RightArrowIcon(props) {
    return (
        <MdKeyboardArrowRight className="w-8 h-8 fill-primary" />
    );
}

export function FullScreenIcon(props) {
    return (
        <MdFullscreen className="w-6 h-6 fill-primary" />
    );
}

export function FullScreenExitIcon(props) {
    return (
        <MdFullscreenExit className="w-6 h-6 fill-primary" />
    );
}

export function HelpIcon(props) {
    return (
        <MdHelpOutline className="w-8 h-8 fill-primary" />
    );
}