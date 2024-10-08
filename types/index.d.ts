declare namespace NodeJS {
	interface ProcessEnv {
		DATABASE_URL: string;
		PORT: number;
		HASH_SALT: number;
		JWT_SECRET: string;
		SECRET_KEY: string;
	}
}
