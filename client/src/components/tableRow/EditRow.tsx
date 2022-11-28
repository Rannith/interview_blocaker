import React from 'react';
import "../Table.css";

const EditRow = ({ editData, handleEditFormChange, handleCancelClick }) => {

    return (
        <tr>
            <td>
                <input type="text" name="meetingName" placeholder="Enter the meeting name" value={editData.meetingName} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="text" name="technology" placeholder="Choose the technology name" value={editData.technology} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="text" name="date" placeholder="Enter the meeting date" value={editData.date} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="text" name="startTime" placeholder="Enter the meeting start time" value={editData.startTime} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="text" name="endTime" placeholder="Enter the meeting end time" value={editData.endTime} onChange={handleEditFormChange} />
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    );
}

export default EditRow;