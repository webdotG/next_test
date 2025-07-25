"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";

const FragilityFilter = observer(() => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    tableStore.set("fragility", e.target.checked);
  };

  const handleReset = () => {
    tableStore.reset("fragility");
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={!!tableStore.filters.fragility}
          onChange={handleChange}
        />
        Хрупкий
      </label>
      <button onClick={handleReset}>Сбросить</button>
    </div>
  );
});

export default FragilityFilter;
