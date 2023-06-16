import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [results, setResults] = useState([]);
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["tableData"],
    queryFn: (offset = 10) =>
      axios.get(
        `https://stagingapi.enalo.in/inventory/get-items?offset=${offset}`
      ),
  });

  useEffect(() => {
    if (isSuccess) {
      setResults(data?.data?.results);
    }
  });

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: (info) => info.getValue(),
      },
      {
        header: "Item Name",
        accessorKey: "item_name",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return (
    <main>
      <h1>Vite + React</h1>
      <Table data={results} columns={columns} />
    </main>
  );
}

export default App;
