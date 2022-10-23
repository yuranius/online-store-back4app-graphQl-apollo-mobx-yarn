import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Pagination} from "react-bootstrap";
import {Context} from "../../index";

const Paginator = observer(() => {
    const {device} = useContext(Context)

    const pages = []
    const pageCount = Math.ceil(device.totalCount / device.limit)


    for (let i = 0; i < pageCount; i++) {
        pages.push( i + 1 )
    }
    return (
        <Pagination className='mt-5'>
            {pages.map( page =>
                <Pagination.Item
                    key={page}
                    active={device.page === page}
                    onClick={() => device.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
})

export default Paginator;