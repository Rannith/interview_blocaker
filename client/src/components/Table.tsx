import React, { useState } from "react";
import "./Table.css";
import data from "../../db.json";
import { InputFieldSlot } from "../shared/types/type";
import { initialStateSlot } from "../shared/types/types";
import ReadRow from "./tableRow/ReadRow";
import EditRow from "./tableRow/EditRow";

const Table = () => {

    const [contacts, setContacts] = useState(data);
    const [addData, setAddData] = useState<InputFieldSlot>(initialStateSlot);
    const [editData, setEditData] = useState<InputFieldSlot>(initialStateSlot);

    const [editId, setEditId] = useState(null);

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

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            id: addData.userId,
            meetingName: addData.meetingName,
            technology: addData.technology,
            date: addData.date,
            startTime: addData.startTime,
            endTime: addData.endTime
        };

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        const editedContact = {
            id: editId,
            meetingName: editData.meetingName,
            technology: editData.technology,
            date: editData.date,
            startTime: editData.startTime,
            endTime: editData.endTime
        };

        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === editId);

        newContacts[index] = editedContact;

        setContacts(newContacts);
        setEditId(null);
    };

    const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditId(contact.id);

        const formValues = {
            meetingName: contact.meetingName,
            technology: contact.technology,
            date: contact.date,
            startTime: contact.startTime,
            endTime: contact.endTime
        };

        setEditData(formValues);
    };

    const handleCancelClick = () => {
        setEditId(null);
    };

    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === contactId);

        newContacts.splice(index, 1);

        setContacts(newContacts);
    };

    return (
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
                        {contacts.map((contact) => (
                            <>
                            {editId === contact.id ? (
                                <EditRow editData={editData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                            ) : (
                                <ReadRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />

                            )}
                                
                            </>
                        ))}
                    </tbody>
                </table>
            </form>

            <h2>ADD</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input type="text" name="meetingName" placeholder="Enter the meeting name" onChange={handleAddFormChange} />
                <input type="text" name="technology" placeholder="Choose the technology name" onChange={handleAddFormChange} />
                <input type="text" name="date" placeholder="Enter the meeting date" onChange={handleAddFormChange} />
                <input type="text" name="startTime" placeholder="Enter the meeting start time" onChange={handleAddFormChange} />
                <input type="text" name="endTime" placeholder="Enter the meeting end time" onChange={handleAddFormChange} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default Table;