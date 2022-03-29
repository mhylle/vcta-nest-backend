import mongoose from 'mongoose';

export const databaseProviders = [
    {
        prodide: 'DATABASE_CONNECTION',
        useFactory: ():Promise<typeof mongoose> =>
            mongoose.connect('')
    }
]
