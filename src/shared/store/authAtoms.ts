// src/shared/store/authAtoms.ts
import { atom } from "jotai";

export const isLoggedInAtom = atom(!!sessionStorage.getItem("userId"));
export const userImageAtom = atom<string | null>(
  sessionStorage.getItem("userImage")
);
