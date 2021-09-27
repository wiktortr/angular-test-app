const Utils = require('./utils.js');

module.exports = {

  meta: {
    fixable: "code",
    type: "problem",
  },

  create: (context) => {
    return {
      ClassDeclaration(node) {
        if (!Utils.isComponentOrService(node)) return;
        node.body.body
        .filter(e => e.type == 'ClassProperty')
        .forEach(e => {
          if (
            e.typeAnnotation &&
            e.typeAnnotation.typeAnnotation &&
            e.typeAnnotation.typeAnnotation.type == 'TSTypeReference' &&
            e.typeAnnotation.typeAnnotation.typeName &&
            e.typeAnnotation.typeAnnotation.typeName.left &&
            e.typeAnnotation.typeAnnotation.typeName.left.name == 'Highcharts' &&
            e.typeAnnotation.typeAnnotation.typeName.right &&
            e.typeAnnotation.typeAnnotation.typeName.right.name == 'Options'
          ) {
            context.report({
              node: e,
              message: `In ${node.id.name} shouldn't be property '${e.key.name}' of type Highcharts.Options`,
            })
          }
        });
      }
    };
  },

};
