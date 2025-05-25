export default function Tankstelle({ address, x, y, isMobile = false }) {
  if (isMobile) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
        <div className="mb-2">
          <span className="font-semibold text-gray-600">Straßenname:</span> {address}
        </div>
        <div className="mb-1">
          <span className="font-semibold text-gray-600">X-Koordinate:</span> {x}
        </div>
        <div>
          <span className="font-semibold text-gray-600">Y-Koordinate:</span> {y}
        </div>
      </div>
    );
  }

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{address}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{x}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{y}</td>
    </tr>
  );
}
