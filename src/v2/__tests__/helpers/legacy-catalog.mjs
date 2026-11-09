import fs from 'node:fs'
import { parse } from 'vue/compiler-sfc'

/** Read the legacy home without evaluating its script or the AI curriculum imports. */
export function readLegacyCatalog() {
  const source = fs.readFileSync('src/views/AllQuestionPage.vue', 'utf8')
  const { descriptor, errors } = parse(source)
  if (errors.length) throw errors[0]
  const attribute = (node, name) =>
    node.props?.find((prop) => prop.type === 6 && prop.name === name)?.value?.content
  const groups = []
  function visit(node) {
    if (node.tag === 'v-expansion-panel') {
      // This is the one explicitly excluded topic; its articles are generated dynamically.
      if (attribute(node, 'value') === 'ai-development') return
      const title = attribute(node, 'title')
      if (!title) throw new Error('Unknown dynamic legacy category')
      const urls = []
      function links(child) {
        if (child.tag === 'v-list-item') {
          const url = attribute(child, 'to')
          if (!url) throw new Error(`Unknown dynamic article in ${title}`)
          urls.push(url)
        }
        for (const nested of child.children ?? []) links(nested)
      }
      links(node)
      groups.push({ title, urls })
      return
    }
    for (const child of node.children ?? []) visit(child)
  }
  visit(descriptor.template.ast)
  return groups
}
