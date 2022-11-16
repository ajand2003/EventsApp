// test for mongo db connection
const {MongoClient} = require('mongodb');

// lists databases given a mongo client
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main() {
    // Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
    const uri = "mongodb+srv://ajand2003:Cat123pie@cluster0.xrmrqqr.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

// Failing with timeout

