//API로부터 전체 아이템 데이터 가져오기
const baseUrl = "https://panda-market-api.vercel.app";
export async function getPandaItems({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  search = "",
}) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${search}`;
  const responseAll = await fetch(`${baseUrl}/products?${query}`);

  const body = await responseAll.json();

  if (!responseAll.ok) {
    throw new Error("아이템을 불러오는데 실패했습니다.");
  }
  return body;
}

// id로 아이템 정보 가져오기
export async function getItemById({ id }) {
  const responseEach = await fetch(`${baseUrl}/products/${id}`);
  const bodyEach = await responseEach.json();
  if (!responseEach.ok) {
    throw new Error("아이템을 불러오는데 실패했습니다.");
  }
  return bodyEach;
}

//댓글 가져오기
export async function getReplyById({ id, limit }) {
  const query = `limit=${limit}`;
  const responseReply = await fetch(
    `${baseUrl}/products/${id}/comments?${query}`
  );
  if (!responseReply.ok) {
    throw new Error("아이템을 불러오는데 실패했습니다.");
  }
  const bodyReply = await responseReply.json();
  return bodyReply;
}
