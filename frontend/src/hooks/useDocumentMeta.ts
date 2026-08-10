import { useEffect } from "react";

/** Sets the document title and meta description for a page. */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let meta: HTMLMetaElement | null = null;
    let created = false;
    if (description) {
      meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
        created = true;
      }
      meta.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;
      if (created && meta) meta.remove();
    };
  }, [title, description]);
}
