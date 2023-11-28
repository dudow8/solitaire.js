const config = {
    coverageProvider: 'v8',
    roots: ['<rootDir>/src/'],
    collectCoverageFrom: ['src/**/*.js', '!src/presentation/**/*.js'],
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
        },
    },
};

module.exports = config;
