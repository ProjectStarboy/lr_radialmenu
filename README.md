<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://lorraxs.com/logo.svg" alt="Project logo"></a>
</p>

<h1 align="center">LR Fivem lua module</h1>

This repository is a basic boilerplate for getting started
with React in NUI. It contains several helpful utilities and
is bootstrapped using `create-react-app`. It is for both browser
and in-game based development workflows.

For in-game workflows, Utilizing `craco` to override CRA, we can have hot
builds that just require a resource restart instead of a full
production build

This version of the boilerplate is meant for the CfxLua runtime.

## Requirements

- [Node > v10.6](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install) (Preferred but not required)
- [ox_lib](https://github.com/overextended/ox_lib)

_A basic understanding of the modern web development workflow. If you don't
know this yet, React might not be for you just yet._

## Getting Started

First clone the repository or use the template option and place
it within your `resources` folder

### Installation

_The boilerplate was made using `yarn` but is still compatible with
`npm`._

Install dependencies by navigating to the `web` folder within
a terminal of your choice and type `npm i` or `yarn`.

# Enable modules in Config.EnableModules

```lua
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
Config.Debug = true -- print log
Config.Dev = false
Config.Nui = true -- will wait NUI trigger RegisterNUICallback('AppReady', ...) before init
```

# This boilerplate will export all method from all modules

- To call method in module out side of script
  ```lua
  exports['lr_addon']:ImplCall(name, func, ...) --Call a method in module external
  ```

# Main

```lua
variable `main` is global
you can use this variable in anywhere
```

- Properties

  ```lua
  main.playerId
  main.playerPed
  main.playerCoords
  main.playerHeading
  main.playerServerId
  ```

- methods (internal use)

  ```lua
  main:GetImpl(implName) --Get module instance
  ```

  ```lua
  main:ImplCall(implName, methodName, ...args) --Call a method in module
  --You can also use this way
  local testImpl = main:GetImpl("Test")
  testImpl:<methodName>(...args)
  ```

# Impl

- default methods

  ```lua
  Impl:GetName() --Get name of module
  ```

  ```lua
  Impl:OnReady() --Called when module was initialized
  --Example
  local Impl = NewImpl("Test")

  function Impl:OnReady()
    self:LogInfo("%s initialized", self:GetName())
    --will print out: [INFO] [TEST] Test initialized
    --Your rest of script
  end

  function Impl:HookHere(value)
    return value + 1
  end

  function Impl:ReplaceThis(a, b)
    return a + b
  end

  ```

  ```lua
  Impl:OnDestroy() --Called when module start destroying (when hot reload module)
  ```

  ```lua
  Impl:HookMethod(method, hookFn) --Hook a function at start of method. Must return value same as arguments of method
  --Example

  local testImpl = main:GetImpl("Test")
  print(testImpl:HookHere(2))
  --print out: 3

  testImpl:HookMethod("HookHere", function(this, value)
    print("Hook called");
    return value
  end)
  print(testImpl:HookHere(2))
  --print out: Hook called
  --print out: 3

  testImpl:HookMethod("HookHere", function(this, value)
    print("Hook called 2");
    return value + 1
  end)
  print(testImpl:HookHere(2))
  --print out: Hook called 2
  --print out: Hook called
  --print out: 4 (because we was modified value = value + 1)
  ```

  ```lua
  Impl:ReplaceMethod(method, newMethod) --Replace method with new function
  --Example

  local testImpl = main:GetImpl("Test")
  print(testImpl:ReplaceThis(2, 3))
  --print out: 5

  testImpl:ReplaceMethod("ReplaceThis", function(this, a, b)
    return a * b
  end)
  print(testImpl:ReplaceThis(2, 3))
  --print out: 6
  ```

  ```lua
  Impl:RefreshMethod(method) --Refresh method to original
  --Example

  local testImpl = main:GetImpl("Test")

  testImpl:RefreshMethod("HookHere")
  print(testImpl:HookHere(2))
  --print out: 3

  testImpl:RefreshMethod("ReplaceThis")
  print(testImpl:ReplaceThis(2, 3))
  --print out: 5
  ```

  ```lua
  Impl:LogInfo(msg, ...) --Print log when Config.Debug == true
  ```

  ```lua
  Impl:LogError(msg, ...) --Print log when Config.Debug == true
  ```

  ```lua
  Impl:LogSuccess(msg, ...) --Print log when Config.Debug == true
  ```

  ```lua
  Impl:LogWarning(msg, ...) --Print log when Config.Debug == true
  ```

  ```lua
  Impl:Destroy() --Destroy module (Called when hot reload module)
  ```

- Impl default properties

  ```lua
  self.destroyed = false
  self.originalMethods = {}
  self.eventHandlers = {}
  ```

- Create Impl

  #### Module name must be the same as file name

  ```lua
  local Impl = NewImpl("Test2")
  --file name must be Test2.impl.lua
  --Place file in client/impl for clientside and server/impl for serverside
  ```

  ```lua
  local Impl = NewImpl("Test")

  function Impl:OnReady()
    -- Entry of module
    self.testVar = 0
  end

  function Impl:GetData()
    return self.data
  end

  function Impl:Add(amount, amount2)
    self.testVar = self.testVar + amount + amount2
    return self.testVar
  end
  ```

# Commands

```lua
reload:<resourcename> <implname> <mode>
--Used for hot reload a module
--mode: 0 [default] (reload server and client) | 1 (reload only client) | 2 (reload only server)
--Example:
reload:lr_boilerplate Test --for reload module `Test` clientside and serverside
reload:lr_boilerplate Test 1 --for reload module `Test` clientside
reload:lr_boilerplate Test 2 --for reload module `Test` serverside
```

```lua
toggledebug:<resourcename>
--Used for toggle debug mode [modify variable Config.Debug] (print out log ...)
```

```lua
toggledev:<resourcename>
--Used for toggle dev mode [modify variable Config.Dev]
```
