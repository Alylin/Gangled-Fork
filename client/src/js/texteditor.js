
import classNames from 'classnames';
import messages from './messages';

function TextEditor({
    onChange,
    addChips,
    textInputRef,
    searchValue,
    setSearchValue,
    availableTags
}) {
    const onTextChange = (event) => {
        let value = event.target.value
        const newChips = value.match(/#\w+ /g);
        if (newChips?.length) {
            addChips(newChips.filter((newChip) => {
                const tagIsAvailable = Object.values(availableTags).includes(newChip.slice(1, -1));
                if (tagIsAvailable) {
                    value = value.replace(newChip, '');
                }
                return tagIsAvailable;
            }));
        }
        onChange(value);
        setSearchValue(value);
    };

    return (
        <input
            className={classNames('appearance-none outline-none bg-transparent w-full overflow-hidden whitespace-nowrap select-text py-2 shrink-[5] min-w-0')}
            type="text"
            onChange={onTextChange}
            onPaste={onTextChange}
            ref={textInputRef}
            value={searchValue}
            placeholder={messages.generalSearchPlaceholder()}
            autoFocus
        />
    );
}

export default TextEditor;