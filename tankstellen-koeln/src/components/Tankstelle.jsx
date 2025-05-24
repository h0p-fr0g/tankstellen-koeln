import React from "react";

export default function Tankstelle({ address, x, y }) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{address}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{x}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{y}</td>
    </tr>
  );
}