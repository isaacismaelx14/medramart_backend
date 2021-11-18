import { server } from "./app";
import dotenv from 'dotenv';
import { connect } from "./config/typeorm";

dotenv.config();
const _PORT = process.env.PORT || 4000;

async function main() {
    connect();
    const app = await server();

    app.listen({ port: _PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${_PORT}/`)
    );
}

main();