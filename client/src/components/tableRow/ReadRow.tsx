import React from 'react';

const ReadRow = ({ value, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{value.meetingName}</td>
            <td>{value.technology}</td>
            <td>{value.date}</td>
            <td>{value.startTime}</td>
            <td>{value.endTime}</td>
            <td>
                <button type='button' onClick={(e) => handleEditClick(e, value)}>Edit</button>
                <button type='button' onClick={() => handleDeleteClick(value.id)}>Delete</button>
            </td>
        </tr>
    );
}

export default ReadRow;