import Editor from '@draft-js-plugins/editor';
import { EditorState } from 'draft-js';
import React, { useState } from 'react';
import 'draft-js/dist/Draft.css';

export default function RichTextEditor({readOnly}) {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    return (
        <Editor  
            editorState={editorState}
            onChange={(state) => {
                setEditorState(state);
            }}
            stripPastedStyles
            placeholder='Text'
            readOnly={readOnly}
        />
    )
}