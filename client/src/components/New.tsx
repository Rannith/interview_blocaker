import React, { Dispatch, useState } from "react";
import "./Table.css";
import data from "../../db.json";
import { InputFieldSlot } from "../shared/types/type";
import { initialStateSlot } from "../shared/types/types";
import ReadRow from "./tableRow/ReadRow";
import EditRow from "./tableRow/EditRow";
import TableRows from "./TableRows";
import { store } from "../store";
import { addSlot } from "../action/action";
import RowTable from "./RowTable";

const New = () => {

    const [values, setValues] = useState(data);
    const [rowsData, setRowsData] = useState([]);

    const [editData, setEditData] = useState<InputFieldSlot>(initialStateSlot);
    const [editId, setEditId] = useState(null);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const addTableRows = () => {
        console.log("add");
        
        const rowsInput = dispatchStore(addSlot)
        // const rowsInput = { initialStateSlot }  
        setRowsData([...rowsData, rowsInput])

    }

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
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
        console.log("cancel");
        
        setEditId(null);
    };

    const handleDeleteClick = (valueId) => {
        const newvalues = [...values];

        const index = values.findIndex((value) => value.id === valueId);

        newvalues.splice(index, 1);

        setValues(newvalues);
    };


    return (
        <>
            <button onClick={addTableRows} >ADD ROW</button>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <form onSubmit={handleEditFormSubmit}>
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
                                    <>
                                    {values.map((value) => (
                                        <>
                                            {editId === value.id ? (
                                                <EditRow editData={editData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                                            ) : (
                                                <ReadRow value={value} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
                                            )}
                                        </>
                                    ))}
                                    {/* {rowsData.map((value) => {
                                        <>
                                            {rowsData === value.id ? (
                                                <RowTable rowsData={rowsData} handleChange={handleChange} handleCancelClick={handleCancelClick} />
                                            ) : (
                                                <TableRows rowsData={rowsData} handleChange={handleChange} handleCancelClick={handleCancelClick} />
                                            )}
                                        </>
                                    })} */}
                                    </>
                                    <TableRows rowsData={rowsData} handleChange={handleChange} handleCancelClick={handleCancelClick} />
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div className="col-sm-4">
                    </div>
                </div>
            </div>
        </>
    )

}

export default New;