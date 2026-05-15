/**
 * Run an Amazon keyword search and print the ranked listings.
 *
 * Usage:
 *   export ASA_API_KEY="asa_live_..."
 *   node search_amazon.js "wireless headphones"
 *   node search_amazon.js "standing desk" co.uk
 *   node search_amazon.js "mechanical keyboard" com price_asc 1 2
 *
 * Args: <query> [domain] [sort_by] [start_page] [pages]
 * sort_by enum: best_match, price_asc, price_desc, avg_customer_review, newest
 * start_page max 10, pages max 10. Each page = 1 request from your quota.
 *
 * Requires Node 18+ (built-in fetch). Get a free key at
 * https://app.amazonscraperapi.com
 */

const BASE = "https://api.amazonscraperapi.com/v1";

async function searchAmazon(
  query,
  domain = "com",
  sortBy = "best_match",
  startPage = 1,
  pages = 1
) {
  const apiKey = process.env.ASA_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ASA_API_KEY env var is not set. Get a free key at https://app.amazonscraperapi.com"
    );
  }
  const res = await fetch(`${BASE}/amazon/search`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      domain,
      sort_by: sortBy,
      start_page: startPage,
      pages,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body}`);
  }
  return res.json();
}

async function main() {
  const [
    ,
    ,
    query,
    domain = "com",
    sortBy = "best_match",
    startPage = "1",
    pages = "1",
  ] = process.argv;
  if (!query) {
    console.error(
      "Usage: node search_amazon.js <query> [domain] [sort_by] [start_page] [pages]"
    );
    process.exit(1);
  }
  const data = await searchAmazon(
    query,
    domain,
    sortBy,
    parseInt(startPage, 10),
    parseInt(pages, 10)
  );
  console.log(JSON.stringify(data, null, 2));
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
