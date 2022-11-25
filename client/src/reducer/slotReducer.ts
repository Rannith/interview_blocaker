import * as types from "../action/actionType";
import { SlotActionsTypes, SlotState } from "../shared/types/type";

const initialState: SlotState = {
    slots: [{}],
    slot: {
        meetingName: '',
        userId: null,
        date: null,
        technology: null,
        startTime: '',
        endTime: '',
    },
    successMessage: '',
    errorMessage: ''
}

const slotReducer = (state: SlotState = initialState, action: SlotActionsTypes): SlotState => {
    switch (action.type) {

        case types.GET_MY_SLOTS:
            return {
                ...state,
                slots: action.payload,
                successMessage: action.payload,
                errorMessage: ""
            }
        case types.ADD_SLOT:
            return {
                ...state,
                slot: action.payload,
                successMessage: action.payload,
                errorMessage: ""
            }
        case types.EDIT_SLOT:
            return {
                ...state,
                slot: action.payload,
                successMessage: action.payload,
                errorMessage: ""
            }
        case types.DELETE_SLOT:
            return {
                ...state,
                slot: action.payload,
                successMessage: action.payload,
                errorMessage: ""
            }
        case types.GET_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: action.payload,
                errorMessage: ""
            }
        case types.GET_ERROR_MESSAGE:
            return {
                ...state,
                successMessage: "",
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default slotReducer;