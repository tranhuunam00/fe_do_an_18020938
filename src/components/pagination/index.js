import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ReactPaginate from "react-paginate";

// Example items, to simulate fetching from another resources.

function PaginatedItems({ itemsPerPage = 1, handleClick, name, total, limit }) {
  let items = [1, 2, 3];
  const totalPage = Math.floor(+total / +limit);

  if (totalPage > 0) {
    items = [];
    for (let i = 0; i <= totalPage + 1; i++) {
      items.push(i + 1);
    }
  }

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event, handleClick) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    event.target = { value: event.selected + 1, name };
    handleClick(event);
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      pageClassName={styles.pagination_li}
      className={styles.pagination}
      breakClassName={styles.pagination_break}
      previousClassName={styles.pagination_previous}
      nextClassName={styles.pagination_next}
      breakLabel={"..."}
      nextLabel="Tiếp >"
      onPageChange={(e) => handlePageClick(e, handleClick)}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="< Quay lại"
      renderOnZeroPageCount={null}
      breakLinkClassName={null}
      activeClassName={styles.pagination_li__active}
      disabledClassName={styles.pagination_li__disabled}

      //   hrefAllControls={false}
    />
  );
}

export default PaginatedItems;
