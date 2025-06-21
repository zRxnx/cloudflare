export default {
  async fetch(request) {
    const url = new URL(request.url)
    const host = url.hostname.replace(`.${url.hostname.split('.').slice(-2).join('.')}`, '')
    const excluded = ["www", "txadmin", "connect", "status"]

    if (excluded.includes(host)) {
      const res = await fetch(request)
      // Cache deaktiveren, damit Browser nicht cached
      const newRes = new Response(res.body, res)
      newRes.headers.delete("Cache-Control")
      newRes.headers.set("Cache-Control", "no-store")
      return newRes
    }

    // Alle anderen Subdomains umleiten
    url.hostname = "www.zentra.city"
    return Response.redirect(url.toString(), 301)
  }
}
