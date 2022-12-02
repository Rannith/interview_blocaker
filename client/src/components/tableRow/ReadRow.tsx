import React from 'react';
import "../table/index.css";
import dayjs from 'dayjs';
import Button from '@mui/material/Button';

const ReadRow = ({ value, handleEdit, handleDelete }) => {

    return (
        <tr>
            <td>{value.meetingName}</td>
            <td>
                {
                    value.technology && value.technology.map(element => {
                        return (
                            <>
                                <ul>
                                    <li>{element}</li>
                                </ul>
                            </>
                        )
                    })
                }
            </td>
            <td>{dayjs(value.date).format('DD/MM/YYYY')}</td>
            <td>{dayjs(value.startTime).format('hh:mm A')}</td>
            <td>{dayjs(value.endTime).format('hh:mm A')}</td>
            <td>
                <div className='action-button-container' >
                    <Button color='inherit' variant='contained' onClick={(e) => handleEdit(e, value)} >Edit</Button>
                    <Button color='inherit' variant='contained' onClick={(e) => handleDelete(value._id)} >Delete</Button>
                </div>
                {/* <button type='button' onClick={(e) => handleEdit(e, value)} >Edit</button> */}
                {/* <button type='button' onClick={(e) => handleDelete(value._id)} >Delete</button> */}
            </td>
        </tr>
    );
}

export default ReadRow;