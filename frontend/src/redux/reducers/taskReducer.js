import { BaseReducer } from "./BaseReducer";


export class TaskReducer extends BaseReducer {
    initialState = {
        task: [],
        loading: false,
    };

    ["GET_TASK_REQUEST"](state, action) {
        return { ...state, loading: true };
    }

    ["GET_TASK_SUCCESS"](state, action) {
        return {
            ...state,
            task: action.payload,
            loading: false,
        };
    }

    ["GET_TASK_FAIL"](state, action) {
        return {
            ...state,
            loading: false,
        };
    }


}

