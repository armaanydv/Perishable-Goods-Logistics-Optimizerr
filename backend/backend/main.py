from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ----------- Routers imports (MATCH FILE NAMES) -----------
from api.health import router as health_router
from api.routes import router as routes_router
from api.request import router as request_router
from api.vehicles import router as vehicles_router
from api.ngos import router as ngos_router
from api.donors import router as donors_router

# ----------- App Init -----------
app = FastAPI(
    title="Live Crisis Rescue System",
    description="Backend APIs for crisis routing and rescue management",
    version="1.0.0"
)

# ----------- CORS Middleware -----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------- Register Routers -----------
app.include_router(health_router, prefix="/api", tags=["Health"])
app.include_router(routes_router, prefix="/api", tags=["Routing"])
app.include_router(request_router, prefix="/api", tags=["Requests"])
app.include_router(vehicles_router, prefix="/api", tags=["Vehicles"])
app.include_router(ngos_router, prefix="/api", tags=["NGOs"])
app.include_router(donors_router, prefix="/api", tags=["Donors"])

# ----------- Root Endpoint -----------
@app.get("/", tags=["Root"])
def root():
    return {
        "status": "Backend running",
        "service": "Live Crisis Rescue System"
    }

# ----------- Startup / Shutdown Logs -----------
@app.on_event("startup")
def on_startup():
    print("FastAPI server started successfully")

@app.on_event("shutdown")
def on_shutdown():
    print("FastAPI server shutting down")



