"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";
import { useState, useEffect } from "react";

const fakeFetchIds = async (query: string): Promise<number[]> => {
  // мок
  return [100, 101, 102, 110].filter((id) => id.toString().includes(query));
};

const IdFilter = observer(() => {
  const [suggestions, setSuggestions] = useState<number[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const delay = setTimeout(() => {
      if (input) fakeFetchIds(input).then(setSuggestions);
      else setSuggestions([]);
    }, 300);
    return () => clearTimeout(delay);
  }, [input]);

  const handleSelect = (id: number) => {
    tableStore.set("id", id);
    setInput(String(id));
    setSuggestions([]);
  };

  const handleReset = () => {
    tableStore.reset("id");
    setInput("");
    setSuggestions([]);
  };

  return (
    <div>
      <label>ID:</label>
      <input
        type="number"
        value={input}
        onChange={(e) => {
          const val = e.target.value;
          setInput(val);
          tableStore.set("id", val ? Number(val) : null);
        }}
      />
      <button onClick={handleReset}>Сбросить</button>
      {suggestions.length > 0 && (
        <ul style={{ border: "1px solid #ccc", padding: 4 }}>
          {suggestions.map((id) => (
            <li
              key={id}
              onClick={() => handleSelect(id)}
              style={{ cursor: "pointer" }}
            >
              {id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default IdFilter;
