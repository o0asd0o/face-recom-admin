import { pages } from "constants/constants";
import React, { useCallback, useEffect } from "react";
import { useContext, useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type NavigationContextType = {
    selectedPage: string,
    selectedPageIndex: number,
    prevPageIndex: number
    handleNavigation(page: string, index?: number): void,
    setPageIndexManual(index: number): void,
} | undefined

const NavigationContext = createContext<NavigationContextType>(undefined);

export function NavigationProvider({ children }: { children: JSX.Element }) {
    const [selectedPage, setSelectedPage] = useState<string>("/");
    const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
    const [prevPageIndex, setPrevPageIndex] = useState<number>(0);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const pathName = location.pathname;
            const index = pages.findIndex((item) => item.page === pathName);
            setSelectedPageIndex(index)
        }, 0);

    }, [location.pathname])

    const handleNavigation = useCallback((page: string, index: number = selectedPageIndex) => {
        setSelectedPage(page);
        setSelectedPageIndex(index);
        setPrevPageIndex(selectedPageIndex);

        navigate(page);
    }, [selectedPageIndex, setSelectedPage, setSelectedPageIndex, setPrevPageIndex]);

    return (
        <NavigationContext.Provider value={{ 
            selectedPage,
            selectedPageIndex,
            prevPageIndex,
            handleNavigation,
            setPageIndexManual: setSelectedPageIndex,
         }}>
             {children}
        </NavigationContext.Provider>
    );
}

export function useHomeNavigation() {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error("useHomeNavigation must be used within an NavigationProvider");
  }

  return context;
}
