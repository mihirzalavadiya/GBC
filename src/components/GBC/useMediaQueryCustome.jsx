import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const useMediaQueryCustom = () => {
  const [smallMobile, setSmallMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMore1023, setIsMore1023] = useState(false);
  const [isMore768, setIsMore768] = useState(false);
  const [isLess1024, setIsLess1024] = useState(false);
  const [isSmallerDesktop, setIsSmallerDesktop] = useState(false);

  const isDesktop1 = useMediaQuery({ query: "(min-width: 1024px)" });
  const smallMobile1 = useMediaQuery({
    query: "(max-width: 647px)",
  });
  const isMobile1 = useMediaQuery({
    query: "(max-width: 767px)",
  });
  const isTablet1 = useMediaQuery({
    minWidth: 768,
    maxWidth: 1023,
  });

  const isMore10231 = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  const isMore7681 = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isLess10241 = useMediaQuery({
    maxWidth: 1023,
  });

  const isSmallerDesktop1 = useMediaQuery({
    minWidth: 1024,
    maxWidth: 1280,
  });

  useEffect(() => {
    setSmallMobile(smallMobile1);
  }, [smallMobile1]);

  useEffect(() => {
    setIsMobile(isMobile1);
  }, [isMobile1]);

  useEffect(() => {
    setIsTablet(isTablet1);
  }, [isTablet1]);

  useEffect(() => {
    setIsDesktop(isDesktop1);
  }, [isDesktop1]);

  useEffect(() => {
    setIsMore1023(isMore10231);
  }, [isMore10231]);

  useEffect(() => {
    setIsMore768(isMore7681);
  }, [isMore7681]);

  useEffect(() => {
    setIsLess1024(isLess10241);
  }, [isLess10241]);
  useEffect(() => {
    setIsSmallerDesktop(isSmallerDesktop1);
  }, [isSmallerDesktop1]);

  return {
    isDesktop,
    isMobile,
    isTablet,
    isMore1023,
    isMore768,
    isLess1024,
    smallMobile,
    isSmallerDesktop,
  };
};

export default useMediaQueryCustom;
