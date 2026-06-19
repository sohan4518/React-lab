import React, { useState, useEffect } from "react";

export default function App() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {

    setLoading(true);

    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!res.ok) {
        throw new Error("Fetch Failed");
      }

      const result = await res.json();

      setData(result);
      setError("");

    } catch (e) {
      setError(e.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = data.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <h1>User Data</h1>

      {error && <p>Error: {error}</p>}

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (

        <table border="1">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
            </tr>
          </thead>

          <tbody>

            {filtered.length > 0 ? (
              filtered.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.address.city}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No Results</td>
              </tr>
            )}

          </tbody>

        </table>
      )}

      <button onClick={fetchData}>
        Refresh
      </button>

    </div>
  );
}
