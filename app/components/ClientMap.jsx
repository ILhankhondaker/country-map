"use client";

import dynamic from "next/dynamic";

// jVectorMap references window/self at import time; only load it in the browser.
const CountryMap = dynamic(() => import("./Test"), { ssr: false });

export default CountryMap;
