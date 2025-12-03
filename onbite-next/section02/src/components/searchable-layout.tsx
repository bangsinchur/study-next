import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";

export default function SearchLayout({ children }: { children: ReactNode }) {
  const [search, setSerch] = useState("");
  const router = useRouter();

  const q = router.query.q as string;

  useEffect(() => {
    setSerch(q || "");
  }, []);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return; // input의 값을 새로 입력할때, 현재 페이지의 q의 값과 동일하다면 페이지 이동을 방지

    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
