import { IconButton, IconButtonProps, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material";
import React from "react";
import { RowProps, ColumnProps, MUITableProps } from "../../shared/types/type";

const StyledTable = styled(Table)`
    width: 90%;
    margin: 90px 0 0 90px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 25px
    }
`;

const TableData: React.FC<MUITableProps> = ({ rows, columns }: MUITableProps) => {
    return (

        <StyledTable>
            <TableHead>
                <THead>
                    {columns && columns.map((column: ColumnProps) => (
                        <TableCell key={column.title}>{column.title}</TableCell>
                    ))}
                </THead>
            </TableHead>
            <TableBody>
                {rows && rows.map((row: RowProps) => {
                    const { actionButtons, selector, ...cells } = row

                    // console.log("button : ", actionButtons);
                    // console.log("cell : ", cells);

                    return (
                        <TRow key={row.key}>
                            {Object.values(cells).map((cell) => (
                                <TableCell key={cell}>{cell}</TableCell>
                            ))}
                            {actionButtons?.length &&
                                actionButtons.map((actionButton: IconButtonProps, index) => (
                                    <TableCell key={index}>
                                        <IconButton
                                            aria-label="update"
                                            onClick={actionButton?.onClick}
                                            onSelect ={actionButton?.onSelect}
                                        >
                                            {actionButton?.children}
                                        </IconButton>
                                    </TableCell>
                                ))
                            }
                        </TRow>
                    )
                })}
            </TableBody>
        </StyledTable>

    )
}

export default TableData;