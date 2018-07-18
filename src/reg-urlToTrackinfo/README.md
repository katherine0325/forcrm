# 使用方法：
01. 于config.js填写地址数组和story id
02. node index

description
将这个格式（https://qa-track-registry.theknot.com/track/manage?st=Manage_RegistryProfile&ss=Manage_LinkedRegistries&sp=Logo&lt=RetailerBVR&r=702213835&rt=14050&a=997&eventType=1）的网址，按照一定的规则解析进入registry的trackinfo表里。

rule：
st=sourcetype,
ss=sourcesection,
sp=sourceplacement
lt=landingType

single example：
INSERT INTO dbo.trackInfo
(id, sourceType, sourceSection, sourcePlacement, landingType, isDeleted, createdAt, createdBy, updatedAt, updatedBy, name, consumer)
VALUES
((newid()), 'Manage_RegistryProfile', 'Manage_LinkedRegistries', 'Logo', 'RetailerBVR', ((0)), (getdate()), '#158552737', NULL, NULL, NULL, NULL)
