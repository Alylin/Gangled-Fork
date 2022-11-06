import Button from './button';
import {MenuIcon} from  './icons';
import React, {Fragment, useEffect, useState, createRef} from 'react';
import Dropdown from './dropdown';
import classNames from 'classnames';

function ButtonBar(props) {
    const {
        isSticky,
        isGlassy,
        children
    } = props;
    return (
        <div className={classNames('p-2 flex justify-between from-base bg-gradient-to-b', isSticky && 'sticky top-0 z-40 ', isGlassy ? 'blurThing': 'bg-primary')}> 
            {children}
        </div>
    );
}

export function ButtonsLeft(props) {
    const {
        children
    } = props;
    return (
        <span className="w-2/12">
            {children}
        </span>
    )
}

export function ButtonsMiddle(props) {
    const {
        children
    } = props;
    return (
        <span className="flex flex-1 min-w-0">
            <span className="flex-1" />
                {children}
            <span className="flex-1" />
        </span>
    )
}

export function ButtonsRight(props) {
    const {
        children
    } = props;
    return (
        <span className="flex w-2/12">
            <span className="flex-1" />
            {children}
        </span>
    )
}

export function ButtonsCollapsing({
    buttons, 
    displayName,
    currentPage,
    collapseWidth = 1200
    }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const buttonRef = createRef();//test108 maybe this just needs to always be around? 

    useEffect(() => {
        function onResize() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, []);

    useEffect(() => {
        setIsDropdownVisible(false);
    }, [currentPage]);

    const test = () => {
        if (windowWidth > collapseWidth) {
            return (
                <Fragment>
                    {buttons.expanded}
                </Fragment>
            )
        }
        else {
            return (
                <span className="relative">
                    <Button displayName={displayName} isCircle={true} buttonAction={() => {
                        setIsDropdownVisible(true);
                    }} onFocus={() => {
                        setIsDropdownVisible(true);
                    }}>
                        <MenuIcon />
                    </Button>
                    <Dropdown extraClasses="flex flex-col right-1 mt-3" clickZone={buttonRef} canDisplay={isDropdownVisible} setCanDisplay={(isVisible) => {
                        setIsDropdownVisible(isVisible);
                    }}>
                        {buttons.collapsed}
                    </Dropdown>
                </span>
            )
        }
    };

    return (
        <span ref={buttonRef}>
            {
                test()
            }
        </span>
    )
}

export default ButtonBar;
