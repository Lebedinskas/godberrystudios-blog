---
title: "{{ .Title | safeHTML }}"
description: "{{ .Description | safeHTML }}"
date: {{ .Date.Format "2006-01-02" }}
{{ if and .Lastmod (gt (.Lastmod.Sub .Date).Hours 24.0) }}lastmod: {{ .Lastmod.Format "2006-01-02" }}{{ end }}
url: {{ .Permalink }}
author: Tomas Lebedinskas
{{ with .Params.categories }}categories: {{ . | jsonify }}{{ end }}
{{ with .Params.tags }}tags: {{ . | jsonify }}{{ end }}
---

{{ .RawContent | safeHTML }}
