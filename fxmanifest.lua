fx_version "cerulean"

description "Small script for FiveM"
author "Lorraxs"
version '1.0.0'
repository 'https://github.com/Lorraxs/lr_addon'

dependencies {
  '/server:6116',
  '/onesync',
  'oxmysql',
  'ox_lib',
}

lua54 'yes'

games {
  "gta5",
  "rdr3"
}

files {
	'web/build/index.html',
	'web/build/**/*',
}
ui_page 'web/build/index.html'

shared_scripts {
  '@ox_lib/init.lua',
  --[[ '@es_extended/imports.lua', ]]
  "config.lua",
  "main.lua",
  "impl.lua",
}


--[[ client_scripts { 
  "client/classes/*",
  "client/impl/*"
} ]]
server_script { 
  '@oxmysql/lib/MySQL.lua',
  "server/classes/*",
  "server/impl/*"
}

