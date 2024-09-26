"use client";
import { useEffect, useState } from "react";

type Item = {
  createdAt: string;
  filename: string;
};

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [sortType, setSortType] = useState<string>("createdAtAsc");

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch("/api/demo");
      const data: Item[] = await response.json();
      setItems(data);
    }
    fetchItems();
  }, []);

  const handleSort = (type: string) => {
    let sortedItems = [...items];

    if (type === "createdAtAsc") {
      sortedItems.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (type === "filenameAsc") {
      sortedItems.sort((a, b) => filenameSort(a.filename, b.filename));
    } else if (type === "filenameDesc") {
      sortedItems.sort((a, b) => filenameSort(b.filename, a.filename));
    }

    setSortType(type);
    setItems(sortedItems);
  };

  const filenameSort = (a: string, b: string) => {
    const parseFilename = (str: string) =>
      str.replace(/\d+/g, (match) => `000000${match}`.slice(-6));
    return parseFilename(a).localeCompare(parseFilename(b));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sortable Items</h1>

      <div className="mb-4">
        <label
          htmlFor="sortFilter"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Sort By
        </label>
        <select
          id="sortFilter"
          value={sortType}
          onChange={(e) => handleSort(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
        >
          <option value="createdAtAsc">Created At (Asc)</option>
          <option value="filenameAsc">Filename (Asc)</option>
          <option value="filenameDesc">Filename (Desc)</option>
        </select>
      </div>

      <ul className="space-y-2 mt-10">
        {items?.map((item, index) => (
          <li key={index} className="p-4 bg-white shadow rounded-lg">
            <div className="flex justify-between">
              <span>{item.createdAt}</span>
              <span className="font-semibold">{item.filename}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
