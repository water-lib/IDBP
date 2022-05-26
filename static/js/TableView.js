/**
 * @version 1.1
 * @author ideawu@163.com
 * @link http://www.ideawu.net/
 * @class
 * 用于显示数据表格的JavaScript控件. 集成的分页控件, 可对表格中的数据集进行客户端分页.
 *
 * @param {String} id: HTML节点的id, 控件将显示在该节点中.
 * @returns {TableView}: 返回分页控件实例.
 * @requires jQuery {@link PagerView} {@link SortView}
 *
 * @example
 * ### HTML代码:
 * &lt;div id="my_div"&gt;&lt;/div&gt;
 *
 * ### JavaScript代码:
 * var table = new TableView('my_div');
 * table.dataKey = 'id';
 * table.header = {
 * 	'id' : 'Id',
 * 	'name' : 'Name',
 * };
 *
 * table.add({id:1, name:'Tom'});
 * table.render();
 */
var TableView = function(id){
	// TODO: 实现有序哈希类.
	/* 因为哈希表的实现可能是元素无序的, 所以使用数组代替. 为此, 定义了数据操作方法. */
	function array_index_of_key(arr, key, val){
		for(var i in arr){
			if(arr[i][key] == val){
				return parseInt(i);
			}
		}
		return -1;
	}

	function array_index_of_item(arr, item){
		for(var i in arr){
			if(arr[i] == item){
				return parseInt(i);
			}
		}
		return -1;
	}

	function array_get(arr, key, val){
		var index = array_index_of_key(arr, key, val);
		if(index != -1){
			return arr[index];
		}
		return false;
	}

	function array_del(arr, key, val){
		var index = array_index_of_key(arr, key, val);
		if(index != -1){
			var a1 = arr.slice(0, index);
			var a2 = arr.slice(index + 1);
			return a1.concat(a2);
		}
		return arr;
	}

	var self = this;
	this.id = id;
	this._rendered = false;
	this._filter_text = '';
	this.rows = [];
	this._display_rows = []; // 过滤后的数据集
	
	/**
	 * 当前控件所处的HTML节点引用.
	 * @type DOMElement
	 */
	this.container = null;

	/**
	 * 数据集的每一条记录的唯一标识字段名. 类似数据库表的主键字段名.
	 * @type String
	 */
	this.dataKey = '';
	/**
	 * 要显示的数据表格的标题.
	 * @type String
	 */
	this.title = '';
	/**
	 * 要显示的记录的字段, 以及所对应的字段名. 如 'id' : '编号'.
	 * @type Object
	 */
	this.header = {};
	/**
	 * 集成的分页控件, 可对表格中的数据集进行客户端分页.
	 * @type PagerView
	 */
	this.pager = {};
	/**
	 * 集成的排序控件, 用于显示分页按钮/链接.
	 * @type SortView
	 */
	this.sort = {};

	/**
	 * @class
	 * 用于确定要显示哪些内部控件, 控件对应的属性为Boolean类型, 取值为true时显示.
	 */
	function DisplayOptions(){
		/**
		 * 标题
		 * @type Boolean
		 */
		this.title = true;
		/**
		 * 计数
		 * @type Boolean
		 */
		this.count = true;
		/**
		 * 行选择框
		 * @type Boolean
		 */
		this.marker = true;
		/**
		 * 过滤器
		 * @type Boolean
		 */
		this.filter = false;
		/**
		 * 分页
		 * @type Boolean
		 */
		this.pager = false;
		/**
		 * 排序
		 * @type Boolean
		 */
		this.sort = false;
		/**
		 * 是否多选
		 * @type Boolean
		 */
		this.multiple = true;
		/**
		 * 调试
		 * @type Boolean
		 */
		this.debug = false;
	};

	/**
	 * 用于确定要显示哪些内部控件.
	 * @type TableView-DisplayOptions
	 */
	this.display = new DisplayOptions();

	/**
	 * 获取数据集指定id一条记录.
	 * @returns {Object} 数据集中的一条记录.
	 */
	this.get = function(id){
		return array_get(this.rows, self.dataKey, id);
	};

	/**
	 * 添加一条记录, 如果控件已经被渲染, 会导致一次刷新.
	 * @param {Object} row: 记录对象.
	 */
	this.add = function(row){
		var index = array_index_of_item(self.rows, row);
		if(index != -1){
			return;
		}
		this.rows.push(row);
		this._display_rows.push(row);
		if(self._rendered){
			self.render();
		}
	};

/*
	var Timer = function(){
		this.times = [];

		this.timeit = function(){
			var d = new Date();
			var t = d.getMinutes() * 60 * 1000 + d.getSeconds() * 1000 + d.getMilliseconds();
			this.times.push(t);
		}

		this.alert = function(){
			var str='', t0;
			t0 = this.times[0];
			for(var i=1; i<this.times.length; i++){
				str += i + ': ' + (this.times[i] - t0) + '\n';
				t0 = this.times[i];
			}
			alert(str);
		}

		this.timeit();
	}
*/

	/**
	 * 添加记录列表, 如果控件已经被渲染, 会导致一次刷新.
	 * 用本方法替代连续多次{@link TableView#add()}, 以提高性能.
	 * @param {Array[Object]} rows: 记录对象的数组.
	 */
	this.addRange = function(rows){

		var index = {};
		for(var i in self.rows){
			var rid = self.rows[i][self.dataKey];
			index[rid] = true;
		}

		for(var i in rows){
			var row = rows[i];
			var rid = row[self.dataKey];

			if(!index[rid]){
				this.rows.push(row);
				this._display_rows.push(row);
			}
		}
		if(self._rendered){
			self.render();
		}
	};

	/**
	 * 删除一个记录对象, 如果控件已经被渲染, 会导致一次刷新.
	 * 可以在调用本方法前, 调用{@link TableView#get()}方法通过id获取要删除的记录对象.
	 * @param {Object} row: 记录对象.
	 */
	this.del = function(row){
		var rid = row[self.dataKey];
		self.rows = array_del(self.rows, self.dataKey, rid);
		self._display_rows = array_del(self._display_rows, self.dataKey, rid);
		if(self._rendered){
			self.render();
		}
	};

	/**
	 * 删除记录对象列表, 如果控件已经被渲染, 会导致一次刷新.
	 * 用本方法替代连续多次{@link TableView#del()}, 以提高性能.
	 * @param {Array[Object]} rows: 记录对象的数组.
	 */
	this.delRange = function(rows){
		var index = {};
		for(var i in rows){
			var rid = rows[i][self.dataKey];
			index[rid] = true;
		}

		var n_rows = [];
		for(var i in self.rows){
			var row = self.rows[i];
			var rid = row[self.dataKey];
			if(!index[rid]){
				n_rows.push(row);
			}
		}
		self.rows = n_rows;

		var n_rows = [];
		for(var i in self._display_rows){
			var row = self._display_rows[i];
			var rid = row[self.dataKey];
			if(!index[rid]){
				n_rows.push(row);
			}
		}
		self._display_rows = n_rows;


		if(self._rendered){
			self.render();
		}
	};

	/**
	 * 内部方法. 用于全选或者取消全选行.
	 */
	this._toggleSelect = function(){
		var c = $(self.container).find('th.marker input[type=checkbox]')[0];
		if(c.checked){
			self.selectAll();
		}else{
			self.unselectAll();
		}
	};

	/**
	 * 使用者重写本方法, 进行行双击回调.
	 * @param {int} id: 双击行的主键值.
	 * @event
	 */
	this.dblclick = function(id){
	};

	/**
	 * 内部方法, 行双击时调用.
	 */
	this._dblclick = function(id){
		self.dblclick(id);
	};

	/**
	 * 获取当前可显示的数据数.
	 * @returns {int}
	 */
	this.rowCount = function(){
		var n = 0;
		for(var i in self._display_rows){
			n ++;
		}
		return n;
	};

	/**
	 * 内部方法, 渲染视图框架.
	 */
	this._render_framework = function(){
		var str = '';
		str += '<div class="TableView">\n';
		str += '<div class="datagrid_meta">\n';
			str += '<span class="title">' + this.title + '</span>';
			str += '<span class="count">(<span class="marked_count">0</span>/<span class="row_count">0</span>)</span>';
			str += '<span class="filter"><label>正则过滤</label>';
			str += '<input type="text" value="' + this._filter_text + '"'
				+ ' onkeyup="document.getElementById(\'' + this.id + '\').view.filter(this.value)" />';
			str += '</span>\n';
		str += '</div>\n';

		//var datagrid_div_id = self.id + '_datagrid_div__';
		//str += '<div class="datagrid_div" id="' + datagrid_div_id + '">\n';
		str += '<div class="datagrid_div">\n';
		str += '</div><!-- /.datagrid_div -->\n';

		var pager_id = self.id + '_pager__';
		str += '<div id="' + pager_id + '" class="pager"></div>\n';

		// debug
		var debug_div_id = self.id + '_debug';
		str += '<div id="' + debug_div_id + '"></div>\n';

		str += '</div><!-- /.TableView -->\n';

		var div = document.getElementById(self.id);
		div.view = self;
		self.container = div;
		self.container.innerHTML = str;

		// debug
		self._debug = $('#' + debug_div_id);

		// 捕获异常, 可以不需要PagerView工作
		try{
			self.pager = new PagerView(pager_id);
			self.pager.onclick = function(index){
				self.render();
			};

			self.sort = new SortView();
			self.sort.onclick = function(field, order){
				self.sort.sort(self._display_rows);
				self.render();
			};
		}catch(e){
		}
	};

	self._render_framework();

	/**
	 * 更新统计数据.
	 */
	this._update_meta = function(){
		if(!self.display.count){
			return;
		}
		var marked_count = 0;
		marked_count = $(self.container).find('table.datagrid td.marker input[value!=""]:checked').length;
		$(self.container).find('div.datagrid_meta span.marked_count').html(marked_count);
		$(self.container).find('div.datagrid_meta span.row_count').html(self.rowCount());
	}

	/**
	 * 内部方法. 绑定事件, 设置外观.
	 */
	this._after_render = function(){
		var trs = $(self.container).find('table.datagrid>tbody>tr.tv_row');
		trs.each(function(i, tr){
			var cb = tr.getElementsByTagName('input')[0];

			var clz = i%2==0? 'odd' : 'even';
			// 标记已选的行
			if(cb.checked){
				clz += ' marked';
			}
			$(tr).removeClass('odd even marked');
			$(tr).addClass(clz);

			cb.onclick = function(){
				cb.checked = !cb.checked;
			};

			tr.onclick = function(){
				if(!cb.checked){
					if(!self.display.multiple){
						self.unselectAll();
					}
				}
				cb.checked = !cb.checked;
				if(cb.checked){
					$(this).addClass('marked');
				}else{
					$(this).removeClass('marked');
				}
				self._update_meta();
			};
			tr.onmouseover = function(){
				$(this).addClass('hover');
			};
			tr.onmouseout = function(){
				$(this).removeClass('hover');
			};
			tr.ondblclick = function(){
				self._dblclick(cb.value);
			};
		});

		self._update_meta();

		if(!self.display.title){
			$(self.container).find('div.datagrid_meta span.title').hide();
		}else{
			$(self.container).find('div.datagrid_meta span.title').show();
		}
		if(!self.display.count){
			$(self.container).find('div.datagrid_meta span.count').hide();
		}else{
			$(self.container).find('div.datagrid_meta span.count').show();
		}
		if(!self.display.filter){
			$(self.container).find('div.datagrid_meta span.filter').hide();
		}else{
			$(self.container).find('div.datagrid_meta span.filter').show();
		}
		if(!self.display.pager){
			$('#' + self.pager.id).hide();
		}else{
			$('#' + self.pager.id).show();
		}
		if(!self.display.marker){
			$(self.container).find('td.marker, th.marker').hide();
		}else{
			$(self.container).find('td.marker, th.marker').show();
		}
	};

	// DEBUG
	function debug(str){
		if(self.display.debug){
			self._debug.css('border', '2px solid #f00');
			self._debug.append(str + '<br/>');
		}
	}

	/**
	 * 渲染控件.
	 */
	this.render = function(){
		var buf = [];
		buf.push('<table class="datagrid"><thead>\n');
		buf.push('<tr>\n');
		buf.push('<th class="marker" width="10">');
		if(self.display.multiple){
			buf.push('<input type="checkbox" value="" onclick="document.getElementById(\'' + this.id + '\').view._toggleSelect()" />');
		}
		buf.push('</th>\n');

		var count = 0;
		for(var k in this.header){
			count ++;
		}
		var width = parseInt(100/count);
		for(var k in this.header){
			buf.push('<th field="' + k + '" width="' + width + '%">' + self.header[k] + '</th>\n');
		}
		buf.push("</tr>\n</thead>\n");

		if(self.display.sort){
			self.sort.sort(self._display_rows);
		}
		if(self.display.pager){
			self.pager.itemCount = self._display_rows.length;
			var rows = self.pager.page(self._display_rows);	
		}else{
			var rows = self._display_rows;
		}

		buf.push("<tbody>\n");
		for(var i in rows){
			var row = rows[i];
			var rid = row[self.dataKey];
			buf.push('<tr class="tv_row">\n<td class="marker" width="10"><input type="checkbox" value="');
			buf.push(rid);
			buf.push('" /></td>\n');
			for(var k in self.header){
				buf.push('<td>');
				buf.push(row[k]);
				buf.push('</td>\n');
			}
			buf.push('</tr>\n');
		}
		buf.push("</tbody></table>\n");

		$(self.container).find('div.datagrid_meta span.title').html(this.title);
		
		// $.html() is really slow in IE
		//$(self.container).find('div.datagrid_div').html(buf.join(''));
		$(self.container).find('div.datagrid_div').each(function(i, e){
			e.innerHTML = buf.join('');
		});

		self._after_render();

		if(self.display.pager){
			self.pager.render();
		}

		if(self.display.sort){
			var is_empty = true;
			if(self.sort.fields){
				for(var i in self.sort.fields){
					is_empty = false;
				}
			}
			if(is_empty){
				var fields = {};
				for(var k in self.header){
					fields[k] = [null, null];
				}
				self.sort.fields = fields;
			}
			var elements = {};
			$(self.container).find('table.datagrid th[field]').each(function(i, th){
				var k = $(th).attr('field');
				if(k != undefined){
					elements[k] = th;
				}
			});
			self.sort.render(elements);
		}

        //$('.datagrid').fixedtableheader();

		self._rendered = true;
	};

	/**
	 * 设置所有行的选择标记. 如果设置了分页, 则只对当前页有效.
	 */
	this.selectAll = function(){
		$(self.container).find('th.marker input, td.marker input').each(function(i, e){
			e.checked = true;
		});
		self._after_render();
	};

	/**
	 * 取消所有行的选择标记. 如果设置了分页, 则只对当前页有效.
	 */
	this.unselectAll = function(){
		$(self.container).find('th.marker input, td.marker input').each(function(i, e){
			e.checked = false;
		});
		self._after_render();
	};

	/**
	 * 返回所有的记录的列表.
	 * @returns {Array[Object]}
	 */
	this.getDataSource = function(){
		return self.rows;
	}

	/**
	 * 获取所有标记为选择的行对应的记录的列表.
	 * @returns {Array[Object]}
	 */
	this.getSelected = function(){
		var items = [];
		$(self.container).find('.datagrid td.marker input[value!=""]:checked').each(function(i, cb){
			if(cb.checked){
				// 注意, 不要作为hash使用, 否则会导致使用者判断选中个数时错误.
				var row = array_get(self.rows, self.dataKey, cb.value);
				items.push(row);
			}
		});

		return items;
	};

	/**
	 * 获取所有已选择的数据对象键值的列表.
	 * @returns {Array[Key]}
	 */
	this.getSelectedKeys = function(){
		var keys = [];
		var rows = self.getSelected();
		for(var i in rows){
			keys.push(rows[i][self.dataKey]);
		}
		return keys;
	};

	/**
	 * 进行模糊过滤.
	 * @param {String} text: Regex字符串.
	 */
	this.filter = function(text){
		self._filter_text = text;
		self._display_rows = [];

		var regex = new RegExp(text, 'i');
		for(var key in self.rows){
			var row = self.rows[key];
			if(text == ''){
				self._display_rows.push(row);
			}else{
				// 只对看到的进行过滤
				for(var k in self.header){
					var find = String(row[k]).replace(/<[^>]*>/g, '');
					if(regex.test(find)){
						self._display_rows.push(row);
						break;
					}
				}
			}
		}

		if(self.display.pager){
			self.pager.index = 1;
		}
		self.render();
	};

	/**
	 * 清空所有行.
	 */
	this.clear = function(){
		self.rows = [];
		self._display_rows = [];

		if(self.display.pager){
			self.pager.index = 1;
		}
		self.render();
	};
}
