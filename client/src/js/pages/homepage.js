import SearchableList from '../searchablelist';
import { ToDoIcon, DashboardIcon, CloseIcon, RightArrowIcon, FullScreenIcon, FullScreenExitIcon, HelpIcon, ComingSoonIcon } from '../icons';
import { useState } from 'react';
import classNames from 'classnames';
import messages from '../messages';

// test108 make it stay expanded when you make selection
const sections = {
    dashboard: {
        id: 'dashboard',
        Content: ({ onCollapse, onExpand, isExpanded }) => (
            <div className={classNames("lg:max-h-full overflow-y-auto", !isExpanded && 'max-h-[500px]')}>
                <div className="font-title pl-1 w-full pb-2 flex relative border-b-2 border-secondary">
                    <span className="flex-1"/>
                    <button 
                        className="cursor-pointer mr-2"
                        onClick={onExpand}
                        title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? <FullScreenExitIcon /> : <FullScreenIcon />}
                    </button>
                    <button 
                        className="cursor-pointer"
                        onClick={onCollapse}
                        title="Close"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="my-4">
                    <SearchableList displayName={messages.favourites()} />
                </div>
            </div>
        )
    },
    toDo: {
        id: 'todo',
        Content: ({ onCollapse, onExpand, isExpanded }) => (
            <div className={classNames("lg:max-h-full overflow-y-auto", !isExpanded && 'max-h-[500px]')}>
                <div className="font-title pl-1 w-full pb-2 flex relative border-b-2 border-secondary">
                    <span className="flex-1"/>
                    <button 
                        className="cursor-pointer mr-2"
                        onClick={onExpand}
                        title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? <FullScreenExitIcon /> : <FullScreenIcon />}
                    </button>
                    <button 
                        className="cursor-pointer"
                        onClick={onCollapse}
                        title="Close"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="my-4">
                    <SearchableList displayName={messages.new()} />
                </div>
                <div className="my-4">
                    <SearchableList displayName={messages.discover()} />
                </div>
            </div>
        )
    }
}

function ButtonThingy({ onClick, isSelected, title, children }) {
    return (
        <button 
            className={classNames('hover:bg-hover/70 m-0.5 cursor-pointer w-10 h-10 rounded-sm items-center justify-center flex', isSelected && 'bg-tertiary')}
            onClick={onClick}
            title={title}
        >
            {children}
        </button>
    );
}

function HomePage() {
    const [isVisible, setIsVisible] = useState(true);
    const [currentSection, setCurrentSection] = useState(sections.dashboard);
    const [isFullscreen, setIsFullscreen] = useState(false);
    return ( // test108 h-full not working, probably due to flex
        <div className={classNames('flex flex-1 flex-row relative h-full', isFullscreen && 'w-full')}>
            <div className={classNames("transition-all top-0 border-transparent py-3 border-r-[10px] flex-shrink-0 group w-0 hover:w-12 h-full absolute z-50", isVisible && "mr-3")}>
                <div className="fixed w-0 h-screen group-hover:w-12 transition-all bg-primary">
                    <div className="absolute w-4 h-12 bg-tertiary -right-4 top-1/3 rounded-r-md z-50">
                        <span className="absolute -left-2 top-2 group-hover:rotate-180">
                            <RightArrowIcon />
                        </span>
                    </div>
                    <div className="overflow-hidden h-full relative">
                        <div className="border-r-2 border-bgtertiary h-full w-full">
                            <div className="">
                                <ButtonThingy 
                                    onClick={() => {
                                        if (currentSection && sections.dashboard.id === currentSection.id) {
                                            setCurrentSection(null);
                                            setIsFullscreen(false);
                                            return;
                                        }
                                        setCurrentSection(sections.dashboard);
                                        setIsVisible(true);
                                    }} 
                                    isSelected={currentSection && currentSection.id === 'dashboard'}
                                    title="Dashboard"
                                >
                                    <span className="flex">
                                        <DashboardIcon />
                                    </span>
                                </ButtonThingy>
                            </div>
                            <div className="">
                                <ButtonThingy 
                                    onClick={() => {
                                        if (currentSection && sections.toDo.id === currentSection.id) {
                                            setCurrentSection(null);
                                            setIsFullscreen(false);
                                            return;
                                        }
                                        setCurrentSection(sections.toDo);
                                        setIsVisible(true);
                                    }}
                                    isSelected={currentSection && currentSection.id === 'todo'}
                                    title="To-Do"
                                >
                                    <span className="flex">
                                        <ToDoIcon />
                                    </span>
                                </ButtonThingy>
                            </div>
                            <div className="absolute bottom-20">
                                <ButtonThingy 
                                    onClick={() => {
                                        alert('Help is not coming.');
                                    }}
                                    isSelected={false}
                                    title="Help"
                                >
                                    <span className="flex">
                                        <HelpIcon />
                                    </span>
                                </ButtonThingy>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row overflow-hidden w-full">
                {isVisible && currentSection && (
                    <div className={classNames('py-5 px-2', isFullscreen ? 'w-full' : 'lg:max-w-lg lg:w-4/12')}>
                        <currentSection.Content 
                            onCollapse={() => {
                                setIsVisible(false);
                                setCurrentSection(null);
                                setIsFullscreen(false);
                            }}
                            onExpand={() => {
                                setIsFullscreen(!isFullscreen);
                            }}
                            isExpanded={isFullscreen}
                        />
                    </div>
                )}
                {!isFullscreen && 
                    <div
                        className="mx-2 w-full h-full"
                    >
                        <div 
                            className="dynamicFontSize bg-clip-text font-black font-title text-center p-10 w-full overflow-hidden overflow-ellipsis animate-pulse flex justify-center"
                        >   
                            <span className="relative">
                                {messages.comingSoon()}
                            </span>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default HomePage;