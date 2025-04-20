export const assetAllocation = [
  {
    name: "Equity",
    value: "37.5%",
  },
  {
    name: "Commodities",
    value: "37.5%",
  },
  {
    name: "Fixed Income",
    value: "37.5%",
  },
  {
    name: "REITs",
    value: "37.5%",
  },
  {
    name: "Alternatives",
    value: "37.5%",
  },
  {
    name: "Alternatives",
    value: "37.5%",
  },
  {
    name: "Alternatives",
    value: "37.5%",
  },
  {
    name: "Alternatives",
    value: "37.5%",
  },
  {
    name: "Alternatives",
    value: "37.5%",
  },
];

export const colorMap = (name) => {
  if (name === "Equity") {
    return "asset-equity";
  } else if (name === "Commodities") {
    return "asset-commodities";
  } else if (name === "Fixed Income") {
    return "asset-fixed-income";
  } else if (name === "REITs") {
    return "asset-reits";
  } else if (name === "Multi Asset") {
    return "asset-multi-asset";
  } else if (name === "Crypto") {
    return "asset-crypto";
  } else if (name === "Private Assets") {
    return "asset-private-assets";
  } else if (name === "Pending Orders") {
    return "asset-pending-orders";
  } else if (name === "Available Cash") {
    return "asset-available-cash";
  } else if (name === "Alternatives") {
    return "asset-alternatives";
  } else {
    return "asset-hybrid";
  }
};

export const colorMapText = (name) => {
  if (name === "Equity") {
    return "asset-equity-text";
  } else if (name === "Commodities") {
    return "asset-commodities-text";
  } else if (name === "Fixed Income") {
    return "asset-fixed-income-text";
  } else if (name === "REITs") {
    return "asset-reits-text";
  } else if (name === "Multi Asset") {
    return "asset-multi-asset-text";
  } else if (name === "Crypto") {
    return "asset-crypto-text";
  } else if (name === "Private Assets") {
    return "asset-private-assets-text";
  } else if (name === "Pending Orders") {
    return "asset-pending-orders-text";
  } else if (name === "Available Cash") {
    return "asset-available-cash-text";
  } else if (name === "Alternatives") {
    return "asset-alternatives-text";
  } else {
    return "asset-hybrid-text";
  }
};

export const suggestedAssets = [
  {
    key: "Equity",
    name: "Invesco QQQ Trust Series 1 E....",
    value: "40.2%",
  },
  {
    key: "Equity",
    name: "JJJ Moore Fund (AAAP Feede...",
    value: "40.2%",
  },
  {
    key: "Alternatives",
    name: "BlackRock US Flexible Equit...",
    value: "40.2%",
  },
  {
    key: "Alternatives",
    name: "Invesco QQQ Trust Series 1 E....",
    value: "40.2%",
  },
  {
    key: "REITs",
    name: "Invest - NFLX, DIS",
    value: "40.2%",
  },
  {
    key: "Commodities",
    name: "Invesco QQQ Trust Series 1 E....",
    value: "40.2%",
  },
  {
    key: "Fixed Income",
    name: "Invesco QQQ Trust Series 1 E....",
    value: "40.2%",
  },
  {
    key: "Fixed Income",
    name: "Invesco QQQ Trust Series 1 E....",
    value: "40.2%",
  },
];

export const userJourneyData = (userDetails) => {
  const { kycStatus, billingType } = userDetails || {};
  if ((kycStatus === "USER_APPROVED" || kycStatus === "APPROVED") && billingType === "PRIVATE_WEALTH") {
    return {
      title: (
        <>
          Contact your advisor to help you achieve <br /> your target rate of returns
        </>
      ),
      btn1: "Talk to Advisor",
      btn2: "Model Asset Allocation",
    };
  } else if (kycStatus === "DRAFT") {
    return {
      title: (
        <>
          Complete your KYC process to unlock the full <br /> features of the goal based returns calculator
        </>
      ),
      btn1: "Talk to Advisor",
      btn2: "Complete KYC",
    };
  } else if ((kycStatus === "USER_APPROVED" || kycStatus === "APPROVED") && billingType === "DIGITAL") {
    return {
      title: (
        <>
          You need to opt-in as an Accredited
          <br /> Investor to view all the Suggested Assets
        </>
      ),
      btn1: "",
      btn2: "Upgrade to Private Wealth",
    };
  } else {
    return {
      title: (
        <>
          Signup to unlock the full features of the <br /> goal based returns calculator
        </>
      ),
      btn1: "Talk to Advisor",
      btn2: "Signup",
    };
  }
};

