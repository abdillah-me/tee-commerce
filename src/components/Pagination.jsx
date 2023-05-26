import PropTypes from 'prop-types';
const Pagination = ({ itemsPerPage, totalItems, currentPage, handlePageChange }) => {
   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <nav>
         <ul className="pagination flex items-center gap-4 mt-10">
            {pageNumbers.map(number => (
               <li key={number} className="page-item">
                  <button
                     id={number}
                     onClick={handlePageChange}
                     className={`page-link ${currentPage === number ? ' bg-slate-700 text-white py-1 px-4 rounded' : ' bg-slate-300 text-white py-1 px-4 rounded'}`}
                  >
                     {number}
                  </button>
               </li>
            ))}
         </ul>
      </nav>
   );
};

Pagination.propTypes = {
   itemsPerPage: PropTypes.number.isRequired,
   totalItems: PropTypes.number.isRequired,
   currentPage: PropTypes.number.isRequired,
   paginate: PropTypes.func.isRequired,
   handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
