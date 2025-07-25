"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";

const ShapeFilter = observer(() => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    tableStore.set("shape", val || null);
  };

  const handleReset = () => {
    tableStore.reset("shape");
  };

  return (
    <div>
      <label>Форма:</label>
      <select value={tableStore.filters.shape || ""} onChange={handleChange}>
        <option value="">Выбрать</option>
        <option value="Круг">Круг</option>
        <option value="Квадрат">Квадрат</option>
        <option value="Овал">Овал</option>
        <option value="Треугольник">Треугольник</option>
        <option value="Прямоугольник">Прямоугольник</option>
      </select>
      <button onClick={handleReset}>Сбросить</button>
    </div>
  );
});

export default ShapeFilter;
