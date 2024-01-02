<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://lorraxs.dev/logo.svg" alt="Project logo"></a>
</p>

<h1 align="center">LR Radial Menu</h1>

# Configuration

## Config["Main"] 
  - color: Arc color `(ex 0xff4654)`
  - background: Background color

# Usage
#### Build UI
```
cd web
pnpm install
pnpm run build
```
#### You can use it just like ox_lib https://overextended.dev/ox_lib/Modules/Interface/Client/radial
```lua
  --Registers a radial sub menu with predefined options.
  exports.lr_radialmenu:RegisterRadial({
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
  })
  --Item or array of items added to the global radial menu.
  exports.lr_radialmenu:AddRadialMenu({
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
  --Id of an item to be removed from the global menu.
  exports.lr_radialmenu:RemoveRadialItem("business_stuff")
  --Removes all items from the radial menu.
  exports.lr_radialmenu:ClearRadialItems()
  --Hides the radial menu if one is open.
  exports.lr_radialmenu:HideRadial()
  --Disallow players from opening the radial menu.
  exports.lr_radialmenu:DisableRadial(true)
```

#### Merging with ox_lib radial menu
Replace `lib.` with `exports.lr_radialmenu:`
```lua
  --ox_lib
  lib.registerRadial({
    id = 'police_menu',
    items = {
      {
        label = 'Handcuff',
        icon = 'handcuffs',
        onSelect = 'myMenuHandler'
      },
      {
        label = 'Frisk',
        icon = 'hand'
      },
      {
        label = 'Fingerprint',
        icon = 'fingerprint'
      },
      {
        label = 'Jail',
        icon = 'bus'
      },
      {
        label = 'Search',
        icon = 'magnifying-glass',
        onSelect = function()
          print('Search')
        end
      }
    }
  })
  --lr_radialmenu
  exports.lr_radialmenu:registerRadial({
    id = 'police_menu',
    items = {
      {
        label = 'Handcuff',
        icon = 'handcuffs',
        onSelect = 'myMenuHandler'
      },
      {
        label = 'Frisk',
        icon = 'hand'
      },
      {
        label = 'Fingerprint',
        icon = 'fingerprint'
      },
      {
        label = 'Jail',
        icon = 'bus'
      },
      {
        label = 'Search',
        icon = 'magnifying-glass',
        onSelect = function()
          print('Search')
        end
      }
    }
  })
```
