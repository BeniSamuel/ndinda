const express = require('express')
const app = express()
const PORT = process.env.PORT||3000
const BusRoute = require('./Models/bus_route_model')
const BusStop = require('./Models/bus_stop_model')

const { createClient } = require('redis')

const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
      reconnectStrategy: retries => Math.min(retries * 50, 2000)
    }
  });  

redisClient.on("error", function(error) {
    console.error(error);
    // I report it onto a logging service like Sentry. 
 });

 (async () => {
    try {
      await redisClient.connect();
      console.log('Redis Connected');
    } catch (err) {
      console.error('Redis Error:', err);
    }
  })();
  

// Bus Location Tracking (Stored in Redis for Real-Time Update)
async function updateBusLocation(GPSId, latitude, longitude, routeNumber, routeName) {
    const key = `bus_location:${GPSId}`      
    await redisClient.set(key, JSON.stringify({ latitude, longitude }));
    await redisClient.expire(key, 10);
    await activateBus( GPSId, routeNumber, routeName )
}

//Activate The Bus Within a particular route number

async function activateBus( GPSId, routeNumber, routeName ) {
    const key = `active_buses:${routeNumber}:${routeName}`
    // The bus stays active as long as it moves
    await redisClient.sAdd(key, String(GPSId));
}


// Deactivate a bus
async function deactivateBus( GPSId, routeNumber, routeName ) {
    const key = `active_buses:${routeNumber}:${routeName}`
    await redisClient.sRem(key, String(GPSId))
}

// Fetch Bus Location from Redis
// Fetch Bus Location from Redis (Only if the Bus is Active)
async function getBusLocation(GPSId, routeNumber, routeName) {
    try {
        const activeKey = `active_buses:${routeNumber}:${routeName}`;

        const isActive = await redisClient.sIsMember(activeKey, GPSId);
        
        if (!isActive) throw new Error('Bus is not active');

        const locationKey = `bus_location:${GPSId}`;     
        const data = await redisClient.get(locationKey);
        
        if (!data) throw new Error('Bus location not found');
        
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error fetching bus location for GPSId ${GPSId}:`, error);
        return null;
    }
}

// Get Active Buses Within a Specific Route Number
async function getActiveBuses( routeNumber, routeName ) {
    const key = `active_buses:${routeNumber}:${routeName}`      
    const activeBuses = await redisClient.sMembers(key) // Fetch all the GPSIds in the set 
    return activeBuses.map(busStr => JSON.parse(busStr))
}

// Keep A stop with arrived message
async function keepArrivedStop(GPSId, routeNumber, cacheStopNumber) {
    const key = `arrived:${GPSId}:${routeNumber}`
    await redisClient.sAdd(key, String(cacheStopNumber))
}

async function isStopArrived(GPSId, routeNumber, cacheStopNumber) {
    const key = `arrived:${GPSId}:${routeNumber}`;
    return await redisClient.sIsMember(key, String(cacheStopNumber));
}

// Check Nearby stops for each specific Bus in a Route Number & Flowasync function getNearbyStops(GPSId, routeNumber, maxDistance = 1000000) {
    async function getNearbyStops(GPSId, routeNumber, routeName, maxDistance = 1000000) {
        const busLocation = await getBusLocation(GPSId, routeNumber, routeName);
        if (!busLocation || typeof busLocation.latitude !== 'number' || typeof busLocation.longitude !== 'number') {
            throw new Error('Bus location not found!');
        }
    
        const busRoute = await BusRoute.findOne({ routeNumber, routeName });
        if (!busRoute) throw new Error(`Route ${routeNumber} ${routeName} Not Found!`);
    
        const routeStops = busRoute.routeStops;
        const stops = await BusStop.find({ _id: { $in: routeStops.map(s => s.busStopId) } });
    
        // Calculate distance for each stop
        let enrichedStops = stops.map(stop => {
            const routeStop = routeStops.find(s => s.busStopId.equals(stop._id));
            const stopNumber = routeStop.busStopNumber;
    
            const distance = calculateDistance(
                busLocation.latitude,
                busLocation.longitude,
                stop.stopLocation.coordinates[1],
                stop.stopLocation.coordinates[0]
            );
        
            return {
                stop,
                stopNumber,
                stopName: stop.stopName,
                distance,
                coordinates: stop.stopLocation.coordinates
            };
        });
    
        // Identify the closest stop to approximate current bus position
        const sortedByDistance = [...enrichedStops].sort((a, b) => a.distance - b.distance);
        const nearestStop = sortedByDistance[0];
    
        enrichedStops = await Promise.all(enrichedStops.map(async stopData => {
            let status = "not nearby";
            let cacheStopNumber = stopData.stopNumber;
        
            if (stopData.distance <= 15) {
                status = "Arrived";
                await keepArrivedStop(GPSId, routeNumber, cacheStopNumber);
            } else if (stopData.distance >= 16 && stopData.distance <= 100) {
                status = "arriving";
            } else if (stopData.distance >= 101 && stopData.distance <= 400) {
                status = "nearby";
            } else if (stopData.stopNumber < nearestStop.stopNumber) {
                status = "passed";
            } else if (await isStopArrived(GPSId, routeNumber, cacheStopNumber)) {
                status = "passed";
            }
        
            return {
                stop: stopData.stop,
                stopNumber: stopData.stopNumber,
                stopName: stopData.stopName,
                distance: stopData.distance,
                status
            };
        }));        
    
        return enrichedStops;
    }
    

// Haversine formula for calculating distance between two geographic points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // distance in meters
}

module.exports = {
    updateBusLocation,
    getBusLocation,
    getNearbyStops,
    getActiveBuses,
    deactivateBus
};

// Setup the express middleware
app.use(express.json())

// Setup the body-parser middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Setup the cookie-parser middlware
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Setup the cors middlware
const cors = require('cors')
app.use(cors())

// Use Dotenv
require('dotenv').config({path: 'config.env'})

// Database Connection
const connectDB = require('./Models/database')
connectDB()

// Set Routes
const passengerSignupRouter = require('./Routers/passenger_signup_router')
const passengerLoginRouter = require('./Routers/passenger_login_router')
const busStopRouter = require('./Routers/bus_stops_router')
const busRouteRouter = require('./Routers/bus_routes_router')
const availableBusRouter = require('./Routers/available_bus_router')
const busRouter = require('./Routers/bus_router')
const agencyRouter = require('./Routers/agency_router')

app.use('/account', passengerSignupRouter)
app.use('/account', passengerLoginRouter)
app.use('/admin/dashboard', busStopRouter)
app.use('/admin/dashboard', busRouteRouter)
app.use('/', availableBusRouter)
app.use('/', busRouter)
app.use('/', agencyRouter)


app.listen(PORT, ()=> {
    console.log(`Server Is Running on PORT ${PORT}`)
})