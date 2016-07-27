module ApplicationHelper
  # helper to render react component html
  def component(name, props = {})
    content_tag(:div, '', data: {react_class: name, react_props: props.to_json})
  end

  # helper to include a javascript bundle from webpack
  def javascript_bundle_tag(path)
    src = "/js/#{path}.js"
    if ENV['RAILS_ENV'] == 'development'
      src = "//localhost:8080#{src}"
    end

    content_tag(:script, "", {src: src})
  end
end
