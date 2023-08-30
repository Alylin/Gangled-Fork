import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Chip, { EditableChip } from '../../chip';
import { MdAdd, MdEdit, MdSave } from 'react-icons/md';
import { RiImageAddFill, RiImageFill } from 'react-icons/ri';
import LeftBar from './leftbar';
import RichTextEditor from '../../richtexteditor';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { EditorState, ContentState } from 'draft-js';

function FlyoutButton({onClick, displayText, Icon, isLeft}) {
    return (
        <button 
            className={classNames('cursor-pointer group flex items-center font-medium text-center group h-7 rounded-lg')}
            onClick={onClick} 
        >
            {isLeft && 
                <span
                    className="group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 translate-x-7 opacity-0 overflow-hidden whitespace-nowrap transition-all pl-2"
                >
                    {displayText}
                </span>
            }
            {Icon}
            {!isLeft && 
                <span
                    className="group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 -translate-x-7 opacity-0 overflow-hidden whitespace-nowrap transition-all pr-2"
                >
                    {displayText}
                </span>
            }
        </button>
    );
}

function ReadOnlyImage({image, imagePath}) {
    return (
        <div 
            className={classNames('mr-2 relative w-16 h-16 group transition-all flex justify-center items-center rounded-lg focus:outline-1')}
            tabIndex={0}
        >
            {!!image &&
                <span 
                    className="h-16 w-full transition-all rounded-lg" 
                    style={{
                        background: `center / cover no-repeat url(${URL.createObjectURL(image)})`
                    }} 
                />
            }
            {!image && imagePath && 
                <span 
                    className="h-16 w-full transition-all rounded-lg" 
                    style={{
                        background: `center / cover no-repeat url(${imagePath})`
                    }} 
                />
            }
            {!image && !imagePath && 
                <RiImageFill 
                    className="w-12 h-12 transition-all" 
                />
            }
        </div>
    )
}

function EditableImage({image, imagePath, onChange}) {
    return (
        <label 
            className={classNames('mr-2 relative w-16 h-16 group transition-all flex justify-center items-center cursor-pointer group hover:bg-secondary rounded-lg focus:outline-1', (image || imagePath) && 'hover:w-24')}
            tabIndex={0}
        >
            {!!image &&
                <>
                    <span className="opacity-0 group-hover:opacity-100 transition-all absolute w-full flex bg-secondary/70 items-center justify-center text-sm text-primary bottom-0 rounded-b-lg"> 
                        Edit{/* test108 */}
                    </span>
                    <span 
                        className="h-16 w-full transition-all rounded-lg" 
                        style={{
                            background: `center / cover no-repeat url(${URL.createObjectURL(image)})`
                        }} 
                    />
                </>
            }
            {!image && imagePath && 
                <>
                    <span className="opacity-0 group-hover:opacity-100 transition-all absolute w-full flex bg-secondary/70 items-center justify-center text-sm text-primary bottom-0 rounded-b-lg"> 
                        Edit{/* test108 */}
                    </span>
                    <span 
                        className="h-16 w-full transition-all rounded-lg" 
                        style={{
                            background: `center / cover no-repeat url(${imagePath})`
                        }} 
                    />
                </>
            }
            {!image && !imagePath && 
                <RiImageAddFill 
                className="w-12 h-12 transition-all" 
            />
            }
            <input 
                type="file" 
                className="hidden"
                accept="image/*"
                onChange={onChange}
            />
        </label>
    )
}

function ImageUpload({isReadOnly, image, imagePath, onChange}) {
    if (isReadOnly) {
        return <ReadOnlyImage image={image} imagePath={imagePath} />
    }
    return <EditableImage image={image} imagePath={imagePath} onChange={onChange} />
}

function ObjectNameInput({isReadOnly, objectName, onChange}) {
    if (isReadOnly) {
        return (
            <div className="text-3xl bg-transparent focus-within:outline-none text-ellipsis my-auto">
                {objectName || "Untitled"}
            </div>
        );
    }
    return (
        <input 
            placeholder="Untitled" // test108
            type="text" 
            className="text-3xl bg-transparent focus-within:outline-none text-ellipsis"
            maxLength={250}
            value={objectName}
            onChange={onChange}
        />
    );
}

