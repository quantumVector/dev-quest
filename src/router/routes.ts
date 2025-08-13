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
import RuntimeVSPreCompile from '@/views/css/RuntimeVSPreCompile.vue'
import CSSInJsTestPage from '@/views/tests/CSSInJsTestPage.vue'
import HTMLInterviewPage from '@/views/interview/HTMLInterviewPage.vue'
import InterviewPage from '@/views/InterviewPage.vue'
import CSSInterviewPage from '@/views/interview/CSSInterviewPage.vue'
import Functions from '@/views/js/Functions.vue'
import TypesOfFunctions from '@/views/js/TypesOfFunctions.vue'
import FunctionTypes from '@/views/js/FunctionTypes.vue'
import Closures from '@/views/js/Closures.vue'
import Docker from '@/views/docker/Docker.vue'
import DockerfileBuildContext from '@/views/docker/DockerfileBuildContext.vue'
import DockerLayersAndCache from '@/views/docker/DockerLayersAndCache.vue'
import RunCmdEntrypoint from '@/views/docker/RunCmdEntrypoint.vue'
import MultiStage from '@/views/docker/MultiStage.vue'
import EnvVsArg from '@/views/docker/EnvVsArg.vue'
import DockerNetworksAndPorts from '@/views/docker/DockerNetworksAndPorts.vue'
import VolumesVsBindMounts from '@/views/docker/VolumesVsBindMounts.vue'
import NginxSPA from '@/views/docker/NginxSPA.vue'

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
    path: '/interview',
    component: InterviewPage,
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
    path: '/html/html-interview',
    component: HTMLInterviewPage,
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
    path: '/css/css-interview',
    component: CSSInterviewPage,
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
  {
    path: '/css/runtime-vs-pre-compile',
    component: RuntimeVSPreCompile,
  },
  {
    path: '/css/css-in-js-test',
    component: CSSInJsTestPage,
  },
  {
    path: '/js/functions',
    component: Functions,
  },
  {
    path: '/js/types-of-functions',
    component: TypesOfFunctions,
  },
  {
    path: '/js/functions-types',
    component: FunctionTypes,
  },
  {
    path: '/js/closures',
    component: Closures,
  },
  {
    path: '/docker/docker',
    component: Docker,
  },
  {
    path: '/docker/dockerfile',
    component: DockerfileBuildContext,
  },
  {
    path: '/docker/layers-and-cache',
    component: DockerLayersAndCache,
  },
  {
    path: '/docker/run-cmd-entrypoint',
    component: RunCmdEntrypoint,
  },
  {
    path: '/docker/multi-stage',
    component: MultiStage,
  },
  {
    path: '/docker/env-arg',
    component: EnvVsArg,
  },
  {
    path: '/docker/networks-and-ports',
    component: DockerNetworksAndPorts,
  },
  {
    path: '/docker/volumes-vs-bind-mounts',
    component: VolumesVsBindMounts,
  },
  {
    path: '/docker/nginx-spa',
    component: NginxSPA,
  },
]
