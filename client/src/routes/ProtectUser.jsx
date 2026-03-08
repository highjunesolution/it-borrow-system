import React, { useEffect, useState } from "react";
import useMisStore from "../store/mis-store";
import { currentUser } from "../apis/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectUser = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useMisStore((state) => state.user);
  const token = useMisStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
      // send to back
      currentUser(token)
        .then(() => setOk(true))
        .catch(() => setOk(false));
    }
  }, []);

  return ok ? element : <LoadingToRedirect />;
};

export default ProtectUser;
