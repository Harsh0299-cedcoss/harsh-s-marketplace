import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import createApp from "@shopify/app-bridge";
import { Toast } from "@shopify/app-bridge/actions";

const useToast = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const history = useMemo(
    () => ({
      replace: (path) => {
        navigate(path, { replace: true });
      },
    }),
    [navigate]
  );
  const [config] = useState(() => {
    const host =
      new URLSearchParams(location.search).get("host") ||
      window.__SHOPIFY_DEV_HOST;

    window.__SHOPIFY_DEV_HOST = host;

    return {
      host,
      apiKey: process.env.SHOPIFY_API_KEY,
      forceRedirect: true,
    };
  });

  // Create app
  const app = createApp(config);

  const showToast = (message, duration = 5000, isError = false) => {
    // Create Toast and dispatch show Function
    const toast = Toast.create(app, { message, duration, isError });
    toast.dispatch(Toast.Action.SHOW);
  };

  return [showToast];
};

export default useToast;
