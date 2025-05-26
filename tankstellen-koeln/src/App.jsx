import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import EntriesPerPageSelector from "./components/EntriesPerPageSelector";
import TankstellenTabelle from "./components/TankstellenTable";
import Pagination from "./components/Pagination";
import UpButton from "./components/UpButton";

function App() {
  const [sortDirection, setSortDirection] = useState("asc");
  const [tankstellen, setTankstellen] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tankstellenPerPage, setTankstellenPerPage] = useState(20);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showUpButton, setShowUpButton] = useState(false);

  //Filter entries by search term
  const filtered = tankstellen.filter((t) =>
    normalize(t.address).includes(normalize(search))
  );

  //Sort entries according to sortDirection
  const sorted = [...filtered].sort((a, b) => {
    const valA = normalize(a.address);
    const valB = normalize(b.address);
    return sortDirection === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  const start = (page - 1) * tankstellenPerPage;
  const currentPage = sorted.slice(start, start + tankstellenPerPage);
  const pageCount = Math.ceil(sorted.length / tankstellenPerPage);

  //Load data from ARCGis-interface
  useEffect(() => {
    async function fetchData() {
      setError(null);
      setLoading(true);
      try {
        // https://httpstat.us/200?sleep=2000&body=invalid-json for testing invalid json with long loading
        // "https://httpstat.us/404" for testing 404
        const res = await fetch(
          "https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid+is+not+null&outFields=*&returnGeometry=true&outSR=4326&f=pjson"
        );
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        const parsed = data.features.map((f) => ({
          id: f.attributes.objectid,
          address: f.attributes.adresse,
          x: f.geometry.x,
          y: f.geometry.y,
        }));
        setTankstellen(parsed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  //Set page to 1 when searching
  useEffect(() => {
    if (search) {
      setPage(1);
    }
  }, [search]);

  //Scroll listener for Up-Button
  useEffect(() => {
    const handleScroll = () => {
      setShowUpButton(window.pageYOffset > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //Normalize strings for search
  function normalize(str) {
    return str
      .toLowerCase()
      .replace(/ä/g, "a")
      .replace(/ö/g, "o")
      .replace(/ü/g, "u")
      .replace(/ß/g, "ss");
  }

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans relative">
      <Header />

      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-4 text-gray-600">Lade Daten...</div>
      )}

      {/* Show error if loading failed, otherwise show main UI */}
      {error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          Fehler beim Laden der Daten: {error}
        </div>
      ) : (
        !loading && (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="flex-grow">
                <Search search={search} setSearch={setSearch} />
              </div>
              <EntriesPerPageSelector
                value={tankstellenPerPage}
                onEntriesPerPageChange={(val) => {
                  setTankstellenPerPage(val);
                  setPage(1);
                }}
              />
            </div>

            {/* Top pagination - only for mobile */}
            <div className="block md:hidden mb-4">
              <Pagination
                pageCount={pageCount}
                page={page}
                setPage={setPage}
              />
            </div>


            <TankstellenTabelle
              data={currentPage}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
            />

            <Pagination pageCount={pageCount} page={page} setPage={setPage} />
          </>
        )
      )}

      {/* Scroll to Top Button */}
      {showUpButton && 
      <UpButton onClick={scrollToTop} />
      }
    </div>
  );
}

export default App;
