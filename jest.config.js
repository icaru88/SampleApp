module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['<rootDir>/src/jest/setup.js'],
  collectCoverage: false,
  coveragePathIgnorePatterns: ['/node_modules/', '/src/jest', '/src/config'],
  // saves time, makes it easier to read.
  coverageReporters: ['text', 'text-summary'],
  moduleDirectories: ['node_modules', 'src'],
  // reporters: ['default',  'jest-sonar'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-|@react-native|@react-native-community|react-native))',
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation)',
  ],
  // snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assetsTransformer.js',
    '\\.(css|less)$': '<rootDir>/assetsTransformer.js',
  },
};
