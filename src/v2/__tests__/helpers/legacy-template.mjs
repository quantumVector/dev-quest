import fs from 'node:fs'
import { parse } from 'vue/compiler-sfc'
import ts from 'typescript'

/** Read literal legacy data without executing article scripts or their example code. */
export function readLegacyTemplate(filename) {
  const source = fs.readFileSync(filename, 'utf8')
  const { descriptor, errors } = parse(source)
  if (errors.length) throw errors[0]
  const script = ts.createSourceFile(
    filename,
    descriptor.scriptSetup.content,
    ts.ScriptTarget.Latest,
    true,
  )
  const values = new Map(),
    highlights = new Map()
  function literal(node, scope = values) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
    if (ts.isNumericLiteral(node)) return Number(node.text)
    if (ts.isArrayLiteralExpression(node)) return node.elements.map((item) => literal(item, scope))
    if (ts.isObjectLiteralExpression(node))
      return Object.fromEntries(
        node.properties.map((prop) => {
          if (!ts.isPropertyAssignment(prop)) throw new Error('Expected a literal property')
          return [prop.name.text, literal(prop.initializer, scope)]
        }),
      )
    if (ts.isIdentifier(node) && scope.has(node.text)) return scope.get(node.text)
    if (ts.isPropertyAccessExpression(node)) {
      const target = literal(node.expression, scope)
      if (Object.hasOwn(target, node.name.text)) return target[node.name.text]
    }
    if (ts.isCallExpression(node) && node.expression.getText(script) === 'ref')
      return literal(node.arguments[0], scope)
    throw new Error(`Nonliteral expression: ${node.getText(script)}`)
  }
  function expression(text, scope) {
    const parsed = ts.createSourceFile(
      'literal.ts',
      `const value = ${text}`,
      ts.ScriptTarget.Latest,
      true,
    )
    return literal(parsed.statements[0].declarationList.declarations[0].initializer, scope)
  }
  for (const statement of script.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      try {
        values.set(declaration.name.getText(script), literal(declaration.initializer))
      } catch {
        /* Highlight refs and runtime expressions are not content data. */
      }
    }
  }
  function visitScript(node) {
    if (
      ts.isBinaryExpression(node) &&
      ts.isPropertyAccessExpression(node.left) &&
      node.left.name.text === 'value' &&
      ts.isCallExpression(node.right) &&
      node.right.expression.getText(script) === 'Prism.highlight'
    ) {
      const name = node.right.arguments[0].getText(script)
      const code = values.get(name)
      if (typeof code !== 'string') throw new Error(`Cannot read snippet ${name}`)
      const snippet = { name, code, language: literal(node.right.arguments[2]) }
      highlights.set(node.left.expression.getText(script), snippet)
      highlights.set(node.left.getText(script), snippet)
    }
    ts.forEachChild(node, visitScript)
  }
  visitScript(script)
  function materialize(node, scope = values) {
    if (node.type === 5)
      return [{ type: 2, content: String(expression(node.content.content, scope)) }]
    const loop = node.props?.find((prop) => prop.type === 7 && prop.name === 'for')
    if (loop) {
      const match = /^(\w+)\s+in\s+(.+)$/.exec(loop.exp.content)
      if (!match) throw new Error(`Unsupported content loop ${loop.exp.content}`)
      return expression(match[2], scope).flatMap((value) =>
        materialize(
          { ...node, props: node.props.filter((prop) => prop !== loop) },
          new Map([...scope, [match[1], value]]),
        ),
      )
    }
    const clone = { ...node, props: node.props?.map((prop) => ({ ...prop })) }
    for (const prop of clone.props ?? []) {
      if (
        prop.type === 7 &&
        prop.name === 'bind' &&
        ['items', 'title', 'value', 'href', 'to', 'key'].includes(prop.arg?.content)
      ) {
        const value = expression(prop.exp.content, scope)
        if (prop.arg.content === 'items') clone.literalItems = value
        else
          Object.assign(prop, {
            type: 6,
            name: prop.arg.content,
            value: { content: String(value) },
          })
      }
    }
    if (node.children) clone.children = node.children.flatMap((child) => materialize(child, scope))
    return [clone]
  }
  const ast = materialize(descriptor.template.ast)[0]
  let root
  function findRoot(node) {
    if (node.tag === 'v-col' && node.children?.some((child) => child.tag === 'h1')) {
      root = node
      return
    }
    for (const child of node.children ?? []) findRoot(child)
  }
  findRoot(ast)
  if (!root) throw new Error(`Missing article body: ${filename}`)
  return { root, highlights, source }
}
