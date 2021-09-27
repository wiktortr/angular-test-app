const Utils = require('./utils.js');

module.exports = {

  meta: {
    fixable: "code",
    type: "problem",
  },

  create: (context) => {

    const report = (node, name) => context.report({
      node,
      message: `In ${name}  shouldn't be property '${node.key.name}' of type ColDef[]`
    });

    return {
      ClassDeclaration(node) {
        if (!Utils.isComponentOrService(node)) return;
        node.body.body
        .filter(e => e.type == 'ClassProperty')
        .forEach(e => {
          if (
            e.typeAnnotation &&
            e.typeAnnotation.typeAnnotation &&
            e.typeAnnotation.typeAnnotation.type == 'TSArrayType' &&
            e.typeAnnotation.typeAnnotation.elementType &&
            e.typeAnnotation.typeAnnotation.elementType.type == 'TSTypeReference' &&
            e.typeAnnotation.typeAnnotation.elementType.typeName &&
            e.typeAnnotation.typeAnnotation.elementType.typeName.name == 'ColDef'
          ) report(e, node.id.name);
          else {
            if (e.value && e.value.type && e.value.type == 'ArrayExpression') {
              let el = e.value.elements.find(n => Utils.checkObjectProperties(n, ['headerName', 'field']));
              if (el) report(e, node.id.name);
            }
          }
        });
      }
    };
  },

};
