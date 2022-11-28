//ADD ROW 

import React from "react";

const RowTable = ({ rowsData, handleChange, handleCancelClick }) => {
    return (

        <>
            {rowsData && rowsData.map((data: any, index: any) => {
                const { meetingName, technology, date, startTime, endTime } = data;
                return (
                    <tr key={index}>
                        <td><input type="text" value={meetingName} onChange={(evnt) => (handleChange(index, evnt))} name="meetingName" className="form-control" /> </td>
                        <td><input type="text" value={technology} onChange={(evnt) => (handleChange(index, evnt))} name="technology" className="form-control" /> </td>
                        <td><input type="text" value={date} onChange={(evnt) => (handleChange(index, evnt))} name="date" className="form-control" /> </td>
                        <td><input type="text" value={startTime} onChange={(evnt) => (handleChange(index, evnt))} name="startTime" className="form-control" /></td>
                        <td><input type="text" value={endTime} onChange={(evnt) => (handleChange(index, evnt))} name="endTime" className="form-control" /> </td>
                        <td><button type="submit">Save</button>
                        <button type="button" onClick={handleCancelClick}>Cancel</button></td>
                    </tr>
                )
            })}
        </>

    )
}

export default RowTable;