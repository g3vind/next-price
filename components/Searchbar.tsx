"use client";

const Searchbar = () => {
  const handleSubmit = () => {
    // e.preventDefault();
  };
  return (
    <form className="flex flex-wrap g-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchbar-input mr-2"
        placeholder="Enter Product Link"
      />
      <button type="submit" className="searchbar-btn">
        Search
      </button>
    </form>
  );
};

export default Searchbar;
