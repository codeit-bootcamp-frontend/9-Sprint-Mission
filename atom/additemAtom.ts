import { atom } from "jotai";
import { INewTag } from "@/app/additem/page";

export const addItemAtom = atom<INewTag[]>([]);
