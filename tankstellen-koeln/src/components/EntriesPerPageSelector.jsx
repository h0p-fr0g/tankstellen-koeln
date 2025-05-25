function EntriesPerPageSelector({ value, onEntriesPerPageChange }) {
    return (
      <div className="flex items-center gap-2">
        <label htmlFor="entries" className="text-sm font-medium">
          Einträge pro Seite:
        </label>
        <select
          id="entries"
          value={value}
          onChange={(e) => onEntriesPerPageChange(Number(e.target.value))}
          className="px-4 py-1 border rounded-md bg-white"
        >
          {[10, 20, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default EntriesPerPageSelector;
  