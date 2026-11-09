import { parse } from 'vue/compiler-sfc'
import { readLegacyTemplate } from './legacy-template.mjs'

export const htmlSources = [
  { id: 'what-is-html', file: 'WhatIsHtml', codeCount: 1, tableCount: 1 },
  { id: 'semantic-html', file: 'SemanticHtml', codeCount: 1, tableCount: 1 },
  { id: 'accessibility', file: 'Accessibility', codeCount: 2, tableCount: 3 },
  { id: 'responsive-image', file: 'ResponsiveImage', codeCount: 10, tableCount: 5 },
]

export const cssSources = [
  { id: 'css-specificity', file: 'Specificity', codeCount: 5, tableCount: 2 },
  { id: 'isolation-css', file: 'IsolationCSS', codeCount: 8, tableCount: 3 },
  { id: 'relative-units', file: 'RelativeUnits', codeCount: 12, tableCount: 4 },
  { id: 'flex-vs-grid', file: 'FlexboxVsGrid', codeCount: 9, tableCount: 1 },
  { id: 'transformations', file: 'Transformations', codeCount: 5, tableCount: 2 },
  { id: 'css-in-js', file: 'CSSInJS', codeCount: 3, tableCount: 4 },
]

const attribute = (node, name) =>
  node.props?.find((prop) => prop.type === 6 && prop.name === name)?.value?.content
const hasClass = (node, name) => (attribute(node, 'class') ?? '').split(/\s+/).includes(name)
const normalize = (value) => value.replace(/[ \t\r\n\f]+/g, ' ').trim()
const elements = (node) => (node.children ?? []).filter((child) => child.type === 1)
const rawText = (node) =>
  node.type === 2 || node.type === 5
    ? node.type === 5
      ? node.loc.source
      : node.content
    : node.tag === 'v-icon'
      ? ''
      : (node.children ?? []).map(rawText).join('')

export function readLegacyArticle(topic, file) {
  const { root, highlights } = readLegacyTemplate(`src/views/${topic}/${file}.vue`)
  return contentProfile(root, new Map([...highlights].map(([key, value]) => [key, value.code])))
}

export function readRenderedHtml(html) {
  // SSR output is literal HTML, including Vue examples and Docker's Go templates.
  const { descriptor, errors } = parse(`<template><div v-pre>${html}</div></template>`)
  if (errors.length) throw errors[0]
  return contentProfile(descriptor.template.ast)
}

