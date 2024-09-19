var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//API로부터 전체 아이템 데이터 가져오기
const BASE_URL = "https://panda-market-api.vercel.app";
export function getPandaItems(_a) {
    return __awaiter(this, arguments, void 0, function* ({ page, pageSize, orderBy = "recent", search = "", }) {
        const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${search}`;
        const responseAll = yield fetch(`${BASE_URL}/products?${query}`);
        const body = yield responseAll.json();
        if (!responseAll.ok) {
            throw new Error("아이템을 불러오는데 실패했습니다.");
        }
        return body;
    });
}
// id로 아이템 정보 가져오기
export function getItemById(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id }) {
        const numId = parseInt(id, 10);
        const responseEach = yield fetch(`${BASE_URL}/products/${numId}`);
        const bodyEach = yield responseEach.json();
        if (!responseEach.ok) {
            throw new Error("아이템을 불러오는데 실패했습니다.");
        }
        return bodyEach;
    });
}
//댓글 가져오기
export function getReplyById(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, limit, cursor, }) {
        const query = `limit=${limit}`;
        const responseReply = yield fetch(`${BASE_URL}/products/${id}/comments?${query}`);
        if (!responseReply.ok) {
            throw new Error("아이템을 불러오는데 실패했습니다.");
        }
        const bodyReply = yield responseReply.json();
        return bodyReply;
    });
}
