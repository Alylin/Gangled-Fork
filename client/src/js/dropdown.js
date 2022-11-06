import React from 'react';
import classNames from 'classnames';
import { Component } from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.maybeBlurred.bind(this));
        document.addEventListener('focusin', this.maybeBlurred.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.maybeBlurred.bind(this));
        document.addEventListener('focusin', this.maybeBlurred.bind(this));
    }

    maybeBlurred(event) {
        const clickZone = this.props.clickZone;
        const clickedOutsideZone = (!clickZone || (clickZone.current && !clickZone.current.contains(event.target)));
        const clickedOutsideWrapper = (!this.wrapperRef || (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)));
        if (clickedOutsideWrapper && clickedOutsideZone) {
            this.props.setCanDisplay(false);
        }
    }

    render() {
        const {
            canDisplay, extraClasses, children
        } = this.props;
        
        if (canDisplay && children) {
            return (
                <div className={classNames(extraClasses, "absolute right-0 top-full shadow-lg rounded-lg overflow-hidden p-1 z-10 bg-primary")} ref={this.wrapperRef}>
                    {children}
                </div>
            );
        }
        return null;
    }
}



export default Dropdown;

        
