export default {
  async fetch(request) {
    const url = new URL(request.url)
    const host = url.hostname.replace(`.${url.hostname.split('.').slice(-2).join('.')}`, '')
    const excluded = ["www", "txadmin", "connect", "status"]

    if (excluded.includes(host)) {
      return fetch(request)  // Keine Weiterleitung für diese Hosts
    }

    // Alle anderen Subdomains umleiten
    url.hostname = "www.zentra.city"
    return Response.redirect(url.toString(), 301)
  }
}
