import React, {Component} from 'react';
import classNames from 'classnames';
import ButtonHelper from './buttonhelper';

class ToggleButton extends Component {
    render() {
        const {
            displayName,
            buttonAction,
            isCircle,
            isOn,
            children,
            extraClasses
        } = this.props;

        return (
            <ButtonHelper displayName={displayName} 
                buttonAction={() => {
                    buttonAction(!isOn);
                }}
                isCircle={isCircle}
                extraClasses={classNames(isOn ? 'shadow-indent bg-base' : 'hover:bg-hover', extraClasses)}>
                {children}
            </ButtonHelper>
        );
    }
}

export default ToggleButton;