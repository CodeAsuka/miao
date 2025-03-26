# Introduction {#introduction}

:::info You are reading the documentation for Vue 3!

* Vue 2 surpport has ended on **Dec31,2023.**learn more about[Vue 2 ELO.](https://v2.vuejs.org/eol/) 
* Upgrading from Vue2? Check out the [Migration Guide](https://v3-migration.vuejs.org/). :::

<style src="@theme/styles/vue-mastery.css"></style>
![](https://camo.githubusercontent.com/0b75ba03b957e69d27e005ba8b8eb9541d58012e498cbc7eccf6b26a411cd0b6/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f7675652d6d6173746572792e61707073706f742e636f6d2f666c616d656c696e6b2f6d656469612f7675656d6173746572792d67726170686963616c2d6c696e6b2d39367835362e706e67)
[Learn vue with video
tutorials on VueMater.com](https://www.vuemastery.com/courses/)

![](https://camo.githubusercontent.com/28820f97f2890b29fc08c59c8371b4115c7ac3d248bfb32a2793a7a853e8e28a/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f7675652d6d6173746572792e61707073706f742e636f6d2f666c616d656c696e6b2f6d656469612f7675652d6d6173746572792d6c6f676f2e706e67)

## What is Vue?{#what-is-vue}

Vue (pronounced/vjuː/, like **view**) is a JavaScript framwork for building user
interfaces. It builds on top of standard HTML, CSS, and Java Script and provides a
declarative, component-based programming model that helps you efficiently
develop user interfaces of any complexity.

Here is a minimal example:

```
import {creataApp } from 'vue'

creatApp({
  data() {
    return {
      count: 0
    }
  } 
}).mout('#app')     
```

```
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
     count: ref(0)
    }
  }
}).mount('#app')
```

```
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

**Result**

<script setup>import{ref}from 'vue' const count = ref(0)</script>
Count is:{{ count }}
The above example demonstrates the two core features of Vue:

* **Declarative Rendering**: Vue extends standard HTML with a temple syntax
that allows us to declaratively describe HTML output based on JavaScript state.

* **Reactivity**: Vue automatically tracks JavaScript state changes and efficiently
updates the DOM when changes happen.

You may already have quetions - don't worry. We will cover every little detail in the
rest of the documentation. For now,please read  along so you so you can have a high-level
understanding of what Vue offers.

:::tip Prerequistes The rest of the documentation assumes basic familiarity with
HTML,CSS,and JavaScript. If you are totally new to frontend development, it might not
be the best idea to jump right into a framework as your first step - grasp the
basics and then come back! You can check your knowledge level with these
overviews for [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Language_overview), [HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content) and [CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics) if needed. Prior experience with other
frameworks helps,but is not required.:::

## The Progressive Framework{#the-progressive-framework}

Vue is a framework and ecosystem that covers most of the common features
needed in frontend development. But the web is extremely divers - the things we
build on the web may vary drastically in front and scale. With tha in mind, Vue is
designed to be flexible and incrementally adoptable. Depending on your use case,
Vue can be used in different ways:

* Enhancing static HTML without a build step
* Embedding ad Web Components on any page
* Single-Page Application(SPA)
* Fullstack / Sever-Side Rendering(SSR)
* Jamstack / Static Site Generation(SSG)
* Targeting desktop, mobile, WebGl, and even the terminal

if you find these concepts intimidating, don't worry! The tutorial and guide only
require basic HTML and JavaScript knowledege, and you should be able to follow
along without being an expert in any of these.

If you are an experienced developer interested in how to best integrate Vue into
your stack, or you are curious about what these terms mean, we discuss them in
more detail in [Ways of Using Vue](https://github.com/vuejs/docs/blob/main/guide/extras/ways-of-using-vue).

Despite the flexibility, the core knowledege about how Vue works is shared across all
these ues cases. Even if you are just a beginner now, the knowledge gainded along
the way will stay useful as you grow to takle more ambitious goals in the future. if
problems you are trying to solve, while retaining the same productivity. This is why
we call Vue "The Progressive Framework": it's a framework that can grow with you
and adapt to your needs.

## Single-File Components{#single-file-components}

In most build-tool-enabled Vue components using an
HTML-like file format called **Single-File Component** (also known as `*vue` files,
abbreviated as **SFC**). A Vue SFC, as the name suggests, encapsulates the
component's logic(JavaScript), template(HTML),and styles (CSS) in a single file.
Here's the previous example, written in SFC format:

```
<scriopt>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

```
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
  </template>

  <style scoped>
  button {
    font-weight: bold;
  }
  </style>
  ```

  SFC is a defining feature of Vue and is the recommended way to author Vue
  components **if** your use case warrants a build setup. You can learn more about the
  [how and why of SFC](https://github.com/vuejs/docs/blob/main/guide/scaling-up/sfc) in its dedicated section - but for now, just know that Vue will
  handle all the build tools setup for you.

## API Styles{#api-styles}

Vue components can be authored in tow different API styles:**Options API** and
**Composition API.**

 ### Options API{#options-api}

 With Option API, we define a component's logic using an object such as
 `data`, `methods`, and `mounted`. Properties defined by options are exposed on
 `this` inside functions, which points to the component instance:

```
<script>
export default {
  // Properties returned from data() become reative state
  // and will be exposed on `this`.
  data() {
    return{
      count:0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This functions will be called when the component is mounted.
  mounted(){
    console.log(`The intitial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9Us1O3DAQfpWR1QMIlFRqT6sUtUUc4AAIOPqAcWYTs44d2eNl0SrvzjjZZDkgpEjx/Pj7mfFe/Ov7YptQrEQVdTA9XUiHu94HghrXKlmCvXQAZQkBlSazRYikCHOyVqROTqcG4Dql4OYIQPvkaAU/p3jIv+FcugPaOjlG8y4CtYqgSxl0ggblaqBgmgYDpJ5ZMOZbHVLr67iaKYzTATt0dNQAjGZiMVKfnX3NbM0a9bu2CK33mwk592N9xNEszFssrG9Onp9aZC5DRtnJFJgIP/ZHpqF4Ph1JpOOvKpdJckDY9ZYdcARQvSQi7+CvtkZv/kixWJDi4vIAzf72B55hqMrpCl+vygVLnAuKrHFtmuI1esfrG4VLoX3XG4vhrh+HK8UyLSmUtf7tZsxRSMgTmfK6Rb35Iv8adzknxX3AiGGLUiw1UqFBVp3LV4+3uOPzUux8nSx3f1N8QJ5vyhqntv/J1Sz7U9+o9rrLT9G45ile7QhdnE1lofNecze/4ctvrB/l/ip+z6sSwwfUxv9s)

### Which to Choose?{#which-to-choose}

Both API styles are fully capable of covering common ues cases. They are different
interfaces powered by the exact same underlying system. IN FACT, the Options API is
implemented on top of the Composition API! The fundamental concepts and
knowledge about Vue are shared across the tow styles.

The Options API is centered around the concept of a "component instance"(`this`
as seen in the exampele),which typically aligns better with a class-based mental
modle for users coming from OOP language backgrounds. It is also more beginner-
friendly by abstracting away the reactivity details and enforcing code organization
via option groups.

The Compositon API is centered around the declaring reactive state variables directly in
a function scope and composing state from multiple functions together to handle
works in Vue to be used effectively. In return, its flexibility enables more powerful
patterns for organizing and reusing logic.

You can learn more about the comparison between the tow styles and the potential
benefits of Composition SPI in the [Composition API FAQ](https://github.com/vuejs/docs/blob/main/guide/extras/composition-api-faq).

If you are new to Vue, here's our general recommendation:

* For learning purpose, go with the style that looks easier to underdtand ton you.
Again, most of the core concepts are shared between the two styles. You can
always pick up the other style later.

* For production use:
  * Go with Options API if you are not using build tools, or plan to use Vue
  primarily in low-complexity scenarios, e.g.progressive enhancement.

  * Go with Composition API + Single-File Components if you plan to build full
  full applications with Vue.

You don't have to commit to only one style during the learing phase. The rest of
the documenttation will provide code samples in both styles where applicable, and
you can toggle between them ay any time using the **API Preference switches** at the
  op of the left sidebar.

## Still Got Questions?{#still-got-questions}

Check out our [FAQ](https://github.com/vuejs/docs/blob/main/about/faq)

## Pick Your Learning Path {#pick-your-learning-path}
Different developers have different learning styles. Feel free to pick a learning path
that suits your preference - although we do recommend going over all of the
content, if possible!

[Try the Tutorial](https://github.com/vuejs/docs/blob/main/tutorial)

[For those who prefer learning things hands-on.](https://github.com/vuejs/docs/blob/main/tutorial)

[Read the Guide](https://github.com/vuejs/docs/blob/main/guide/quick-start.html)

[The guide walks you through every aspect of the framework in full detail](https://github.com/vuejs/docs/blob/main/guide/quick-start.html)

[Check out the Examples](https://github.com/vuejs/docs/blob/main/examples)

[Explore examples of core features and common UI tasks](https://github.com/vuejs/docs/blob/main/examples)
    