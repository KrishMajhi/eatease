from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import httpx
import time

app = FastAPI()

# 🔒 Only these origins can call this API from a browser.
# Replace the vercel one with your real deployed frontend URL.
ALLOWED_ORIGINS = [
    "http://localhost:1234",
    "https://eatease-shop.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔒 Basic per-IP rate limit (in-memory) so no single caller can burn
# through your Railway usage. Tune MAX_REQUESTS / WINDOW_SECONDS as needed.
MAX_REQUESTS = 30
WINDOW_SECONDS = 60
_request_log = {}


@app.middleware("http")
async def rate_limiter(request: Request, call_next):
    ip = request.client.host
    now = time.time()
    timestamps = [t for t in _request_log.get(ip, []) if now - t < WINDOW_SECONDS]
    if len(timestamps) >= MAX_REQUESTS:
        return JSONResponse(
            status_code=429,
            content={"error": "Too many requests, slow down."},
        )
    timestamps.append(now)
    _request_log[ip] = timestamps
    return await call_next(request)

BROWSER_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "Accept": "application/json",
    "Accept-Language": "en-US,en;q=0.9",
}

SWIGGY_BASE = "https://www.swiggy.com/dapi"
SWIGGY_HEADERS = {**BROWSER_HEADERS, "Referer": "https://www.swiggy.com/"}

ZOMATO_BASE = "https://www.zomato.com/webroutes"
ZOMATO_HEADERS = {**BROWSER_HEADERS, "Referer": "https://www.zomato.com/"}


@app.get("/api/swiggy/{path:path}")
async def swiggy_proxy(path: str, request: Request):
    """Generic passthrough for restaurant list / search suggestion calls."""
    url = f"{SWIGGY_BASE}/{path}"
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            r = await client.get(url, params=request.query_params, headers=SWIGGY_HEADERS)
        return r.json()
    except Exception as error:
        return {"error": str(error), "type": type(error).__name__}


@app.get("/api/zomato/{path:path}")
async def zomato_proxy(path: str, request: Request):
    """Passthrough for Zomato location search/get calls."""
    url = f"{ZOMATO_BASE}/{path}"
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            r = await client.get(url, params=request.query_params, headers=ZOMATO_HEADERS)
        return r.json()
    except Exception as error:
        return {"error": str(error), "type": type(error).__name__}


@app.get("/api/menu")
async def get_menu(lat: float, lng: float, restaurantId: str, query: str = ""):
    """Restaurant menu (full menu, or search within menu when `query` is set)."""
    if query:
        url = (
            f"{SWIGGY_BASE}/menu/pl/search?lat={lat}&lng={lng}"
            f"&restaurantId={restaurantId}&isMenuUx4=true&query={query}&submitAction=ENTER"
        )
    else:
        url = (
            f"{SWIGGY_BASE}/menu/pl?page-type=REGULAR_MENU&complete-menu=true"
            f"&lat={lat}&lng={lng}&restaurantId={restaurantId}&catalog_qa=undefined&submitAction=ENTER"
        )
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            r = await client.get(url, headers=SWIGGY_HEADERS)
        return r.json()
    except Exception as error:
        return {"error": str(error), "type": type(error).__name__}


@app.get("/")
async def root():
    return {
        "message": "✅ EatEase API proxy (FastAPI)",
        "endpoints": {
            "menu": "/api/menu?lat=21.2043355&lng=72.8401923&restaurantId=193542&query=",
            "swiggy_passthrough": "/api/swiggy/{path}?...same query params Swiggy uses",
            "zomato_passthrough": "/api/zomato/{path}?...same query params Zomato uses",
        },
    }


if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)