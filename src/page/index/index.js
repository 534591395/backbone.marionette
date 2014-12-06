/**
 * Created by wangyang7 on 2014/12/3.
 */

define(function(require, exports){
    require('marionette');
    require('./css.css');
    require('backbone.localStorage');

    var tool = require('./tool').tool;


    //测试数据
    var initializeContacts = {
        data:[
            {'imgSrc':'http://p0.55tuanimg.com/static/goods/mobile/2014/10/24/19/b3911395f168990abc228f091f8ec7c9_3.jpg','title':'128元川府老妈火锅四人餐','content':'【华贸商厦】『川府老妈时尚火锅』四人餐！','originalPrice':'￥128','currentPrice':'287','salesVolume':'110人购买','favorable':'0'},
            {'imgSrc':'http://p0.55tuanimg.com/static/goods/mobile/2014/05/30/09/39946019c924a5bf84ed7581d3e4bb3d_3.jpg','title':'39.9元金权道单人自助餐','content':'【华贸商厦】『金权道韩式自助烤肉』单人自助餐1位！','originalPrice':'￥39.90','currentPrice':'55','salesVolume':'0人购买','favorable':'1'},
            {'imgSrc':'http://p0.55tuanimg.com/static/goods/mobile/2014/08/25/15/03d4653f86dd76577f61053b57c35be7_3.jpg','title':'198元京福华六人餐','content':'【东外环】『清真京福华肥牛』六人餐！','originalPrice':'￥198','currentPrice':'258','salesVolume':'200人购买','favorable':'0'},
            {'imgSrc':'http://p0.55tuanimg.com/static/goods/mobile/2014/08/25/15/03d4653f86dd76577f61053b57c35be7_3.jpg','title':'128元京福华肥牛四人餐','content':'【东外环】『清真京福华肥牛』四人餐！','originalPrice':'￥128','currentPrice':'172','salesVolume':'211人购买','favorable':'1'}
        ]
    };

    tool.mark.UnLineData = initializeContacts;

    var GrouponManager = new Marionette.Application();
    tool.mark.Manager = GrouponManager;


    //容器
    GrouponManager.addRegions({
        content:'#main'
    });

    //建立数据模型
    GrouponManager.module('Entities', function(Entities, DDNSManager, Backbone,Marionette,$,_){

        /* =S localStorage */

        var getValue = function(attributeOrFunction){
            if(typeof attributeOrFunction === 'function'){
                return attributeOrFunction();
            }
            else{
                return attributeOrFunction;
            }
        };

        var findStorageKey = function(entity){
            // use a model's urlRoot value
            if(entity.urlRoot){
                return getValue(entity.urlRoot);
            }
            // use a collection's url value
            if(entity.url){
                return getValue(entity.url);
            }
            // fallback to obtaining a model's storage key from
            // the collection it belongs to
            if(entity.collection && entity.collection.url){
                return getValue(entity.collection.url);
            }

            throw new Error("Unable to determine storage key");
        };

        var StorageMixin = function(entityPrototype){
            var storageKey = findStorageKey(entityPrototype);
            return { localStorage: new Backbone.LocalStorage(storageKey) };
        };

        Entities.configureStorage = function(entity){
            _.extend(entity.prototype, new StorageMixin(entity.prototype));
        };

        /* =E localStorage */


        //单个数据
        Entities.Contact = new Backbone.Model.extends({
            defaults:{
                imgSrc:'',
                title:'',
                content:'',
                originalPrice:'',
                currentPrice:'',
                salesVolume:'',
                favorable:''
            }
        });

        Entities.configureStorage(Entities.Contact);
        //集合
        Entities.ContactCollection = new Backbone.Collection.extends({
            url:'',
            model:Entities.Data,
            comparator: function(model){
                return model.get('id')
            }
        });

        Entities.configureStorage(Entities.ContactCollection);


        //获取数据方法
        var API = {
            getContactEntities: function(dataConfig){
                var contacts = new Entities.ContactCollection();
                var defer = $.Deferred();
                setTimeout(function(){
                    contacts.fetch({
                        success: function(data){
                            if(data && data.data.length == 0 ){
                                data.data = tool.mark.UnLineData;
                                contacts.reset(data.data);
                            }
                            defer.resolve(data);
                        }
                    });
                },100);

                var promise = defer.promise();
                return promise;
            }
        };

        //对外接口
        GrouponManager.reqres.setHandler("contact:entities", function(){
            return API.getContactEntities();
        });



    });





});
