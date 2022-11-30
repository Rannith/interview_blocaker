import React, { Dispatch, useState, useEffect } from "react";
import TableRows from "./CompTable";
import { initialStateSlot, initialStateSlotError } from "../shared/types/types";
import { store } from "../store";
import { addSlot, getUserSlot, deleteSlot, getSuccessMessage, editSlot, validateTime } from '../action/action';
import ValidateFields from "../shared/utils/ValidateFields";
import { InputFieldError } from "../shared/types/type";
import { useSelector } from "react-redux";
import EditRow from "./tableRow/EditRow";
import ReadRow from "./tableRow/ReadRow";
import dayjs from 'dayjs';

function AddDeleteTableRows() {


    const [rowsData, setRowsData] = useState<any>([]);
    const [editData, setEditData] = useState<any>([]);

    const [error, setError] = useState<any>(false);
    const [editId, setEditId] = useState(null);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const { slots } = useSelector((state: any) => state.slotData)
    const { successMessage } = useSelector((state: any) => state.slotData)

    useEffect(() => {
        dispatchStore(getUserSlot(123))
    }, [])

    console.log("slots : ", slots)

    const addTableRows = () => {

        const rowsInput = { initialStateSlot }
        setRowsData([...rowsData, rowsInput])

    }

    const handleChange = (index, e) => {
        if (index === "technology") {
            const rowsInput = [...rowsData];
            rowsInput[0][index] = e.target.value;
            setRowsData(rowsInput);
        } else {
            const rowsInput = [...rowsData];
            rowsInput[0][index] = e?.target?.value ? e.target.value : e;
            setRowsData(rowsInput);
            if (index === 'endTime') {
                if (rowsData[0].date && rowsData[0].startTime) {
                    dispatchStore(validateTime({ date: dayjs(rowsData[0].date).format('YYYY-MM-DD'), startTime: rowsData[0].startTime, endTime: rowsData[0].endTime }))
                }
                // dispatchStore(validateTime({date: }))
            }
        }
        // setError(() => validate(rowsData))
    }

    const validate = (value) => {
        const errors: any = {}

        if (!value.meetingName) {
            errors.meetingName = "Meeting name is required"
        }

        return errors
    }

    const handleEdit = (e, value) => {
        console.log("--edit--", value._id);  //undef
        e.preventDefault();
        setEditId(value._id);
        let technologyArray = []
        value.technology.map(e => technologyArray.push(e))
        const formValues = {
            meetingName: value.meetingName,
            technology: technologyArray,
            date: value.date,
            startTime: value.startTime,
            endTime: value.endTime
        };
        setEditData(value);
    }

    console.log("edit data after edit : ", editData)

    const handleAdd = (e: React.MouseEvent) => {
        console.log("--Add--");
        e.preventDefault();
        delete rowsData[0].initialStateSlot;
        // const validation = ValidateFields(rowsData)
        // if (validation) {
        dispatchStore(addSlot(rowsData[0]));
        // const rows = [...rowsData];
        // console.log("rows : ", rows)
        // rows.splice(0, -1);
        setRowsData(rowsData.splice(0, -1));
        // }
    }

    const handleDelete = (id: string) => {
        dispatchStore(deleteSlot(id))
    }

    const handleCancelClick = (index) => {
        console.log("--Cancel--");
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const handleEditCancel = () => {
        console.log("edit cancel");
        setEditId(null)
    }
    const handleEditFormSubmit = (editedValue) => {

        console.log("edited value ==>> ", editedValue)
        dispatchStore(editSlot(editId, editedValue))
        setEditId(null);
    };

    return (

        <>
            <button className="submitButton" onClick={addTableRows} >ADD</button>
            <div className="app-container">
                <div className="row">
                    <div className="col-sm-8">

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Meeting Name</th>
                                    <th>Technology</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>
                            <tbody>
                                {slots && slots.map((value) => (
                                    <>
                                        {editId === value._id ? (
                                            <EditRow rowsData={editData} handleEditFormSubmit={handleEditFormSubmit} handleCancelClick={handleEditCancel} />
                                        ) : (
                                            <ReadRow value={value} handleEdit={handleEdit} handleDelete={handleDelete} />
                                        )}
                                        {/* <ReadRow value={value} handleEdit={handleEdit} handleDelete={handleDelete} /> */}
                                    </>
                                ))}
                                <TableRows rowsData={rowsData} error={error} handleChange={handleChange} handleAdd={handleAdd} handleCancelClick={handleCancelClick} />

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )

}
export default AddDeleteTableRows