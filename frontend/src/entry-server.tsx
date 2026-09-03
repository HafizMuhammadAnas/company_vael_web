import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
  type StaticHandlerContext,
} from "react-router-dom";

import { AppShell } from "@/AppShell";
import { routes } from "@/router/routes";

export type RenderResult =
  | { kind: "html"; html: string; status: number }
  | { kind: "redirect"; location: string; status: number };

export async function render(url: string, siteUrl = "https://vaelkode.com"): Promise<RenderResult> {
  const handler = createStaticHandler(routes);
  const request = new Request(`${siteUrl}${url === "/" ? "" : url}`);

  const context = (await handler.query(request)) as StaticHandlerContext | Response;

  if (context instanceof Response) {
    const location = context.headers.get("Location") ?? "/";
    return { kind: "redirect", location, status: context.status };
  }

  const router = createStaticRouter(handler.dataRoutes, context);
  const html = renderToString(
    <StrictMode>
      <AppShell>
        <StaticRouterProvider router={router} context={context} />
      </AppShell>
    </StrictMode>,
  );

  return { kind: "html", html, status: context.statusCode ?? 200 };
}
