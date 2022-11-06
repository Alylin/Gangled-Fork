import isDarkTheme from './utilities/theme';
import { MdClose } from 'react-icons/md';
import classNames from 'classnames';
import { EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import createSingleLinePlugin from 'draft-js-single-line-plugin'
import Editor from '@draft-js-plugins/editor';
import 'draft-js/dist/Draft.css';

export default function Chip({
    text,
    onDelete,
    onClick
}) {
    return (
        <button 
            className={classNames('bg-secondary cursor-pointer hover:bg-hover flex items-center px-2 rounded-full font-medium mr-1 text-center text-sm h-7', isDarkTheme() ? 'hover:bg-hover bgshadow-dark-3d hover:shadow-dark-3dInverese' : 'shadow-3d hover:shadow-3dInverese')}
            onClick={onClick}
        >
            <span className="flex-1">
                {text}
            </span>
            {!!onDelete &&
                <span 
                    className="inline-block pl-1"
                    onClick={onDelete}
                >
                    <MdClose className="w-4 h-4 fill-primary cursor-pointer" />
                </span>
            }
        </button>
    );
}

export function EditableChip({
    text,
    onDelete,
    onChange
}) {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    useEffect(() => {
        setEditorState(EditorState.moveFocusToEnd(editorState));
    }, []);

    const singleLinePlugin = createSingleLinePlugin()
    return (
        <span 
            className={classNames('bg-secondary flex flex-col items-center px-2 rounded-full font-medium mr-1 text-sm h-7 min-w-[48px] relative')}
        >   
            {
                !editorState.getCurrentContent().hasText() && <div className="h-0 line-clamp-1 overflow-hidden pr-4">Tag Name</div>
            }
            <div
                className="pr-4 m-auto w-full"
            >
                <Editor  
                    editorState={editorState}
                    onChange={(state) => {
                        // const purifiedText = event.target.textContent;
                        // onChange(purifiedText);
                        setEditorState(state);
                    }}
                    plugins={[
                        singleLinePlugin
                    ]}
                    stripPastedStyles
                    placeholder='Tag Name'
                />
            </div>
            {!!onDelete &&
                <span 
                    className="inline-block absolute right-1 top-1.5"
                    onClick={onDelete}
                >
                    <MdClose className="w-4 h-4 fill-primary cursor-pointer" />
                </span>
            }
        </span>
    );
}