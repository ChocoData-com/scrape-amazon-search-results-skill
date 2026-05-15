# scrape-amazon-search-results

A Claude Skill that teaches AI agents how to run an Amazon keyword search and return the ranked SERP (organic + sponsored positions, ASINs, titles, prices, ratings, review counts, image URLs) across 20 marketplaces, using the [Amazon Scraper API](https://amazonscraperapi.com).

## Quick start

```bash
export ASA_API_KEY=asa_live_...   # get one free (1000 requests) at https://app.amazonscraperapi.com
```

Then load the `SKILL.md` into your AI client (Claude Code, Cowork, Codex, or any compatible skill runtime). Triggers when the user mentions "Amazon search", "search Amazon for X", "top results on Amazon", "Amazon SERP", and similar.

See [`SKILL.md`](./SKILL.md) for the full skill content and [`scripts/`](./scripts/) for runnable Python and Node examples.

## What's in this repo

| File | Purpose |
|---|---|
| `SKILL.md` | The skill itself: frontmatter, trigger phrasing, API contract, code examples, common workflows, pitfalls |
| `README.md` (in skill dir) | Human-readable summary for browsers |
| `scripts/search_amazon.py` | Runnable Python reference |
| `scripts/search_amazon.js` | Runnable Node reference |

## Related

- [Amazon Scraper API](https://amazonscraperapi.com) - the underlying API (1000 free requests on signup)
- [`scrape-amazon-product-skill`](https://github.com/ChocoData-com/scrape-amazon-product-skill) - companion skill for fetching a single product
- [`amazon-scraper-api-mcp`](https://github.com/ChocoData-com/amazon-scraper-api-mcp) - MCP server for Claude Desktop, Cursor, Continue
- [`n8n-nodes-amazonscraperapi`](https://github.com/ChocoData-com/n8n-nodes-amazonscraperapi) - n8n community node

## License

MIT
