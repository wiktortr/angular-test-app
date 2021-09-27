
const checkDecorator = (node, name) => {
  if (!node.decorators) return false;
  return node.decorators.find(e =>
    e.type == 'Decorator' &&
    e.expression &&
    e.expression.type == 'CallExpression' &&
    e.expression.callee &&
    e.expression.callee.type == 'Identifier' &&
    e.expression.callee.name == name
  );
}

const isComponent = node => checkDecorator(node, 'Component') != undefined;

const isService = node => checkDecorator(node, 'Injectable') != undefined;

const isComponentOrService = node => isComponent(node) || isService(node);

const findInProperty = keyName => {
  return e => e.type == 'Property' && e.key && e.key.type == 'Identifier' && e.key.name == keyName;
}

const isObjectExpression = node => node && node.type && node.type == 'ObjectExpression';

const checkObjectProperties = (node, props) => {
  if (!isObjectExpression(node)) return false;
  let count = 0;
  props.forEach(e => {
    if (node.properties.find(findInProperty(e))) {
      count++;
    }
  });
  return count == props.length;
}

module.exports = {
  checkDecorator,
  isComponent,
  isService,
  isComponentOrService,
  findInProperty,
  isObjectExpression,
  checkObjectProperties
};
