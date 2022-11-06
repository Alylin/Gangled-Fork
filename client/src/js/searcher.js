
function scoreResult(result, searchTerm) {
    const displayName = result.displayName.toLowerCase().trim()
    if (displayName === searchTerm) {
        return 100;
    }
    if (displayName.startsWith(searchTerm)) {
        return 50;
    }
    const nameParts = displayName.split(' ')
    for (let i = 0; i < nameParts.length; i++) {
        let namePart = nameParts[i];
        if (namePart === searchTerm) {
            return 30;
        }
        if (namePart.startsWith(searchTerm)) {
            return 20;
        }
    }
    return 0;
}

function NoResults(props) {
    return (
        <span className="italic">
            {`We couldn't find any results for "${props.searchTerm}"`}
        </span>
    );
} 

function searcher(searchableEntries, searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();
    const searchResults = searchableEntries.filter((searchableThing) => {
        return searchableThing.displayName.toLowerCase().trim().includes(searchTerm);
    }).sort((a, b) => {
        return scoreResult(b, searchTerm) - scoreResult(a, searchTerm);
    });

    if (searchResults.length) {
        return searchResults.map((result) => {
            return <div>{result.displayName}</div>
        });
    }
    return  [<NoResults searchTerm={searchTerm}/>]
}

export default searcher;