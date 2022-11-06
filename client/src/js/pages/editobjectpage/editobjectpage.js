import { useState } from 'react';
import classNames from 'classnames';
import { EditableChip } from '../../chip';
import { IoMdAdd } from 'react-icons/io';
import { RiImageAddFill, RiImageFill } from 'react-icons/ri';
import LeftBar from './leftbar';
import RichTextEditor from '../../richtexteditor';

function ReadOnlyImage({image}) {
    return (
        <div 
            className={classNames('mr-2 relative w-16 h-16 group transition-all flex justify-center items-center rounded-lg focus:outline-1')}
            tabIndex={0}
        >
            {!!image ?
                <>
                    <span 
                        className="h-16 w-full transition-all rounded-lg" 
                        style={{
                            background: `center / cover no-repeat url(${URL.createObjectURL(image)})`
                        }} 
                    />
                </> :
                <RiImageFill 
                    className="w-12 h-12 transition-all" 
                />
            }
        </div>
    )
}

function EditableImage({image, onChange}) {
    return (
        <label 
            className={classNames('mr-2 relative w-16 h-16 group transition-all flex justify-center items-center cursor-pointer group hover:bg-secondary rounded-lg focus:outline-1', image && 'hover:w-24')}
            tabIndex={0}
        >
            {!!image ?
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
                </> :
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

function ImageUpload({isReadOnly, image, onChange}) {
    if (isReadOnly) {
        return <ReadOnlyImage image={image} />
    }
    return <EditableImage image={image} onChange={onChange} />
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

function EditObjectPage() {
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [chips, setChips] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [objectName, setObjectName] = useState('');
    return (
        <div className="flex flex-1">
            <LeftBar />
            <div className="flex flex-col w-4/5">
                <div className={classNames('flex flex-col')}>
                    <div className="flex mx-5">
                        <div>
                            <ImageUpload 
                                isReadOnly={isReadOnly} 
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
                    </div>

                    <div className="overflow-auto hideScrollBar min-w-0 py-2 px-5">
                        <div className="flex">
                            {chips.map((chip, index) => (
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
                                />)
                            )}
                            <button 
                                className={classNames('cursor-pointer group flex items-center font-medium text-center group h-7 rounded-lg')}
                                onClick={() => {
                                    const updatedChips = structuredClone(chips);
                                    updatedChips.push('');
                                    setChips(updatedChips);
                                }} 
                            >
                                <IoMdAdd className={classNames('w-6 h-5 cursor-pointer mx-0.5', !chips.length && 'mr-1' )} />
                                <span
                                    className="group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 -translate-x-7 opacity-0 overflow-hidden whitespace-nowrap transition-all pr-2"
                                >
                                    Add tag
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="border-b-2 border-secondary mx-5" />
                </div>
                <div
                    className="m-5"
                >
                    <RichTextEditor readOnly={isReadOnly} />
                </div>
            </div>
            <div className="w-1/6 min-w-48 px-5 relative">
                <button
                    onClick={() => {
                        setIsReadOnly(!isReadOnly);
                    }}
                >
                    test
                </button>
            </div>
        </div>
    );
}

export default EditObjectPage;