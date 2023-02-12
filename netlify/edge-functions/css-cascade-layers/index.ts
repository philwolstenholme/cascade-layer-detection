import type { Context } from "https://edge.netlify.com";

export default (request: Request, context: Context) => {
  const query = new URLSearchParams(request.url.split("?")[1]);
  const action = query.get("action");

  if (action == "set") {
    context.cookies.set({
      name: "css-cascade-layer-support",
      value: "1",
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 2),
    });

    // return a 1px by 1px transparent image
    return new Response(
      "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      {
        headers: {
          "Content-Type": "image/gif",
        },
      }
    );
  }

  if (action == "get") {
    const cookie = context.cookies.get("css-cascade-layer-support");
    return new Response(cookie);
  }

  return new Response("No action specified");
};
