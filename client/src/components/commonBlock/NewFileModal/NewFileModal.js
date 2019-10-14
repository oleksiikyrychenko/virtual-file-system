import React, { Component } from 'react';
import Styles from "./styles";
import { Modal, Select } from "antd";
import {connect} from "react-redux";
import { Field, Formik } from "formik";
import * as yup from "yup";
import mimeTypes from '../../../utils/mimeTypes';
import {createFile} from "../../../store/files/actions";
import {fetchFolders, getFolder} from "../../../store/folders/actions";

const { Option } = Select;

const validationSchema = yup.object().shape({
    title: yup.string().required('File name is required!')
});

class NewFileModal extends Component{

    state = {
        selectedMimeType: '.txt'
    };

    onSubmit = async ({ title, contents = '' }, rest) => {
        const { selectedMimeType } = this.state;
        const { createFile, closeHandler, currentFolder, fetchFolders, getFolder } = this.props;
        const filename = title + selectedMimeType;
        let folderId = null;

        if(currentFolder.id){
            folderId = currentFolder.id;
        }

        const data = {
            folder_id: folderId,
            title: filename,
            contents
        };

        await createFile(data);

        if(folderId) {
            await getFolder(currentFolder.id);
        } else {
            await fetchFolders();
        }
        closeHandler();
        rest.resetForm({title: '', contents: ''});
    };

    handleChange = (value) => {
        this.setState({
            selectedMimeType: value
        });
    };

    render() {
        const {visible, closeHandler } = this.props;

        return (
            <>
                <Styles/>
                <Modal
                    onCancel={closeHandler}
                    footer={null}
                    visible={visible}
                    className="new-file-modal"
                    width={'600px'}
                    centered
                >
                    <Formik
                        onSubmit={this.onSubmit}
                        validationSchema={validationSchema}
                        initialValues={{ title: '', contents: '' }}
                        render={({ handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}
                                className={'form'}
                            >
                                <h1>Create a file:</h1>
                                <div className={'new-file-form'}>
                                    <div className={'row'}>
                                        <Field
                                            name={'title'}
                                            className={'title-field'}
                                            placeholder={'Enter filename'}
                                        />
                                        <Select defaultValue={'.txt'} onChange={this.handleChange}>
                                            {mimeTypes.map((mime, index) => (
                                                <Option
                                                    value={mime}
                                                    key={index}
                                                >
                                                    {mime}
                                                </Option>
                                            ))
                                            }
                                        </Select>
                                    </div>
                                    <Field
                                        name={'contents'}
                                        className={'contents-field'}
                                        component="textarea"
                                        placeholder={'Enter file contents (optional)'}
                                    />
                                    <button
                                        type={'submit'}
                                        className={'create-file-button'}
                                    >
                                        Create new file
                                    </button>
                                </div>
                            </form>
                        )}
                    />
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    currentFolder: state.folders.currentFolder,
});

export default connect(mapStateToProps, { createFile, getFolder, fetchFolders })((NewFileModal));
