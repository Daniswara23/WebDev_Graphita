"use client";

/*
  useSort.ts — Custom hook for sortable table columns.
  Returns sorted data, sort state, and a toggle function.
*/

import { useMemo, useState } from "react";

export type SortDirection = "asc" | "desc";

export function useSort<T>(data: T[], defaultKey?: keyof T) {
  const [sortKey, setSortKey] = useState<keyof T | null>(defaultKey ?? null);
  const [direction, setDirection] = useState<SortDirection>("asc");

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      // Handle undefined/null
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      // Compare
      let cmp = 0;
      if (typeof aVal === "number" && typeof bVal === "number") {
        cmp = aVal - bVal;
      } else if (typeof aVal === "boolean" && typeof bVal === "boolean") {
        cmp = aVal === bVal ? 0 : aVal ? 1 : -1;
      } else {
        cmp = String(aVal).localeCompare(String(bVal), "id", { sensitivity: "base" });
      }

      return direction === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, direction]);

  const getSortIndicator = (key: keyof T): string => {
    if (sortKey !== key) return "";
    return direction === "asc" ? " ▲" : " ▼";
  };

  return { sortedData, sortKey, direction, toggleSort, getSortIndicator };
}