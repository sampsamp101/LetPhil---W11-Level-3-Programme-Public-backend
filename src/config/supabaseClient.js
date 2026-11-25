
import { createClient } from "@supabase/supabase-js";

//load environment variables from .env file
import "dotenv/config"; 


//process.env => built in node.js funtionality which pulls information from .env directly
//seperate configuration and secrets from source code.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

console.log("SUPA* env names:", Object.keys(process.env).filter(k => k.toUpperCase().includes("SUPA")));
console.log("SUPABASE_URL set?", Boolean(process.env.SUPABASE_URL), "| key set?", Boolean(process.env.SUPABASE_SECRET_KEY));

//create new oAuth client.
//only relevant when the OAuth 2.1 server is enalbed in supabase auth
export const supabase = createClient(supabaseUrl, supabaseKey);

