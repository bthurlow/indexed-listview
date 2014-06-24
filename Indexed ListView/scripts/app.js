(function (global) {
    var app = global.app = global.app || {
        listData:[],
        home:{}
    };

    app.makeUrlAbsolute = function (url) {
            var anchorEl = document.createElement("a");
            anchorEl.href = url;
            return anchorEl.href;
        };

    document.addEventListener("deviceready", function () {
        navigator.splashscreen.hide();

        app.changeSkin = function (e) {
            var mobileSkin = "";

            if (e.sender.element.text() === "Flat") {
                e.sender.element.text("Native");
                mobileSkin = "flat";
            } else {
                e.sender.element.text("Flat");
                mobileSkin = "";
            }

            app.application.skin(mobileSkin);
        };

        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
        
        
    }, false);
    
    app.home.init=function(e){
        //console.log(e);
        getTestData(200);
        
        var lvi = ListViewIndex;
        lvi.init(e.view,true,0);
        
    	$("#indexedListView").kendoMobileListView({
    		dataSource: new kendo.data.DataSource({
                data: app.listData,
                sort:{field:"firstName",dir:"asc"},
                schema:{
        			model:{
        				id:"id",
        				fields:{
        					firstName:{type:"string"},
        					lastName:{type:"string"},
        					idx:{type:"string"},
        					middleInit:{type:"string"},
        					search:{type:"string"}
        				}
        			}
        		},
        		group: "idx"
    		}),
            type:'group',
            template: $("#indexedListViewTemplate").html(),
            headerTemplate:$("#indexedListViewHeaderTemplate").html(),
			filterable:{
				autoFilter: true,
				placeholder:"Search",
				field:"search",
				ignoreCase: true
			},
            fixedHeaders: true,
			dataBound: function(e) {
    			console.log('DataBound');
                //console.log(e);
                lvi.gi(e.sender.dataSource.view());
    		}
    	});
        
        
        
    };
    app.home.beforeShow=function(e){
		//e.view.scroller.reset();
        //console.log(e.view);
        //var lvi = new ListViewIndex(e.view);
    };
    
    function getTestData(numPeople) {
        var people = [], x, c;
        for (x=0; x < numPeople; x++) {
            c = {};
            c.id = chance.guid();
            c.firstName = chance.first();
            c.lastName = chance.last();
            c.middleInit = chance.character({alpha: true,casing:'upper'});
            c.idx = c.firstName.substring(0, 1);
            c.search = c.firstName + " " + c.lastName;
            people.push(c);
        }
        //console.log(people);
        app.listData = people;
			  
        //$.each(people, function(idx, ele) {
        //    //console.log(ele);
        //    //console.log(ele.firstName.substring(0,1));
        //    var init = ele.firstName.substring(0, 1), v = -1, t;
        //    //$.each(app.listData, function(i, e) {
        //    //    //console.log(i);
        //    //    if (e.t === init) {
        //    //        v = i;
        //    //        return false;
        //    //    }else {
        //    //        v = -1;
        //    //        return true;
        //    //    }
        //    //});
        //    app.listData.push({});
        //    //console.log(v);
        //    if (v !== -1) {
        //        app.listData[v].c.push(ele);
        //    }else {
        //        //d.push(init);
        //        //d[init] = {};
        //        t = app.listData.push({});
        //        //console.log(t);
        //        app.listData[t - 1].t = init;
        //        app.listData[t - 1].c = [];
        //        app.listData[t - 1].c.push(ele);
        //        //d.length++;
        //    }
        //    //d.init[ele.firstName.substring(0,1)] = .push(ele);
        //});
        //console.log(app.listData);
        //console.log(app.listData.length);
        //data.sort(SortByName);
				
        //Data Success
        //drawElements(data);
    }
})(window);