export const assetAllocationMobile = [
  {
    name: "Equity",
    value: "27",
  },
  {
    name: "Commodities",
    value: "21",
  },
  {
    name: "Fixed Income",
    value: "16",
  },
  {
    name: "REITs",
    value: "21",
  },
  {
    name: "Alternatives",
    value: "15",
  },
];

export const colorMapping = [
  { assetClass: "Equity", color: "#5C59DC" },
  { assetClass: "Commodities", color: "#5786FF" },
  { assetClass: "Fixed Income", color: "#CD82FB" },
  { assetClass: "Real Estate", color: "#FFABCE" },
  { assetClass: "Alternatives", color: "#FFD78A" },
  { assetClass: "Multi-Asset", color: "#9E1065" },
  { assetClass: "Crypto", color: "#7165BA" },
  { assetClass: "Privates", color: "#363636" },
  { assetClass: "Cash", color: "#00B267" },
  { assetClass: "Hybrid", color: "#7A5D47" },
  { assetClass: "Vc Fund", color: "#C3EFDC" },
  { assetClass: "Startup", color: "#372386" },
  { assetClass: "Structured Notes", color: "#C1A079" },
  { assetClass: "Specialty", color: "#FEE1C7" },
  { assetClass: "Forex", color: "#75486E" },
  { assetClass: "Other", color: "#999999" },
  { assetClass: "Liquid", color: "#27626A" },
  { assetClass: "International", color: "#41524B" },
  { assetClass: "Alternates", color: "#FA7E61" },
];

export const errorMessageData = (rateOfReturn = 0, minimumReturnPercentage, maximumReturnPercentage) => {
  if (rateOfReturn > maximumReturnPercentage) {
    return {
      errorTitle: "No Historical through-the-cycle portfolio",
      errorSubTitle: `There is no model asset allocation that is aligned with expected target returns. Call your advisor to discuss or tweak values in the calculator.`,
    };
  }
  if (rateOfReturn < minimumReturnPercentage) {
    return {
      errorTitle: "Good news- your target return is low",
      errorSubTitle: `Good news- your target return is so low that the portfolio that meets it, is not on the efficient frontier. Call your advisor to discuss or tweak values in the calculator to target portfolio that has lower risk AND higher return.`,
    };
  }
};

export const getPlatformCode = (onlyWeb) => {
  if (typeof window !== "undefined") {
    const userAgent = window?.navigator?.userAgent?.toString();
    if (userAgent?.includes("Android") || userAgent?.includes("iPhone") || userAgent?.includes("iPad") || userAgent?.includes("iPod")) {
      return onlyWeb ? "WEBSITE" : "MOBILE_WEBSITE";
    } else {
      return "WEBSITE";
    }
  } else {
    return "WEBSITE";
  }
};

export const getHeadersRM = () => {
  const adminId = window.localStorage.adminUserId;

  const defaultHeaders = {
    ...(adminId && { "User-ID": adminId }),
    "Access-Token": window.localStorage["authToken"],
    "User-IP": window.localStorage.ipAddress === undefined ? "0.0.0.0" : window.localStorage.ipAddress,
    Agent: window.navigator.userAgent,
    PLATFORM_CODE: getPlatformCode(),
  };
  const additionalHeaders = {};
  // if (!isAdmin && !noExternal) {

  if (window.localStorage.userId != window.localStorage.adminUserId) {
    additionalHeaders["ExternalUser-Id"] = window.localStorage.userId;
  }

  // }
  return { ...defaultHeaders, ...additionalHeaders };
};

export const getHeadersPortal = (onlyWeb = false) => {
  try {
    if (!window || !window.localStorage || !window.localStorage.userId || !window.localStorage.authToken || !window.localStorage.ip || !getPlatformCode()) {
      const gbcData = localStorage.getItem("gbcData");
      localStorage.clear();
      localStorage.setItem("gbcData", gbcData);
      sessionStorage.clear();
      return;
    }
    const defaultHeaders = {
      "user-id": window.localStorage.userId,
      "access-token": window.localStorage.authToken,
      "user-ip": window.localStorage.ip,
      agent: window.navigator.userAgent,
      Platform_code: getPlatformCode(onlyWeb),
    };
    const additionalHeaders = {};
    return { ...defaultHeaders, ...additionalHeaders };
  } catch (err) {}
};

export const calculateTimeDifference = (landingTime) => {
  const leavingTime = new Date();

  if (landingTime !== null) {
    // Format the time difference as "hh:mm:ss"
    var timeDifference = Math.floor((leavingTime - landingTime) / 1000);

    return timeDifference;
  }
};
