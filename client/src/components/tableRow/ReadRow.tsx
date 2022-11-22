import React from 'react';

const ReadRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{contact.meetingName}</td>
            <td>{contact.technology}</td>
            <td>{contact.date}</td>
            <td>{contact.startTime}</td>
            <td>{contact.endTime}</td>
            <td>
                <button type='button' onClick={(e) => handleEditClick(e, contact)}>Edit</button>
                <button type='button' onClick={() => handleDeleteClick(contact.id)}>Delete</button>
            </td>
        </tr>
    );
}

export default ReadRow;