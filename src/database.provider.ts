import { Pool, PoolClient, ConnectionConfig } from "pg";

export const dbconnection = {
  provide: 'dbconnection',
  useFactory: async (): Promise<ConnectionConfig> => {
    return await new Pool() as PoolClient;
  },
};