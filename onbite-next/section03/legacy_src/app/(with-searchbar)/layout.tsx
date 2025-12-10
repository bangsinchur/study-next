import Searchbar from "../../components/searchbar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>임시 서치 레이아웃bar</div>
      <Searchbar />
      {children}
    </div>
  );
}
