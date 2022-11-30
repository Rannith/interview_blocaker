import React, { Dispatch, useEffect, useState } from "react";
import "./Table.css";
import data from "../../db.json";
import { InputFieldSlot } from "../shared/types/type";
import { initialStateSlot } from "../shared/types/types";
import ReadRow from "./tableRow/ReadRow";
import EditRow from "./tableRow/EditRow";
import TableRows from "./TableRows";
import { store } from "../store";
import { addSlot, deleteSlot, getUserSlot } from "../action/action";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const New = () => {

    const [values, setValues] = useState<any>();
    const [rowsData, setRowsData] = useState<any>([]);
    const [tableValues, setTableValues] = useState([])
    const [success, setSuccess] = useState(false)

    const [editData, setEditData] = useState<InputFieldSlot>(initialStateSlot);
    const [editId, setEditId] = useState(null);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const navigate = useNavigate()

    const addTableRows = () => {
        console.log("add");

        // const rowsInput = dispatchStore(addSlot)
        const rowsInput = { initialStateSlot }
        setRowsData([...rowsData, rowsInput])
        setSuccess(true)
    }

    useEffect(() => {
        // dispatchStore(getUserSlot())
    })

    const handleChange = (index, e) => {
        if (index === "technology") {
            console.log("index : ", index);
            console.log("eve : ", e.target.value);

            const rowsInput = [...rowsData];
            rowsInput[0][index] = e.target.value;
            setRowsData(rowsInput);
        } else {
            const { name, value } = e.target;
            const rowsInput = [...rowsData];
            rowsInput[index][name] = value;
            setRowsData(rowsInput);
        }
    }

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log("added", rowsData[0]);
        delete rowsData[0].initialStateSlot;
        console.log("roww data : ", rowsData[0]);

        alert("Slot booked successfully!")
        dispatchStore(addSlot(rowsData[0]));


    }

    const handleEditFormChange = (e) => {
        e.preventDefault();
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        const editedvalue = {
            id: editId,
            meetingName: editData.meetingName,
            technology: editData.technology,
            date: editData.date,
            startTime: editData.startTime,
            endTime: editData.endTime
        };

        // const newvalues = [...values];

        // const index = values.findIndex((value) => value.id === editId);

        // newvalues[index] = editedvalue;

        // setValues(newvalues);
        setEditId(null);
    };

    const handleEditClick = (e, value) => {
        e.preventDefault();
        setEditId(value.id);

        const formValues = {
            meetingName: value.meetingName,
            technology: value.technology,
            date: value.date,
            startTime: value.startTime,
            endTime: value.endTime
        };

        setEditData(formValues);
    };

    const handleCancelClick = () => {
        console.log("cancel");

        setEditId(null);

        setRowsData(null);
    };

    const handleDeleteClick = (valueId) => {
        console.log("delete");

        // const newvalues = [...values];
        // dispatchStore(deleteSlot(valueId))


        // setValues(newvalues);

        // const newvalues = [...values];

        // const index = values.findIndex((value) => value.id === valueId);

        // newvalues.splice(index, 1);

        // setValues(newvalues);
    };


    return (
        <>
            <button onClick={addTableRows} className="submitButton">ADD ROW</button>
            <br /><br />
            <div className="app-container">
                <form onSubmit={handleEditFormSubmit}>
                    <table>
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
                            {/* {rowsData && rowsData.map((value) => (
                                <>
                                    {editId === value.id ? (
                                        <EditRow editData={editData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />  //ok
                                    ) : (
                                        <ReadRow value={value} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />  //ok
                                    )}
                                </>
                            ))}
                            {
                                tableValues.length ? tableValues.length ===0 ? <h5>No slots booked</h5>:<TableRows rowsData={rowsData} handleChange={handleChange} handleAdd={handleAdd} handleCancelClick={handleCancelClick} />:<h3>Loading</h3>
                            } */}
                            <TableRows rowsData={rowsData} handleChange={handleChange} handleAdd={handleAdd} handleCancelClick={handleCancelClick} />
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    )

}

export default New;