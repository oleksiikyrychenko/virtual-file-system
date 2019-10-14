export const UPLOAD_FILE = 'UPLOAD_FILE';
export const uploadFile = data => ({
    type: UPLOAD_FILE,
    request: {
        method: 'POST',
        url: '/file',
        data
    }
});

export const DELETE_FILE = 'DELETE_FILE';
export const deleteFile = id => ({
    type: DELETE_FILE,
    request: {
        method: 'DELETE',
        url: `/file/${id}`,
    }
});

export const UPDATE_FILE = 'UPDATE_FILE';
export const updateFile = (id, data) => ({
    type: UPDATE_FILE,
    request: {
        method: 'PUT',
        url: `/file/${id}`,
        data
    }
});

export const COPY_FILE = 'COPY_FILE';
export const copyFile = (id, folderId) => ({
    type: COPY_FILE,
    request: {
        method: 'PUT',
        url: `/file/copy/${id}`,
        data: {
            folder_id: folderId
        }
    }
});

export const CREATE_FILE = 'CREATE_FILE';
export const createFile = (data) => ({
    type: CREATE_FILE,
    request: {
        method: 'POST',
        url: '/file/create',
        data
    }
});
