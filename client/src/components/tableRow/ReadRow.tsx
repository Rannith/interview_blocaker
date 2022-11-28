import React from 'react';
import "../Table.css";
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';

const ReadRow = ({ value, handleEditClick, handleDeleteClick }) => {

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
                {value.technology}
                {/* <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[options[4], options[5]]}
                    isMulti
                    options={options} */}
                {/* /> */}
            </td>
            <td>{value.date}</td>
            <td>{value.startTime}</td>
            <td>{value.endTime}</td>
            <td>
                <button type='button' className='submitButton' onClick={(e) => handleEditClick(e, value)}>Edit</button>
                <button type='button' className='submitButton' onClick={() => handleDeleteClick(value.id)}>Delete</button>
            </td>
        </tr>
    );
}

export default ReadRow;