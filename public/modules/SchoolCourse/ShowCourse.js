Ext.define('Module.SchoolCourse.ShowCourse.Grid1', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.SchoolCourse-ShowCourse-Grid1',
    store: 'SchoolCourse-Store4',
    loadMask: true,
    disableSelection: true,
    columnLines: true,
    rowLines: true,
    invalidateScrollerOnRefresh: true,
    viewConfig: {
        trackOver: false
    },
    listeners: {
        render: function(grid) {
        }
    },
    columns: [
        { header: '節次', dataIndex: 'seqno', width: 60, sortable: false },
        { header: '星期一', dataIndex: 'day1', flex: true, sortable: false },
        { header: '星期二', dataIndex: 'day2', flex: true, sortable: false },
        { header: '星期三', dataIndex: 'day3', flex: true, sortable: false },
        { header: '星期四', dataIndex: 'day4', flex: true, sortable: false },
        { header: '星期五', dataIndex: 'day5', flex: true, sortable: false },
        { header: '星期六', dataIndex: 'day6', flex: true, sortable: false },
        { header: '星期日', dataIndex: 'day7', flex: true, sortable: false }
    ]
});

Ext.define('Module.SchoolCourse.ShowCourse.MainPanel', {
    extend: 'Ext.Panel',
    frame: false,
    closable: true,
    icon: __SILK_ICONS_URL + 'application_view_columns.png',
    title: '我的課程清單',
    layout: 'border',
    /*bodyStyle: 'padding: 10px; background: white',
    autoScroll: true,
    autoLoad: {
        url: 'table.html',
        scripts: false
    }*/
    items: [{
        xtype: 'SchoolCourse-ShowCourse-Grid1',
        itemId: 'grid1',
        border: true,
        region: 'center',
        autoHeight: true,
        autoScroll: true,
        margins: '5 5 5 5'
    }]
});

/**
 * 模組主程式定義區
 */
Ext.define('Module.SchoolCourse.ShowCourse', {
    extend: 'Module.Prototype.Module',
    statics: {
        _previous: null
    },
    moduleLoad: function() {
        var thisModule = this;

        //將目前的模組記錄在 URL HASH
    	window.location.hash = '#'+this.$className;
        
        var tabpanel = Ext.getCmp('portal-tabpanel');

        //判斷 Panel 是否已經存在 Tab（建立或切換）
        var panel = Module.SchoolCourse.ShowCourse._previous;

        if (!panel) {
            //使用新頁籤建立主畫面
            //tabpanel.setLoading('讀取中');
            var panel = Ext.create('Module.SchoolCourse.ShowCourse.MainPanel', {
                listeners: {
                    beforeclose: function(panel, eOpts) {
                        thisModule.moduleUnload();
                        Module.SchoolCourse.ShowCourse._previous = null;
                    },
                    afterrender: function(panel, eOpts) {
                        //載入資料
                        //changeFilterHandler('1');
                    }
                }
            });

            //新增主畫面到 Tab
            tabpanel.add(panel);

            //記錄已建立的新 Panel
            Module.SchoolCourse.ShowCourse._previous = panel;
        }

        //切換到 Panel
        tabpanel.setActiveTab(panel);
    },
    moduleUnload: function() {
        //從 URL HASH 移除目前的模組記錄
        if (window.location.hash == '#'+this.$className) {
            window.location.hash = '';
        }
    }
});