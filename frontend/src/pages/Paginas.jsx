export default function Paginado({
  goToNextPage,
  goToPreviousPage,
  paginas,
  currentPage,
  elementsByPage,
  allElemtns,
}) {
  let pageNumber = [];
  let page = Math.ceil(allElemtns / elementsByPage);
  for (let i = 1; i <= page; i++) {
    pageNumber.push(i);
  }
  return page > 1 ? (
    <div className="paginacion">
      {currentPage - 1 > 0 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={goToPreviousPage}
          className="icon icon-tabler icon-tabler-arrow-big-left"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#f28b12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20 15h-8v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h8a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1z" />
        </svg>
      ) : null}
      {currentPage >= 3 ? (
        <button onClick={() => paginas(currentPage - 2)}>
          {currentPage - 2}
        </button>
      ) : null}
      {currentPage >= 2 ? (
        <button onClick={() => paginas(currentPage - 1)}>
          {currentPage - 1}
        </button>
      ) : null}
      <button className="buttonCentro" onClick={() => paginas(currentPage)}>
        {currentPage}
      </button>
      {currentPage <= pageNumber.length - 1 ? (
        <button onClick={() => paginas(currentPage + 1)}>
          {currentPage + 1}
        </button>
      ) : null}
      {currentPage <= pageNumber.length - 2 ? (
        <button onClick={() => paginas(currentPage + 2)}>
          {currentPage + 2}
        </button>
      ) : null}
      {currentPage < page ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={goToNextPage}
          className="icon icon-tabler icon-tabler-arrow-big-right"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#f28b12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 9h8v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1z" />
        </svg>
      ) : null}
    </div>
  ) : null;
}
