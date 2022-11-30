//ADD ROW 

import React, { Dispatch, useEffect, useState } from "react";
import "./Table.css";
import Select from "@mui/material/Select";
import makeAnimated from 'react-select/animated';
import { Box } from "@mui/system";
import { Chip, OutlinedInput, useTheme } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { store } from "../store";
import { getTechnology, technology } from '../action/action';
import { useSelector } from "react-redux";
import { showErrorMessage } from "../shared/utils/alertMessage";

const TableRows = ({ rowsData, error, handleChange, handleAdd, handleCancelClick }) => {

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const { errorMessage } = useSelector((state: any) => state.slotData)

    const [technologyArray, setTech] = useState([])
    let max = dayjs().add(7, 'day');

    useEffect(() => {
        dispatchStore(getTechnology())
    }, [])

    useEffect(() => {
        if (errorMessage) {
            showErrorMessage(errorMessage)
        }
    }, [errorMessage])

    const { technologyList } = useSelector((state: any) => state.slotData)

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

    return (

        <>
            {rowsData && rowsData.map((data: any, index: any) => {

                let { meetingName, technology, date, startTime, endTime } = data;
                return (
                    <tr key={index}>
                        <td>
                            <input type="text" value={meetingName} onChange={(e) => (handleChange("meetingName", e))} name="meetingName" className="form-control" />
                            {/* <TextField value={meetingName} onChange={(e) => (handleChange("meetingName", e))} className="form-control" /> */}
                            <span>{error.meetingNameError}</span>
                        </td>

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
                                {technologyList && technologyList.map((element) => (
                                    <MenuItem
                                        key={element.technology}
                                        value={element.technology}
                                        style={getStyles(element, technologyArray, theme)}
                                    >
                                        {element.technology}
                                    </MenuItem>
                                ))}
                            </Select>

                        </td>
                        {/* <td><input type="text" value={technology} onChange={(e) => (handleChange(index, e))} name="technology" className="form-control" /> </td> */}
                        {/* <td>
                            <input 
                                name="date"
                                type="date"
                                min={dayjs().format('YYYY-MM-DD')}
                                max={dayjs(max).format('YYYY-MM-DD')}
                                value={date}
                                onChange={(e) => (handleChange(index, e))}
                            />
                        </td>
                        <td>
                            <input 
                                type="time"
                                name="startTime"
                                min={dayjs().format('HH:mm')}
                                value={startTime}
                                // min="21:40"
                                step="900"
                                onChange={(e) => (handleChange(index, e))}
                            />
                        </td>
                        <td>
                            <input 
                                type="time"
                                name="endTime"
                                min={dayjs().format('HH:mm')}
                                value={endTime}
                                onChange={(e) => (handleChange(index, e))}
                            />
                        </td> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <td><DesktopDatePicker
                                label="Date"
                                inputFormat="MM/DD/YYYY"
                                value={date}
                                onChange={(e) => (handleChange("date", e))}
                                renderInput={(params) => <TextField {...params} />}
                                minDate={dayjs()}
                                maxDate={max}
                            /></td>
                            <td>
                                {
                                    dayjs(rowsData[0]?.date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ?
                                        <TimePicker
                                            label="Start Time"
                                            value={startTime}
                                            minTime={dayjs()}
                                            onChange={(e) => (handleChange("startTime", e))}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        :
                                        <TimePicker
                                            label="Start Time"
                                            value={startTime}
                                            onChange={(e) => (handleChange("startTime", e))}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                }
                            </td>
                            <td>
                                {
                                    dayjs(rowsData[0]?.date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ?
                                        <TimePicker
                                            label="End Time"
                                            value={endTime}
                                            minTime={dayjs()}
                                            onChange={(e) => (handleChange("endTime", e))}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        :
                                        <TimePicker
                                            label="End Time"
                                            value={endTime}
                                            onChange={(e) => (handleChange("endTime", e))}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                }
                            </td>
                        </LocalizationProvider>
                        {/* <td><input type="text" value={date} onChange={(e) => (handleChange(index, e))} name="date" className="form-control" /> </td> */}
                        {/* <td><input type="text" value={startTime} onChange={(e) => (handleChange(index, e))} name="startTime" className="form-control" /></td> */}
                        {/* <td><input type="text" value={endTime} onChange={(e) => (handleChange(index, e))} name="endTime" className="form-control" /> </td> */}
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