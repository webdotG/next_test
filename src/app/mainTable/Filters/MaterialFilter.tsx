"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";
import { useState, useEffect } from "react";

const fakeFetchMaterials = async (q: string): Promise<string[]> => {
  return ["Plastic", "Metal", "Paper", "Glass"].filter((m) =>
    m.toLowerCase().includes(q.toLowerCase())
  );
};

const MaterialFilter = observer(() => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (input) fakeFetchMaterials(input).then(setSuggestions);
      else setSuggestions([]);
    }, 300);
    return () => clearTimeout(delay);
  }, [input]);

  const handleSelect = (val: string) => {
    tableStore.set("material", val);
    setInput(val);
    setSuggestions([]);
  };

  const handleReset = () => {
    tableStore.reset("material");
    setInput("");
    setSuggestions([]);
  };

  return (
    <div>
      <label>Материал:</label>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          const val = e.target.value;
          setInput(val);
          tableStore.set("material", val || null);
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

export default MaterialFilter;
