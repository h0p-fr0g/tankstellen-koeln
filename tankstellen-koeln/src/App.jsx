import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import TankstellenTabelle from "./components/TankstellenTable";
import Pagination from "./components/Pagination";
import EntriesPerPageSelector from "./components/EntriesPerPageSelector";


function App() {
  const [sortDirection, setSortDirection] = useState("asc");
  const [tankstellen, setTankstellen] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tankstellenPerPage, setTankstellenPerPage] = useState(20);

  useEffect(() => {
    fetch(
      "https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid+is+not+null&outFields=*&returnGeometry=true&outSR=4326&f=pjson"
    )
      .then((res) => res.json())
      .then((data) => {
        const parsed = data.features.map((f) => ({
          id: f.attributes.objectid,
          address: f.attributes.adresse,
          x: f.geometry.x,
          y: f.geometry.y,
        }));
        setTankstellen(parsed);
      });
  }, []);

  const filtered = tankstellen.filter((t) =>
    t.address.toLowerCase().includes(search.toLowerCase())
  );

  function normalize(str) {
    return str
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss");
  }
  
  const sorted = [...filtered].sort((a, b) => {
    const valA = normalize(a.address);
    const valB = normalize(b.address);
    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const start = (page - 1) * tankstellenPerPage;
  const currentPage = sorted.slice(start, start + tankstellenPerPage);
  const pageCount = Math.ceil(sorted.length / tankstellenPerPage);

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <Header />
      
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
      <div className="flex-grow">
        <Search
          search={search}
          setSearch={setSearch}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </div>
      <EntriesPerPageSelector
        value={tankstellenPerPage}
        onChange={(val) => {
          setTankstellenPerPage(val);
          setPage(1);
        }}
      />
    </div>
  
      <TankstellenTabelle
        data={currentPage}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
  
      <Pagination
        pageCount={pageCount}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default App;
