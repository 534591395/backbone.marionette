backbone.marionette学习记录
===================
开始记录学习。<br/>

这次我要做一个 离线版的 团购网站。<br/>
引用的主要工具 jquery，bootstrap, seajs,backbone,underscore, marionette,backbone.localStorage 。<br/>
`我们开始吧`

---
1.第一步，先建好团购页面（页面是网上copy的，这边只是学习使用）。<br/>

---
2.第二步，开始写我们的js代码了，步奏如下：<br/>

  1). 引用一个自定义的 tool工具集类, 初始化 initializeContacts 数据，初始化 我们的工程 GrouponManager。<br/>
  2). 按照 MVC模式，建立 模型 ：该模型对外提供了 相应的数据访问接口；视图：公共视图和业务视图；控制器。<br/>

---
好了，我们继续吧<br/>

因为是离线版，所有ajax数据请求都是 模拟的。我这边使用jquery的Deferred对象。




