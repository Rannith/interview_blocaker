//ADD ROW table display

import React, { Dispatch, useEffect, useState } from "react";
import "../table/index.css";
import Select from "@mui/material/Select";
import { Box } from "@mui/system";
import { Chip, OutlinedInput, useTheme } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { store } from "../../store";
import { getTechnology } from '../../action/action';
import { useSelector } from "react-redux";
import { showErrorMessage } from "../../shared/utils/alertMessage";
import { MenuProps, getStyles } from '../../shared/utils/multiSelector'
import Button from '@mui/material/Button';

const TableRows = ({ rowsData, handleChange, handleAdd, handleCancelClick }) => {

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const { errorMessage } = useSelector((state: any) => state.slotData)

    const [technologyArray, setTechnologyArray] = useState([])
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

    const theme = useTheme();

    const handleChangess = (event) => {
        const {
            target: { value },
        } = event;
        setTechnologyArray(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        handleChange("technology", event)
    };

    return (

        <>
            {rowsData && rowsData.map((data: any, index: any) => {

                let { meetingName, technology, date, startTime, endTime } = data;
                return (
                    <tr key={index}>
                        <td>
                            <input type="text" value={meetingName} onChange={(e) => (handleChange("meetingName", e))} name="meetingName" className="form-control" />
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <td>
                                <DesktopDatePicker
                                    label="Date"
                                    inputFormat="MM/DD/YYYY"
                                    value={date}
                                    onChange={(e) => (handleChange("date", e))}
                                    renderInput={(params) => <TextField {...params} />}
                                    minDate={dayjs()}   //today's date
                                    maxDate={max}       //max -> 7days
                                />
                            </td>
                            <td>
                                {
                                    dayjs(rowsData[0]?.date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ?
                                        <TimePicker
                                            label="Start Time"
                                            value={startTime}
                                            minTime={dayjs()}   //current time
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
                        <td>
                            <div className='action-button-container' >
                                <Button color='inherit' variant='contained' onClick={handleAdd}>Save</Button>
                                <Button color='inherit' variant='contained' onClick={handleCancelClick}>Cancel</Button>
                            </div>
                            {/* <button type="submit" onClick={handleAdd}>Save</button>
                            <button type="button" onClick={handleCancelClick}>Cancel</button> */}
                        </td>
                    </tr>
                )
            })}
        </>

    )
}

export default TableRows;