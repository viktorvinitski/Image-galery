import type { Config } from 'jest';

export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss)$': '<rootDir>/src/tests/mocks/styleMock.ts',
        '^shared/(.*)$': '<rootDir>/src/shared/$1',
        '^tests/(.*)$': '<rootDir>/src/tests/$1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
} as Config;
