"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";
import { useState, useEffect } from "react";

const fakeFetchNames = async (q: string): Promise<string[]> => {
  return ["Apple", "Banana", "Box", "Ball"].filter((n) =>
    n.toLowerCase().includes(q.toLowerCase())
  );
};

const NameFilter = observer(() => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (input) fakeFetchNames(input).then(setSuggestions);
      else setSuggestions([]);
    }, 300);
    return () => clearTimeout(delay);
  }, [input]);

  const handleSelect = (val: string) => {
    tableStore.set("name", val);
    setInput(val);
    setSuggestions([]);
  };

  const handleReset = () => {
    tableStore.reset("name");
    setInput("");
    setSuggestions([]);
  };

  return (
    <div>
      <label>Название:</label>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          const val = e.target.value;
          setInput(val);
          tableStore.set("name", val || null);
        }}
      />
      <button onClick={handleReset}>Сбросить</button>
      {suggestions.length > 0 && (
        <ul style={{ border: "1px solid #ccc", padding: 4 }}>
          {suggestions.map((val) => (
            <li
              key={val}
              onClick={() => handleSelect(val)}
              style={{ cursor: "pointer" }}
            >
              {val}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default NameFilter;
