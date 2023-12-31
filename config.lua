Config = {}
Config.EnableModules = {
  ["Main"] = {
    enabled = true,
    client = true, -- enable client side
    priority = 1,  -- 1 : init on start | 2 : init on player loaded
  },
}
Config.Debug = true
Config.Nui = true
Config.Dev = false
Config.Framework = "standalone" -- "qb" | "ProjectStarboy" | 'standalone'
Config.ClientLazyLoad = false

Config['Main'] = {
  color = 0xff4654,
  background = 0x1f2428,
  width = 120,
  radius = 220,
  disableAnimation = false
}
