import { Post } from "@/app/boards/types/post";
import { atom } from "jotai";

export const boardsAtom = atom<Post["list"]>([]);
export const boardsOrderByAtom = atom<string>("recent");