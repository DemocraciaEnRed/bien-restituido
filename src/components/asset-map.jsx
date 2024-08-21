"use client";
import React, { useEffect, useState } from "react";

const AssetMap = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div className="my-5 [&_.flourish-credit]:hidden">
      <iframe
        src="https://flo.uri.sh/story/2506935/embed"
        title="Interactive or visual content"
        className="flourish-embed-iframe"
        frameborder="0"
        scrolling="no"
        style={{ width: "100%", height: "600px" }}
        sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      ></iframe>
      <div
        style={{
          width: "100%",
          marginTop: "4px!important",
          textAlign: "right!important",
        }}
      >
        <a
          class="flourish-credit"
          href="https://public.flourish.studio/story/2506935/?utm_source=embed&utm_campaign=story/2506935"
          target="_top"
          style={{ textDecoration: "none!important" }}
        >
          <img
            alt="Made with Flourish"
            src="https://public.flourish.studio/resources/made_with_flourish.svg"
            style={{
              width: "105px!important",
              height: "16px!important",
              border: "none!important",
              margin: "0!important",
            }}
          />
        </a>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default AssetMap;
