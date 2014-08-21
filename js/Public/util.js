define("Public/util",["easing","jCarousel","Public/css/jcarousel.css"],function(require,exports,module){
    (function($){
        /**
         * TIME: 2014-05-10
         *************************
         *************************
         * HTML
         * Note:
         * <div class="mycarousel"> <-------------------------------| Root element
                <div> <------------------------------| List element  |
                    <p>...</p> <-----| Item element  |               |
                    <p>...</p> <-----| Item element  |               |
                </div> <-----------------------------|               |
                <div class="pagination"></div>
                <div class="Control">
                    <span class="Prev"></span>
                    <span class="Next"></span>
                </div>
                <div class="loading"></div>
            </div> <-------------------------------------------------|
         */
        $.fn.JC = function(options){
            var opts = {
                speed : 4000,
                full  : false,//�Ƿ�ȫ��
                page  : false,//�Ƿ���Ҫ����
                hook  : false,
                event : 'click'
            };
            $.extend(opts, options);
            return this.each(function(){
                var target = $(this);
                var self   = $(this).wrapAll('<div class="jcarousel-wrapper"></div>');
                var easing = opts.full?{duration:800, easing:"easeInOutExpo"}:800
                /**
                 * JC ������
                 */
                var JC_Control = function(dom,scroll,carousel){
                    var $dom = this.dom = $(dom,self);
                    var $scroll = this.scroll = scroll;
                    var $carousel = this.carousel = carousel;
                    $dom
                    .on('jcarouselcontrol:inactive', function() {
                        $(this).removeClass('current');
                    })
                    .on('jcarouselcontrol:active', function() {
                        $(this).addClass('current');
                    })
                    .jcarouselControl({
                        event:opts.event=="mouseover"&&opts.hook&&typeof scroll!="string"?"mouseover":"click",
                        target: $scroll,
                        carousel: $carousel
                    });
                };
                target.on("jcarousel:reload jcarousel:create",function(){
                    var $w = $(this).width(),$h = $(this).height(),$h2 = $(".Control span",this).height(),$list = target.jcarousel("list"),$items=target.jcarousel("items"),$pic=$items.find('img');
                    /**
                     * �Ƿ�ȫ��
                     */
                    if(opts.full){
                        $list.css({height:$h});
                        $items.css({width:$w});
                        $pic.each(function(i,dom){
                            var w = $(dom).width();
                            if(w>$w) $(dom).css({marginLeft:-(w-$w)/2})
                        })
                    }
                    $(".loading",self).fadeOut('fast');
                    $(".Control span",self).css({top:($h-$h2)/2, display:'inline'});
                })
                /**
                 * ��Ӷ��� && Auto
                 */
                target.jcarousel({
                    wrap: 'circular',
                    animation:easing
                })
                .jcarouselAutoscroll({
                    target: '+=1',
                    interval: opts.speed
                });
                /**
                 * ����
                 */
                if(opts.hook){
                    var hook = $(opts.hook);
                    hook.each(function(i) {
                        var l=target.jcarousel("items").length;
                        if((i+1)>l) return;
                        var element = target.jcarousel('items').eq(i);
                        new JC_Control(this,element,target);
                    });
                }
                /**
                 * �Ƿ���Ҫ��ҳ����
                 */
                if(opts.page && $(".pagination",self)[0]){
                    $(".pagination",self)
                    .on('jcarouselpagination:active', 'span', function() {
                        $(this).addClass('active');
                    })
                    .on('jcarouselpagination:inactive', 'span', function() {
                        $(this).removeClass('active');
                    })
                    .jcarouselPagination({
                        carousel: target,
                        item: function(page, carouselItems) {
                            return '<span>'+page+'</span>';
                        }
                    });
                 }
                new JC_Control(".Control .Prev","-=1",target);
                new JC_Control(".Control .Next","+=1",target);
            })
        }
        
        /**
         * ��������
         * ���ߣ�CNVP@������
         * TIME: 2014-05-11
         *************************
         *************************
         * HTML�ṹ����
         * Note:
         * <ul class="nav"> <-------------------------------| Root element
                <li class="Lv1">
                    <a href=""></a>
                    <ul class="Lv2">
                        <li><a href=""></a></li>
                    </ul>
                </li>
            </ul> <-----------------------------------------|
         */

        exports.nav = function (options){
            var Default = {
                level1 : "",
                levle2 : "",
                speed : 0,
                easing : "easeInOutQuint"
            };
            var opts  = $.extend(Default, options);
            var item  = opts.level1;
            var child = opts.levle2;
            $(item).hover(function(){
                var p = $(this).position();
                $(this).addClass("current").find(child).css({"left":p.left}).slideDown(opts.speed,opts.easing);
            },function(){
                $(this).removeClass("current").find(child).slideUp(opts.speed/2,opts.easing);
            })
        };


        /**
         * Tabs
         * TIME: 2014-05-11
         *************************
         *************************
         * HTML
         * Note:
         * <div class="root">
                <div class="tab-nav">
                    <span>...</span>
                    <span>...</span>
                    <a href="" class="more">...</a>
                    <a href="" class="more">...</a>
                </div>
                <div class="tab_panel">
                    <div class="tab1">...</div>
                    <div class="tab1">...</div>
                </div>
            </div>
         */
        exports.tabs = function(options){
            var Default = {
                head:"",
                body:"",
                event:"click",
                active:"current"
            };
            var opts = $.extend(Default,options);
            var item  = opts.head;
            var target = opts.body;
            $(item).on(opts.event,function(){
                var $i = $(this).index();
                $(this).addClass(opts.active).siblings().removeClass(opts.active);
                $(this).nextAll(".more").eq($i).show().siblings(".more").hide();
                $(target).eq($i).show().siblings().hide();
            })
        };



        /**
         * widget
         * addFav
         * setHome
         * TIME: 2014-05-11
         */

        exports.widget = {
            addFav : function(element){
                var language = {
                    hostName  : document.title,
                    hostUrl   : "http://" + window.location.hostname, //�������������������
                    addfailed : "�����������֧���Զ������ղأ���ʹ��������˵��ֶ�����"
                };
                $(element).on('click',function(){
                    document.all ?
                    window.external.addFavorite(language.hostUrl,language.hostName) :
                    (window.sidebar ? window.sidebar.addPanel(language.hostUrl,language.hostUrl,"") : alert(language.addfailed));
                })
            },
            setHome : function(element){
                var language = {
                    hostUrl   : "http://" + window.location.hostname, //�������������������
                    succeed   : "��ϲ��������ҳ�ɹ���",
                    setfailed : "�����������֧���Զ���Ϊ��ҳ����ʹ��������˵��ֶ�����"
                };
                $(element).on('click',function(){
                    try{
                        this.style.behavior = 'url(#default#homepage)';
                        this.sethomepage(language.hostUrl);
                    }catch(e){
                        if(window.netscape){
                            try{
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                                alert(language.succeed);
                            }catch(e){
                                alert(language.setfailed);
                            }
                            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                            prefs.setCharPref('browser.startup.homepage',language.hostUrl);
                        }else{
                            alert(language.setfailed);
                        }
                    }
                })
            },
            setTime : function(element){
                require.async("./time.js",function(Call){
                    Call(element)
                });
            },
            input : function(element){
                $(element).each(function(i,dom){
                    var $val = $(dom).val();
                    $(dom).focus(function(){
                        if($(this).val()==$val) $(this).val("");
                    }).blur(function(){
                        if($(this).val()=="") $(this).val($val);
                    });
                })
            }
        };
    })(jQuery);
})