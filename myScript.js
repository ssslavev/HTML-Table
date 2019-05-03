var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var my;
(function (my) {

    var ctlCssCore = (function () {
        function ctlCssCore() {
        }
        ctlCssCore.prototype.appyTo = function (el) {
            el.style.cssText = this.style;
            el.className = this.className;
        };

        ctlCssCore.prototype.html = function () {
            var sHTML = '';
            if (this.className.length > 1) {
                sHTML += 'class="' + this.className + '"';
            }
            ;
            if (this.style.length > 1) {
                sHTML += 'style="' + this.style + '"';
            }
            ;
            return sHTML;
        };

        return ctlCssCore;

    }());

    var ctlCss = (function (_super) {
        __extends(ctlCss, _super);
        function ctlCss() {

            _super.call(this);
        }

        return ctlCss;

    }(ctlCssCore));

    my.ctlCss = ctlCss;

    var ctlCore = (function () {

        function ctlCore(value) {
            this.id = '';
            this.visible = true;
            this.type = 1 /* text */;
            this.dataType = 0 /* text */;
            this.tooltip = '';
            this.validation = {
                isRequired: { val: false, errtext: 'fild is required!' },
                minLen: { val: 0, errtext: 'min lenght is: ' },
                maxLen: { val: 99, errtext: 'to many symbols!' },
                customFunc: undefined
            };
            this.value = value;
            this.css = new my.ctlCss();
        };

        ctlCore.prototype.isValid = function (data) {
            var r = { result: true, text: '' };
            switch (data) {
                case null:
                case 'null':
                case undefined:
                case '':
                    if (this.validation.isRequired.val) {
                        r.result = false;
                        r.text = 'data cant be NULL or Undefined';
                        return r;
                    }
                    break;
                case (data.length < this.validation.minLen.val):
                    r.result = false;
                    r.text = this.validation.minLen.errtext;
                    break;
                case (data.length > this.validation.maxLen):
                    r.result = false;
                    r.text = this.validation.maxLen.errtext;
                    break;
            }
            return r;
        };

        ctlCore.prototype.iconGet = function () {
            var _icon = document.createElement('i');
            _icon.className = this.icon;
            return _icon;
        };
        return ctlCore;
    }());

    //end ctlCore

    var ctlButton = (function (_super) {
        __extends(ctlButton, _super);
        function ctlButton(label, onClickHandler) {
            _super.call(this, '');
            this.value = label;
            if (this.value === 'edit' || this.value === 'NEW') {
                this.css.className = 'btn btn-success';
            } else if (this.value === 'del') {
                this.css.className = 'btn btn-danger';
            } else if (this.value === 'preview') {
                this.css.className = 'btn btn-primary';
            }
            this.onClickHandler = onClickHandler;
        };

        ctlButton.prototype.create = function () {
            var ctl = this;
            var elHTML = document.createElement('BUTTON');
            elHTML.innerText = this.value;
            elHTML.id = this.value;
            elHTML.className = this.css.className;
            elHTML.style.cssText = this.css.style;
            //  if (this.onClickHandler == undefined) {
            //      elHTML.addEventListener("click", function (e) {
            //          console.log(e)
            //         //ctl.onClickHandler(e, ctl.data);
            //     }, false);
            // };


            elHTML.addEventListener('click', function (e) {
                var clName = e.target.className

                if (clName.includes('btn-primary')) {
                    $('#myModal').modal('show');
                    var childs = e.target.parentNode.parentNode.parentNode.childNodes;

                    var info = `<p> RecNo:  ${childs[1].innerText} </p>
                                <p> ID:  ${childs[2].innerText} </p>
                                <p> SerialNo:  ${childs[3].innerText} </p>
                                <p> DeviceID:  ${childs[4].innerText} </p>
                                <p> CreatedOn:  ${childs[5].innerText} </p>`;

                    $('#myModal').find('.modal-body').html(info);
                }
            })
            elHTML.appendChild(this.iconGet());
            return elHTML;
        };
        return ctlButton;

    }(ctlCore));

    my.ctlButton = ctlButton;
    //end ctlButton
    var ctlText = (function (_super) {
        __extends(ctlText, _super);
        function ctlText(value) {
            _super.call(this, value);
        }
        ;
        ctlText.prototype.create = function () {
            var ctl = this;
            var elHTML = document.createElement('input');
            elHTML.type = 'text';
            elHTML.value = this.value;
            elHTML.className = this.css.className;
            elHTML.style.cssText = this.css.style;
            return elHTML;
        };
        return ctlText;

    }(ctlCore));

    my.ctlText = ctlText;

    //end ctlText
    var ctlSpan = (function (_super) {
        __extends(ctlSpan, _super);
        function ctlSpan(value) {
            _super.call(this, value);

        }
        ;
        ctlSpan.prototype.create = function () {
            var ctl = this;
            var elHTML = document.createElement('span');
            elHTML.id = this.value;
            if (typeof this.value === 'string' && this.value.startsWith('2015')) {

                elHTML.innerText = new Date(this.value).toLocaleString();
            } else {
                elHTML.innerText = this.value;
            }

            elHTML.className = 'data';
            elHTML.style.cssText = this.css.style;
            return elHTML;
        };
        return ctlSpan;
    }(ctlCore));

    my.ctlSpan = ctlSpan;
    //end ctlSpan
})(my || (my = {}));
// end my 

