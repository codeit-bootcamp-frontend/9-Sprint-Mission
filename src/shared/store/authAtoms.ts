// src/shared/store/authAtoms.ts
import { atom } from "jotai";
import DefaultAvatar from "../assets/images/login/default_avatar.png";

export const isLoggedInAtom = atom(!!sessionStorage.getItem("userId"));
export const userImageAtom = atom<string>(
  sessionStorage.getItem("userImage") || DefaultAvatar
);
