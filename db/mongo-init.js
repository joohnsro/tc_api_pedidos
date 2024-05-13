db.createCollection("api_pedidos");
db = db.getSiblingDB("api_pedidos");
db.createUser({
    user: 'apiuser',
    pwd: 'OnMchiATNR3yW0Y9M8LnHtc07tUXbawn',
    roles: [
        { role: "readWrite", db: "api_pedidos" }
    ]
});