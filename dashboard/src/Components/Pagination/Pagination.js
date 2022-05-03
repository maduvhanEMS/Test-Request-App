import React from "react";
import { Link } from "react-router-dom";

export default function Pagination({ pager }) {
  return (
    <div className="card-footer">
      <div className="limit">
        <select name="limit">
          <option value="10">10</option>
          <option>15</option>
          <option>20</option>
        </select>
        <p className="text-right mt-3">{`Showing page ${pager?.currentPage} of ${pager?.totalPages}`}</p>
      </div>
      {pager?.pages && pager?.pages?.length && (
        <ul className="pagination">
          <li
            className={`page-item previous-item ${
              pager?.currentPage === 1 ? "disabled" : ""
            }`}
          >
            <Link
              to={{ search: `?page=${pager?.currentPage - 1}` }}
              className="page-link"
            >
              &laquo;
            </Link>
          </li>

          {pager?.totalPages > 5 ? (
            <>
              {pager?.pages
                ?.slice(
                  pager?.totalPages - pager?.currentPage <= 5
                    ? pager?.totalPages - 5
                    : pager.currentPage - 1,
                  pager?.totalPages - pager?.currentPage <= 5
                    ? pager?.totalPages
                    : pager.currentPage + 4
                )
                ?.map((page) => (
                  <li
                    key={page}
                    className={`page-item number-item ${
                      pager?.currentPage === page ? "active" : ""
                    }`}
                  >
                    <Link
                      to={{ search: `?page=${page}` }}
                      className="page-link"
                    >
                      {page}
                    </Link>
                  </li>
                ))}
            </>
          ) : (
            <>
              {pager?.pages?.map((page) => (
                <li
                  key={page}
                  className={`page-item number-item ${
                    pager?.currentPage === page ? "active" : ""
                  }`}
                >
                  <Link to={{ search: `?page=${page}` }} className="page-link">
                    {page}
                  </Link>
                </li>
              ))}
            </>
          )}

          <li
            className={`page-item next-item ${
              pager?.currentPage === pager?.totalPages ? "disabled" : ""
            }`}
          >
            <Link
              to={{ search: `?page=${pager?.currentPage + 1}` }}
              className="page-link"
            >
              &raquo;
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
