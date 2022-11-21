import { IconButtonProps, TableProps } from "@mui/material"

interface InputField {
    userName: string,
    email: string,
    aceNo: string,
}

interface InputFieldUser {
    id?: number;
    userName?: string,
    email?: string,
    aceNo?: string,
    successMessage?: string;
    errorMessage?: string;
}

interface InitialLoginAction {
    type: string,
    payload: InputFieldUser[]
}

interface InitialLoginSingleAction {
    type: string,
    payload: InputFieldUser
}

interface UserState {
    users?: Array<InputFieldUser>;
    user?: InputFieldUser;
    successMessage?: any;
    errorMessage?: any;
}

export type UserActionsTypes = InitialLoginAction & InitialLoginSingleAction

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