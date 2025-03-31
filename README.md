# Playing with Web Components

This package has been made just for having fun and experimenting with Web Components and Italian Design System. This repository aims to recreate reusable elements following the Italian Design system's guidelines.

⚠️ This repository may use part of [Bootstrap](https://github.com/twbs/bootstrap) and [Bootstrap Italia](https://github.com/italia/bootstrap-italia) source code, modified to support SSR. These projects are used only for experimental purpouses and not intended to be released in a real library (even though this library will be packaged and released on NPM to test packaging and distribution).

## Summary

- [Quick start](#quick-start)
- [Structure of this repository](#structure-of-this-repository)
- [Motivation](#motivation)
- [Sources](#sources)

## Quick start

This repository is a collection of Web Components based on [Bootstrap Italia](https://github.com/italia/bootstrap-italia). To quickly start playing with this project install dependencies on your computer with

```sh
npm i
```

### Serve the app in watch mode

To serve the app in watch mode run

```sh
npm run dev
```

### Build

To build the library run

```sh
npm run lib:build
```

The final bundled components will be compiled in the `dist` folder.

### Testing

To test the library run

```sh
npm run lib:test
```

### Build documentation

To build entire documentation as a static site, run

```sh
npm run docs:build
```

## How to use this library

TODO

## Structure of this repository

### Code organization

The main code of this library lies in `src` folder. 

Each component has its own folder inside `src/components` folder containing 

- `{component-name}.ts` component's definition and functionality
- `{component-name}.scss` component's style.
- `{component-name}.stories.ts` component's stories for Storybook documentation
- `{component-name}.test.ts` component's tests

Inside `globals` folder we provide some utility classes for our components:

- `TrackFocus` (`src/globals/utils/track-focus.ts`): an utility class to track focus
inside a custom element
- `BaseComponent` (`src/globals/base-component/base-component.ts`): base class for a 
custom element containing common properties and utilities

Inside `globals/mixin` folder there are some mixins

- `FormMixin` (`src/globals/mixins/form.ts`): mixin for component partecipating
to forms.
- `ValidityMixin` (`src/globals/mixins/validity.ts`): mixin to deal with fields
validation.


### SASS styling

Styling web components can be tricky because shadow DOM provides a strong 
encapsulation of the styles. Despite some styles can pierce 
shadow DOM ([Styles Piercing Shadow DOM](https://open-wc.org/guides/knowledge/styling/styles-piercing-shadow-dom/)) we need to rethink the whole CSS using `Custom CSS properties`.

## Motivation

### Why web components for a design system?

Enforcing a consistent set of design standards across teams and projects is much more challenging if you’re part of a larger organization— especially one with many distributed teams and concurrent projects, or hundreds of developers and designers. The problem is amplified when you consider the diversity of technologies and frameworks in use in most enterprises today, which makes it challenging to find a single approach that works for everyone on the team. One way to solve it is by building and implementing a design system using highly customizable, framework-agnostic Web Components!

### Web components and Frameworks

Think of Web Components as the essential building blocks for web development. They allow you to create reusable custom elements that combine HTML, CSS, and JavaScript into a cohesive unit. That’s it — simple, powerful, and focused. Framework ecosystems manage much broader application concerns: handling state, routing, data flow, and UI updates. Web components can be integrated within framwork based applications, [here's a list of missing features/bug to use custom elements inside frameworks](https://custom-elements-everywhere.com/).

## Sources

### Design systems and web components

- [Auro design system](https://auro.alaskaair.com/)
- [State of California Design system](https://designsystem.webstandards.ca.gov/) - [GitHub](https://github.com/cagov/design-system)
- [ING Bank design system](https://github.com/ing-bank/lion)
- [Carbon design system](https://github.com/carbon-design-system/)
- [Shoelace design system](https://github.com/shoelace-style/shoelace)
- [Patternfly Elements](https://patternflyelements.org/)
- [Momentum UI](https://github.com/momentum-design/momentum-ui/tree/main/web-components)
- [Pharos DS](https://github.com/ithaka/pharos/tree/70f42ef0776d1b0ff0ea32ae6560deef92757d8d/packages/pharos/src/components)

### Articles

- [WC Adoption challenges 2024](https://uploadcare.com/blog/web-components-adoption-challenges/)
- [Styles Piercing Shadow DOM](https://open-wc.org/guides/knowledge/styling/styles-piercing-shadow-dom/)
- [Where web components shine](https://daverupert.com/2024/10/super-web-components-sunshine)
- [Web components icons](https://clayto.com/2019/web-component-icons/)
- [How to Handle Cross-Browser Compatibility with Web Components](https://blog.pixelfreestudio.com/how-to-handle-cross-browser-compatibility-with-web-components/)

### Libraries and code

- [Lit TS starter kit](https://github.com/lit/lit-element-starter-ts)
- [Break stuff starter kit](https://github.com/break-stuff/lit-starter-kit)
- [React 19 new features](https://react.dev/blog/2024/12/05/react-19)