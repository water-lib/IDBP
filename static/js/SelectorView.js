/**
 * @version 1.1
 * @author ideawu@163.com
 * @link http://www.ideawu.net/
 * @class
 * 用于显示两栏(备选框, 已选框)选择器控件的JavaScript控件.
 *
 * @param {String} id: HTML节点的id, 控件将显示在该节点中.
 * @returns {TableView}: 返回分页控件实例.
 * @requires jQuery
 *
 * @example
 *
 * #HTML代码:
 * &lt;div id="sel_div"&gt;&lt;/div&gt;
 * 
 * #JavaScript代码:
 * var sel = new SelectorView('sel_div');
 * sel.src.header = {
 * 	id			: 'Id',
 * 	name		: 'Name',
 * 	text		: 'Text'
 * };
 * sel.dst.header = {
 * 	id			: 'Id',
 * 	name		: 'Name',
 * };
 * sel.src.dataKey = 'id';
 * sel.dst.dataKey = 'id';
 * sel.src.title = '可选';
 * sel.dst.title = '已选';
 *
 * sel.src.add({id: 1, name: 'Tom', text: 'Tomcat'});
 * sel.src.add({id: 2, name: 'Jerry', text: 'Jerrimy'});
 *
 * sel.render();
 */
function SelectorView(id){
	// 为了在函数中引用.
	var self = this;

	this.id = id;
	this._rendered = false;

	/**
	 * 当前控件所处的HTML节点引用.
	 * @type DOMElement
	 */
	this.container = null;
	/**
	 * 备选框TableView.
	 * @type TableView
	 */
	this.src = null;
	/**
	 * 已选框TableView.
	 * @type TableView
	 */
	this.dst = null;

	this._init = function(){
		var div = document.getElementById(this.id);
		div.view = this;

		var id_prefix = 'asdfsafokmlv';
		var src_id = this.id + '_' + id_prefix + '_src';
		var dst_id = this.id + '_' + id_prefix + '_dst';
		var str = '';
		str += '<div class="SelectorView">\n';
		str += '<table class="selector_table">\n';
		str += '<tr>';
		str += '<td valign="top" class="src">';
			str += '<div id="' + src_id + '" class="src_div"></div>';
			str += '<input type="button" value="选择" onclick="document.getElementById(\'' + this.id + '\').view.select()" />';
		str += "</td>\n";
		str += '<td valign="top" class="dst">';
			str += '<div id="' + dst_id + '" class="dst_div"></div>';
			str += '<input type="button" value="取消选择" onclick="document.getElementById(\'' + this.id + '\').view.unselect()" />';
		str += "</td>\n";
		str += "</tr>\n";
		str += "</table>\n";
		str += '</div><!-- /.SelectorView -->\n';
		div.innerHTML = str;
		
		this.container = div;
		this.src = new TableView(src_id);
		this.dst = new TableView(dst_id);
	}

	this._init();

	// 重写数据表格的行双击方法.
	this.src.dblclick = function(id){
		var row = self.src.get(id);
		if(row == false){
			return;
		}
		self.dst.add(row);
		self.src.del(row);
	};

	// 重写数据表格的行双击方法.
	this.dst.dblclick = function(id){
		var row = self.dst.get(id);
		if(row == false){
			return;
		}
		self.src.add(row);
		self.dst.del(row);
	};

	/**
	 * 渲染整个选择控件.
	 */
	this.render = function(){
		this.src.render();
		this.dst.render();
		this._rendered = true;
	};

	/**
	 * 将备选框中选中的数据移动到已选框中.
	 */
	this.select = function(){
		var rows = this.src.getSelected();
		this.dst.addRange(rows);
		this.src.delRange(rows);
		this.src.unselectAll();
	};

	/**
	 * 将已选框中选中的数据移动到备选框中.
	 */
	this.unselect = function(){
		var rows = this.dst.getSelected();
		this.src.addRange(rows);
		this.dst.delRange(rows);
		this.dst.unselectAll();
	};

	/**
	 * 获取已选择的的记录对象的列表, 也即已选框中的所有记录.
	 */
	this.getSelected = function(){
		return this.dst.getDataSource();
	};

	/**
	 * 获取所有已选择的数据对象键值列表.
	 */
	this.getSelectedKeys = function(){
		var keys = [];
		var rows = this.dst.getDataSource();
		for(var i in rows){
			keys.push(rows[i][this.dst.dataKey]);
		}
		return keys;
	};
}
