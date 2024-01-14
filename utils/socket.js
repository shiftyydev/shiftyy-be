const socket = require("socket.io");
const jwt = require("jsonwebtoken");
const initSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        try {
            
        const token = socket.handshake.auth.token
        if (!token) return;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return;
        }

        // create room with company name or super admin
        if (decoded.isAdmin) {
            socket.join("super admin");
        } else {
            
            if (decoded.userType === "manager") {
                console.log("company admin joined");
                socket.join(decoded.id);
            }
            if (decoded.userType === "driver") {
                console.log("driver joined");
                socket.join(decoded.childOf);
            }

            socket.on("update-driver-location", (data) => {
               
               
                const id = decoded.id;
               
                socket.broadcast.to(decoded.childOf).emit("truckUpdate", { ...data, id });
                socket.broadcast.to("super admin").emit("truckUpdate", { ...data, id });
            });


        }

    } catch (error) {
        console.log(error);
    }

    });

    return io;

};

module.exports = {
    initSocket,
};