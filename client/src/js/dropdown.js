import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

function maybeBlurred(event, clickZone, wrapperRef, setCanDisplay) {
    const clickedOutsideZone = (!clickZone || (clickZone.current && !clickZone.current.contains(event.target)));
    const clickedOutsideWrapper = (!wrapperRef || (wrapperRef.current && !wrapperRef.current.contains(event.target)));
    if (clickedOutsideWrapper && clickedOutsideZone) {
        setCanDisplay(false);
    }
}
export default function Dropdown({clickZone, setCanDisplay, canDisplay, children, extraClasses}) {
    const wrapperRef = useRef();
    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            maybeBlurred(event, clickZone, wrapperRef, setCanDisplay);
        });
        document.addEventListener('focusin', (event) => {
            maybeBlurred(event, clickZone, wrapperRef, setCanDisplay);
        });
        return () => {
            document.removeEventListener('mousedown', (event) => {
                maybeBlurred(event, clickZone, wrapperRef, setCanDisplay);
            });
            document.removeEventListener('focusin', (event) => {
                maybeBlurred(event, clickZone, wrapperRef, setCanDisplay);
            });
        };
    });

    if (canDisplay && children) {
        return (
            <div className={classNames(extraClasses, "absolute right-0 top-full shadow-lg rounded-lg overflow-hidden p-1 z-10 bg-primary")} ref={wrapperRef}>
                {children}
            </div>
        );
    }
    return null;
}