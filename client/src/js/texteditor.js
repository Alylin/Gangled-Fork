
import classNames from 'classnames';
import { useEffect } from 'react';
import messages from './messages';

// const undoStack = [];
// const redoStack = [];

// const maxStackSize = 100;

// function addToRedoStack(html, range) {
//     addToStack(html, range, redoStack);
// }

// function addToUndoStack(html, range) { 
//     addToStack(html, range, undoStack);
// }

// function addToStack(html, range, stack) {
//     stack.push({
//         html: html,
//         selectionRange: range
//     });
//     if (stack.length > maxStackSize) {
//         stack.shift();
//     }
//     console.log(stack.length);
// }

// function undo(html, range) {
//     if (undoStack.length) { 
//         addToRedoStack(html, range);
//         return undoStack.pop();
//     }
// }

// function redo(html, range) {
//     if (redoStack.length) { 
//         addToUndoStack(html, range);
//         return redoStack.pop();
//     }
// }

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