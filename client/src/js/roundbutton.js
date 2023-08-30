import classNames from "classnames";

export default function RoundButton(props) {
    const {
        displayName,
        extraClasses,
        children,
        isToggledOn,
        onClick
    } = props;

    return (
        <button 
            className={classNames('hover:bg-hover/70 inline-block relative max-w-sm cursor-pointer select-none font-semibold font-title rounded-full h-10 w-10 px-1 pb-0.5', isToggledOn && 'shadow-indentstronger bg-base', extraClasses)} 
            title={displayName} 
            tabIndex={0}
            onClick={onClick}
            name={displayName}
        >
            <span className={classNames('inline-block align-middle overflow-hidden overflow-ellipsis m-auto')}>
                {children}
            </span>
        </button>
    );
}