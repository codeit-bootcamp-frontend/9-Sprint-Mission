// src/store/authAtoms.ts
import { atom } from "jotai";

export const loginAtom = atom<boolean>(false);

export const userAtom = atom({
  Id: null as string | null,
  Image: null as string | null,
  nickname: null as string | null,
});
