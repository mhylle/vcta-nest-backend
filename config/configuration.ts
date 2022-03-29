export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        accountName: 'mnh',
        databaseName: 'vcta',
        key: 'KmXuJ5w9WrYUlcdW',
        port: 10255,
        MONGO: `mongodb+srv://mnh:KmXuJ5w9WrYUlcdW@vcta.c5nwv.azure.mongodb.net/vcta?retryWrites=true&w=majority`,
    }
});
