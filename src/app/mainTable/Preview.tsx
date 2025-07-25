"use client";
import { observer } from "mobx-react-lite";
import tableStore from "@/store/tableStore";

const Preview = observer(() => {
  const f = tableStore.filters;

  return (
    <div
      style={{ padding: "1rem", border: "1px solid #ccc", marginTop: "2rem" }}
    >
      <h3>Предварительный просмотр</h3>
      <ul style={{ fontSize: "0.9rem", listStyle: "none", padding: 0 }}>
        {[
          ["ID", f.id],
          ["Name", f.name],
          ["Color", f.color],
          ["Weight", f.weight],
          ["Height", f.height],
          ["Width", f.width],
          ["Material", f.material],
          ["Shape", f.shape],
          ["Fragility", f.fragility],
          ["Dietary", f.dietary],
          ["Packaging", f.packaging],
          ["Delivery", f.delivery],
          ["Raiting", f.rating],
          ["Comment", f.comment],
        ].map(([key, val]) => (
          <li key={key}>
            <strong>{key}:</strong>{" "}
            {val === null || val === "" ? "—" : String(val)}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Preview;
