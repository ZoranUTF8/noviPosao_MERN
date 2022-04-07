import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  // * Import functions from app context
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  // * Update state values dynamicaly
  const handleSearch = (e) => {
    if (isLoading) return;
    // * Change the search value in the global state
    handleChange({ name: e.target.name, value: e.target.value });
  };

  // * Call clear filters
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>formular za pretragu</h4>

        {/* search position */}
        <div className="form-center">
          <FormRow
            labelText="traženje"
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          ></FormRow>

          {/* search by status */}
          <FormRowSelect
            labelText="Status posla"
            name="searchStatus"
            handleChange={handleSearch}
            list={["svi", ...statusOptions]}
          ></FormRowSelect>

          {/* search by type */}
          <FormRowSelect
            labelText="Vrsta posla"
            name="searchType"
            handleChange={handleSearch}
            list={["svi", ...jobTypeOptions]}
          ></FormRowSelect>

          {/* sort */}
          <FormRowSelect
            labelText="sortirati"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          ></FormRowSelect>

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            očisti filtere
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
