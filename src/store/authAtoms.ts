// src/store/authAtoms.ts
import { atom } from "jotai";
import { User } from "@/types/auth";

export const loginAtom = atom<boolean>(false);

export const userAtom = atom<User | null>(null);
