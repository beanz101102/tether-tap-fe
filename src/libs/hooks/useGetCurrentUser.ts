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

const userAtom = atom<IUser | null>(null);
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
      avatar: "https://example.com/avatar1.jpg",
      lang: "en",
      ref_code: "REF123",
      is_apply_ref_code: true,
      is_skip_ref: false,
    },
    setFirstLoading,
    firstLoading,
  };
};
