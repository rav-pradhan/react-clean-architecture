module.exports = {
    name: "core",
    displayName: "core",
    rootDir: "../",
    collectCoverageFrom: [
        "src/core/**/*.{js,jsx,ts,tsx}",
        "!src/core/**/*.d.ts"
    ],
    testMatch: [
        "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}",
    ],
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$"
    ],
    moduleFileExtensions: [
        "web.js",
        "js",
        "web.ts",
        "ts",
        "json",
        "node"
    ],
    watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname"
    ],
    resetMocks: true
}