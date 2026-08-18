# ✈ Phoenix Airlines — Flight Booking App

A full-stack MERN flight booking application. Users can search flights between
Indian cities, view live seat availability, and book a seat with a generated
booking reference — all backed by a real Express/MongoDB API with atomic seat
management to prevent overbooking.

## Live Demo
_Add your deployed link here once hosted (e.g. Vercel for the client, Render/Railway for the server)._

## Features

- **Flight search** — filter by source city, destination city, and travel date
- **Real-time seat availability** — sold-out flights are clearly marked and disabled
- **Seat booking tied to a specific flight** — booking a seat atomically decrements
  that flight's `availableSeats`, preventing two users from overbooking the same seat
- **Booking reference generation** — every confirmed booking gets a unique reference
  (e.g. `PX-7K2N9Q`) that can be used to look up the booking later
- **Booking lookup** — recover your confirmation details by reference even after a
  page refresh
- **Form validation** — client + server-side validation for email format, 10-digit
  mobile numbers, and required fields
- **Centralized error handling** — consistent JSON error responses across the API
  (validation errors, not-found, duplicate booking refs, etc.)
- **Responsive UI** — built with Tailwind CSS, works across mobile and desktop

## Tech Stack

**Frontend:** React 19, React Router, Axios, Tailwind CSS, Vite
**Backend:** Node.js, Express 5, MongoDB, Mongoose

## Project Structure

```
Phoenix-Airlines/
├── Client/                  # React frontend (Vite)
│   └── src/
│       ├── api/             # Axios instance (configurable base URL)
│       ├── components/      # Navbar, FlightCard, Loader
│       └── pages/           # LandingPage, FlightSearch, BookingForm, BookingSuccess
└── Server/                  # Express backend
    ├── config/               # MongoDB connection
    ├── controllers/          # Flight & booking business logic
    ├── middlewares/          # Centralized error handler
    ├── models/                # Flight & Booking Mongoose schemas
    ├── routes/                # API route definitions
    ├── utils/                 # AppError, asyncHandler, booking ref generator
    └── seed.js                # Seeds sample flight data
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd Phoenix-Airlines

# Server
cd Server
npm install

# Client
cd ../Client
npm install
```

### 2. Configure environment variables

**Server** — copy `.env.example` to `.env` in `/Server`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/FlightDB
```

**Client** — copy `.env.example` to `.env` in `/Client`:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed sample flight data

```bash
cd Server
npm run seed
```

### 4. Run the app

```bash
# Terminal 1 — Server
cd Server
npm run dev

# Terminal 2 — Client
cd Client
npm run dev
```

Visit `http://localhost:5173` in your browser.

## API Endpoints

| Method | Endpoint              | Description                              |
|--------|------------------------|-------------------------------------------|
| GET    | `/api/flights`          | List flights, optional `source`, `destination`, `date` query filters |
| GET    | `/api/flights/:id`      | Get a single flight by ID                 |
| POST   | `/api/bookings`         | Create a booking (decrements available seats atomically) |
| GET    | `/api/bookings/:ref`    | Look up a booking by its reference code   |

### Example: Create a booking
```http
POST /api/bookings
Content-Type: application/json

{
  "flightId": "6a7ec0c70f076a45055f26f3",
  "firstName": "Santhosh",
  "lastName": "A",
  "email": "santhosh@example.com",
  "mobileNumber": "9087840511",
  "seatsBooked": 2
}
```

## Design Notes

- **Why atomic seat decrement?** Booking uses a single `findOneAndUpdate` with a
  `availableSeats: { $gte: seats }` condition, so two simultaneous bookings can
  never both succeed if only one seat is left — preventing the classic
  race-condition overbooking bug.
- **Why a separate `Booking` model instead of storing bookings on `User`?**
  A booking always belongs to exactly one flight and one passenger record; modeling
  it as its own collection with a `ref` to `Flight` keeps the data normalized and
  allows looking up all bookings for a given flight later if needed (e.g. an admin
  dashboard).

## Possible Next Steps

- Admin dashboard to manage flights and view all bookings
- Email confirmation on successful booking
- Payment gateway integration
- Round-trip booking support
