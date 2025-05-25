import Tankstelle from "./Tankstelle";

function TankstellenTable({ data, sortDirection, setSortDirection }) {
  const handleSortClick = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortIcon = sortDirection === "asc" ? "▲" : "▼";

  return (
    <>
      {/* Desktop Ansicht */}
      <div className="hidden md:block overflow-x-auto w-full">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={handleSortClick}
                className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-700 tracking-wider select-none"
              >
                Straßenname <span className="ml-1">{sortIcon}</span>
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 tracking-wider">
                X-Koordinate
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 tracking-wider">
                Y-Koordinate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((t) => (
              <Tankstelle key={t.id} address={t.address} x={t.x} y={t.y} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Ansicht */}
      <div className="block md:hidden space-y-4">
        {/* Sortier-Button für Mobile */}
        <div className="flex justify-end mb-2">
          <button
            onClick={handleSortClick}
            className="text-sm bg-gray-100 px-3 py-1 rounded shadow-sm hover:bg-gray-200 transition"
          >
            Sortieren: {sortDirection === "asc" ? "A–Z ▲" : "Z–A ▼"}
          </button>
        </div>

        {data.map((t) => (
          <div
            key={t.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="mb-2">
              <span className="font-semibold text-gray-600">Straßenname:</span>{" "}
              {t.address}
            </div>
            <div className="mb-1">
              <span className="font-semibold text-gray-600">X-Koordinate:</span>{" "}
              {t.x}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Y-Koordinate:</span>{" "}
              {t.y}
            </div>
          </div>
        ))}
      </div>

    </>
  );
}

export default TankstellenTable;
