
const findInProperty = keyName => {
  return e => e.type == 'Property' && e.key && e.key.type == 'Identifier' && e.key.name == keyName;
}

const isObjectExpression = node => node && node.type && node.type == 'ObjectExpression';

const isClassWith = (node, reg) => {
  return node.type == 'ClassDeclaration' &&
    node.id &&
    node.id.type == 'Identifier' &&
    node.id.name.match(reg);
}

const isArrayOf = (node, type) => {
  if (node.typeAnnotation) {
    const tt = node.typeAnnotation.typeAnnotation;
    if (
      tt.type == 'TSArrayType' &&
      tt.elementType &&
      tt.elementType.type == 'TSTypeReference' &&
      tt.elementType.typeName &&
      tt.elementType.typeName.name == type
    ) return true;
    return false;
  }
  return false;
}

const IdReg = new RegExp(/^(\w+)(Component|Service)$/gm);

const rules = {
  "require-enzyme-generic": {
    meta: {
      fixable: "code",
      type: "problem",
      messages: {
        gridMsg: "In {{ name }} shouldn't be ColDef[] for ag-grid"
      }
    },
    create: (context) => {
      const report = (node, msg, data) => context.report({ node, messageId: msg, data });

      return {
        ClassDeclaration(node) {
          if (isClassWith(node, IdReg)) {
            node.body.body
            .filter(e => e.type == 'ClassProperty')
            .forEach(e => {
              if (isArrayOf(e, 'ColDef')) report(e, 'gridMsg', { name: node.id.name })
              else {
                if (e.value && e.value.type && e.value.type == 'ArrayExpression') {
                  const el = e.value.elements.find(n => {
                    if (isObjectExpression(n)) {
                      const headerName = n.properties.find(findInProperty('headerName'));
                      const field = n.properties.find(findInProperty('field'));
                      return headerName && field;
                    }
                    return false;
                  });
                  if (el) report(e, 'gridMsg', { name: node.id.name })
                }
              }
            });
          }
        }
      };
    },
  },
};

module.exports = {
  rules,
};
