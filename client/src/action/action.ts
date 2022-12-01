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

export const technology = (value) => ({
    type: types.GET_TECHNOLOGY,
    payload: value
})

// export const getUserSlot = () => (
//     dispatch: Dispatch<any>
// ) => {
//     console.log("hi hi");
//     axios.get("http://localhost:8080/booking")
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

export const getTechnology = () => (
    dispatch: Dispatch<any>
) => {
    axios.get(`http://localhost:8080/api/v1/booking/technology`)
        .then((res) => {
            // console.log(res.data.results)
            dispatch(technology(res.data.results))
        })
        .catch((error) => {
            console.log("Error in technology dispatch : ", error)
        })
}

export const addSlot = (values: any) => (
    dispatch: Dispatch<any>
) => {
    console.log("bye bye", values);

    const userId = "637ba72983e8e55819414ff9"

    axios.post(`http://localhost:8080/api/v1/booking/${userId}`, values)
        .then((res) => {
            dispatch(addSlotSuccess(res.data.message));
            dispatch(getUserSlot(123))  // all user
            dispatch(getSuccessMessage(res.data.message))
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
    axios.put(`http://localhost:8080/api/v1/booking/${id}`, values)
        .then((res) => {
            dispatch(editSlotSuccess(res.data))
            // dispatch(getSuccessMessage(`Slot ID: ${id}, updated successfully`))
            dispatch(getUserSlot(123))
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

    axios.delete(`http://localhost:8080/api/v1/booking/${id}`)
        .then((res) => {
            if (res.status === 200) {
                dispatch(deleteSlotSuccess(res.data))
                // dispatch(getSuccessMessage(`Slot ID: ${id}, deleted successfully`))
                dispatch(getUserSlot(123))
                console.log("delete response : ", res.data)
                console.log("res.status", res.status);
            }
        })
        .catch((error) => {
            console.log("Error in delete slot dispatch: ", error)
            dispatch(getErrorMessage(`This slot ID: ${id} have not deleted`))
        })
}

export const getUserSlot = (id: any) => (
    dispatch: Dispatch<any>
) => {
    const userId = "637ba72983e8e55819414ff9"

    axios.get(`http://localhost:8080/api/v1/booking/slots/2/${userId}`)
        .then((res) => {
            if (res.status === 200) {
                console.log(res.data.results);
                
                dispatch(mySlots(res.data.results));
                dispatch(getSuccessMessage(res.data.message))
                // console.log("Action all slot: ", res.data);
            }
        })
        .catch((error) => {
            console.log("Error in all slot dispatch: ", error.response.data.error);
        })
}

export const validateTime = (value) => (
    dispatch: Dispatch<any>
) => {
    axios.post(`http://localhost:8080/api/v1/timeValidator`, value)
        .then((res) => {
            // console.log(res.data)
            dispatch(getSuccessMessage(res.data.message))
        })
        .catch((error) => {
            console.log("Error in validate time dispatch : ", error.response.data)
            dispatch(getErrorMessage(error.response.data.message))
        })
}