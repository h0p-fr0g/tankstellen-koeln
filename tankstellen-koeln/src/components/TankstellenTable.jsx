import Tankstelle from "./Tankstelle";

function TankstellenTable({ data, sortDirection, setSortDirection }) {
  
  const handleSortClick = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortIcon = sortDirection === "asc" ? "▲" : "▼";

  return (
    <>
      {/* Desktop-View */}
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

      {/* Mobile-View */}
      <div className="block md:hidden space-y-4">
        {/* Sort-Button for mobile - could be outsourced to own component */}
        <div className="flex justify-end mb-2">
          <button
            onClick={handleSortClick}
            className="text-sm bg-gray-100 px-3 py-1 rounded shadow-sm hover:bg-gray-200 transition"
          >
            Sortieren: {sortDirection === "asc" ? "A–Z ▼" : "Z–A ▼"}
          </button>
        </div>

        {data.map((t) => (
          <Tankstelle
            key={t.id}
            address={t.address}
            x={t.x}
            y={t.y}
            isMobile={true}
          />
        ))}
      </div>


    </>
  );
}

export default TankstellenTable;
