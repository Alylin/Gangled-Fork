import Editor from '@draft-js-plugins/editor';
import { EditorState } from 'draft-js';
import React, { useState } from 'react';
import 'draft-js/dist/Draft.css';

export default function RichTextEditor() {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    return (
        <Editor  
            editorState={editorState}
            onChange={(state) => {
                // const purifiedText = event.target.textContent;
                // onChange(purifiedText);
                setEditorState(state);
            }}
            stripPastedStyles
            placeholder='test'
        />
    )
}