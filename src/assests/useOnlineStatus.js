import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setonlineStatus] = useState(navigator.onLine);
  useEffect(() => {
    window.addEventListener("offline", () => setonlineStatus(false));
    window.addEventListener("online", () => setonlineStatus(true));

    console.log("re rendered.....");
    
  }, []);
  return onlineStatus;
};

export default useOnlineStatus;