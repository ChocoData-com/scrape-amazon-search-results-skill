"""
Run an Amazon keyword search and print the ranked listings.

Usage:
    export ASA_API_KEY="asa_live_..."
    python search_amazon.py "wireless headphones"
    python search_amazon.py "standing desk" co.uk
    python search_amazon.py "mechanical keyboard" com price_asc 1 2

Args: <query> [domain] [sort_by] [start_page] [pages]

sort_by enum: best_match, price_asc, price_desc, avg_customer_review, newest
start_page max 10, pages max 10. Each page = 1 request from your quota.

Get a free key (1,000 requests) at https://app.amazonscraperapi.com
"""
import json
import os
import sys
import requests

BASE = "https://api.amazonscraperapi.com/v1"


def search_amazon(
    query: str,
    domain: str = "com",
    sort_by: str = "best_match",
    start_page: int = 1,
    pages: int = 1,
) -> dict:
    api_key = os.environ.get("ASA_API_KEY")
    if not api_key:
        raise SystemExit("ASA_API_KEY env var is not set. Get a free key at https://app.amazonscraperapi.com")
    body = {
        "query": query,
        "domain": domain,
        "sort_by": sort_by,
        "start_page": start_page,
        "pages": pages,
    }
    resp = requests.post(
        f"{BASE}/amazon/search",
        json=body,
        headers={"X-API-Key": api_key},
        timeout=60,
    )
    resp.raise_for_status()
    return resp.json()


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    query = sys.argv[1]
    domain = sys.argv[2] if len(sys.argv) > 2 else "com"
    sort_by = sys.argv[3] if len(sys.argv) > 3 else "best_match"
    start_page = int(sys.argv[4]) if len(sys.argv) > 4 else 1
    pages = int(sys.argv[5]) if len(sys.argv) > 5 else 1
    data = search_amazon(query, domain, sort_by, start_page, pages)
    print(json.dumps(data, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
