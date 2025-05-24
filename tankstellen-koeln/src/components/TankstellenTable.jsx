import Tankstelle from "./Tankstelle";


function TankstellenTable({ data, sortDirection, setSortDirection }) {
  const handleSortClick = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortIcon = sortDirection === "asc" ? "▲" : "▼";

  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
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
  );
}

export default TankstellenTable;