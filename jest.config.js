export default {
    preset: "ts-jest/presets/default-esm",
    extensionsToTreatAsEsm: [".ts"],
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    testMatch: ["<rootDir>/src/**/*.test.ts"],
    transform: {
        "^.+\\.ts$": [
            "ts-jest",
            {
                useESM: true,
                tsconfig: {
                    baseUrl: ".",
                    paths: {
                        "@/*": ["src/*"],
                        "@root/*": ["../*"],
                    },
                },
            },
        ],
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@root/(.*)$": "<rootDir>/../$1",
    },
    collectCoverageFrom: ["src/util/**/*.ts", "!src/**/*.test.ts"],
    coverageDirectory: "coverage",
};
