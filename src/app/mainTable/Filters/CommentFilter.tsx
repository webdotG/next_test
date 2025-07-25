"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";

const CommentFilter = observer(() => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    tableStore.set("comment", e.target.value || null);
  };

  const handleReset = () => {
    tableStore.reset("comment");
  };

  return (
    <div>
      <label>Комментарий:</label>
      <textarea
        rows={4}
        value={tableStore.filters.comment || ""}
        onChange={handleChange}
      />
      <button onClick={handleReset}>Сбросить</button>
    </div>
  );
});

export default CommentFilter;
