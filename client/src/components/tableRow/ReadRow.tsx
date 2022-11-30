import React from 'react';
import "../Table.css";
import dayjs from 'dayjs';
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';

const ReadRow = ({ value,handleEdit, handleDelete }) => {

    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    //   ]
    // const animatedComponents = makeAnimated();

    return (
        <tr>
            <td>{value.meetingName}</td>
            <td>
                {value.technology && value.technology.map(element => `${element}/`)}
                {/* <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[options[4], options[5]]}
                    isMulti
                    options={options} */}
                {/* /> */}
            </td>
            <td>{dayjs(value.date).format('DD/MM/YYYY')}</td>
            <td>{dayjs(value.startTime).format('hh:mm A')}</td>
            <td>{dayjs(value.endTime).format('hh:mm A')}</td>
            <td>
                <button type='button' onClick={(e) => handleEdit(e, value)} >Edit</button>
                <button type='button' onClick={(e) => handleDelete(value._id)} >Delete</button>
            </td>
        </tr>
    );
}

export default ReadRow;