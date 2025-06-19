import AllQuestionPage from "@/views/AllQuestionPage.vue";
import HtmlQuestionsPage from "@/views/HtmlQuestionsPage.vue";
import WhatIsHtml from "@/views/html/WhatIsHtml.vue";
import SemanticHtml from "@/views/html/SemanticHtml.vue";
import Accessibility from "@/views/html/Accessibility.vue";
import ResponsiveImage from "@/views/html/ResponsiveImage.vue";
import Specificity from "@/views/css/Specificity.vue";
import StyleIsolation from "@/views/css/StyleIsolation.vue";

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
]
