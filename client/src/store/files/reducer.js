import { success, error } from 'redux-saga-requests';
import {
    UPLOAD_FILE,
    DELETE_FILE,
    COPY_FILE,
    CREATE_FILE
} from './actions';
import {STATE_STATUSES} from "../../utils/stateStatuses";

const initialState = {
    files: [],
    status: STATE_STATUSES.INIT,
    exception: {
        message: null,
        errors: {}
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_FILE:
        case COPY_FILE:
        case DELETE_FILE:
        case UPLOAD_FILE: {
            return processReducer(state);
        }

        case success(UPLOAD_FILE): {
            return {
                ...state,
                status:STATE_STATUSES.SUCCESS,
                files: [...state.files, action.data.data]
            };
        }

        case success(COPY_FILE):
        case success(CREATE_FILE):
        case success(DELETE_FILE): {
            return {
                status:STATE_STATUSES.SUCCESS,
                ...state
            };
        }

        case error(CREATE_FILE):
        case error(COPY_FILE):
        case error(DELETE_FILE):
        case error(UPLOAD_FILE): {
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
