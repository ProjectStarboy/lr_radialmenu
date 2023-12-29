local Impl = NewImpl("Test")

function Impl:OnReady()
  main:LogInfo("%s ready", self:GetName())
end