function ObjectContent({ setChips, isReadOnly, mainImage, mainImagePath, setMainImage, objectName, setObjectName, chips, setIsReadOnly, editorState, setEditorState }) { 
    return (
        <div className="flex flex-col flex-1">
            <div className={classNames('flex flex-col')}>
                <div className="flex mx-5 items-center">
                    <div>
                        <ImageUpload 
                            isReadOnly={isReadOnly} 
                            imagePath={mainImagePath}
                            image={mainImage}
                            onChange={(event) => {
                                if (event.target.files.length) {
                                    setMainImage(event.target.files[0]);
                                }
                            }}
                        />
                    </div>
                    <ObjectNameInput
                        isReadOnly={isReadOnly} 
                        objectName={objectName}
                        onChange={(event) => {
                            setObjectName(event.target.value);
                        }}
                    />
                    <div className="flex-1"/>
                    <FlyoutButton 
                        onClick={() => {
                            setIsReadOnly(!isReadOnly);
                        }}
                        displayText={isReadOnly ? 'Edit' : 'Save changes'}
                        Icon={isReadOnly ? <MdEdit className="w-6 h-5 mx-0.5" /> : <MdSave className="w-6 h-5 mx-0.5" />}
                        isLeft
                    />

                </div>

                <div className="overflow-auto hideScrollBar min-w-0 py-2 px-5">
                    <div className="flex">
                        {chips.map((chip, index) => {
                            if (isReadOnly) {
                                return (
                                    <Chip 
                                        text={chip}
                                    />
                                );
                            }
                            return (
                                <EditableChip 
                                    text={chip} 
                                    onDelete={() => {
                                        const updatedChips = structuredClone(chips);
                                        updatedChips.splice(index, 1)
                                        setChips(updatedChips)
                                    }}
                                    onChange={(newValue) => {
                                        const updatedChips = structuredClone(chips);
                                        updatedChips[index] = newValue;
                                        setChips(updatedChips)
                                    }}
                                />
                            );
                        }
                        )}
                        {!isReadOnly && 
                            <FlyoutButton 
                                onClick={() => {
                                    const updatedChips = structuredClone(chips);
                                    updatedChips.push('');
                                    setChips(updatedChips);
                                }}
                                displayText="Add tag"
                                Icon={<MdAdd className={classNames('w-6 h-5 cursor-pointer mx-0.5', !chips.length && 'mr-1' )} />}
                            />
                        }
                    </div>
                </div>
                <div className="border-b-2 border-secondary mx-5" />
            </div>
            <div className="m-5">
                <RichTextEditor 
                    readOnly={isReadOnly} 
                    editorState={editorState}
                    setEditorState={setEditorState}
                />
            </div>
        </div>
    );
}

function EditObjectPage({ isMicro }) {
    const { objectId } = useParams();

    useEffect(() => {
        axios.get('/getObjectData', { params: { objectId: objectId }}).then((results) => {
            setObjectName(results.data.displayName);
            setMainImagePath(results.data.imagePath);
            setChips(results.data.tags);
            setEditorState(EditorState.createWithContent(ContentState.createFromText(results.data.description)));
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const [isLoading, setIsLoading] = useState(true);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [chips, setChips] = useState([]);
    const [mainImagePath, setMainImagePath] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [objectName, setObjectName] = useState('');

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    if (isLoading) {
        return null;
    }
    if (isMicro) {
        return (
            <div className="py-4">
                <ObjectContent 
                    setChips={setChips}
                    isReadOnly={isReadOnly} 
                    mainImage={mainImage} 
                    mainImagePath={mainImagePath}
                    setMainImage={setMainImage}
                    objectName={objectName}
                    setObjectName={setObjectName}
                    chips={chips}
                    setIsReadOnly={setIsReadOnly}
                    editorState={editorState}
                    setEditorState={setEditorState}
                />
            </div>
        )
    }

    return (
        <div className="flex flex-1 py-2">
            <LeftBar />
            <ObjectContent 
                setChips={setChips}
                isReadOnly={isReadOnly} 
                mainImage={mainImage} 
                mainImagePath={mainImagePath}
                setMainImage={setMainImage}
                objectName={objectName}
                setObjectName={setObjectName}
                chips={chips}
                setIsReadOnly={setIsReadOnly}
                editorState={editorState}
                setEditorState={setEditorState}
            />
        </div>
    );
}

export default EditObjectPage;