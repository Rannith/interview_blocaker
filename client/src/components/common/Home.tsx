import React from "react";
import { RowProps } from "../../shared/types/type";
import { columnUser } from "../config/table";
import TableData from "../table";

const Home: React.FC = () => {

    const rowUser: RowProps[] = [] as RowProps[];

    rowUser?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            userName: value.userName,
            email: value.email,
            aceNo: value.aceNo,
            actionButtons: [{
                children: 'Update',
                // onClick: () => handleOnEdit(value.id, value)
            },
            {
                children: "Delete",
                // onClick: () => handleOnDelete(value.id)
            }]
        }
        rowUser.push(object)
    })

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Hello World</h1>
            <TableData columns={columnUser} rows={rowUser} />
            <button>Add</button>
        </>
    )
}

export default Home;