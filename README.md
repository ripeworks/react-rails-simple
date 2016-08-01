# react-rails-simple

A simple setup for putting react into your rails

## Getting Started

1. Copy assets into your rails project
2. Install modules `npm install`
3. Add bundle tag
3. Go! `foreman start -f Procfile.dev`

## Adding the javascript bundle

Drop this into your main application layout

```erb
<%= javascript_bundle_tag 'main' %>
```

## Using components in rails views

Export component in `app/assets/javascripts/components/index.js`

```js
// app/assets/javascripts/components/index.js
export MyComponent from './MyComponent'
```

Use the `component` helper to render a React component into a view:

`component(String component_name, Hash props)`

```erb
<%= component('MyComponent', {}) %>
```

## Production

The javascript bundle will be compiled during `assets:precompile`

