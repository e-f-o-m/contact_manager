("user.controller",
"contact.controller",
"group.controller",
"tag.controller") | foreach { New-Item -Path "./src/controllers" -Name "$_.js" }

("user.model",
"contact.model",
"group.model",
"tag.model") | foreach { New-Item -Path "./src/models" -Name "$_.js" }

("user.routes",
"contact.routes",
"group.routes",
"tag.routes") | foreach { New-Item -Path "./src/routes" -Name "$_.js" }