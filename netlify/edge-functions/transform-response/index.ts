import { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const response = await context.next();
  const body = await response.text();
  let newBody = body;

  const cascadeLayerSupport = context.cookies.get("css-cascade-layer-support");
  if (cascadeLayerSupport) {
    newBody = newBody.replace(
      '<link rel="stylesheet" href="/dist/styles-polyfilled.css" />',
      '<link rel="stylesheet" href="/dist/styles.css" />'
    );
  } else {
    // Add the HTML element that our CSS will apply a background
    // image to if the browser supports CSS Cascade Layers.
    // The background image HTTP request will be intercepted by
    // the CSS Cascade Layers Edge Function and set a cookie
    // that we will use on subsequent requests to serve the
    // non-polyfilled CSS.
    newBody = body.replace(
      "</body>",
      `<span aria-hidden="true" data-css-cascade-layers-detector style="position:absolute;left:-9999px;top:-9999px;"></span>
      <link
        rel="preload"
        href="/dist/detect.css"
        as="style"
        onload="this.onload=null;this.rel='stylesheet'"
      />
      <noscript>
        <link rel="stylesheet" href="/dist/detect.css" />
      </noscript>
      </body>`
    );
  }

  return new Response(newBody, response);
};
