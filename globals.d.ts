namespace NodeJS {
    export interface ProcessEnv {
        APP_ENV: string,
        TYPEORM_CONNECTION: string,
        TYPEORM_HOST: string,
        TYPEORM_USERNAME: string,
        TYPEORM_PASSWORD: string,
        TYPEORM_DATABASE: string,
        TYPEORM_PORT: number,
        TYPEORM_ENTITIES: string,
        TYPEORM_MIGRATIONS: string,
        TYPEORM_ENTITIES_DIR: string,
        TYPEORM_MIGRATIONS_DIR: string,
        TYPEORM_SECRETKEY: string
    }
}