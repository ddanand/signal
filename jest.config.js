module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/components/*.{ts,tsx}'],
    coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}