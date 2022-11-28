import axios from "axios";
import { Dispatch } from "react";
import { InputFieldSlot, UserState } from "../shared/types/type";
import * as types from "./actionType";

export const mySlots = (slots: UserState): any => ({
    type: types.GET_MY_SLOTS,
    payload: slots
})

// export const mySlots = (id: any): any => ({
//     type: types.GET_MY_SLOTS,
//     payload: id
// })

export const addSlotSuccess = (values: InputFieldSlot): any => ({
    type: types.ADD_SLOT,
    payload: values
})

export const editSlotSuccess = (values: InputFieldSlot): any => ({
    type: types.EDIT_SLOT,
    payload: values
})

export const deleteSlotSuccess = (id): any => ({
    type: types.DELETE_SLOT,
    payload: id
})

export const getSuccessMessage = (message) => ({
    type: types.GET_SUCCESS_MESSAGE,
    payload: message
})

export const getErrorMessage = (message) => ({
    type: types.GET_ERROR_MESSAGE,
    payload: message
})

export const getUserSlot = () => (
    dispatch: Dispatch<any>
) => {
    console.log("hi hi");
    axios.get("http://localhost:8080/booking")
        .then((res) => {
            // if (res.status === 200) {
                dispatch(mySlots(res.data));
                console.log("Action all slot: ", res.data);
            // }
        })
        .catch((error) => {
            console.log("Error in all slot dispatch: ", error.response.data.error);
        })
}

export const addSlot = (values: any) => (
    dispatch: Dispatch<any>
) => {
    console.log("bye bye", values);
    
    axios.post("http://localhost:8080/booking", values)
        .then((res) => {
            dispatch(addSlotSuccess(res.data));
            console.log("Action add slot: ", res.data);
        })
        .catch((error) => {
            console.log("Error in add slot dispatch: ", error)
        })
}

export const editSlot = (id: any, values: InputFieldSlot) => (
    dispatch: Dispatch<any>
) => {
    console.log("Edit slot id : ", id)
    axios.put(`http://localhost:8080/booking/${id}`, values)
        .then((res) => {
            dispatch(editSlotSuccess(res.data))
            dispatch(getSuccessMessage(`Slot ID: ${id}, updated successfully`))
            console.log("Response from edit slot", res.data);
        })
        .catch((error) => {
            console.log("Error in edit slot dispatch: ", error.response.data.error);
            dispatch(getErrorMessage(`This slot ID: ${id} have not updaated`))
        })
}

export const deleteSlot = (id: any) => (
    dispatch: Dispatch<any>
) => {
    console.log("DELETE ID : ", id);

    axios.delete(`http://localhost:8080/booking/${id}`, id)
        .then((res) => {
            if (res.status === 200) {
                dispatch(deleteSlotSuccess(res.data))
                dispatch(getSuccessMessage(`Slot ID: ${id}, deleted successfully`))
                console.log("delete response : ", res.data)
                console.log("res.status", res.status); 
            }
        })
        .catch((error) => {
            console.log("Error in delete slot dispatch: ", error)
            dispatch(getErrorMessage(`This slot ID: ${id} have not deleted`))
        })
}

// export const getUserSlot = (id: any) => (
//     dispatch: Dispatch<any>
// ) => {
//     axios.get(`http://localhost:8080/booking/${id}`, id)
//         .then((res) => {
//             if (res.status === 200) {
//                 dispatch(mySlots(res.data));
//                 console.log("Action all slot: ", res.data);
//             }
//         })
//         .catch((error) => {
//             console.log("Error in all slot dispatch: ", error.response.data.error);
//         })
// }