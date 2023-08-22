import { useState } from "react";
import createApp from "@shopify/app-bridge";
import { ContextualSaveBar } from "@shopify/app-bridge/actions";
import { useLocation } from "react-router-dom";

const useContextSaveBar = () => {
  const location = useLocation();
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

  // Create App
  const app = createApp(config);

  // Create ContextualSaveBar
  const contextualSaveBar = ContextualSaveBar.create(app, {
    fullWidth: true,
    saveAction: {
      disabled: false,
      loading: false,
    },
    discardAction: {
      disabled: false,
      loading: false,
      discardConfirmationModal: false,
    },
  });

  // Display Function
  const displayContextBar = (show) =>
    show
      ? contextualSaveBar.dispatch(ContextualSaveBar.Action.SHOW)
      : contextualSaveBar.dispatch(ContextualSaveBar.Action.HIDE);

  // Subscribe Save and Save button Functionality
  const subscribeSave = (onSave) => {
    contextualSaveBar.subscribe(ContextualSaveBar.Action.SAVE, () => {
      onSave();
      displayContextBar(false); // Hide Context Bar
    });
  };

  // Subscribe Discard and Discard button Functionality
  const subscribeDiscard = (onDisacrd = () => {}) => {
    contextualSaveBar.subscribe(ContextualSaveBar.Action.DISCARD, function () {
      onDisacrd();
      displayContextBar(false); // Hide Context Bar
    });
  };

  return [displayContextBar, subscribeSave, subscribeDiscard];
};

export default useContextSaveBar;
