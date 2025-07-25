"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";

const deliveryOptions = ["От нас", "От партнера", "Самовывоз"];

const DeliveryFilter = observer(() => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    tableStore.set("delivery", e.target.value);
  };

  const handleReset = () => {
    tableStore.reset("delivery");
  };

  return (
    <div>
      <label>Доставка:</label>
      {deliveryOptions.map((opt) => (
        <label key={opt}>
          <input
            type="radio"
            name="delivery"
            value={opt}
            checked={tableStore.filters.delivery === opt}
            onChange={handleChange}
          />
          {opt}
        </label>
      ))}
      <button onClick={handleReset}>Сбросить</button>
    </div>
  );
});

export default DeliveryFilter;
