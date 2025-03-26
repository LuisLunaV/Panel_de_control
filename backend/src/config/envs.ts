import dotenv from 'dotenv';
dotenv.config({path: '.env'});

const {
PORT,
HOST_DB,
USER_DB,
PASS_DB,
NAME_DB,
CLIENT_BASE_URL,
JWT_SEED
} = process.env;
   
export{
PORT,
HOST_DB,
USER_DB,
PASS_DB,
NAME_DB,
CLIENT_BASE_URL,
JWT_SEED
}