import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const tokenContext = createContext<
  [string, Dispatch<SetStateAction<string>>]
>(["", () => {}]);

export const userContext = createContext<[any, Dispatch<SetStateAction<any>>]>([
  {},
  () => {},
]);

export const membersContext = createContext<
  [any, Dispatch<SetStateAction<any>>]
>(["", () => {}]);

type Props = {
  children: React.ReactNode;
};

const InfoProvider: React.FC<Props> = ({ children }) => {
  const tokenState = useState("");
  const userState = useState({});
  const membersState = useState("");

  return (
    <membersContext.Provider value={membersState}>
      <userContext.Provider value={userState}>
        <tokenContext.Provider value={tokenState}>
          {children}
        </tokenContext.Provider>
      </userContext.Provider>
    </membersContext.Provider>
  );
};

export default InfoProvider;
