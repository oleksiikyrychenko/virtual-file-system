import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';
import {axiosController} from "../utils/axiosController";

axiosController.setBaseUrl();
export default function* rootSaga() {
    yield createRequestInstance({ driver: createDriver(axiosController.getAxiosInstace()) });
    yield watchRequests();
}
