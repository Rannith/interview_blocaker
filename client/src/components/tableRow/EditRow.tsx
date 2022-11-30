import React, { Dispatch, useEffect, useState } from 'react';
import "../Table.css";
import dayjs from 'dayjs';
import { Box, Chip, MenuItem, OutlinedInput, Select, TextField, useTheme } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MenuProps } from 'react-select';
import { useSelector } from 'react-redux';
import { validateTime } from '../../action/action';
import { store } from '../../store';

const EditRow = ({ rowsData, handleEditFormSubmit, handleCancelClick }) => {

    const { technologyList } = useSelector((state: any) => state.slotData)

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    let max = dayjs().add(7, 'day');
    let min = dayjs()

    const [meetingName, setMeetingName] = useState(rowsData.meetingName)
    const [technology, setTechnology] = useState(rowsData.technology)
    const [date, setDate] = useState(rowsData.date)
    const [startTime, setStartTime] = useState(rowsData.startTime)
    const [endTime, setEndTime] = useState(rowsData.endTime)

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
        setTechnology(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        // handleChange("technology", event)
    };

    const handleEndTime = (newValue) => {
        setEndTime(newValue)
        // if (date && startTime) {
        //     dispatchStore(validateTime({ date: dayjs(date).format('YYYY-MM-DD'), startTime: startTime, endTime: endTime }))
        // }
    }

    useEffect(() => {
        if (date && startTime) {
            console.log("start time : ", dayjs(startTime).format('hh:mm A'))
            console.log("end time : ", dayjs(endTime).format('hh:mm A'))
            dispatchStore(validateTime({ date: dayjs(date).format('YYYY-MM-DD'), startTime: startTime, endTime: endTime }))
        }
    }, [endTime])

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    return (
        <tr>
            <td>
                {/* <input type="text" name="meetingName" placeholder="Enter the meeting name" value={meetingName} onChange={(e) => setMeetingName(e.target.value)} /> */}
                <TextField value={meetingName} onChange={(e) => setMeetingName(e.target.value)} />
            </td>
            <td>
                <Select
                    multiple
                    value={technology}
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
                            style={getStyles(element, technology, theme)}
                        >
                            {element.technology}
                        </MenuItem>
                    ))}
                </Select>

            </td>
            {/* <td>
                <input type="text" name="technology" placeholder="Choose the technology name" value={editData.technology} onChange={handleEditFormChange} />
            </td> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <td><DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={min}
                    maxDate={max}
                /></td>
                <td>
                    {
                        dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ?
                            <TimePicker
                                label="Start Time"
                                value={startTime}
                                minTime={dayjs()}
                                onChange={(newValue) => setStartTime(newValue)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            :
                            <TimePicker
                                label="Start Time"
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                    }
                </td>
                <td>
                    {
                        dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ?
                            <TimePicker
                                label="End Time"
                                value={endTime}
                                minTime={dayjs()}
                                onChange={handleEndTime}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            :
                            <TimePicker
                                label="End Time"
                                value={endTime}
                                onChange={handleEndTime}
                                renderInput={(params) => <TextField {...params} />}
                            />
                    }
                </td>
            </LocalizationProvider>
            {/* <td>
                <input type="text" name="date" placeholder="Enter the meeting date" value={dayjs(rowsData.date).format('DD/MM/YYYY')} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="text" name="startTime" placeholder="Enter the meeting start time" value={dayjs(rowsData.startTime).format('hh:mm A')} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="text" name="endTime" placeholder="Enter the meeting end time" value={dayjs(rowsData.endTime).format('hh:mm A')} onChange={handleEditFormChange} />
            </td> */}
            <td>
                <button type="submit" onClick={() => handleEditFormSubmit({ meetingName, technology, date, startTime, endTime })} >Save Edit</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    );
}
export default EditRow;