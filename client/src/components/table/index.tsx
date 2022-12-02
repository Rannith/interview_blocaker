import React, { Dispatch, useState, useEffect } from "react";
import TableRows from "./TableRow";
import { initialStateSlot, initialStateSlotError } from "../../shared/types/types";
import { store } from "../../store";
import { addSlot, getUserSlot, deleteSlot, getSuccessMessage, editSlot, validateTime } from '../../action/action';
import { useSelector } from "react-redux";
import EditRow from "../tableRow/EditRow";
import ReadRow from "../tableRow/ReadRow";
import dayjs from 'dayjs';
import showSuccessMessage, { showErrorMessage } from "../../shared/utils/alertMessage";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const Table = () => {

    const [rowsData, setRowsData] = useState<any>([]);
    const [error, setError] = useState<any>(false);
    const [toggle, setToggle] = useState<number>(1);

    const [editData, setEditData] = useState<any>([]);
    const [editId, setEditId] = useState(null);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const { slots } = useSelector((state: any) => state.slotData)
    const { successMessage } = useSelector((state: any) => state.slotData)

    useEffect(() => {
        dispatchStore(getUserSlot(123, toggle))
    }, [toggle])

    useEffect(() => {
        if (successMessage) {
            showSuccessMessage(successMessage)
        }
    }, [successMessage])

    const validate = (rowsData) => {
        let error: any = (initialStateSlotError)

        if (!rowsData[0].meetingName || !rowsData[0].technology || !rowsData[0].date || !rowsData[0].startTime || !rowsData[0].endTime) {
            error = showErrorMessage("Please fill all the fields");
        }

        return error
    }

    const validateEdit = (editedValue) => {
        let error: any = (initialStateSlotError)
        console.log("Edited value", editedValue);

        if (!editedValue.meetingName || !editedValue.technology || !editedValue.date || !editedValue.startTime || !editedValue.endTime) {
            error = showErrorMessage("Please fill all the fields");
        }

        return error
    }

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
            }
        }
    }

    console.log("edit data after edit : ", editData)

    const handleAdd = (e: React.MouseEvent) => {
        console.log("--Add--");
        e.preventDefault();

        const validation = validate(rowsData);
        if (validation) {
            dispatchStore(addSlot(rowsData[0], toggle));
            setRowsData(rowsData.splice(0, -1));
        }
    }

    const handleDelete = (id: string) => {
        dispatchStore(deleteSlot(id, toggle));
    }

    const handleCancelClick = (index) => {
        console.log("--Cancel--");
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const handleEdit = (e, value) => {
        console.log("--edit--", value._id);  //object id
        e.preventDefault();
        setEditId(value._id);
        let technologyArray = [];
        value.technology.map(e => technologyArray.push(e));
        setEditData(value);
    }

    const handleEditCancel = () => {
        setEditId(null)
    }

    const handleEditFormSubmit = (editedValue) => {

        console.log("edited value ==>> ", editedValue)
        const validation = validateEdit(editedValue);
        if (validation) {
            dispatchStore(editSlot(editId, editedValue, toggle));
            // showSuccessMessage("Slot has been edited");
            setEditId(null);
        }
    };

    return (

        <>
            {
                toggle === 1 ?
                    (<h1 className="tableHeading" ><div>Current Week</div> <strong onClick={(e) => setToggle(2)} ><ArrowCircleRightIcon fontSize="medium" /></strong></h1>) :
                    (<h1 className="tableHeading"><div>Next Week</div> <strong onClick={(e) => setToggle(1)} ><ArrowCircleLeftIcon fontSize="medium" /></strong></h1>)
            }
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
                                            <EditRow rowsData={value} handleEditFormSubmit={handleEditFormSubmit} handleCancelClick={handleEditCancel} />
                                        ) : (
                                            <ReadRow value={value} handleEdit={handleEdit} handleDelete={handleDelete} />
                                        )}
                                    </>
                                ))}
                                <TableRows rowsData={rowsData} handleChange={handleChange} handleAdd={handleAdd} handleCancelClick={handleCancelClick} />
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="buttonContainer">
                    <button className="submitButton" onClick={addTableRows}>ADD</button>
                </div>
            </div>
        </>
    )
}

export default Table;