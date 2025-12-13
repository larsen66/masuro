module.exports = {
  multipass: true,
  floatPrecision: 1,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    'removeMetadata',
    'removeComments',
    'removeUselessDefs',
    'removeUselessStrokeAndFill',
    'removeHiddenElems',
    'removeEmptyContainers',
    'cleanupIds',
    'minifyStyles',
    'convertStyleToAttrs',
    'convertColors',
    'convertPathData',
    'convertTransform',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'cleanupNumericValues',
    'cleanupListOfValues',
    'moveGroupAttrsToElems',
    'collapseGroups',
    'mergePaths',
    'convertShapeToPath',
    'sortAttrs',
  ],
};


