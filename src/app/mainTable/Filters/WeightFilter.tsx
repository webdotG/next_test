"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";
import { useState } from "react";

const WeightFilter = observer(() => {
  const [unit, setUnit] = useState<"kg" | "lb">("kg");

  const convertToKg = (val: number) => (unit === "kg" ? val : val * 0.453592);
  const convertFromKg = (val: number) => (unit === "kg" ? val : val / 0.453592);

  const value = tableStore.filters.weight;
  const displayValue =
    value !== null ? Math.round(convertFromKg(value) * 100) / 100 : "";

  const handleChange = (v: number) => {
    tableStore.set("weight", convertToKg(v));
  };

  const handleReset = () => {
    tableStore.reset("weight");
  };

  return (
    <div>
      <label>Вес ({unit}):</label>
      <input
        type="range"
        min={0}
        max={100}
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
        <option value="kg">кг</option>
        <option value="lb">фунт</option>
      </select>
      <button onClick={handleReset}>Сбросить</button>
    </div>
  );
});

export default WeightFilter;
