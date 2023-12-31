local Impl = NewImpl("Main")

function copynof(orig)
  local orig_type = type(orig)
  local copy
  if orig_type == 'table' then
    copy = {}
    for orig_key, orig_value in next, orig, nil do
      copy[copynof(orig_key)] = copynof(orig_value)
    end
  else -- number, string, boolean, etc
    if orig_type ~= 'function' then
      copy = orig
    end
  end
  return copy
end

function Impl:OnReady()
  self.disabled = false
  self:LogInfo("Ready!")
  self.curMenuData = nil
  self.globalRadials = {}
  self.registeredRadials = {}
  self:RegisterNuiCallbacks()
  self:Exports()
  self:Commands()
  self:LogInfo("setMainData! %s", json.encode(self.config))
  SendNUIMessage({
    action = "setMainData",
    data = self.config
  })
  lib.addKeybind({
    name = 'radialmenu',
    description = 'press Z to open radial menu',
    defaultKey = 'Z',
    onPressed = function(this)
      print("asdnasjkdnasjkdnkajsndjk")
      if self.disabled then return end
      self:OpenRadial()
    end,
    --[[ onReleased = function(this)
      self:CloseRadial()
    end ]]
  })
end

function Impl:Exports()
end

function Impl:RegisterRadial(data)
  if not data.id then
    self:LogError("Please set menu id")
    return
  end
  self.registeredRadials[data.id] = data
end

function Impl:AddRadialMenu(data)
  for k, v in ipairs(data) do
    if not v.id then
      self:LogError("Please set menu id %s", v.label)
    else
      table.insert(self.globalRadials, v)
    end
  end
end

function Impl:RemoveRadialItem(menuId)
  if not menuId then
    self:LogError("Please set menu id")
    return
  end
  self.registeredRadials[menuId] = nil
end

function Impl:ClearRadialItems()
  self.registeredRadials = {}
end

function Impl:HideRadial()
  self:CloseRadial()
end

function Impl:DisableRadial(state)
  self.disabled = state
end

function Impl:GetCurrentRadialId()
  return self.curMenuData.id
end

function Impl:OpenRadial(menuId)
  if menuId == nil then
    self.curMenuData = {
      id = "global",
      items = copynof(self.globalRadials)
    }
  else
    local menu = self.registeredRadials[menuId]
    if not menu then
      self:LogError("Menu %s not found", menuId)
      return
    end
    self.curMenuData = menu
  end
  SendNUIMessage({
    action = 'setMainData',
    data = {
      id = self.curMenuData.id,
      items = copynof(self.curMenuData.items),
    }
  })
  SendNUIMessage({
    action = 'toggleShow',
    data = true
  })
  SetNuiFocus(true, true)
end

function Impl:CloseRadial()
  SendNUIMessage({
    action = 'toggleShow',
    data = false
  })
  SetNuiFocus(false, false)
end

function Impl:Commands()
  RegisterCommand("radial", function()

  end, false)
  self:RegisterRadial(
    {
      id = "police_menu",
      items = {
        {
          label = 'Handcuff',
          onSelect = 'myMenuHandler',
          icon = "logo.png",
          desc = " Handcuff the player"
        },
        {
          label = 'Frisk',
          icon = "r.png",
        },
        {
          label = 'Fingerprint',
        },
        {
          label = 'Jail',
        },
        {
          label = 'Search',
          onSelect = function()
            print('Search')
          end
        }
      }
    }
  )
  self:AddRadialMenu({
    {
      id = 'police',
      label = 'Police',
      menu = 'police_menu',
    },
    {
      id = 'business_stuff',
      label = 'Business',
      onSelect = function()
        print("Business")
      end
    }
  })
end

function Impl:RegisterNuiCallbacks()
  RegisterNUICallback("close", function(data, cb)
    cb("ok")
    self:CloseRadial()
    self:LogInfo("Closed")
  end)
  RegisterNUICallback('onMenuItemClick', function(data, cb)
    cb("ok")
    self:CloseRadial()
    self:LogInfo("clicked %s", json.encode(copynof(data)))
    local item = self.curMenuData.items[data.index + 1]
    if not item then
      return
    end
    self:LogInfo("clicked %s", json.encode(copynof(item)))
    if item.menu then
      self:OpenRadial(item.menu)
      return
    end
    if item.onSelect then
      item.onSelect()
    end
  end)
end
