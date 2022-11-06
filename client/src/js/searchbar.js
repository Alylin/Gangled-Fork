import React, {Fragment, useEffect, useState} from 'react';
import classNames from 'classnames';
import {CloseIcon, SearchIcon} from './icons';
import Dropdown from './dropdown';
import TextEditor from './texteditor';
import MainSearch, { genericSearch } from './mainsearch';
import Chip from './chip';
import messages from './messages';
import useDebounce from './utilities/usedebounce';
import { VscLoading } from 'react-icons/vsc';

const mainSearch = new MainSearch(4);

function Placeholder() {
    return (
        <div className="pl-4 py-2 flex">
            <SearchIcon />
            <span className="inline-block align-middle overflow-hidden overflow-ellipsis max-w-full whitespace-nowrap pl-2">
                {messages.search()}
            </span>
        </div>
    );
}
function NoResults() {
    return (
        <span className="italic max-w-full truncate">
            {messages.noResultsFound()}
        </span>
    );
} 

function SearchBar(props) {
    const {
        extraClasses
    } = props;

    const [canShowResults, setCanShowResults] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [inProgressTag, setInProgressTag] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTags, setSearchTags] = useState([]);
    const searchValues = useDebounce({searchTerm: searchTerm, searchTags: searchTags}, 500);
    const [isLoading, setIsLoading] = useState(false);
    const isLoadingDebounced = useDebounce(isLoading, 500);
    const [availableTags, setAvailableTags] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        mainSearch.realSearch(searchValues.searchTerm, searchValues.searchTags, 5).then((results) => {
            setSearchResults(results.data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [searchValues.searchTerm, searchValues.searchTags]);

    useEffect(() => {
        mainSearch.getTags().then((results) => {
            setAvailableTags(results.data);
        }).finally(() => {
            //test108 probably need a loading indicator for this stuff. 
        });
    }, []);
    
    const [chips, setChips] = useState([]);

    const searchFunction = ({searchTermPassed, tags}) => { // test108 you can't just do this, you goof! 
        setSearchTerm(searchTermPassed || '');
        setSearchTags(tags);
    };

    const searchFunctionImmediate = ({searchTermPassed, tags}) => { // test108 you can't just do this, you goof! 
        setSearchTerm(searchTermPassed || '');
        setSearchTags(tags || []);
        mainSearch.realSearch(searchTerm, searchTags, 5).then((results) => {
            setSearchResults(results.data);
        });
    };

    let textInput = React.createRef();
    let wrapperRef = React.createRef();

    return (
        <div className="relative w-full max-w-5xl" ref={wrapperRef}>
            <div className={classNames('flex cursor-text select-none rounded-full whitespace-nowrap h-10 shadow-lg bg-opacity-75 hover:bg-hover/70 bg-secondary/70 group', extraClasses)} 
                title="Search" 
                tabIndex={0} 
                onFocus={() => {
                    setCanShowResults(true);
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && inProgressTag) {
                        const tag = genericSearch(inProgressTag?.slice(1, inProgressTag.length) || '', Object.values(availableTags))[0];
                        const updatedChips = chips.map((chipValue) => chipValue); // test108 duplicate
                        if (tag && !chips.includes(tag)) {
                            updatedChips.push(tag);
                        }
                        const updatedSearchValue = searchValue.replace(inProgressTag, '');
                        setChips(updatedChips);
                        setSearchValue(updatedSearchValue);
                        setInProgressTag(null);
                        searchFunctionImmediate({searchTermPassed: updatedSearchValue, tags: updatedChips})
                    }
                }}>
                {
                    (canShowResults || searchValue || !!chips.length) &&
                    <>
                        {!!chips.length &&
                            <div className="max-w-[50%] min-w-0 relative mr-1">
                                <div className="overflow-auto hideScrollBar pl-4 rounded-l-full min-w-0 h-full">
                                    <div className="flex py-2 h-full">
                                        {chips.map((chip) => (
                                            <Chip 
                                                text={chip} 
                                                onDelete={() => {
                                                    const updatedChips = chips.filter((filteringChip) => filteringChip !== chip).map((chipValue) => chipValue);
                                                    setChips(updatedChips)
                                                    searchFunctionImmediate({searchTermPassed: searchValue, tags: updatedChips})
                                                }}
                                            />)
                                        )}
                                    </div>
                                </div>
                                <span className="border-r-2 absolute right-0 border-primary my-2 m top-0 bottom-0 z-50" />
                            </div>
                        }
                        <span className={classNames("flex-1", !chips.length && 'pl-4')}>
                            <TextEditor 
                                onChange={(searchTerm) => {
                                    const newInProgressTag = searchTerm.match(/#\w+$/);
                                    if (newInProgressTag?.length) {
                                        setInProgressTag(newInProgressTag[0]);
                                    }
                                    else {
                                        setInProgressTag(null);
                                    }
                                    const searchTermPurified = searchTerm.replace(/#\w*$/, '');
                                    searchFunction({searchTermPassed: searchTermPurified, tags: chips.map((chipValue) => chipValue)});
                                }}
                                addChips={(newChips) => {
                                    const updatedChips = chips.map((chipValue) => chipValue);
                                    newChips.forEach((newChip) => {
                                        newChip = newChip.slice(1, -1);
                                        if (!chips.includes(newChip)) {
                                            updatedChips.push(newChip);
                                        }
                                    });
                                    setChips(updatedChips);
                                    searchFunctionImmediate({searchTermPassed: searchValue, tags: updatedChips})
                                }}
                                availableTags={availableTags}
                                textInputRef={textInput}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                            />
                        </span>
                    </>
                }
                {(searchValue || !!chips.length) && //test108 loading indicator
                    <>
                        {isLoading && isLoadingDebounced ? (
                            <span className="pr-3 py-2">
                                <VscLoading className="w-6 h-6 fill-primary cursor-pointer animate-spin" />
                            </span>
                        ) : (
                        <span 
                            className="pr-3 py-2"
                            onClick={() => {
                                setSearchValue('');
                                setCanShowResults(false);
                                searchFunctionImmediate();
                                textInput.current.focus(); 
                                setChips([]);
                            }}
                        > 
                            <CloseIcon />
                        </span>
                        )}
                    </>
                }
                {!canShowResults && !searchValue && !chips.length && <Placeholder />}
            </div>
            <Dropdown extraClasses="w-full flex flex-col" clickZone={wrapperRef} canDisplay={canShowResults} setCanDisplay={(canDisplay) => {
                setCanShowResults(canDisplay);
            }}>
                 <div className="w-full">
                    <div className="h-8 flex pb-1 overflow-auto hideScrollBar">
                        {genericSearch(inProgressTag?.slice(1, inProgressTag.length) || '', Object.values(availableTags).filter((availableTag) => {
                            return !chips.includes(availableTag);
                        })).map((availableTag) => {
                            return (
                                <Chip 
                                    text={availableTag}
                                    onClick={() => {
                                        const updatedChips = chips.map((chipValue) => chipValue);
                                        if (!chips.includes(availableTag)) {
                                            updatedChips.push(availableTag);
                                            setChips(updatedChips);
                                            if (inProgressTag) {
                                                const searchTermPurified = searchValue.replace(/#\w*$/, '');
                                                setSearchValue(searchTermPurified);
                                            }
                                            searchFunctionImmediate({searchTermPassed: searchValue, tags: updatedChips})
                                            textInput.current.focus(); 
                                        }
                                    }}
                                />
                            )
                        })}
                    </div>
                    <div className='mr-2 mb-2'>
                        {!searchResults.length && <NoResults />}
                        {searchResults.map((result) => {
                            return (
                                <div className="h-16 rounded-lg shadow-sm cursor-pointer relative overflow-hidden w-full p-2 flex transition-all hover:bg-tertiary group" tabIndex="0">
                                     <div className="bg-green-800 h-12 w-12 shrink-0 inline-block rounded-lg mr-2 group-hover:w-20 transition-all" style={{
                                        background: `center / cover no-repeat url(${result.imagePath})`
                                    }} />
                                    <div className="flex-1">
                                        <div className="font-medium text-primary overflow-hidden overflow-ellipsis">
                                            {result.displayName}
                                        </div>
                                        <div className="text-primary italic text-sm overflow-hidden overflow-ellipsis line-clamp-1">
                                            {result.description}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Dropdown>
        </div>
    );
}

export default SearchBar;