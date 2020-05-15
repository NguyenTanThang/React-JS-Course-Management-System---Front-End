import React from 'react';
import { Pagination } from 'reactstrap';

const PaginationComponent = (props) => {
    const {pageObject, setCurrentPage} = props;
    const {pages, currentPage, totalPages} = pageObject;

    const displayFirstPagi = () => {
        return <li className="page-item" key={"first-page"}>
                <button className="page-link" onClick={() => {
                    setCurrentPage(1)
                }}>First</button>
            </li>
    }

    const displayLastPagi = () => {
        return <li className="page-item" key={"last-page"}>
                <button className="page-link" onClick={() => {
                    setCurrentPage(totalPages)
                }}>Last</button>
            </li>
    }

    const displayPrevPagi = () => {
        if (currentPage > 1){
            return <li className="page-item" key={"prev-page"}>
            <button className="page-link" onClick={() => {
                setCurrentPage(currentPage - 1)
            }}>Prev</button>
        </li>
        } else {
            return <li className="page-item disabled" key={"prev-page"}>
            <button className="page-link" onClick={() => {
                setCurrentPage(currentPage - 1)
            }}>Prev</button>
        </li>
        }
    }

    const displayNextPagi = () => {
        if (currentPage < totalPages){
            return <li className="page-item" key={"next-page"}>
            <button className="page-link" onClick={() => {
                setCurrentPage(currentPage + 1)
            }}>Next</button>
        </li>
        } else {
            return <li className="page-item disabled" key={"next-page"}>
            <button className="page-link" onClick={() => {
                setCurrentPage(currentPage + 1)
            }}>Next</button>
        </li>
        }
    }

    const displayPagiItems = () => {
        return pages.map((page) => {
            if (page === currentPage){
                return <li className="page-item active" key={page}>
                <button className="page-link" onClick={() => {
                    setCurrentPage(page)
                }}>{page}</button>
            </li>
            }
            return <li className="page-item"  key={page}>
                <button className="page-link" onClick={() => {
                    setCurrentPage(page)
                }}>{page}</button>
            </li>
        })
    }

  return (
    <Pagination>
        {displayFirstPagi()}
        {displayPrevPagi()}
        {displayPagiItems()}
        {displayNextPagi()}
        {displayLastPagi()}
    </Pagination>
  );
}

export default PaginationComponent;