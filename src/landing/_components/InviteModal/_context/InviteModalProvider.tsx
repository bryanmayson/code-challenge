import { createContext, useContext, useMemo, useState } from "react";
import { InviteModalState } from "../types";

interface InviteModalContextStruct {
  modalState: InviteModalState | undefined;
  setModalState: React.Dispatch<
    React.SetStateAction<InviteModalState | undefined>
  >;
}

const InviteModalContext = createContext({} as InviteModalContextStruct);

export const useInviteModalContext = () => useContext(InviteModalContext);

export const InviteModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [modalState, setModalState] = useState<InviteModalState | undefined>();

  const contextValue = useMemo(
    () => ({
      modalState,
      setModalState,
    }),
    [modalState, setModalState]
  );

  return (
    <InviteModalContext.Provider value={contextValue}>
      {children}
    </InviteModalContext.Provider>
  );
};
