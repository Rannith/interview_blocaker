//ADD ROW 

import React, { useState } from "react";
import "./Table.css";
// import Select from 'react-select';
import Select from "@mui/material/Select";
import makeAnimated from 'react-select/animated';
import { Box } from "@mui/system";
import { Chip, OutlinedInput, useTheme } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import '@progress/kendo-theme-default/dist/all.css';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { TimePicker } from '@progress/kendo-react-dateinputs';

const TableRows = ({ rowsData, handleChange, handleAdd, handleCancelClick }) => {

    const [technologyArray, setTech] = useState([])

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const animatedComponents = makeAnimated();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const theme = useTheme();

    const handleChangess = (event) => {
        console.log("trigged");

        const {
            target: { value },
        } = event;
        setTech(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        handleChange("technology", event)
    };

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const min = new Date()
    const max = new Date()
    max.setDate(max.getDate() + 7)

    console.log("row : ", rowsData);
    

    return (

        <>
            {rowsData && rowsData.map((data: any, index: any) => {

                let { meetingName, technology, date, startTime, endTime } = data;
                return (
                    <tr key={index}>
                        <td><input type="text" value={meetingName} onChange={(evnt) => (handleChange(index, evnt))} name="meetingName" className="form-control" /> </td>
                        <td>
                            <Select
                                multiple
                                value={technologyArray}
                                onChange={handleChangess}
                                input={<OutlinedInput id="select-multiple-chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {options && options.map((element) => (
                                    <MenuItem
                                        key={element.label}
                                        value={element.value}
                                        style={getStyles(element, technologyArray, theme)}
                                    >
                                        {element.value}
                                    </MenuItem>
                                ))}
                            </Select>

                        </td>
                        {/* <td><input type="text" value={technology} onChange={(evnt) => (handleChange(index, evnt))} name="technology" className="form-control" /> </td> */}
                        <td>
                            <DatePicker
                                format={{
                                    year: "numeric",
                                    month: "short",
                                    date: "short"
                                }}
                                min={min}
                                max={max}
                                value={date}
                                onChange={(evnt) => (handleChange(index, evnt))}
                                name="date"
                                className="form-control"
                            />
                        </td>
                        <td>
                            {
                                // new Date().toLocaleDateString() === rowsData.toLocaleDateString() ?
                                //     <TimePicker
                                //         value={startTime}
                                //         placeholder="Start Time"
                                //         min={minTime}
                                //         format={"HH:mm"}
                                //         // onChange={e => setStart(e.target.value)}
                                //     /> :
                                //     <TimePicker
                                //         value={start}
                                //         placeholder="Start Time"
                                //         format={"HH:mm"}
                                //         onChange={e => setStart(e.target.value)}
                                //     />
                            }
                        </td>
                        {/* <td><input type="text" value={date} onChange={(evnt) => (handleChange(index, evnt))} name="date" className="form-control" /> </td> */}
                        <td><input type="text" value={startTime} onChange={(evnt) => (handleChange(index, evnt))} name="startTime" className="form-control" /></td>
                        <td><input type="text" value={endTime} onChange={(evnt) => (handleChange(index, evnt))} name="endTime" className="form-control" /> </td>
                        <td>
                            <button type="submit" onClick={handleAdd}>Save</button>
                            <button type="button" onClick={handleCancelClick}>Cancel</button>
                        </td>
                    </tr>
                )
            })}
        </>

    )
}

export default TableRows;