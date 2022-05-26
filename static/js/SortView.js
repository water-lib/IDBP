/**
 * @version 1.1
 * @author ideawu@163.com
 * @link http://www.ideawu.net/
 * @class
 * 用于显示排序按钮/链接的控件, 并包含 js 排序功能. 这些排序控件附加在指定的 HTMLElement 里.
 * @requires jQuery {@link PagerView} {@link SortView}
 * @returns {SortView}: 返回排序控件实例.
 *
 * @example
 * var rows = []; // datasource
 *
 * var sort = new SortView();
 * sort.fields = {
 * 	'id'	: ['int', null],
 * 	'name'	: [null, null]
 * };
 *
 * var elements = {};
 * var ths = $('table th').each(function(i, th){
 * 	var k = $(th).attr('field');
 * 	if(k != undefined){
 * 		elements[k] = th;
 * 	}
 * });
 * sort.onclick = function(){
 * 	sort.sort(rows);
 * 	// do with rows...
 * }
 *
 * sort.render(elements);
 */
var SortView = function(){
	var self = this;

	this._elements = {};

	/**
	 * 排序字段的名字.
	 * @type String
	 */
	this.field = null;
	/**
	 * 排序方向, 取值为: asc|desc.
	 * @type String
	 */
	this.order = null;
	/**
	 * 可供排序的字段哈希表, 字段对应一个数组, 数组格式为[类型, 比较函数].
	 * 当类型为: null|int|date|text|string|float 且不指定比较函数时, 使用默认的比较函数.
	 * @type Object
	 */
	this.fields = {
		//'id' : ['int', null] // type, comparer
	};

	/**
	 * 默认的排序函数.
	 */
	this._default_comparefuncs = {};
	this._default_comparefuncs['int'] = function(a, b){
		// strip_tags
		if(typeof(a) == 'string'){
			a = a.replace(/<[^>]*>/g, '');
		}
		if(typeof(b) == 'string'){
			b = b.replace(/<[^>]*>/g, '');
		}
		a = parseInt(a);
		b = parseInt(b);
		if(isNaN(a)){
			a = 0;
		}
		if(isNaN(b)){
			b = 0;
		}
		if(a > b){
			return 1;
		}else if(a == b){
			return 0;
		}else{
			return -1;
		}
	};
	this._default_comparefuncs['float'] = function(a, b){
		if(typeof(a) == 'string'){
			a = a.replace(/<[^>]*>/g, '');
		}
		if(typeof(b) == 'string'){
			b = b.replace(/<[^>]*>/g, '');
		}
		a = parseFloat(a);
		b = parseFloat(b);
		if(isNaN(a)){
			a = 0;
		}
		if(isNaN(b)){
			b = 0;
		}
		if(a > b){
			return 1;
		}else if(a == b){
			return 0;
		}else{
			return -1;
		}
	};
	this._default_comparefuncs['text'] = function(a, b){
		if(typeof(a) == 'string'){
			a = a.replace(/<[^>]*>/g, '');
		}
		if(typeof(b) == 'string'){
			b = b.replace(/<[^>]*>/g, '');
		}
		if(a > b){
			return 1;
		}else if(a == b){
			return 0;
		}else{
			return -1;
		}
	};
	this._default_comparefuncs['string'] = this._default_comparefuncs['text'];
	this._default_comparefuncs['date'] = this._default_comparefuncs['text'];


	/**
	 * 根据当前的字段和方向, 对对象数组进行排序.
	 */
	this.sort = function(rows){
		if(self.field == undefined){
			for(var i in self.fields){
				self.field = i;
				break;
			}
		}
		if(self.order == undefined){
			self.order = 'asc';
		}

		var type = null;
		var func = null;
		var f = self.fields[self.field];
		if(f instanceof Array){
			type = f[0];
			func = f[1];
		}
		if(type == null || type == undefined){
			func = this._default_comparefuncs['text'];
		}else if(type == 'int' || type == 'string'
				|| type == 'text' || type == 'date' || type == 'float'){
			func = this._default_comparefuncs[type];
		}

		var sign = self.order == 'desc'? -1 : 1;
		var k = self.field;
		rows.sort(function(a, b){
			return sign * func(a[k], b[k]);
		});
	};

	/**
	 * 用户重写本方法, 获取排序事件.
	 * @param {String} field 排序字段.
	 * @param {String} order 排序方向.
	 * @returns {Boolean} 返回false表示取消本次排序事件.
	 */
	this.onclick = function(field, order){
	};

	/**
	 * 内部方法.
	 */
	this._onclick = function(field){
		var old_field = self.field;
		var old_order = self.order;

		var order = 'asc';
		if(self.field == field && self.order == 'asc'){
			order = 'desc';
		}
		self.field = field;
		self.order = order;
		
		var ret = self.onclick(field, order);
		if(ret === false){
			self.field = old_field;
			self.order = old_order;
		}

		self.render(self._elements);
		//alert(field + ':' + order);
	};

	/**
	 * 进行渲染.
	 * @param {Object} elements 哈希表, 字段名与HTMLElement的对应关系.
	 */
	this.render = function(elements){
		self._elements = elements;
		//alert(self.field + ':' + self.order);

		for(var k in self.fields){
			var ele = elements[k];
			if(ele == undefined){
				continue;
			}
			ele = $(ele);

			ele.find('span[class=sign]').remove();
			var html = '<span class="SortViewButton">';
			html += ele.html();
			html += '<span class="sign" sort="' + k + '">';
			if(k == self.field){
				if(self.order == 'asc'){
					html += '&#8593;';
				}else{
					html += '&#8595;';
				}
			}else{
				//html += '&#8597;';
			}
			html += '</span>';
			html += '</span>';

			ele.html(html);
			ele.unbind();
			ele.click(function(){
				self._onclick($(this).find('span[class=sign]').attr('sort'));
			});
			ele.attr('title', 'Sort By ' + ele.text());
			ele.css('white-space', 'nowrap');
			ele.css('cursor', 'pointer');
			ele.css('color', '#33f');
		}
	};
};

