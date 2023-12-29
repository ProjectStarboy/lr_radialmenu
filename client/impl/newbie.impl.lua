local Impl = NewImpl("Newbie")

function Impl:Init()
  main:LogInfo("%s initialized", self:GetName())
end

function Impl:OnReady()
  main:LogInfo("%s ready", self:GetName())
end

