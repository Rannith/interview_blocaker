//ADD ROW 

import React, { useState } from "react";
import "./Table.css";
// import Select from 'react-select';
import Select from "@mui/material/Select";
import makeAnimated from 'react-select/animated';
import { Box } from "@mui/system";
import { Chip, OutlinedInput, useTheme } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const TableRows = ({ rowsData, handleChange, handleAdd, handleCancelClick }) => {

    const [technologyArray, setTech] = useState([])

    const options = [
        { value: 'React Js', label: 'React Js' },
        { value: 'Node Js', label: 'Node Js' },
        { value: 'Vue Js', label: 'Vue Js' },
        { value: 'Magento', label: 'Magneto' },
        { value: 'php', label: 'php' },
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

    console.log("techh", technologyArray);
    console.log("data row", rowsData);
    
    

    return (

        <>
            {rowsData && rowsData.map((data: any, index: any) => {
                
                let { meetingName, technology, date, startTime, endTime } = data;
                return (
                    <tr key={index}>
                        <td><input type="text" value={meetingName} onChange={(e) => (handleChange(index, e))} name="meetingName" className="form-control" /> </td>
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
                        {/* <td><input type="text" value={technology} onChange={(e) => (handleChange(index, e))} name="technology" className="form-control" /> </td> */}
                        <td><input type="text" value={date} onChange={(e) => (handleChange(index, e))} name="date" className="form-control" /> </td>
                        <td><input type="text" value={startTime} onChange={(e) => (handleChange(index, e))} name="startTime" className="form-control" /></td>
                        <td><input type="text" value={endTime} onChange={(e) => (handleChange(index, e))} name="endTime" className="form-control" /> </td>
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