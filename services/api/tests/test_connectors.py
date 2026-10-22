import asyncio, httpx
from app.connectors.hasdata_indeed import HasDataIndeedConnector

def test_hasdata_parses_and_sends_key():
    seen = {}
    def handler(req: httpx.Request):
        seen["key"] = req.headers["x-api-key"]; seen["q"] = dict(req.url.params)
        return httpx.Response(200, json={"jobs": [{"jobKey": "a1", "url": "https://fr.indeed.com/viewjob?jk=a1", "title": "Chargée de projets marketing", "company": "X", "location": "Paris"}]})
    c = HasDataIndeedConnector("k", httpx.AsyncClient(transport=httpx.MockTransport(handler)))
    offers = asyncio.run(c.search(["chargée de projets marketing"], ["Île-de-France"]))
    assert offers[0].external_id == "a1" and seen["key"] == "k" and seen["q"]["domain"] == "fr.indeed.com"
    assert c.status == "non_teste" and not c.allows_auto_apply   # jamais « opérationnel » sans test réel
