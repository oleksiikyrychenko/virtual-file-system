import React, { Component } from 'react';
import Styles from "./styles";
import { Modal, Tree} from "antd";
import {connect} from "react-redux";
import {copyFolder, cutFolder, fetchFolders, getTree, updateFolder} from "../../../store/folders/actions";
import folderIcon from "../../../assets/icons/folder.png";
import {copyFile, updateFile} from "../../../store/files/actions";
import Alert from "react-s-alert";
const { TreeNode } = Tree;


class CopyModal extends Component{
    state = {
        selectedFolderId: null
    };

    componentDidMount() {
        const { getTree } = this.props;
        getTree();
    }

    onSelect = (key) => {
        this.setState({
            selectedFolderId: +key[0]
        })
    };

    folderTitle = (title) => (
        <div className={'tree-folder'}>
            <div className={'logo-wrapper'}>
                <img src={folderIcon} alt={'folder folder-icon'}/>
            </div>
            {title}
        </div>
    );

    copy = async (rootFolder = false) => {
        const { copyFile, itemType, selectedItemId, copyFolder, closeHandler, currentFolder, getCurrentFolder, fetchFolders } = this.props;
        const { selectedFolderId } = this.state;
        const selectedFolder = rootFolder? null : selectedFolderId;
        if(itemType === 'file') {
           await copyFile(selectedItemId, selectedFolder)
        } else {
            await copyFolder(selectedItemId, selectedFolder).catch((e) => Alert.error(e.error.response.data.message));
        }

        if(currentFolder.id) {
            getCurrentFolder(currentFolder.id);
        } else {
            fetchFolders()
        }

        Alert.success('Copy successful');
        closeHandler();
    };

    cut = async (rootFolder = false) => {
        const { cutFolder, fetchFolders, currentFolder, updateFile, itemType, selectedItemId, getCurrentFolder, closeHandler } = this.props;
        const { selectedFolderId } = this.state;

        if (itemType === 'folder') {
            await cutFolder(selectedItemId, {parent_id: rootFolder? null : selectedFolderId})
                .catch((e) => Alert.error(e.error.response.data.message));
        } else {
            await updateFile(selectedItemId, {folder_id: rootFolder? null :selectedFolderId});
        }

        if(currentFolder.id) {
            getCurrentFolder(currentFolder.id);
        } else {
            fetchFolders()
        }
        closeHandler();
    };

    renderTree = data =>
        data.map(item => {
            if (item.child) {
                return (
                    <TreeNode title={this.folderTitle(item.title)} key={item.id} dataRef={item}>
                        {this.renderTree(item.child)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} {...item} dataRef={item} />;
        });

    copyPastHandler = (rootFolder = false) => {
        const { modalType } = this.props;
        if(modalType === 'copy') {
            this.copy(rootFolder)
        } else {
            this.cut(rootFolder)
        }
    };

    render() {
        const {visible, closeHandler, tree } = this.props;
        const { selectedFolderId } = this.state;

        return (
            <>
                <Styles/>
                <Modal
                    onCancel={closeHandler}
                    footer={null}
                    visible={visible}
                    className="copy-past-modal"
                    width={'600px'}
                    centered
                >
                    <h1>Choose folder:</h1>
                    <div className={'tree-wrapper'}>
                        <Tree onSelect={this.onSelect}>
                            {this.renderTree(tree)}
                        </Tree>
                    </div>
                    <div className={'footer-block'}>
                            <button className={'button button-root'} onClick={()=>this.copyPastHandler(true)}>
                                Paste into Root
                            </button>
                            <button className={'button button-done'} disabled={!selectedFolderId} onClick={() => this.copyPastHandler(false)}>
                                Paste to selected folder
                            </button>
                    </div>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    tree: state.folders.tree,
    currentFolder: state.folders.currentFolder,
});

export default connect(mapStateToProps, { getTree, updateFolder, updateFile, fetchFolders, copyFile, cutFolder, copyFolder })(CopyModal);
