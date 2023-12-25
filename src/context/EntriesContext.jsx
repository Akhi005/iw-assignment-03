import { createContext, useEffect, useState } from "react";
export const EntriesContext = createContext();

export function EntriesProvider({ children }) {
  const [entries, setEntries] = useState(function () {
    const value = localStorage.getItem("entries");
    if (!value) return [];
    return JSON.parse(value);
  });
  const afterdelete=id=>{
    setEntries((prevEntries) => {
      const updatedEntries = prevEntries.filter((entry) => entry.id !== id);
      return updatedEntries;
    });
}
const editedEntry = (title, value, id) => {
  const newTitle = prompt("Enter new title:", title);
  const newValue = prompt("Enter new value:", value);

  if (newTitle !== null && newValue !== null) {
    const updatedEntry = { title: newTitle, value: parseFloat(newValue) };
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    );
  }
};
  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);
  const totalIncome = entries
    .filter((entry) => entry.type === "income")
    .reduce((prev, entry) => prev + entry.value, 0);

  const totalExpense = entries
    .filter((entry) => entry.type === "expense")
    .reduce((prev, entry) => prev + entry.value, 0);

  return (
    <EntriesContext.Provider value={{afterdelete, entries, setEntries, totalIncome, editedEntry,totalExpense }}>
      {children}
    </EntriesContext.Provider>
  );
}
