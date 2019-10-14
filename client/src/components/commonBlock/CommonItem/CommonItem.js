import React, { useState, useRef, useEffect } from 'react';
import renameIcon from "../../../assets/icons/icon-rename.png";
import deleteIcon from "../../../assets/icons/delete-icon.png";
import copyIcon from "../../../assets/icons/copy-icon.png";
import cutIcon from "../../../assets/icons/cut-icon.png";
import folderIcon from "../../../assets/icons/folder.png";
import {cutFileName, getFileIcon} from "../../../utils/helpers";
import Styles from "./styles";

const CommonItem = ({ handleDelete, wrapperClass, title, link, folderHandler, updateItem, showModal, mimeType = null }) => {
    const [isEditItem, setIsEditItem] = useState(false);
    const [value, setValue] = useState(false);
    const itemRef = useRef(null);

    const handleClickOutside = event => {
        if (itemRef.current && !itemRef.current.contains(event.target)) {
            setIsEditItem(false)
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    },[]);


    return (
        <Styles>
            <div className={`${wrapperClass} ${isEditItem && 'edit-enabled'}`} ref={itemRef}>
                <div className={'control-block'}>
                    <div className={'copy-icon'} onClick={() => showModal('copy')}>
                        <img src={copyIcon} alt={'copy'}/>
                    </div>
                    <div className={'cut-icon'} onClick={() => showModal('cut')}>
                        <img src={cutIcon} alt={'cut'}/>
                    </div>
                    <div className={'rename-icon'} onClick={() => {setIsEditItem(!isEditItem); setValue(title)}}>
                        <img src={renameIcon} alt={'rename'}/>
                    </div>
                    <div className={'delete-icon'} onClick={handleDelete}>
                        <img src={deleteIcon} alt={'delete'}/>
                    </div>
                </div>
                { link ?
                    <a href={link} target={'_blank'}>
                        <img src={getFileIcon(mimeType)} className={'file-icon'} alt={'file file-icon'}/>
                    </a>
                    :
                    <img src={folderIcon} onClick={folderHandler} alt={'folder folder-icon'}/>
                }
                { !isEditItem ?
                    cutFileName(title)
                    :
                    <input
                        className={'edit-input'}
                        value={value}
                        required
                        onChange={(event) => setValue(event.target.value)}
                        onKeyPress={(event) => {
                            if(event.key === 'Enter') {
                                updateItem(event.target.value);
                                setIsEditItem(false);
                            }
                        }
                        }
                    />
                }
            </div>
        </Styles>
    )
};

export default CommonItem;
