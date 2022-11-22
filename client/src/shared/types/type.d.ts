import { IconButtonProps, TableProps } from "@mui/material"

interface InputField {
    userName?: string,
    email?: string,
    aceNo?: string,
    heading?: string,
    userId?: number,
    date?: Date,
    technology?: string[],
    startTime?: string,
    endTime?: string,
}

interface InputFieldUser {
    id?: number;
    userName?: string,
    email?: string,
    aceNo?: string
}

interface InputFieldSlot {
    heading?: string,
    userId?: number,
    date?: Date,
    technology?: string[],
    startTime?: string,
    endTime?: string
}

interface InitialLoginAction {
    type: string,
    payload: InputFieldUser[]
}

interface InitialLoginSingleAction {
    type: string,
    payload: InputFieldUser
}

interface InitialSlotAction {
    type: string,
    payload: InputFieldSlot[]
}

interface InitialSingleSlotAction {
    type: string,
    payload: InputFieldSlot
}


interface UserState {
    users?: Array<InputFieldUser>;
    user?: InputFieldUser;
    slots?: Array<InputFieldSlot>;
    slot?: InputFieldSlot;
    successMessage?: any;
    errorMessage?: any;
}

interface SlotState {
    slots?: Array<InputFieldSlot>;
    slot?: InputFieldSlot;
    successMessage?: any;
    errorMessage?: any;
}

export type UserActionsTypes = InitialLoginAction & InitialLoginSingleAction

export type SlotActionsTypes = InitialSlotAction & InitialSingleSlotAction

// For Table Component

interface ColumnProps {
    title: string,
    key: string
}

interface RowProps {
    key?: string,
    userName: string,
    email?: string,
    aceNo?: string,
    id?: string,
    actionButtons?: IconButtonProps[],
    selector?: any
}

interface MUITableProps extends TableProps {
    rows?: RowProps[],
    columns: ColumnProps[]
}