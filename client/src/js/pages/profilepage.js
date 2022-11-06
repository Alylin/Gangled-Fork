import {exampleTextExtraLarge} from '../placeholdertext';
import Button from '../button';
import { useRef } from 'react';
import { Fragment } from 'react';
import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import ThemePicker from '../themepicker';
import messages from '../messages';

const collapseWidth = 1200;

function ProfilePage() {
    const personalInfo = useRef();
    const notifications = useRef();
    const security = useRef();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function onResize() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, []);    

    const defaultAreas = [
        {
            displayName: messages.personalInformation(),
            ref: personalInfo,
            content: (
                <>
                    <ThemePicker/>
                </>
            )
        },
        {
            displayName: messages.notifications(),
            ref: notifications,
            content: <div className="mx-6">{exampleTextExtraLarge}</div>
        },
        {
            displayName: messages.security(),
            ref: security,
            content: <div className="mx-6">{exampleTextExtraLarge}</div>
        }
    ]

    const [areas, setAreas] = useState(defaultAreas);

    useEffect(() => {
        const onScroll = () => {
            let highlightedSection = false;
            const newAreas = areas.map((area) => {
                if (area.ref.current && !highlightedSection) {
                    const rect = area.ref.current.getBoundingClientRect();
                    highlightedSection = rect.bottom >= 50;
                    area.isHighlighted = highlightedSection;
                    return area;
                }
                area.isHighlighted = false; // test108 the 50 isn't quite right, needs to change based on stuff. 
                return area;
            });
            setAreas(newAreas);
        };
        onScroll();

        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);


    const expanded = windowWidth > collapseWidth

    return (
        <div className={classNames("flex", !expanded && 'flex-col')}>
            {expanded && 
                <div className="font-semibold sticky top-14 h-40 z-10">
                    {areas.map((area) => {
                        return (
                            <div>
                                <Button 
                                    extraClasses={classNames('reserveBoldWidth px-3 h-12', area.isHighlighted && 'font-bold')}
                                    displayName={area.displayName}
                                    buttonAction={() => {
                                        window.scrollTo({top: area.ref.current.offsetTop-98, behavior: 'smooth'});
                                    }}
                                >
                                    {area.displayName}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            }
            {!expanded && 
                <div className="sticky top-14 px-1 bg-primary overflow-auto whitespace-nowrap">
                    {areas.map((area) => {
                        return (
                            <span className="h-full inline-block">
                                <Button 
                                    extraClasses={classNames('reserveBoldWidth px-3 mx-2 my-1', area.isHighlighted && 'font-bold')}
                                    displayName={area.displayName} 
                                    buttonAction={() => {
                                        window.scrollTo({top: area.ref.current.offsetTop-150, behavior: 'smooth'});
                                    }}>
                                    {area.displayName}
                                </Button>
                            </span>
                        );
                    })}
                    <span className="border-b-2 absolute bottom-0 w-full left-0 border-secondary" />
                </div>
            }
            <div className="flex-1">
                <span className="inline-block">
                    {areas.map((area, index) => {
                        return (
                            <Fragment>
                                <div className={classNames("font-title font-semibold sticky border-b-2 h-full px-6 py-3 border-primary bg-primary z-10", expanded ? 'top-14' : 'top-[104px]')}>
                                    {area.displayName}
                                </div>
                                <div ref={area.ref} className={classNames('py-3 overscroll-auto last:min-h-screen', (index === areas.length - 1) && 'min-h-screen')}>
                                    {area.content}
                                </div>
                            </Fragment>
                        );
                    })}
                </span>
            </div>
        </div>
    );
}

export default ProfilePage;