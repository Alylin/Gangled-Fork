import React from 'react';
import SearchBar from './searchbar';
import ButtonBar, {ButtonsLeft, ButtonsMiddle, ButtonsRight, ButtonsCollapsing} from './buttonbar';
import {CompanyIcon, ProfileIcon, SettingsIcon} from  './icons';
import messages from './messages';
import { Link } from "react-router-dom";
import classNames from 'classnames';
import { useLocation } from 'react-router-dom'

function StyledLink(props) {
    const {
        displayName,
        extraClasses,
        children,
        url
    } = props;

    return (
        <Link 
            className={classNames('inline-block relative max-w-sm cursor-pointer select-none font-semibold font-title rounded-full h-10 w-10 px-1 pb-0.5', extraClasses)} 
            title={displayName} 
            tabIndex={0}
            to={url}
            name={displayName}
        >
            <span className={classNames('inline-block align-middle overflow-hidden overflow-ellipsis m-auto')}>
                {children}
            </span>
        </Link>
    );
}


const TopBar = ({ isGlassy }) => {
    const location = useLocation();
    return (
        <ButtonBar isGlassy={isGlassy} isSticky={true}>
            <ButtonsLeft>
                <StyledLink 
                    displayName={messages.home()} 
                    isCircle={true} 
                    extraClasses="hover:bg-hover/70 mx-2"
                    url="/"
                >
                    <CompanyIcon />
                </StyledLink>
            </ButtonsLeft>
            <ButtonsMiddle>
                <SearchBar />
            </ButtonsMiddle>
            <ButtonsRight>
                <StyledLink 
                    displayName={messages.settings()} // test108 this fucking sucks and won't position icons right
                    isCircle={true} 
                    extraClasses={`hover:bg-hover/70 mx-2 ${location.pathname === '/settings' && 'shadow-indent bg-base'}`}
                    url="/settings"
                >
                    <span className="absolute left-2 top-2">
                        <SettingsIcon />
                    </span>
                </StyledLink>
                <StyledLink 
                    displayName={messages.profile()} 
                    isCircle={true} 
                    extraClasses={`hover:bg-hover/70 mx-2 ${location.pathname === '/profile' && 'shadow-indent bg-base'}`}
                    url="/profile"
                >
                    <span className="absolute left-2 top-2">
                        <ProfileIcon />
                    </span>
                </StyledLink>
            </ButtonsRight>
        </ButtonBar>
    );
};

export default TopBar;