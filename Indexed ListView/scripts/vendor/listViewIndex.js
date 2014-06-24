(function () {
    var ListViewIndex = {
        $listIndex : $('<div></div>').addClass("ListViewIndex indexHolder"),
        liView:null,
        isAnimated:false,
        addOffset:0
    };
    
    ListViewIndex.init = function (view, animated, offset) {
        if(!view){
            console.log('View is Required!');
        }else{
            if(offset){ListViewIndex.addOffset=offset;}
            if(animated){ListViewIndex.isAnimated = animated;}
            ListViewIndex.liView = view;
            $(ListViewIndex.liView.content[0]).append(ListViewIndex.$listIndex);
        }
    };
    ListViewIndex.gi = function(idxData){
        if(idxData.length > 0){
            //Cleanup Event Handler
            $(".ListViewIndex .index-item").off('click');
            //Empty Index Holder
            ListViewIndex.$listIndex.empty();
            //Build Index Holder
            $.each(idxData, function(k,v){
                var temp = '<a href="#'+v.value+'" data-goto="#'+v.value+'" class="km-group-title index-item">'+v.value+'</a>';
                ListViewIndex.$listIndex.append(temp);
            });
            //Bind Event Handler
            bindEvents();
        }
    };
    
    function bindEvents(){
        $(".ListViewIndex .index-item").on('click', function(e) {
            e.preventDefault();
            ////console.log(this);
            ////console.log(e);
            //console.log($(this));
            //console.log($(this).data('goto'));
            //console.log(view.scroller.scrollHeight());
            ////$(view.scroller).scrollTo($(this).data('goto'),{duration:1000,offsetTop:0});
            
            var scrollContainer = $(ListViewIndex.liView.scroller.element.find('.km-scroll-container'));
            //console.log(scrollContainer.offset().top);
            //console.log(view.scroller.scrollHeight());
            //console.log($($(this).data('goto')).offset().top); //Target + offset!
            //console.log($(view.scroller));
            
            var scrollY = $($(this).data('goto')).offset().top - scrollContainer.offset().top - ListViewIndex.addOffset;
            //console.log("ScrollY: "+scrollY);
            if(!ListViewIndex.isAnimated){
                ListViewIndex.liView.scroller.scrollTo(0,scrollY*-1);
            }else{
                ListViewIndex.liView.scroller.animatedScrollTo(0,scrollY*-1);
            }
        });
    };
    
    // CommonJS module
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = ListViewIndex;
        }
        exports.ListViewIndex = ListViewIndex;
    }

    // Register as a named AMD module
    if (typeof define === 'function' && define.amd) {
        define('ListViewIndex', [], function () {
            return ListViewIndex;
        });
    }

    // If there is a window object, that at least has a document property,
    // instantiate and define chance on the window
    if (typeof window === "object" && typeof window.document === "object") {
        window.ListViewIndex = ListViewIndex;
        window.listviewindex = ListViewIndex;
    }
})(window);