/// <reference path="../typings/jquery/jquery.d.ts" />
var my;
(function (my) {
    var GridCore = (function () {
        function GridCore(container) {
            this.caption = undefined;
            this.columns = [];
            this.rows = [];
            this.createCore = function () {
            };
            this._grid = this;
            this.css = new my.grCss();
            this.container = new grContainer(container, this.css);
            ////this.events = _events();
            this.data = new grData();
        }
        ;
        GridCore.prototype.init = function () {
            this.createCore();
            this.data.load(function (gr) {
                gr.render();
            }, undefined, this);
        };

        GridCore.prototype.render = function () {
            var sHTML = '';
            var row;
            this._initSystemColumns();
            row = new my.grRow(this.columns, undefined);
            row.type = 1 /* title */;
            this.container.title.innerHTML = row.create(this).innerHTML;
            row = new my.grRow(this.columns, undefined);
            row.type = 2 /* filter */;
            this.container.filter.innerHTML = row.create(this).innerHTML;
            this.rows = [];
            for (var i = 0, len = this.data.dataTable().length; i < len; ++i) {
                row = new my.grRow(this.columns, this.data.dataTable()[i]);
                this.rows.push(row);
                //sHTML += row.html();
                this.container.body.appendChild(row.create(this));
            }
            //$("#" + this.container.body).html(sHTML);
        };

        GridCore.prototype._initSystemColumns = function () {
            var col = new my.grColumn('');
            col.type = 8 /* command */;
            this.columns.unshift(col);
            var col = new my.grColumn('');
            col.type = 9 /* rowDetails */;
            this.columns.push(col);
        };
        ;
        return GridCore;

    }());

    my.GridCore = GridCore;
    // END GridCore

    var grContainer = (function () {
        function grContainer(containerid, css) {
            var container = document.getElementById(containerid);
            css.container.appyTo(container);
            container.innerHTML = ''; //empty container before start addin in it
            this.table = document.createElement('table');
            this.table.id = 'tbl' + container.id;
            css.table.appyTo(this.table);
            container.appendChild(this.table);
            this.button = document.createElement('button');
            css.tableButton.appyTo(this.button);
            this.header = document.createElement('thead');
            this.header.id = 'h' + container.id;
            css.tableHeader.appyTo(this.header);
            this.table.appendChild(this.header);
            this.title = document.createElement('tr');
            this.title.id = 'ht' + container.id;
            this.header.appendChild(this.title);
            this.filter = document.createElement('tr');
            this.filter.id = 'hf' + container.id;
            this.header.appendChild(this.filter);
            this.body = document.createElement('tbody');
            this.body.id = 'b' + container.id;
            this.table.appendChild(this.body);
            this.footer = document.createElement('footer');
            this.footer.id = 'f' + container.id;
            this.table.appendChild(this.footer);
            this.popAdd = document.createElement('div');
            this.popAdd.id = 'pa' + container.id;
            container.appendChild(this.popAdd);
            this.popDel = document.createElement('div');
            this.popDel.id = 'pd' + container.id;
            container.appendChild(this.popDel);
        }
        ;
        return grContainer;
    }());

    var grData = (function () {
        function grData() {
            this.dataAddress = undefined;
            this.dataSet = [];
        };

        grData.prototype.load = function (success, error, grid) {
            var sJSON = '{"result":true,"msg":"No Data in POST","errorDescription":"","data":{"Devices":[{"TotalCnt":62,"PageCnt":4.0,"RecNo":1,"ID":1612,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"8588148373085717402","TableStatusID":1,"DeviceID":123,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-03-31T13:19:09.607","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":2,"ID":2650,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"afbe7fbcf4ee5d8310f0edddf3a07748","TableStatusID":1,"DeviceID":256,"Notes":"Test","BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-09-14T11:33:45.06","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":3,"ID":604,"DeviceTypeUID":"a7945fc8-450f-46c9-8e09-931847e6001d","SysID":null,"SerialNo":"8587586131892280828","TableStatusID":1,"DeviceID":1115,"Notes":"This is tom typing a test message","BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-02-25T13:24:23.143","LastEditBy":"System","LastEditOn":"2015-11-13T10:49:50.81","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":4,"ID":1637,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"80A23F76CC688150B1993E73E1C01164","TableStatusID":1,"DeviceID":1117,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-06-23T11:55:53.557","LastEditBy":"System","LastEditOn":"2015-11-13T09:33:06.717","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":5,"ID":606,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"635687580090000000","TableStatusID":1,"DeviceID":1125,"Notes":null,"BranchID":11,"Active":0,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-03-04T16:10:27.417","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":6,"ID":1616,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"8587707950996452033","TableStatusID":1,"DeviceID":1130,"Notes":"eren","BranchID":11,"Active":0,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-04-21T11:37:18.413","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":7,"ID":2640,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"T90413B00531","TableStatusID":1,"DeviceID":1134,"Notes":null,"BranchID":11,"Active":0,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-08-31T16:48:51.88","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":8,"ID":1609,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"0759816E823B739AEC0FE0F9693AA12C","TableStatusID":1,"DeviceID":1145,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-03-16T14:54:12.037","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":9,"ID":608,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"8587978234802022189","TableStatusID":1,"DeviceID":1154,"Notes":"IA Workplace PC","BranchID":11,"Active":0,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-03-09T10:26:03.273","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":10,"ID":2642,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"8587604261919753486","TableStatusID":1,"DeviceID":1199,"Notes":null,"BranchID":11,"Active":0,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-09-02T10:03:39.787","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":11,"ID":2641,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"8587610310999376620","TableStatusID":1,"DeviceID":1978,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-09-01T14:31:11.797","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":12,"ID":1636,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"59B31DBC5B871C1D90E2445058575449","TableStatusID":1,"DeviceID":5395,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-06-23T10:30:16.003","LastEditBy":"System","LastEditOn":"2015-11-05T21:15:16.253","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":13,"ID":2762,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"d1b1f4df0581f84cffbfc7ac4df48561","TableStatusID":1,"DeviceID":5996,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-11-03T16:09:36.61","LastEditBy":"System","LastEditOn":"2015-11-03T16:09:36.61","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":14,"ID":2759,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"c0c6f8d03d90cd0ab1ae324a72efb94f","TableStatusID":1,"DeviceID":5997,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-11-03T16:08:33.543","LastEditBy":"System","LastEditOn":"2015-11-03T16:08:33.55","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":15,"ID":2678,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"8f71d116817a899bc2751d0f87bc9e97","TableStatusID":1,"DeviceID":5998,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-09-22T16:20:00.68","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":16,"ID":2663,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"4db31dfc5c37101d805c445058575449","TableStatusID":1,"DeviceID":5999,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-09-20T21:30:40.04","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":17,"ID":2673,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"3ecf62ab0e333602c562dc295795668f","TableStatusID":1,"DeviceID":6000,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-09-21T21:22:48.63","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":18,"ID":2657,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"ffffffffffffffffffffffffffffffff","TableStatusID":1,"DeviceID":6001,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-09-20T21:15:41.993","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":19,"ID":2679,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"448915cd8829441dd62df7a57df7d132","TableStatusID":1,"DeviceID":6004,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-09-30T12:35:01.067","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1},{"TotalCnt":62,"PageCnt":4.0,"RecNo":20,"ID":2658,"DeviceTypeUID":"cadbba98-e67f-4cee-a43b-1317a57523b8","SysID":null,"SerialNo":"923506983cc60da96e38adebaaad0a2f","TableStatusID":1,"DeviceID":6008,"Notes":null,"BranchID":11,"Active":1,"SortOrder":0,"CreatedBy":"System","CreatedOn":"2015-09-20T21:20:35.283","LastEditBy":"System","LastEditOn":"2015-10-08T16:39:18.673","StatusID":1,"StatusName":"Available","StatusSort":1}],"DeviceStatuses":[{"ID":1,"Name":"Available"},{"ID":2,"Name":"Faulty"},{"ID":3,"Name":"Stolen"},{"ID":4,"Name":"Spare"},{"ID":5,"Name":"Support"}],"Branches":[{"ID":0,"Name":"HO"},{"ID":1,"Name":"London"},{"ID":2,"Name":"New York"},{"ID":3,"Name":"Paris"},{"ID":4,"Name":"Washington DC"},{"ID":5,"Name":"San Francisco"},{"ID":6,"Name":"Miami"},{"ID":7,"Name":"Las Vegas"},{"ID":8,"Name":"Vienna"},{"ID":9,"Name":"Budapest"},{"ID":10,"Name":"Istanbul"},{"ID":11,"Name":"Dubai"},{"ID":12,"Name":"Abu Dhabi"},{"ID":13,"Name":"Hong Kong "},{"ID":14,"Name":"Shanghai"},{"ID":15,"Name":"Chicago"}],"DeviceTypes":[{"UID":"cadbba98-e67f-4cee-a43b-1317a57523b8","Name":"IT Well"},{"UID":"e84b67db-f929-4797-a9db-10f6d12ade66","Name":"Partner"},{"UID":"a7945fc8-450f-46c9-8e09-931847e6001d","Name":"PC"}]}}';
            var resp = JSON.parse(sJSON);
            this.dataSet = resp.data;
            success(grid);
            return this.dataSet;
        };
        ;
        grData.prototype.dataTable = function () {
            return this.dataSet[this.dataTableName];
        };

        return grData;

    }());

    var grOptions = (function () {
        function grOptions() {
            this.allowNew = true;
            this.allowEdit = true;
            this.allowDel = true;
            this.allowFilter = true;
        }
        return grOptions;
    }());
    ;
})(my || (my = {}));
; //end my
var my;
(function (my) {
    var grCssCore = (function () {
        function grCssCore() {
            this.container = new my.ctlCss();
            this.table = new my.ctlCss();
            this.tableHeader = new my.ctlCss();;
            this.tableBody = new my.ctlCss();
            this.tableFooter = new my.ctlCss();
            this.rowTitle = new my.ctlCss();
            this.rowFilter = new my.ctlCss();
            this.rowBody = new my.ctlCss();
            this.tableButton = new my.ctlCss();
            this.editForm;
            this.editInline;
            this.container.className = 'tblContainer';
            this.table.className = 'table table-striped table-bordered table-hover table-sm';
            this.rowTitle.className = 'rowTitle';
            this.rowFilter.className = 'rowFilter';
            this.rowBody.className = 'rowBody';
            this.tableHeader.className = 'thead-dark';
            // this.tableButton.className = 'btn btn-primary';

        }
        ;
        grCssCore.prototype.appyTo = function (element) {
        };

        return grCssCore;
    }());
    // end grCssCore

    var grCss = (function (_super) {
        __extends(grCss, _super);
        function grCss() {
            _super.call(this);
        };

        return grCss;

    }(grCssCore));

    my.grCss = grCss; // end grCss

})(my || (my = {}));
;
var my;
(function (my) {

    var grRow = (function () {
        function grRow(colums, data) {
            this.id = '';
            this.visible = true;
            this.type = 0 /* body */;
            this.data = data;
            this.columns = colums;
        }
        grRow.prototype.create = function (grid) {
            var trHTML;
            trHTML = document.createElement('tr');
            for (var a = 0, len = this.columns.length; a < len - 1; a++) {
                var tdElement = document.createElement('td');
                var col = this.columns[a];
                trHTML.appendChild(col.create(this, grid));
            }
            return trHTML;
        };

        return grRow;
    }());
    my.grRow = grRow;

    //end grRow

    var grColumn = (function () {
        function grColumn(id) {
            this.id = '';
            this.visible = true;
            this.type = 1 /* text */;
            this.dataType = 0 /* text */;
            this.title = undefined;
            this.options = { data: undefined, textfield: '', valuefield: '' };
            this.css = new my.ctlCss();
            this.id = id;
            this.title = id;
        }
        grColumn.prototype.create = function (row, grid) {
            var elHTML;
            if ((row.type === 1 /* title */) || (row.type === 2 /* filter */)) {
                elHTML = document.createElement('th');
            }
            else {
                elHTML = document.createElement('td');
            }
            var ctl;
            switch (this.type) {
                case 1 /* text */:
                    ctl = this.createText(row);
                    break;
                case 5 /* button */:
                    ctl = this.createButton(row);
                    break;
                case 8 /* command */:
                    ctl = this.createCommand(row, grid);
                    break;
                default:
                    ctl = this.createText(row);

            }
            elHTML.appendChild(ctl);
            this.css.appyTo(elHTML);
            return elHTML;
        };
        ;
        //#region --- GRID Controls ---
        grColumn.prototype.createText = function (row) {
            var value = this.title;
            if (row.data !== undefined) {
                value = row.data[this.id];
            }
            var elHTML;
            var text = new my.ctlText(value);
            text.data = row;
            switch (row.type) {
                case 0 /* body */:
                    elHTML = new my.ctlSpan(value).create();
                    break;
                case 1 /* title */:
                    elHTML = new my.ctlSpan(value).create();
                    break;
                default:
                    elHTML = text.create();

            }
            return elHTML;
        };
        ;
        grColumn.prototype.createButton = function (row) {
            var value = this.title;
            if (row.data !== undefined) {
                value = row.data[this.id];

            }
            var elHTML;
            var btnLabel = value;
            if (value === undefined) {
                btnLabel = this.value;
            }
            var btn = new my.ctlButton(btnLabel, this.onClickHandler);
            btn.data = row;
            switch (row.type) {
                case 0 /* body */:
                    elHTML = btn.create();
                    break;
                case 1 /* title */:
                    elHTML = new my.ctlSpan(value).create();
                    break;
                case 2 /* filter */:
                    elHTML = new my.ctlSpan('').create();
                    break;
                default:
                    elHTML = btn.create();

            }
            return elHTML;
        };
        ;
        grColumn.prototype.createCommand = function (row, grid) {
            var value = this.title;
            if (row.data !== undefined) {
                value = row.data[this.id];

            }
            var elHTML = document.createElement('div');
            var btnLabel = value;
            if (value === undefined) {
                btnLabel = this.value;
            }
            var btn = new my.ctlButton(btnLabel, this.onClickHandler);
            btn.data = row;

            switch (row.type) {
                case 0 /* body */:
                    addBtnEdit(elHTML);
                    addBtnDel(elHTML);
                    addBtnPreview(elHTML);
                    break;
                case 1 /* title */:
                    addBtnNew(elHTML);
                    break;
                case 2 /* filter */:
                    elHTML = new my.ctlSpan('').create();
                    break;
                default:
                    elHTML = btn.create();

            }
            function addBtnEdit(parent) {
                // if (options.alowedit === false) {return}
                var btn = new my.ctlButton('edit', undefined);
                btn.icon = 'fas fa-edit';
                parent.appendChild(btn.create());
            }
            ;
            function addBtnDel(parent) {
                // if (options.alowDel === false) {return}
                var btn = new my.ctlButton('del', undefined);
                btn.icon = 'fas fa-trash-alt';
                parent.appendChild(btn.create());
            }
            function addBtnPreview(parent) {
                // if (options.alowedit === false) {return}
                var btn = new my.ctlButton('preview', undefined);
                btn.icon = 'fas fa-search';
                parent.appendChild(btn.create());
            }
            ;
            function addBtnNew(parent) {
                // if (options.alownew === false) {return}
                var btn = new my.ctlButton('NEW', undefined);
                btn.icon = 'fas fa-plus';
                parent.appendChild(btn.create());
            }
            ;
            return elHTML;
        };
        ;
        return grColumn;
    }());
    my.grColumn = grColumn;
    ; //end grColumn
})(my || (my = {}));
; //end my
var tools;
(function (tools) {
    function newGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    tools.newGuid = newGuid;
    function round(nmb, fractions) {
        var ret = Math.round(nmb * Math.pow(10, fractions));
        return (ret / Math.pow(10, fractions)).toLocaleString('en', { minimumFractionDigits: fractions, useGrouping: false });
    }
    tools.round = round;
})(tools || (tools = {}));
//# sourceMappingURL=myScript.js.map