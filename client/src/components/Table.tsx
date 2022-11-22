import React, { useState } from "react";
import "./Table.css";
import data from "../../db.json";

const Table = () => {

    const [contacts, setContacts] = useState(data);
    const [addData, setAddData] = useState({
        meetingName: '',
        technology: '',
        date: '',
        startTime: '',
        endTime: ''
    })

    const handleAddFormChange = (e) => {
        e.preventDefault();
    
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
    
        const newFormData = { ...addData };
        newFormData[fieldName] = fieldValue;
    
        setAddData(newFormData);
      };

    return (
        <div className="app-container">
            <table>
                <thead>
                    <tr>
                        <th>Meeting Name</th>
                        <th>Technology</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr>
                            <td>{contact.meetingName}</td>
                            <td>{contact.technology}</td>
                            <td>{contact.date}</td>
                            <td>{contact.startTime}</td>
                            <td>{contact.endTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>ADD</h2>
            <form>
                <input type="text" name = "meetingName" placeholder="Enter the meeting name" />
                <input type="text" name = "technology" placeholder="Choose the technology name" />
                <input type="text" name = "date" placeholder="Enter the meeting date" />
                <input type="text" name = "startTime" placeholder="Enter the meeting start time" />
                <input type="text" name = "endTime" placeholder="Enter the meeting end time" />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default Table;