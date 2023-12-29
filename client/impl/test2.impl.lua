local Impl = NewImpl("Test2")

function Impl:OnReady()
  self:MainThread()
  self:TestHook()
  self:TestReplaceMethod()
end

function Impl:MainThread()
  local testImpl = main:GetImpl("Test")
  Citizen.CreateThread(function()
    while true do 
      Wait(1000)
      local result = testImpl:Add(1, 2)
      main:LogInfo("TestImpl result %s", result)
    end
  end)
end

function Impl:TestHook()
  local testImpl = main:GetImpl("Test")
  testImpl:HookMethod("Add", function(self, amount, amount2)
    return amount+1, amount2
  end)
end

function Impl:TestReplaceMethod()
  Citizen.CreateThread(function()
    Wait(5000)
    local testImpl = main:GetImpl("Test")
    local oldMethod = testImpl:GetMethod("Add")
    testImpl:ReplaceMethod("Add", function(self, amount, amount2)
      self.testVar = self.testVar * amount * amount2
      return self.testVar
    end)
    Wait(5000)
    testImpl:ReplaceMethod("Add", oldMethod)
  end)
end