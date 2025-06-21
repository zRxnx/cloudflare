export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname.split('.')?.[0];
    const excluded = ["www", "connect", "status"]; // txadmin nicht ausgeschlossen

    if (host === "txadmin") {
      if (url.pathname === "/" || url.pathname === "") {
        // Root auf /login umleiten
        url.pathname = "/login";
        return Response.redirect(url.toString(), 301);
      }
      // alle anderen Pfade direkt durchreichen
      return fetch(request);
    }

    if (excluded.includes(host)) {
      return fetch(request);
    }

    // Alle anderen Subdomains auf www umleiten
    url.hostname = "www.zentra.city";
    return Response.redirect(url.toString(), 301);
  }
}
