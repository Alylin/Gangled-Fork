import React from 'react';
import ButtonHelper from './buttonhelper';
import classNames from 'classnames';

function ToggleButton(props) {
    const {
        displayName,
        buttonAction,
        children,
        isCircle,
        onFocus,
        extraClasses
    } = props;

    return (
        <ButtonHelper 
            displayName={displayName} 
            buttonAction={buttonAction}
            isCircle={isCircle}
            extraClasses={classNames("hover:bg-hover", extraClasses)} //whitespace-nowrap
            onFocus={onFocus}>
            {children}
        </ButtonHelper>
    );
}

export default ToggleButton;