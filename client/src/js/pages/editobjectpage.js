import { useState } from 'react';
import classNames from 'classnames';
import { EditableChip } from '../chip';
import { IoMdAdd } from 'react-icons/io';
import { RiImageAddFill } from 'react-icons/ri';
import LeftBar from './editobjectpage/leftbar';
import RichTextEditor from '../richtexteditor';

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
//     console.log(stack.length); // test108
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

// function saveQueue() {

// }

// function onChangeDebounced(newState) {
//     addToUndoStack(newState);
//     saveQueue(newState);
// }

// function cleanHTML(element) {
//     element.innerHTML = element.textContent;
// }

function EditObjectPage() {
    const [state, setState] = useState({
        mainImage: null,
        chips: []
    });
    return (
        <div className="flex flex-1">
            <LeftBar />
            <div className="flex-1 flex flex-col">
                <div className={classNames('flex flex-col')}>
                    <div className="flex mx-5">
                        <label 
                            className={classNames('mr-2 relative w-16 h-16 group transition-all flex justify-center items-center cursor-pointer group hover:bg-secondary rounded-lg', state.mainImage && 'hover:w-24')}
                            tabIndex={0}
                        >
                            {!!state.mainImage ?
                                <>
                                    <span className="opacity-0 group-hover:opacity-100 transition-all absolute w-full flex bg-secondary/70 items-center justify-center text-sm text-primary bottom-0 rounded-b-lg"> 
                                        Edit {/* test108 */}
                                    </span>
                                    <span 
                                        className="h-16 w-full transition-all rounded-lg" 
                                        style={{
                                            background: `center / cover no-repeat url(${URL.createObjectURL(state.mainImage)})`
                                        }} 
                                    />
                                </> :
                                <RiImageAddFill 
                                    className="w-12 h-12 transition-all" 
                                />
                            }
                            <input 
                                type="file" 
                                className="hidden"
                                accept="image/*"
                                onChange={(event) => {
                                    if (event.target.files.length) {
                                        const updatedState = structuredClone(state);
                                        updatedState.mainImage = event.target.files[0]
                                        setState(updatedState);
                                    }
                                }}
                            />
                        </label>
                        <input 
                            placeholder="Object Name" // test108
                            type="text" 
                            className="text-3xl bg-transparent focus-within:outline-none text-ellipsis"
                            maxLength={250}
                            onChange={(event) => {}}
                        />
                    </div>

                    <div className="overflow-auto hideScrollBar min-w-0 flex py-2 px-5">
                        {state.chips.map((chip, index) => (
                            <EditableChip 
                                text={chip} 
                                onDelete={() => {
                                    const updatedState = structuredClone(state);
                                    updatedState.chips.splice(index, 1)
                                    setState(updatedState)
                                }}
                                onChange={(newValue) => {
                                    const updatedState = structuredClone(state);
                                    updatedState.chips[index] = newValue;
                                    setState(updatedState)
                                }}
                            />)
                        )}
                        <button 
                            className={classNames('cursor-pointer group flex items-center font-medium text-center group h-7')}
                            onClick={() => {
                                const updatedState = structuredClone(state);
                                updatedState.chips.push('');
                                setState(updatedState);
                            }} 
                        >
                            <IoMdAdd className={classNames('w-6 h-5 cursor-pointer mx-0.5', !state.chips.length && 'mr-1' )} />
                            <span
                                className="group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 -translate-x-7 opacity-0 overflow-hidden whitespace-nowrap transition-all pr-2"
                            >
                                Add tag
                            </span>
                        </button>
                    </div>
                    <div className="border-b-2 border-secondary mx-5" />
                </div>
                <div
                    className="m-5"
                >
                    <RichTextEditor />
                </div>
                {/* <div 
                    contentEditable={true} 
                    className="focus-within:outline-none m-5 flex-1 after:empty:content-['Text_here...'] after:empty:text-gray-400" // test108
                /> */}
            </div>
            <div className="w-1/6 min-w-48 px-5 relative">

            </div>
        </div>
    );
}

export default EditObjectPage;