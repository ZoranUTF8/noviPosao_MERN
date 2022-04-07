import { useAppContext } from "../context/appContext";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      // newPage = 1
      // alternative
      newPage = numOfPages;
    }
    changePage(newPage);
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      // newPage = numOfPages
      // alternative
      newPage = 1;
    }
    changePage(newPage);
  };

  // * Create and array of the numOfPages so we can map and create appropriate number of buttons
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <GrLinkPrevious />
      </button>

      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button className="next-btn" onClick={nextPage}>
        <GrLinkNext />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
