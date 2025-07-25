"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";
import { useState } from "react";

const packagingOptions = ["Картон", "Пластик", "Бумага"];

const PackagingFilter = observer(() => {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState(tableStore.filters.packaging || "");

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setShowInput(checked);
    if (!checked) {
      tableStore.reset("packaging");
    } else {
      tableStore.set("packaging", input);
    }
  };

  const handleInput = (val: string) => {
    setInput(val);
    tableStore.set("packaging", val);
  };

  const handleReset = () => {
    tableStore.reset("packaging");
    setInput("");
    setShowInput(false);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={showInput} onChange={handleCheckbox} />
        Упаковка
      </label>
      {showInput && (
        <>
          <input value={input} onChange={(e) => handleInput(e.target.value)} />
          <ul>
            {packagingOptions.map((opt) => (
              <li
                key={opt}
                onClick={() => handleInput(opt)}
                style={{ cursor: "pointer" }}
              >
                {opt}
              </li>
            ))}
          </ul>
        </>
      )}
      <button onClick={handleReset}>Сбросить</button>
    </div>
  );
});

export default PackagingFilter;
