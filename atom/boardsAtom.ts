import { PostType } from "@/app/boards/types/post";
import { atom } from "jotai";

export const boardsAtom = atom<PostType["list"]>([]);
export const boardsOrderByAtom = atom<string>("recent");