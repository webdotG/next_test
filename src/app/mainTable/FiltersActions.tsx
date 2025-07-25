"use client";

import tableStore from "@/store/tableStore";
import Link from "next/link";

export default function FiltersActions() {
  const urlParams = tableStore.toUrlParams();

  return (
    <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
      <button onClick={() => tableStore.resetAll()}>
        Сбросить все значения
      </button>
      <Link
        href={{ pathname: "/mainTable/confirm", query: urlParams }}
        scroll={false}
      >
        <button>Отправить</button>
      </Link>
    </div>
  );
}
