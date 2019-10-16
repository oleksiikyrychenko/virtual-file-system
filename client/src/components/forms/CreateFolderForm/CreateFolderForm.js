import React, { Component }  from 'react';
import { Field, Formik } from "formik";
import Styles from "./styles";
import {Icon, Upload} from "antd";
import * as yup from "yup";
import { validationFileSize } from "../../../utils/helpers";
import {connect} from "react-redux";
import {createFolder, fetchFolders, getFolder} from "../../../store/folders/actions";
import { uploadFile } from "../../../store/files/actions";
import Alert from 'react-s-alert';
import NewFileModal from "../../commonBlock/NewFileModal";

const validationSchema = yup.object().shape({
    newFolder: yup.string().required('Folder name is required!')
});

class CreateFolderForm extends Component {
    state = {
        fileList: null,
        modalVisible: false
    };

    onChangeUploadFile = ({ fileList }) => {
        if (fileList[0]) {
            this.setState({ fileList });
        }
    };

    uploadFile = async ({ file, onSuccess }) => {
        const { uploadFile, currentFolder, getFolder, fetchFolders } = this.props;
        if (!validationFileSize(file)) {
            return Alert.error('Maximum file size 5 mb');
        }
        const id = currentFolder.id ? currentFolder.id : null;
        const formData = new FormData();
        formData.append('file', file);
        if(id) {
            formData.append('folder_id', id);
        }

        try {
            await uploadFile(formData);
            if(id) {
                await getFolder(currentFolder.id);
            } else {
                fetchFolders();
            }

            onSuccess('ok');
        } catch (error) {
            Alert.error('Failed to upload file, please try again later.');
        }
    };

    createFolder = async ({ newFolder }, rest) => {
        const { currentFolder, createFolder, user } = this.props;
        const data = {
            parent_id: currentFolder.id ? currentFolder.id : null,
            title: newFolder,
            user_id: user.id
        };
        await createFolder(data).catch((e) => Alert.error(e.error.response.data.message) );
        rest.resetForm({newFolder: ''});
    };

    render() {
        const { fileList, modalVisible } = this.state;
        return (
            <Styles>
                <Formik
                    onSubmit={this.createFolder}
                    validationSchema={validationSchema}
                    initialValues={{ newFolder: '' }}
                    render={({ handleSubmit, errors, touched }) => (
                        <form
                            onSubmit={handleSubmit}
                            className={'form'}
                        >
                            <div className={'new-folder-form'}>
                                <Field
                                    name={'newFolder'}
                                    className={`folder-field ${errors['newFolder'] && touched['newFolder'] && 'error'}`}
                                    placeholder={errors['newFolder'] && touched['newFolder'] ? 'Folder name is required' :'Create a new folder' }
                                />
                                <button
                                    type={'submit'}
                                    className={'add-folder-button'}
                                >
                                    Add new folder
                                </button>
                                <div className={'add-file'}>
                                    <Upload
                                        onChange={this.onChangeUploadFile}
                                        listType={'text'}
                                        fileList={fileList}
                                        customRequest={item => this.uploadFile(item)}
                                    >
                                        <div className={'add-file-button'}>
                                            <Icon type="upload" />
                                            Upload your file to this folder
                                        </div>
                                    </Upload>
                                </div>
                                <button
                                    type={'button'}
                                    className={'add-new-file'}
                                    onClick={() => this.setState({ modalVisible: true })}
                                >
                                    Create file
                                </button>
                            </div>
                        </form>
                    )}
                />
                <NewFileModal
                    visible={modalVisible}
                    closeHandler={() => this.setState({ modalVisible: false})}
                />
            </Styles>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    currentFolder: state.folders.currentFolder,
    folderStatus: state.folders.status
});

export default connect(mapStateToProps, { createFolder, uploadFile, getFolder, fetchFolders })(CreateFolderForm);
