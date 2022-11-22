import axios from "axios";
import { Dispatch } from "react";
import * as types from "./actionType";

export const mySlots = (id: any): any => ({
    type: types.GET_MY_SLOTS,
    payload: id
})

export const getMySlot = (id: any) => (
    dispatch: Dispatch<any>
) => {
    axios.get(`http://localhost:8080/user/${id}`, id)
        .then((res) => {
            if (res.status === 200) {
                dispatch(mySlots(res.data));
                console.log("Action all slot: ", res.data);
            }
        })
        .catch((error) => {
            console.log("Error in all slot dispatch: ", error.response.data.error);
        })
}