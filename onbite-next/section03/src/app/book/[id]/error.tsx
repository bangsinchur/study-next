"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

//서버든 클라이언트든 모든 곳에서 오류를 처리해야해서 클라이언트 컴포넌트로 생성

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.log(error.message);
  }, [error]);
  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); //현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴
            reset(); // 에러상태를 초기화, 컴포넌트들을 다시 렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