/** Compare content semantics; layout wrappers, code toolbars and resource-list wrappers are UI. */
function contentProfile(root, highlights = new Map()) {
  const result = {
    text: '',
    headings: [],
    code: [],
    inlineCode: [],
    tables: [],
    lists: [],
    links: [],
    emphasis: [],
    tags: [],
    widgets: [],
    breaks: 0,
    navigation: [],
    progress: [],
    keyboard: [],
    pyramids: [],
  }
  const blockTags = new Set([
    'div',
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'ul',
    'ol',
    'li',
    'table',
    'thead',
    'tbody',
    'tr',
    'td',
    'th',
    'section',
    'article',
    'aside',
    'v-table',
    'v-card',
    'v-card-text',
    'v-stepper-window',
    'v-stepper-window-item',
    'v-checklist',
    'v-checkbox',
    'v-row',
    'v-col',
    'v-alert',
    'v-chip',
    'v-btn',
    'v-alert-title',
    'v-timeline',
    'v-timeline-item',
    'template',
    'v-stepper',
    'v-stepper-header',
    'v-stepper-item',
    'v-progress-linear',
    'v-list',
    'v-list-subheader',
    'v-list-item',
    'v-list-item-title',
    'v-list-item-subtitle',
    'v-avatar',
    'v-expansion-panels',
    'v-expansion-panel',
    'v-expansion-panel-title',
    'v-expansion-panel-text',
  ])
  const widgetName = (node) =>
    attribute(node, 'data-article-widget') ||
    (hasClass(node, 'pyramid-container') ? 'testing-pyramid' : undefined) ||
    {
      CssSpecificityTrainer: 'css-specificity',
      CssUnitsPlayground: 'css-units',
    }[node.tag]
  function excluded(node) {
    return (
      node.type === 3 ||
      node.tag === 'v-icon' ||
      node.tag === 'v-card-actions' ||
      (node.tag === 'template' &&
        node.props.some(
          (prop) => prop.name === 'slot' && ['prepend', 'icon'].includes(prop.arg?.content),
        )) ||
      ['article-step-count', 'article-step-controls', 'article-step-number'].some((name) =>
        hasClass(node, name),
      ) ||
      hasClass(node, 'article-code-header') ||
      attribute(node, 'aria-hidden') === 'true'
    )
  }
  function visibleText(node) {
    if (excluded(node)) return ''
    if (node.type === 2) return node.content
    if (node.type === 5) return node.loc.source
    if (node.tag === 'v-tabs' || hasClass(node, 'v-tabs') || hasClass(node, 'article-step-list'))
      return ''
    if (widgetName(node)) return ` [WIDGET:${widgetName(node)}] `
    if (
      node.tag === 'v-stepper' &&
      !node.literalItems &&
      !elements(node).some((child) => child.tag === 'v-stepper-window')
    )
      return ''
    if (node.tag === 'pre') return ' [CODE] '
    if (node.tag === 'br') return ' '
    const content =
      (node.tag === 'v-expansion-panel'
        ? attribute(node, 'title') || ''
        : node.tag === 'v-checkbox'
          ? attribute(node, 'label') || ''
          : '') + (node.children ?? []).map(visibleText).join('')
    return blockTags.has(node.tag) || hasClass(node, 'v-chip') || hasClass(node, 'd-block')
      ? ` ${content} `
      : content
  }
  function tableRows(node) {
    const rows = []
    function visit(child) {
      if (child.type !== 1) return
      if (child.tag === 'tr') {
        rows.push(
          elements(child).map((cell) => ({ tag: cell.tag, text: normalize(visibleText(cell)) })),
        )
      } else for (const nested of child.children ?? []) visit(nested)
    }
    for (const child of node.children ?? []) visit(child)
    return rows
  }
  function walk(node, inPre = false, inResources = false) {
    if (excluded(node)) return
    if (node.type === 1) {
      if (node.tag === 'v-stepper') {
        const header = elements(node).find((item) => item.tag === 'v-stepper-header')
        const headings = header
          ? elements(header).filter((item) => item.tag === 'v-stepper-item')
          : []
        const navigation = {
          type: 'steps',
          labels: node.literalItems
            ? node.literalItems.map((item) => item.title)
            : headings.map((item) => attribute(item, 'title') || normalize(visibleText(item))),
        }
        const window = elements(node).find((item) => item.tag === 'v-stepper-window')
        if (window) {
          const buttons = []
          function controls(child) {
            if (child.tag === 'v-btn') buttons.push(child)
            else for (const item of child.children ?? []) controls(item)
          }
          controls(elements(window).at(-1))
          const restart = buttons.at(-1)
          const action = restart?.props.find(
            (prop) => prop.name === 'on' && prop.arg?.content === 'click',
          )?.exp?.content
          if (restart) {
            if (
              !new RegExp('^\\w+\\s*=\\s*' + attribute(headings[0], 'value') + '$').test(
                action || '',
              )
            )
              throw new Error('Unknown legacy step controls')
            navigation.restartLabel = normalize(visibleText(restart))
          }
        }
        result.navigation.push(navigation)
      }
      if (hasClass(node, 'article-step-list')) {
        const restartLabel = attribute(node, 'data-restart-label')
        result.navigation.push({
          type: 'steps',
          labels: elements(node).map((item) => normalize(visibleText(item))),
          ...(restartLabel ? { restartLabel } : {}),
        })
        return
      }
      if (node.tag === 'v-tabs' || hasClass(node, 'v-tabs')) {
        const labels = []
        function tabs(child) {
          if (child.tag === 'v-tab' || attribute(child, 'role') === 'tab')
            labels.push(normalize(visibleText(child)))
          else for (const nested of child.children ?? []) tabs(nested)
        }
        tabs(node)
        result.navigation.push({ type: 'tabs', labels })
        return
      }
      if (node.tag === 'v-progress-linear' || attribute(node, 'role') === 'progressbar') {
        const boundValue = node.props?.find(
          (prop) => prop.type === 7 && prop.name === 'bind' && prop.arg?.content === 'model-value',
        )?.exp?.content
        result.progress.push({
          value: Number(boundValue ?? attribute(node, 'aria-valuenow')),
          label: normalize(visibleText(node)),
        })
      }
      if (widgetName(node)) {
        result.widgets.push(widgetName(node))
        if (widgetName(node) === 'testing-pyramid') {
          const legacy = hasClass(node, 'pyramid-container')
          const levels = legacy
            ? elements(node)
            : elements(elements(node).find((child) => child.tag === 'ol'))
          result.pyramids.push(
            levels.map((level) => ({
              label: normalize(
                rawText(
                  elements(level).find((child) =>
                    legacy ? hasClass(child, 'pyramid-label') : child.tag === 'span',
                  ),
                ),
              ),
              percent: normalize(
                rawText(
                  elements(level).find((child) =>
                    legacy ? hasClass(child, 'pyramid-stats') : child.tag === 'strong',
                  ),
                ),
              ),
            })),
          )
        }
        return
      }
      if (node.tag === 'pre') {
        const codeNode = elements(node).find((child) => child.tag === 'code')
        const binding = codeNode?.props.find((prop) => prop.type === 7 && prop.name === 'html')?.exp
          ?.content
        if (binding && !highlights.has(binding)) throw new Error(`Unknown code binding: ${binding}`)
        result.code.push(binding ? highlights.get(binding) : rawText(codeNode ?? node))
        return
      }
      if (/^h[1-4]$/.test(node.tag))
        result.headings.push({ level: Number(node.tag[1]), text: normalize(rawText(node)) })
      if (node.tag === 'code' && !inPre) result.inlineCode.push(normalize(rawText(node)))
      if (node.tag === 'table' || node.tag === 'v-table') result.tables.push(tableRows(node))
      const resourceList = inResources || hasClass(node, 'article-resources')
      if (
        ['ul', 'ol', 'v-checklist'].includes(node.tag) &&
        !resourceList &&
        !hasClass(node, 'article-timeline')
      )
        result.lists.push({
          ordered: node.tag === 'ol',
          items: elements(node).map((item) => normalize(visibleText(item))),
        })
      if (['a', 'v-btn'].includes(node.tag) && (attribute(node, 'href') || attribute(node, 'to')))
        result.links.push({
          label: normalize(visibleText(node)),
          url: attribute(node, 'href') || attribute(node, 'to'),
        })
      if (
        ['b', 'strong', 'i', 'em', 'u'].includes(node.tag) ||
        (node.tag === 'p' && hasClass(node, 'font-weight-bold'))
      ) {
        result.emphasis.push({
          kind: node.tag === 'u' ? 'underline' : ['i', 'em'].includes(node.tag) ? 'italic' : 'bold',
          text: normalize(rawText(node)),
        })
      }
      if (node.tag === 'v-chip' || hasClass(node, 'v-chip'))
        result.tags.push(normalize(rawText(node)))
      if (node.tag === 'kbd') result.keyboard.push(normalize(rawText(node)))
      if (node.tag === 'br') result.breaks += 1
      for (const child of node.children ?? [])
        walk(child, inPre || node.tag === 'pre', resourceList)
      return
    }
    for (const child of node.children ?? []) walk(child, inPre, inResources)
  }
  result.text = normalize(visibleText(root))
  walk(root)
  return result
}
