import React, { useState, useEffect } from "react";
import { Bus } from "lucide-react";

export const RouteFinder: React.FC = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  const [busRoutes, setBusRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch locations for dropdowns
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:5000/locations");
        const data = await response.json();
        setLocations(data);
      } catch (err) {
        console.error("Error fetching locations", err);
      }
    };
    fetchLocations();
  }, []);

  // Fetch routes with timings
  const fetchRoutes = async () => {
    if (!selectedStart || !selectedEnd) {
      setError("Please select both start and end locations.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/routes?from=${selectedStart}&to=${selectedEnd}`
      );
      const data = await response.json();

      if (response.ok) {
        setBusRoutes(data);
      } else {
        setError(data.error || "Failed to fetch routes.");
      }
    } catch (err) {
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Bus className="mr-2 text-blue-600" size={24} />
        Bus Route Finder
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Input Fields */}
        <div className="md:col-span-1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Starting Point
              </label>
              <select
                className="input-field"
                value={selectedStart}
                onChange={(e) => setSelectedStart(e.target.value)}
              >
                <option value="">Select Starting Location</option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <select
                className="input-field"
                value={selectedEnd}
                onChange={(e) => setSelectedEnd(e.target.value)}
              >
                <option value="">Select Destination</option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn-primary" onClick={fetchRoutes}>
              {loading ? "Finding..." : "Find Routes"}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>

        {/* Route Information Block */}
        <div className="md:col-span-2">
          <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Route Information
            </h3>

            {busRoutes.length > 0 ? (
              <ul className="text-gray-700 text-sm mt-2 space-y-2">
                {busRoutes.map((route, index) => (
                  <li key={index} className="p-2 bg-white shadow-sm rounded-md">
                    <strong>Bus Number:</strong> {route["Bus Number"]} <br />
                    <strong>Route No:</strong> {route["Route No."]} <br />
                    <strong>Bus Type:</strong> {route["Type"]} <br />
                    <strong>Route Length:</strong> {route["Route Length"]} km<br />
                    <strong>Departure Time:</strong> {route["Departure Timings"] || "N/A"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                No routes found. Try a different location.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteFinder;
