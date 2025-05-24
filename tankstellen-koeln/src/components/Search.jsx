function Search({ search, setSearch }) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Suche nach Straße..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-1/2"
        />
      </div>
    );
  }
  
  export default Search;
  