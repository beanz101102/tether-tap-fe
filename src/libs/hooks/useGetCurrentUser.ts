import { atom, useAtom } from "jotai";

interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  telegram_id: string;
  avatar: string;
  lang: string;
  ref_code: string;
  is_apply_ref_code: boolean;
  is_skip_ref: boolean;
}

const userAtom = atom<IUser | null>({
  id: 1,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  name: "John Doe",
  telegram_id: "123456789",
  avatar: "https://firebasestorage.googleapis.com/v0/b/xlords-dev.appspot.com/o/pet-game%2Fbasilisk.webp?alt=media&token=59e60aec-e0a7-40a1-a8a1-ed3e099fe89d",
  lang: "en",
  ref_code: "REF123",
  is_apply_ref_code: true,
  is_skip_ref: false,
});
const firstLoadingAtom = atom<boolean>(false);

export const useGetCurrentUser = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [firstLoading, setFirstLoading] = useAtom(firstLoadingAtom);
  return {
    setCurrentUser,
    // TODO: mock data
    currentUser: {
      id: 1,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
      name: "John Doe",
      telegram_id: "123456789",
      avatar: "https://firebasestorage.googleapis.com/v0/b/xlords-dev.appspot.com/o/user-avatar%2F0VIiD25VGJY2t0Si46XUTkEOkkF2?alt=media&token=a9bacc86-4de1-425a-9154-848f74e6d72f",
      lang: "en",
      ref_code: "REF123",
      is_apply_ref_code: true,
      is_skip_ref: false,
    },
    setFirstLoading,
    firstLoading,
  };
};
