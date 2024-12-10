module.exports = {
  assets: ['./src/assets/fonts/'],
  project: {
    ios: {},
    android: {},
  },
  'react-native-vector-icons': {
    platforms: {
      ios: null,
    },
  },
  getTransormModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['js', 'jsx', 'ts', 'tsx'];
  },
};
