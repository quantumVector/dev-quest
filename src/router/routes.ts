import AllQuestionPage from "@/views/AllQuestionPage.vue";
import HtmlQuestionsPage from "@/views/HtmlQuestionsPage.vue";
import WhatIsHtml from "@/views/html/WhatIsHtml.vue";
import SemanticHtml from "@/views/html/SemanticHtml.vue";
import Accessibility from "@/views/html/Accessibility.vue";
import ResponsiveImage from "@/views/html/ResponsiveImage.vue";
import HTMLTestPage from '@/views/tests/HTMLTestPage.vue'
import Specificity from "@/views/css/Specificity.vue";
import StyleIsolation from "@/views/css/StyleIsolation.vue";
import IsolationMethods from "@/views/css/IsolationMethods.vue";
import ScopedSelectors from "@/views/css/ScopedSelectors.vue";
import IsolationLibs from '@/views/css/IsolationLibs.vue'
import StyleIsolationPerfomance from '@/views/css/StyleIsolationPerfomance.vue'
import ComponentArchitecture from '@/views/css/ComponentArchitecture.vue'
import StyleIsolationMigration from '@/views/css/StyleIsolationMigration.vue'
import RelativeUnits from '@/views/css/RelativeUnits.vue'
import TestsPage from '@/views/TestsPage.vue'
import CSSSpecificityTestPage from '@/views/tests/CSSSpecificityTestPage.vue'
import CSSIsolationTestPage from '@/views/tests/CSSIsolationTestPage.vue'
import CSSRelativeUnitsTestPage from '@/views/tests/CSSRelativeUnitsTestPage.vue'
import FlexboxVsGrid from '@/views/css/FlexboxVsGrid.vue'
import CSSFlexVsGridTestPage from '@/views/tests/CSSFlexVsGridTestPage.vue'
import Transformations from '@/views/css/Transformations.vue'
import AnimatableProperties from '@/views/css/AnimatableProperties.vue'
import OptimizedTransformAnimations from '@/views/css/OptimizedTransformAnimations.vue'
import HardwareAcceleration from '@/views/css/HardwareAcceleration.vue'
import SmoothTransformAnimations from '@/views/css/SmoothTransformAnimations.vue'
import TransformationsTestPage from '@/views/tests/TransformationsTestPage.vue'
import CSSInJS from '@/views/css/CSSInJS.vue'
import CSSInJSApproaches from '@/views/css/CSSInJSApproaches.vue'

export const routes = [
  {
    path: '/',
    component: AllQuestionPage,
  },
  {
    path: '/tests',
    component: TestsPage,
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
    path: '/html/html-test',
    component: HTMLTestPage,
  },
  {
    path: '/css/specificity',
    component: Specificity,
  },
  {
    path: '/css/css-test',
    component: CSSSpecificityTestPage,
  },
  {
    path: '/css/style-isolation',
    component: StyleIsolation,
  },
  {
    path: '/css/isolation-test',
    component: CSSIsolationTestPage,
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
  {
    path: '/css/isolation-migration',
    component: StyleIsolationMigration,
  },
  {
    path: '/css/relative-units',
    component: RelativeUnits,
  },
  {
    path: '/css/relative-units-test',
    component: CSSRelativeUnitsTestPage,
  },
  {
    path: '/css/flex-vs-grid',
    component: FlexboxVsGrid,
  },
  {
    path: '/css/flex-vs-grid-test',
    component: CSSFlexVsGridTestPage,
  },
  {
    path: '/css/transformations',
    component: Transformations,
  },
  {
    path: '/css/animatable-properties',
    component: AnimatableProperties,
  },
  {
    path: '/css/optimized-transform-animations',
    component: OptimizedTransformAnimations,
  },
  {
    path: '/css/hardware-acceleration',
    component: HardwareAcceleration,
  },
  {
    path: '/css/smooth-transform-animations',
    component: SmoothTransformAnimations,
  },
  {
    path: '/css/transformations-test',
    component: TransformationsTestPage,
  },
  {
    path: '/css/css-in-js',
    component: CSSInJS,
  },
  {
    path: '/css/css-in-js-approaches',
    component: CSSInJSApproaches,
  },
]
