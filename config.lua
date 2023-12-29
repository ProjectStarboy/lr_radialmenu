Config = {}
Config.EnableModules = {
  ["Newbie"] = {
    enabled = true,
    client = true, -- enable client side
    priority = 1, -- 1 : init on start | 2 : init on player loaded
  },
  ["Test"] = {
    enabled = true,
    priority = 2, -- 1 : init on start | 2 : init on player loaded
  },
}
Config.Debug = true
Config.Nui = false
Config.Dev = false
Config.Framework = "esx" -- "qb" | "ProjectStarboy"
