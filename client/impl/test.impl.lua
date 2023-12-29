local Impl = NewImpl("Test")

function Impl:Init()
  main:LogInfo("%s initialized", self:GetName())
  self.data = {
    test = "test"
  }
  self.testVar = 0
end

function Impl:GetData()
  return self.data
end

function Impl:Add(amount, amount2)
  self.testVar = self.testVar + amount + amount2
  return self.testVar
end