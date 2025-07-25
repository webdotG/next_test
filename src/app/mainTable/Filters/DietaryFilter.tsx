"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";

const options = ["Кашерное", "Халяль", "Освященное"];

const DietaryFilter = observer(() => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    tableStore.set("dietary", e.target.value);
  };

  const handleReset = () => {
    tableStore.reset("dietary");
  };

  return (
    <div>
      <label>Питание:</label>
      {options.map((opt) => (
        <label key={opt}>
          <input
            type="radio"
            name="dietary"
            value={opt}
            checked={tableStore.filters.dietary === opt}
            onChange={handleChange}
          />
          {opt}
        </label>
      ))}
      <button onClick={handleReset}>Сбросить</button>
    </div>
  );
});

export default DietaryFilter;
