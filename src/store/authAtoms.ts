// src/store/authAtoms.ts
import { atom } from "jotai";

export const loginAtom = atom<boolean>(false);
export const userIdAtom = atom<string | null>(null);
export const nicknameAtom = atom<string | null>(null);
export const userImageAtom = atom<string | null>(null);
