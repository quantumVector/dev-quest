import AllQuestionPage from "@/views/AllQuestionPage.vue";
import HtmlQuestionsPage from "@/views/HtmlQuestionsPage.vue";
import WhatIsHtml from "@/views/html/WhatIsHtml.vue";
import SemanticHtml from "@/views/html/SemanticHtml.vue";
import Accessibility from "@/views/html/Accessibility.vue";
import ResponsiveImage from "@/views/html/ResponsiveImage.vue";
import Specificity from "@/views/css/Specificity.vue";
import StyleIsolation from "@/views/css/StyleIsolation.vue";
import IsolationMethods from "@/views/css/IsolationMethods.vue";
import ScopedSelectors from "@/views/css/ScopedSelectors.vue";
import IsolationLibs from '@/views/css/IsolationLibs.vue'
import StyleIsolationPerfomance from '@/views/css/StyleIsolationPerfomance.vue'
import ComponentArchitecture from '@/views/css/ComponentArchitecture.vue'

export const routes = [
  {
    path: '/',
    component: AllQuestionPage,
  },
  {
    path: '/html',
    component: HtmlQuestionsPage,
  },
  {
    path: '/html/what-is-html',
    component: WhatIsHtml,
  },
  {
    path: '/html/semantic-html',
    component: SemanticHtml,
  },
  {
    path: '/html/accessibility',
    component: Accessibility,
  },
  {
    path: '/html/responsive-image',
    component: ResponsiveImage,
  },
  {
    path: '/css/specificity',
    component: Specificity,
  },
  {
    path: '/css/style-isolation',
    component: StyleIsolation,
  },
  {
    path: '/css/isolation-methods',
    component: IsolationMethods,
  },
  {
    path: '/css/scoped-selectors',
    component: ScopedSelectors,
  },
  {
    path: '/css/isolation-libs',
    component: IsolationLibs,
  },
  {
    path: '/css/isolation-perfomance',
    component: StyleIsolationPerfomance,
  },
  {
    path: '/css/component-architecture',
    component: ComponentArchitecture,
  },
]
