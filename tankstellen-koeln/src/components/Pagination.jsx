function Pagination({ pageCount, page, setPage }) {
  const maxButtons = 10;
  const range = [];

  const addButton = (i) => (
    <button
      key={i}
      onClick={() => setPage(i)}
      className={`px-3 py-1 rounded ${
        page === i
          ? "bg-blue-600 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {i}
    </button>
  );

  if (pageCount <= maxButtons) {
    for (let i = 1; i <= pageCount; i++) {
      range.push(addButton(i));
    }
  } else {
    range.push(addButton(1)); // erste Seite

    const start = Math.max(2, page - 2);
    const end = Math.min(pageCount - 1, page + 2);

    if (start > 2) {
      range.push(<span key="start-ellipsis" className="px-2">…</span>);
    }

    for (let i = start; i <= end; i++) {
      range.push(addButton(i));
    }

    if (end < pageCount - 1) {
      range.push(<span key="end-ellipsis" className="px-2">…</span>);
    }

    range.push(addButton(pageCount)); // letzte Seite
  }

  return <div className="flex flex-wrap gap-2 mt-6 justify-center">{range}</div>;
}

export default Pagination;
