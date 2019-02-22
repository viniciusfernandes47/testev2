const server 	= require('./config/app')
const port 		= process.env.PORT || 3031

server.listen(port)
console.log(`Server listening on port ${port}`);
