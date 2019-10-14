import React, { Component } from 'react';
import {connect} from "react-redux";
import {clearCurrentFolder, fetchFolders, getFolder, deleteFolder, updateFolder} from "../../store/folders/actions";
import { deleteFile, updateFile, uploadFile } from "../../store/files/actions";
import Styles from './styles';
import queryString from 'query-string'
import CreateFolderForm from "../forms/CreateFolderForm";
import CommonItem from "../commonBlock/CommonItem";
import Dropzone from 'react-dropzone';
import {validationFileSize} from "../../utils/helpers";
import CopyModal from "../commonBlock/CopyModal/CopyModal";
import Alert from "react-s-alert";
import {STATE_STATUSES} from "../../utils/stateStatuses";

class Dashboard extends Component {

    state = {
        fileList: null,
        visibleCopyModal: false,
        modalType: null,
        itemType: null,
        selectedItemId: null
    };

    componentDidMount() {
        const { fetchFolders} = this.props;
        fetchFolders();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.search !== this.props.location.search) {
            const { location, fetchFolders, getFolder, clearCurrentFolder, folderStatus } = this.props;
            const query = queryString.parse(location.search);
            if(!query.id && folderStatus !== STATE_STATUSES.PENDING) {
                clearCurrentFolder();
                fetchFolders();
            }
            if(query.id && folderStatus !== STATE_STATUSES.PENDING) {
                getFolder(query.id);
            }
        }
    }

    componentWillUnmount() {
        this.props.clearCurrentFolder();
    }

    deleteFolder = (id) => {
        this.props.deleteFolder(id)
    };

    getCurrentFolder = (id) => {
        const {getFolder, history} = this.props;
        getFolder(id);
        history.push(`/dashboard/?id=${id}`);
    };

    deleteFile = async (id) => {
        const { deleteFile, currentFolder, fetchFolders } = this.props;
        await deleteFile(id);
        if(currentFolder.id) {
            this.getCurrentFolder(currentFolder.id)
        } else {
            fetchFolders();
        }

    };

    updateItem = async (id, value, type) => {
        const { updateFolder, fetchFolders, currentFolder, updateFile } = this.props;
        if (type === 'folder') {
            await updateFolder(id, {title: value});
        } else {
            await updateFile(id, {original_filename: value});
        }

        if(currentFolder.id) {
            return this.getCurrentFolder(currentFolder.id);
        }

        return fetchFolders();
    };

    uploadFile = async (files) => {
        const { uploadFile, currentFolder, getFolder, fetchFolders } = this.props;

        if (!validationFileSize(files[0])) {
            return Alert.error('Maximum file size 5 mb');
        }
        try {
            const formData = new FormData();
            const id = currentFolder.id ? currentFolder.id : null;

            formData.append('file', files[0]);
            if(id) {
                formData.append('folder_id', id);
            }
            await uploadFile(formData);
            if(id) {
                await getFolder(currentFolder.id);
            } else {
                fetchFolders();
            }
        } catch (error) {
            Alert.error('Failed to upload file, please try again later.');
        }
    };


    render() {
        const { root, currentFolder, location } = this.props;
        const { visibleCopyModal, modalType, itemType, selectedItemId } = this.state;
        const query = queryString.parse(location.search);
        const folders = query.id ? currentFolder.folders: root.folders;
        const files = query.id ? currentFolder.files: root.files;
        const folderTitle = !currentFolder.title ? 'Root' : currentFolder.title;
        const isEmptyData = files.length === 0 && folders.length === 0;

        return (
            <Styles>
                <div className={'folders-block'}>
                    <div className={'folder-header'}>
                        <div className={'folder-name'}>{folderTitle}</div>
                        <CreateFolderForm />
                    </div>
                    <Dropzone onDrop={this.uploadFile}>
                        {({getRootProps, getInputProps, isDragActive}) => (
                            <div className={'folders'} {...getRootProps()} onClick={()=>{}}>
                                <input {...getInputProps()} />
                                <div className={`${isDragActive?'drag-active':'drag-inactive'}`} >
                                    <h1>
                                        cuda
                                    </h1>
                                </div>
                                {folders && folders.map(folder => (
                                    <CommonItem
                                        key={folder.id}
                                        title={folder.title}
                                        handleDelete={() => this.deleteFolder(folder.id)}
                                        folderHandler={() => this.getCurrentFolder(folder.id)}
                                        wrapperClass={'folder'}
                                        updateItem={(value) => this.updateItem(folder.id, value, 'folder')}
                                        showModal={(type) => this.setState({
                                            visibleCopyModal: true,
                                            modalType: type,
                                            itemType: 'folder',
                                            selectedItemId: folder.id
                                        })}
                                    />
                                ))}
                                {files && files.map(file => (
                                    <CommonItem
                                        key={file.id}
                                        title={file.original_filename}
                                        handleDelete={() => this.deleteFile(file.id)}
                                        link={file.url}
                                        mimeType={file.mime_type}
                                        wrapperClass={'file'}
                                        updateItem={(value) => this.updateItem(file.id, value, 'file')}
                                        showModal={(type) => this.setState({
                                            visibleCopyModal: true,
                                            modalType: type,
                                            itemType: 'file',
                                            selectedItemId: file.id
                                        })}
                                    />
                                ))}
                                {isEmptyData &&
                                <div className={'no-data-block'}>
                                    <p>
                                        You haven't folders and files. Add new file or create your first folder
                                    </p>
                                </div>
                                }
                            </div>
                        )}
                    </Dropzone>
                    {visibleCopyModal &&
                        <CopyModal
                            visible={visibleCopyModal}
                            closeHandler={() => this.setState({ visibleCopyModal: false })}
                            modalType={modalType}
                            itemType={itemType}
                            getCurrentFolder={(id) => this.getCurrentFolder(id)}
                            selectedItemId={selectedItemId}
                        />
                    }
                </div>
            </Styles>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    root: state.folders.root,
    currentFolder: state.folders.currentFolder,
    folderStatus: state.folders.status
});

export default connect(mapStateToProps, { fetchFolders, getFolder, clearCurrentFolder, deleteFolder, deleteFile, updateFolder, updateFile, uploadFile })(Dashboard);
