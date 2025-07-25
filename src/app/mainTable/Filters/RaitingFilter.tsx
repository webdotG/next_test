"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";

const RaitingFilter = observer(() => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseFloat(e.target.value);
    tableStore.set("raiting", isNaN(val) ? null : val);
  };

  const handleReset = () => {
    tableStore.reset("raiting");
  };

  return (
    <div>
      <label>Рейтинг:</label>
      <select value={tableStore.filters.raiting ?? ""} onChange={handleChange}>
        <option value="">Выбрать</option>
        {Array.from({ length: 41 }, (_, i) => (i * 0.1 + 1).toFixed(1)).map(
          (v) => (
            <option key={v} value={v}>
              {v}
            </option>
          )
        )}
      </select>
      <button onClick={handleReset}>Сбросить</button>
    </div>
  );
});

export default RaitingFilter;
