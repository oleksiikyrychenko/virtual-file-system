export const CREATE_FOLDER = 'CREATE_FOLDER';
export const createFolder = data => ({
    type: CREATE_FOLDER,
    request: {
        method: 'POST',
        url: '/folder',
        data
    }
});

export const DELETE_FOLDER = 'DELETE_FOLDER';
export const deleteFolder = id => ({
    type: DELETE_FOLDER,
    request: {
        method: 'DELETE',
        url: `/folder/${id}`,
        id
    }
});

export const FETCH_FOLDERS = 'FETCH_FOLDERS';
export const fetchFolders = () => ({
    type: FETCH_FOLDERS,
    request: {
        method: 'GET',
        url: '/folder'
    }
});

export const GET_FOLDER = 'GET_FOLDER';
export const getFolder = (id) => ({
    type: GET_FOLDER,
    request: {
        method: 'GET',
        url: `/folder/${id}`
    }
});

export const UPDATE_FOLDER = 'UPDATE_FOLDER';
export const updateFolder = (id, data) => ({
    type: UPDATE_FOLDER,
    request: {
        method: 'PUT',
        url: `/folder/${id}`,
        data
    }
});

export const CUT_FOLDER = 'CUT_FOLDER';
export const cutFolder = (id, data) => ({
    type: CUT_FOLDER,
    request: {
        method: 'PUT',
        url: `/folder/cut/${id}`,
        data
    }
});

export const COPY_FOLDER = 'COPY_FOLDER';
export const copyFolder = (id, folderId) => ({
    type: COPY_FOLDER,
    request: {
        method: 'PUT',
        url: `/folder/copy/${id}`,
        data: {
            parent_id: folderId
        }
    }
});

export const GET_TREE = 'GET_TREE';
export const getTree = () => ({
    type: GET_TREE,
    request: {
        method: 'GET',
        url: '/tree',
    }
});

export const CLEAR_CURRENT_FOLDER = 'CLEAR_CURRENT_FOLDER';
export const clearCurrentFolder = () => ({
    type: CLEAR_CURRENT_FOLDER
});
