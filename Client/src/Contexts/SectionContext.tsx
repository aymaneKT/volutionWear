import { createContext } from "react";
type sectionType = {
  section: string;
  setSection: (value: string) => void;
};
export const SectionContext = createContext<sectionType>({
  section: "Dashboard",
  setSection: () => {},
});
