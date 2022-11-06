import React from 'react';
import classNames from 'classnames';

function ButtonHelper(props) {
    const {
        displayName,
        buttonAction,
        extraClasses,
        children,
        isCircle,
        onFocus
    } = props;

    return (
        <button 
            className={classNames('inline-block max-w-sm cursor-pointer select-none font-semibold font-title', isCircle ? 'rounded-full h-10 w-10 px-1 pb-0.5' : 'rounded-lg h-10', extraClasses)} 
            title={displayName} 
            tabIndex={0}
            onClick={buttonAction}
            onFocus={onFocus}
            name={displayName}
        >
            <span className={classNames('inline-block align-middle overflow-hidden overflow-ellipsis max-h-full', isCircle ? 'max-w-full' : 'w-full line-clamp-1')}>
                {children}
            </span>
        </button>
    );
}


export default ButtonHelper;