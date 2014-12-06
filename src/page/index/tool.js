/**
 * Created by wangyang7 on 2014/12/6.
 */

define(function(require, exports){

    exports.tool  = {

        information:{

        },

        mark:{
            Url:{},
            Manager:'',
            Views:[],
            Model:[],
            Controller:[],
            ManagerEvent:[],
            UnLineData:'',
            Template:[]
        },

        fetch: function(options){
            options = options ? _.clone(options) : {};
            var dataConfig = options.dataConfig,
                success = options.success,
                error = options.error ,
                type = options.type || 0,
                url = options.url || this.url;

            $.ajax({
                type: ['POST','GET'][type],
                url : url,
                data: dataConfig || {},
                success: function( data ){
                    options.success(data);
                },
                error: function(data){
                    error(data);
                }
            });
        }

    };



});
