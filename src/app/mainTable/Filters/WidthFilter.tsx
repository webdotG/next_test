"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";
import { useState } from "react";

const WidthFilter = observer(() => {
  const [unit, setUnit] = useState<"cm" | "inch">("cm");

  const convertToCm = (val: number) => (unit === "cm" ? val : val * 2.54);
  const convertFromCm = (val: number) => (unit === "cm" ? val : val / 2.54);

  const value = tableStore.filters.width;
  const displayValue =
    value !== null ? Math.round(convertFromCm(value) * 100) / 100 : "";

  const handleChange = (v: number) => {
    tableStore.set("width", convertToCm(v));
  };

  const handleReset = () => {
    tableStore.reset("width");
  };

  return (
    <div>
      <label>Ширина ({unit}):</label>
      <input
        type="range"
        min={0}
        max={200}
        step={1}
        value={displayValue || 0}
        onChange={(e) => handleChange(Number(e.target.value))}
      />
      <input
        type="number"
        value={displayValue}
        onChange={(e) => handleChange(Number(e.target.value))}
      />
      <select value={unit} onChange={(e) => setUnit(e.target.value as any)}>
        <option value="cm">см</option>
        <option value="inch">дюйм</option>
      </select>
      <button onClick={handleReset}>Сбросить</button>
    </div>
  );
});

export default WidthFilter;
