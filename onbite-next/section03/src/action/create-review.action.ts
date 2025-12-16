"use server";

import { revalidatePath } from "next/cache";

export default async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요!",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // revalidatePath(`/book/${bookId}`); //next 서버측에게 이경로에 해당하는 페이지를 다시 생성해줄것을(재검증) 요청하는것.
    revalidatePath(`review-${bookId}`); // 해당 인자로 들어간 값을 tag의 값으로 가진 fetch만 데이터 캐시 초기화 시킴

    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다. ${err}`,
    };
  }
}
