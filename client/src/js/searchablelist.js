import React, {useState, useRef} from 'react';
import {SearchIcon} from './icons';
import classNames from 'classnames';
import MainSearch from './mainsearch';
import Panel from './panel';
import messages from './messages';
import ScrollArea from './scrollingarea';

function NoResults() {
    return (
        <span className="italic max-w-full truncate">
            {messages.noResultsFound()}
        </span>
    );
} 

function SearchableList(props) {
    const mainSearch = new MainSearch(100);

    const {
        displayName,
    } = props;

    const [isShowingSearch, setIsShowingSearch] = useState(false);
    const [isInitialState, setIsInitialState] = useState(true);
    const textInputRef = useRef();
    const [searchResults, setSearchResults] = useState(mainSearch.search(''));

    return (
        <div className="relative">
            <div 
                className="text-lg relative font-semibold cursor-text pb-2 flex" 
                onClick={() => {
                    textInputRef.current.focus();
                }}
            >
                <span className="inline-block absolute font-title mx-1">
                    {displayName}
                </span>
                <span className="flex-1" />
                <span className="inline-block z-10 pt-1 bg-primary">
                    <SearchIcon />
                </span>
                <input 
                    onFocus={() => {
                        setIsShowingSearch(true);
                        setIsInitialState(false);
                    }}
                    onBlur={() => {
                        setIsShowingSearch(!!textInputRef.current.value);
                    }}
                    ref={textInputRef}
                    type="text" 
                    className={classNames('outline-none z-10 overflow-hidden bg-primary', isInitialState && 'w-0', !isInitialState && (isShowingSearch ? 'w-full animate-expandHorizontalFull' : 'w-0 animate-collapseHorizontalFull'))}
                    onChange={(event) => {
                        const searchTerm = event.target.value.trim();
                        setSearchResults(mainSearch.search(searchTerm))
                    }}
                />
            </div>
            <ScrollArea>
                {!searchResults.length && <NoResults />}
                {searchResults.map((result) => {
                    return (
                        <span className="snap-start p-1">
                            <Panel isLoading={false} displayName={result.displayName} description={result.description} imagePath={result.imagePath} />
                        </span>
                    );
                })}
            </ScrollArea>
        </div>
    );
}

export default SearchableList;