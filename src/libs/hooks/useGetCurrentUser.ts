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
  address: string;
}

const userAtom = atom<IUser | null>(null);
const firstLoadingAtom = atom<boolean>(false);

export const useGetCurrentUser = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [firstLoading, setFirstLoading] = useAtom(firstLoadingAtom);
  return {
    setCurrentUser,
    currentUser,
    setFirstLoading,
    firstLoading,
  };
};
