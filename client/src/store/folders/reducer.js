import { success, error } from 'redux-saga-requests';
import {
    FETCH_FOLDERS,
    GET_FOLDER,
    CLEAR_CURRENT_FOLDER,
    CREATE_FOLDER,
    DELETE_FOLDER,
    UPDATE_FOLDER,
    GET_TREE,
    CUT_FOLDER,
    COPY_FOLDER
} from './actions';
import { STATE_STATUSES } from "../../utils/stateStatuses";

const initialState = {
    status: STATE_STATUSES.INIT,
    root: {
        folders: [],
        files: []
    },
    currentFolder: {
        folders: [],
        files: []
    },
    tree: [],
    exception: {
        message: null,
        errors: {}
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case COPY_FOLDER:
        case CUT_FOLDER:
        case GET_FOLDER:
        case CREATE_FOLDER:
        case GET_TREE:
        case UPDATE_FOLDER:
        case DELETE_FOLDER:
        case FETCH_FOLDERS: {
            return processReducer(state);
        }

        case success(FETCH_FOLDERS): {
            return {
                ...state,
                status:STATE_STATUSES.SUCCESS,
                root: {
                    folders: action.data.data.folders,
                    files: action.data.data.files
                }
            };
        }

        case success(GET_FOLDER): {
            return {
                ...state,
                status:STATE_STATUSES.SUCCESS,
                currentFolder: {
                    ...action.data.data.folder,
                    folders: [...action.data.data.child]
                }
            };
        }

        case success(COPY_FOLDER):
        case success(CUT_FOLDER):
        case success(UPDATE_FOLDER): {
            return {
                ...state
            };
        }

        case success(GET_TREE): {
            return {
                ...state,
                tree: action.data.data
            };
        }

        case success(CREATE_FOLDER): {
            let newState = {};
            if(state.currentFolder.id){
                newState = {
                    currentFolder: {
                        ...state.currentFolder,
                        folders: [...state.currentFolder.folders, action.data.data.folder]
                    }
                }
            } else {
                newState = {
                    root: {
                        ...state.root,
                        folders: [...state.root.folders, action.data.data.folder]
                    }
                }
            }
            return {
                ...state,
                status: STATE_STATUSES.SUCCESS,
                ...newState
            };
        }

        case success(DELETE_FOLDER): {
            let newState = {};
            const id = action.meta.requestAction.request.id;
            if(state.currentFolder.id){
                newState = {
                    currentFolder: {
                        ...state.currentFolder,
                        folders: state.currentFolder.folders.filter( item => item.id !== id)
                    }
                }
            } else {
                newState = {
                    root: {
                        ...state.root,
                        folders: state.root.folders.filter( item => item.id !== id)
                    }
                }
            }

            return {
                ...state,
                ...newState,
                status:STATE_STATUSES.SUCCESS,
            };
        }

        case CLEAR_CURRENT_FOLDER: {
            return {
                ...state,
                status:STATE_STATUSES.SUCCESS,
                currentFolder: {...initialState.currentFolder}
            };
        }

        case error(COPY_FOLDER):
        case error(CUT_FOLDER):
        case error(GET_FOLDER):
        case error(GET_TREE):
        case error(UPDATE_FOLDER):
        case error(DELETE_FOLDER):
        case error(CREATE_FOLDER):
        case error(FETCH_FOLDERS): {
            return errorReducer(action, state);
        }

        default:
            return state;
    }
};

const processReducer = (state = initialState) => ({
    ...state,
    status: STATE_STATUSES.PENDING,
    exception: { ...initialState.exception }
});

const errorReducer = (exception, state = initialState) => {
    return ({
        ...state,
        status: STATE_STATUSES.ERROR,
        exception: {
            errors: {...exception.error.response.data.errors},
            message: exception.error.response.data.message
        }
    });
};
