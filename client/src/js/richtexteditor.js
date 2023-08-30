import Editor from '@draft-js-plugins/editor';
import 'draft-js/dist/Draft.css';

export default function RichTextEditor({readOnly, editorState, setEditorState}) {
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