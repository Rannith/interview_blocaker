import React, { useState } from "react";
import "./Table.css";
import data from "../../db.json";
import { InputFieldSlot } from "../shared/types/type";
import { initialStateSlot } from "../shared/types/types";
import ReadRow from "./tableRow/ReadRow";
import EditRow from "./tableRow/EditRow";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Table = () => {

    const [values, setValues] = useState(data);
    const [addData, setAddData] = useState<InputFieldSlot>(initialStateSlot);
    const [editData, setEditData] = useState<InputFieldSlot>(initialStateSlot);

    const [editId, setEditId] = useState(null);

    // const handleAddRow = () => {
    //     console.log("hi ADD ROW");
    //     const item = {initialStateSlot};
    //     setValues([...values, item]);
    // };


    const handleAddFormChange = (e) => {
        e.preventDefault();
        setAddData({
            ...addData,
            [e.target.name]: e.target.value
        })
    };

    const handleEditFormChange = (e) => {
        e.preventDefault();
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    };

    const handleAddFormSubmit = (e) => {
        e.preventDefault();

        const newValue = {
            id: addData.userId,
            meetingName: addData.meetingName,
            technology: addData.technology,
            date: addData.date,
            startTime: addData.startTime,
            endTime: addData.endTime
        };

        const newvalues = [...values, newValue];
        setValues(newvalues);
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

        const newvalues = [...values];

        const index = values.findIndex((value) => value.id === editId);

        newvalues[index] = editedvalue;

        setValues(newvalues);
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
        setEditId(null);
    };

    const handleDeleteClick = (valueId) => {
        const newvalues = [...values];

        const index = values.findIndex((value) => value.id === valueId);

        newvalues.splice(index, 1);

        setValues(newvalues);
    };

    const handleAdd = () => {
        console.log("hi ADD");
        <>
            <form onSubmit={handleAddFormSubmit}>
                <input type="text" name="meetingName" placeholder="Enter the meeting name" onChange={handleAddFormChange} />
                <input type="text" name="technology" placeholder="Choose the technology name" onChange={handleAddFormChange} />
                <input type="text" name="date" placeholder="Enter the meeting date" onChange={handleAddFormChange} />
                <input type="text" name="startTime" placeholder="Enter the meeting start time" onChange={handleAddFormChange} />
                <input type="text" name="endTime" placeholder="Enter the meeting end time" onChange={handleAddFormChange} />
                <button type="submit">Add T</button>
            </form>
        </>
    }

    return (
        <>
            <button type="submit" onClick={handleAdd}>Add</button>
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
                            {/* {values.map((value) => (
                                <>
                                    {editId === value.id ? (
                                        <EditRow editData={editData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                                    ) : (
                                        <ReadRow value={value} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
                                    )}
                                </>
                            ))} */}
                        </tbody>
                    </table>
                </form>

                <h2 style={{ textAlign: "center" }}>ADD</h2>
                <form onSubmit={handleAddFormSubmit}>
                    <input type="text" name="meetingName" placeholder="Enter the meeting name" onChange={handleAddFormChange} />
                    <input type="text" name="technology" placeholder="Choose the technology name" onChange={handleAddFormChange} />
                    <input type="text" name="date" placeholder="Enter the meeting date" onChange={handleAddFormChange} />
                    <input type="text" name="startTime" placeholder="Enter the meeting start time" onChange={handleAddFormChange} />
                    <input type="text" name="endTime" placeholder="Enter the meeting end time" onChange={handleAddFormChange} />
                    <button type="submit">Add</button>
                </form>
            </div>
        </>

    );
}

export default Table;