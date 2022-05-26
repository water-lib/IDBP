import os
import pickle
# import winsound
from datetime import timedelta, datetime
import datetime as ada
import numpy as np
import pandas as pd
import pymysql
from flask import Flask, render_template, redirect, url_for, flash
from flask import request, jsonify
from flask_bootstrap import Bootstrap
from flask_login import UserMixin, login_user, LoginManager, current_user
from flask_migrate import Migrate
from flask_moment import Moment
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from sko.PSO import PSO
from werkzeug.security import generate_password_hash, check_password_hash
from wtforms import StringField, SubmitField, PasswordField, BooleanField
from wtforms.validators import DataRequired

import ReadDate
from alter_password import ChangedPwd
from equipment_add import Equipmentaddform
from equipment_change import Equipment_change
from equipment_delete import Equipment_delete
from equipment_history_query import Equipment_history_query
from equipment_unusualcount_query import Equipment_unusualcount_query
from gangweixinxi import Gangweixinxi
from opti_workpiece_index import Opti_workpiece_index
from orders_add import Orders_add
from orders_change import Orders_change
from ordersim_delete import Ordersim_delete
from predict_workpiece_index import Predict_workpiece_index
from register_form import RegistrationForm
from warnning_workpiece import Warnning_workpiece_index
from workpiece_add import Workpieceaddform
from workpiece_change import Workpiece_change
from workpiece_delte import Workpiece_delte
from workpiece_unusualcount import Workpiece_unusual_count
from tensorflow.keras.models import load_model

from yichangshujudaochu import Yichangshujudaochu

pymysql.install_as_MySQLdb()
basedir = os.path.abspath(os.path.dirname(__file__))
print(basedir)
app = Flask(__name__)
login = LoginManager(app)
bootstrap = Bootstrap(app)
# 以下在window上测试使用
model_computer = pickle.load(open('D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone - 比赛副本/model1.pkl', 'rb'))
model2_lasercutting_q1 = pickle.load(open('D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone - 比赛副本/'
                                          'model_lasercutting.pkl', 'rb'))
model2_lasercutting_q2 = pickle.load(open('D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone - 比赛副本/'
                                          'model_lasercutting1.pkl', 'rb'))
model_BP = load_model('D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone - 比赛副本/BP_model.h5')
model_BP2 = load_model('D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone - 比赛副本/BP_model2.h5')
KNN = pickle.load(open('D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone - 比赛副本/KNN_jieduan.pkl', 'rb'))
# 以下上传云端使用
# model_computer = pickle.load(open('/home/nzw/BigDataFlask2/model1.pkl', 'rb'))
# model2_lasercutting_q1 = pickle.load(open('/home/nzw/BigDataFlask2/'
#                                           'model_lasercutting.pkl', 'rb'))
# model2_lasercutting_q2 = pickle.load(open('/home/nzw/BigDataFlask2/'
#                                           'model_lasercutting1.pkl', 'rb'))
# model_BP = load_model('/home/nzw/BigDataFlask2/BP_model.h5')
# model_BP2 = load_model('/home/nzw/BigDataFlask2/BP_model2.h5')
# KNN = pickle.load(open('/home/nzw/BigDataFlask2/KNN_jieduan.pkl', 'rb'))
moment = Moment(app)
app.config['SECRET_KEY'] = 'hard to guess string'
# app.config['SQLALCHEMY_DATABASE_URI'] = \
#      'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@127.0.0.1:3306/loginfo'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
data = ['one', 'two', 'three', 'four']
# 连接数据库
conn = ReadDate.connect()
# conn1 = ReadDate.connect1()
# conn2 = ReadDate.connect2()
# 每隔1秒清楚缓存
app.config['DEBUG'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)
db = SQLAlchemy(app)
migrate = Migrate(app, db)


@app.shell_context_processor
def make_shell_context():
    return dict(db=db, User=User, Role=Role)


@login.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    users = db.relationship('User', backref='role')

    def __repr__(self):
        return '<Role %r>' % self.name


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    password_hash = db.Column(db.String(128))
    username = db.Column(db.String(64), unique=True, index=True)
    role_s = db.Column(db.String(64), index=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    location = db.Column(db.String(64))
    phonenumber = db.Column(db.String(64))
    introduce = db.Column(db.Text())
    member_since = db.Column(db.DateTime(), default=datetime.utcnow)
    last_seen = db.Column(db.DateTime(), default=datetime.utcnow)

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User %r>' % self.username

    def ping(self):
        self.last_seen = datetime.utcnow()
        db.session.add(self)
        db.session.commit()


class Wim(db.Model):
    __tablename__ = 'wim'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    wtype = db.Column(db.String(64))
    wmaterial = db.Column(db.String(64))
    wnumber = db.Column(db.Integer)
    equipment = db.Column(db.String(64))
    crft = db.Column(db.Text())
    producedate = db.Column(db.DateTime(), default=datetime.utcnow())

    def __repr__(self):
        return '<Wim %r>' % self.name


class Eim(db.Model):
    __tablename__ = 'eim'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    etype = db.Column(db.String(64))
    pr = db.Column(db.String(64))
    pa = db.Column(db.String(64))
    edate = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return '<Wim %r>' % self.name


class Om(db.Model):
    __tablename__ = 'om'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    ptype = db.Column(db.String(64))
    alterp = db.Column(db.String(64))
    deliveydate = db.Column(db.DateTime())
    ordersnum = db.Column(db.Integer)
    orderstate = db.Column(db.String(64))

    def __repr__(self):
        return '<Wim %r>' % self.name


db.create_all()
pass


class LoginForm(FlaskForm):
    name = StringField('username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('登录')
    remember_me = BooleanField('保持登录状态')


# 登录界面，暂时不要
@app.route('/', methods=['GET', 'POST'])
def log():
    form = LoginForm()
    print(form.name.data)
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.name.data).first()
        print(user)
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            next = request.args.get('next')
            if next is None or not next.startwith('/'):
                next = url_for("head")  # 返回的是endpoint也就是函数方法名，而不是网页url
            return redirect(next)
        flash("Invalid password or name.")
    return render_template("Login_modify.html", form=form)


@app.route('/templates/euipment_online.html', methods=['GET', 'POST'])
def euipment_online():
    return render_template('euipment_online.html')


# 首页
@app.route('/templates/tool.html', methods=['GET', 'POST'])
def tool():
    return render_template('tool.html')


@app.route('/index_new.html')
def head():
    return render_template('index_new.html')


@app.route('/templates/<username>')
def operator_info(username):
    user = User.query.filter_by(username=username).first_or_404()
    return render_template('operator_modify.html', user=user, current_time=datetime.utcnow())


@app.route('/templates/register.html', methods=['GET', 'POST'])
def register():
    form = RegistrationForm(role_s='user')
    if form.validate_on_submit():
        user = User(username=form.username.data, password=form.password.data,
                    role_s=form.role_s.data, location=form.location.data,
                    phonenumber=form.phonenumber.data, introduce=form.introduce.data)
        db.session.add(user)
        db.session.commit()
        flash('注册成功,请返回登录')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)


# 历史能耗
@app.route('/history_energy_consumption.html')
def history():
    return render_template('history_energy_consumption.html')


@app.route('/templates/jiguang.html')
def jiguang():
    return render_template('jiguang.html')


# 测试页面
@app.route('/t')
def test():
    return render_template('test.html')


@app.route('/templates/caozuoyuanxinxi.html')
def xinxi():
    return render_template('caozuoyuanxinxi.html')


# 机床页面
@app.route('/templates/mechine.html')
def Machin1():
    return render_template('mechine.html')


@app.route('/templates/mechine_skc1.html')
def Machin2():
    return render_template('mechine_skc1.html')


@app.route('/templates/mechine_skc1_computer.html')
def Machin2_computer():
    return render_template('mechine_skc1_computer.html')


@app.route('/templates/mechine_skc2.html')
def Machin3():
    return render_template('mechine_skc2.html')


@app.route('/templates/mechine_jgq1.html')
def Machin4():
    return render_template('mechine_jgq1.html')


@app.route('/templates/mechine_jgq2.html')
def Machin5():
    return render_template('mechine_jgq2.html')


@app.route('/templates/mechine_tz.html')
def Machin6():
    return render_template('mechine_tz.html')


@app.route('/qualification_rate.html')
def qualification():
    return render_template('qualification_rate.html')


# 机床页面
@app.route('/m')
def hello_world():
    data = ReadDate.readone(conn, 'n100', 1)
    ua = data['ua']
    Dtime = str(data['time'])

    return render_template('mechine.html')


@app.route('/try', methods=['GET'])
def hello():
    data = request.args.get('index')
    U = request.args.get('ua')
    print(data)
    print(U)
    a = ReadDate.readone(conn, 'n100', int(data) + 1)
    u = a['ua']
    Dtime = a['time']
    index = a['num']
    Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
    a = {
        'index': index,
        'ua': u,
        'time': Dtime,
    }

    return jsonify(a)


@app.route('/time')
def hello2():
    data = ReadDate.readone(conn, 'n100', 1)
    Dtime = data['time']
    a = {
        'time': Dtime,

    }
    return jsonify(a)


# 实时数据页
# @app.route('/e')
@app.route('/templates/e_parm.html')
def e_parm():
    return render_template('e_parm.html')


@app.route('/templates/xiougaimima_modify.html', methods=['GET', 'POST'])
def mima():
    form = ChangedPwd()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if User.query.filter_by(password=form.oldpassword.data) and User.query.filter_by(username=form.username.data):
            user.password = form.newpassword.data
            db.session.add(current_user)
            db.session.commit()
            flash('修改成功,请返回登录')
            return redirect(url_for('login'))
    return render_template('xiougaimima_modify.html', form=form)


@app.route('/templates/Login_modify.html', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.name.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            next = request.args.get('next')
            if next is None or not next.startwith('/'):
                next = url_for("head")  # 返回的是endpoint也就是函数方法名，而不是网页url
            return redirect(next)
        flash("请重新输入您的账户密码或进行注册")
    return render_template("Login_modify.html", form=form)


# @app.route('/', methods=['GET', 'POST'])
# def index():
#     return render_template('index_new.html')


@app.route('/templates/workpieceim_main_add.html', methods=['GET', 'POST'])
def workpadd():
    form = Workpieceaddform()
    if current_user.role_s == 'admin':
        print(current_user.role_s)
        if form.validate_on_submit():
            wim = Wim(name=form.name.data, wtype=form.wtype.data, wmaterial=form.wmaterial.data,
                      wnumber=form.wnumber.data, equipment=form.equipment.data, crft=form.crft.data)
            db.session.add(wim)
            db.session.commit()
            flash('添加工件信息成功！')
            return redirect(url_for('workpadd'))
    else:
        return redirect(url_for("gangweiquanxianNO"))
    return render_template('workpieceim_main_add.html', form=form)


@app.route('/templates/workpieceim_query_all.html', methods=['GET', 'POST'])
def workpquery():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='loginfo', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM wim"
    cur.execute(sql)
    u = cur.fetchall()
    conn.close()
    return render_template('workpieceim_query_all.html', u=u)


@app.route('/templates/workpieceim_change_one.html', methods=['GET', 'POST'])
def workchange():
    form = Workpiece_change()
    if form.validate_on_submit():
        wim = Wim.query.filter_by(id=form.id.data).first()
        if Wim.query.filter_by(id=form.id.data).first():
            if form.name.data != "":
                wim.name = form.name.data
            if form.wtype.data != "":
                wim.wtype = form.wtype.data
            if form.wmaterial.data != "":
                wim.wmaterial = form.wmaterial.data
            if form.wnumber.data != "":
                wim.wnumber = form.wnumber.data
            if form.equipment.data != "":
                wim.equipment = form.equipment.data
            if form.crft.data != "":
                wim.crft = form.crft.data
            db.session.add(wim)
            db.session.commit()
            flash('修改成功')
            return redirect(url_for('workpquery'))
    return render_template('workpieceim_change_one.html', form=form)


@app.route('/templates/workpieceim_delete_one.html', methods=['GET', 'POST'])
def workdelte():
    form = Workpiece_delte()
    if form.validate_on_submit():
        wim = Wim.query.filter_by(id=form.id.data).first()
        if wim:
            db.session.delete(wim)
            db.session.commit()
            flash('删除成功')
            return redirect(url_for('workpquery'))
        else:
            flash('无此ID号')
    return render_template('workpieceim_delete_one.html', form=form)


@app.route('/templates/equipmentim_main_add.html', methods=['GET', 'POST'])
def equipadd():
    form = Equipmentaddform()
    if form.validate_on_submit():
        eim = Eim(name=form.name.data, etype=form.etype.data, pr=form.pr.data, pa=form.pa.data)
        db.session.add(eim)
        db.session.commit()
        flash('添加设备信息成功')
        return redirect(url_for('equipadd'))
    return render_template('equipmentim_main_add.html', form=form)


@app.route('/templates/equipmentim_query_all.html', methods=['GET', 'POST'])
def equipquery():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='loginfo', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM eim"
    cur.execute(sql)
    u = cur.fetchall()
    conn.close()
    return render_template('equipmentim_query_all.html', u=u)


@app.route('/templates/equipment_change_one.html', methods=['GET', 'POST'])
def equipchange():
    form = Equipment_change()
    if form.validate_on_submit():
        eim = Eim.query.filter_by(id=form.id.data).first()
        if Eim.query.filter_by(id=form.id.data).first():
            if form.name.data != "":
                eim.name = form.name.data
            if form.esuit.data != "":
                eim.esuit = form.esuit.data
            if form.pr.data != "":
                eim.pr = form.pr.data
            if form.pa.data != "":
                eim.pa = form.pa.data
            db.session.add(eim)
            db.session.commit()
            flash('修改成功')
            return redirect(url_for('equipquery'))
    return render_template('equipment_change_one.html', form=form)


@app.route('/templates/equipment_delet_one.html', methods=['GET', 'POST'])
def equipdelte():
    form = Equipment_delete()
    if form.validate_on_submit():
        eim = Eim.query.filter_by(id=form.id.data).first()
        if eim:
            db.session.delete(eim)
            db.session.commit()
            flash('删除成功')
            return redirect(url_for('equipquery'))
        else:
            flash('无此ID号')
    return render_template('equipment_delet_one.html', form=form)


@app.route('/templates/equipment_history_query.html', methods=['GET', 'POST'])
def equiphisquery():
    form = Equipment_history_query()
    query_name = form.query_name.data
    query_type = form.query_type.data
    if form.validate_on_submit():
        if query_name == '激光切割机' and query_type == 'ZT-J-6060M':
            return redirect(url_for('laser_ZT_J_6060M'))
        elif query_name == '立式加工中心' and query_type == 'VMC850E':
            return redirect(url_for('lishi_VMC850E'))
        elif query_name == '上海同琛小车床' and query_type == 'V210':
            return redirect(url_for('xiaochechuang'))
        else:
            flash('无此型号设备,请返回设备修改信息中查看')
    return render_template('equipment_history_query.html', form=form)


@app.route('/templates/equipment_unusualcount_query.html', methods=['GET', 'POST'])
def equipunsul_count_query():
    form = Equipment_unusualcount_query()
    query_name = form.query_name.data
    print(query_name)
    query_type = form.query_type.data
    print(query_type)
    if form.validate_on_submit():
        if query_name == '激光切割机' and query_type == 'ZT-J-6060M':
            return redirect(url_for('laser_ZT_J_6060M_unusualcount'))
        elif query_name == '立式加工中心' and query_type == 'VMC850E':
            return redirect(url_for('lishi_VMC850E_unusualcount'))
        elif query_name == '上海同琛小车床' and query_type == 'V210':
            return redirect(url_for('xiaochechuang_unusualcount'))
        else:
            flash('无此型号设备,请返回设备修改信息中查看')
    return render_template('equipment_unusualcount_query.html', form=form)


@app.route('/templates/warnning_workpiece_index.html', methods=['GET', 'POST'])
def warnning_workpiece_index():
    form = Warnning_workpiece_index()
    query_name = form.query_name.data
    query_type = form.query_type.data
    query_workpiece = form.query_workpiece.data
    if form.validate_on_submit():
        if query_name == '上海同琛小车床' and query_type == 'V210' and query_workpiece == '轴承球':
            return redirect(url_for('computer_P_image'))
    return render_template('warnning_workpiece_index.html', form=form)


@app.route('/templates/lishi_VMC850E.html')
def lishi_VMC850E():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM test_copy1"
    cur.execute(sql)
    u = cur.fetchall()
    conn.close()
    return render_template('lishi_VMC850E.html', u=u)


@app.route('/templates/lishi_VMC850E_unusualcount.html')
def lishi_VMC850E_unusualcount():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM test WHERE P > 1200"
    cur.execute(sql)
    u = cur.fetchall()
    conn.close()
    return render_template('lishi_VMC850E_unusualcount.html', u=u)


@app.route('/templates/xiaochechuang.html')
def xiaochechuang():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM xiaochechuang"
    cur.execute(sql)
    u = cur.fetchall()
    conn.close()
    return render_template('xiaochechuang.html', u=u)


@app.route('/templates/laser_ZT_J_6060M')
def laser_ZT_J_6060M():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM test_yangxu"
    cur.execute(sql)
    u = cur.fetchall()
    conn.close()
    return render_template('laser_ZT_J_6060M.html', u=u)


@app.route('/templates/laser_ZT_J_6060M_unusualcount.html')
def laser_ZT_J_6060M_unusualcount():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM test_yangxu WHERE P>800"
    cur.execute(sql)
    u = cur.fetchall()
    conn.close()
    return render_template('laser_ZT_J_6060M_unusualcount.html', u=u)


@app.route('/templates/xiaochechuang_unusualcount.html')
def xiaochechuang_unusualcount():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM xiaochechuang WHERE P>200"
    cur.execute(sql)
    u = cur.fetchall()
    conn.close()
    return render_template('xiaochechuang_unusualcount.html', u=u)


@app.route('/templates/workpiece_unusual_count.html', methods=['GET', 'POST'])
def workuncount():
    form = Workpiece_unusual_count()
    time_begin_d = str(form.date1.data) + ' ' + '0:0:0'
    print(time_begin_d)
    time_begin_m = str(form.date3.data)
    print(time_begin_m)
    time_end_d = str(form.date2.data) + " " + '23:59:59'
    print(time_end_d)
    time_end_m = str(form.date4.data)
    print(time_end_m)
    # conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='loginfo', charset='utf8')
    # cur = conn.cursor()
    # sql = "SELECT * FROM wim WHERE producedate between '{{time_begin}}' and '{{time_end}}'"
    # cur.execute(sql)
    # u = cur.fetchall()
    # conn.close()
    wim = Wim.query.filter(Wim.producedate <= time_end_d).filter(Wim.producedate >= time_begin_d).all()
    wim1 = Wim.query.filter(Wim.producedate <= time_end_m).filter(Wim.producedate >= time_begin_m).all()
    return render_template('workpiece_unusual_count.html', form=form, wim=wim, wim1=wim1)


@app.route('/templates/ordersim_main_add.html', methods=['GET', 'POST'])
def ordersadd():
    form = Orders_add()
    if form.validate_on_submit():
        om = Om(name=form.name.data, ptype=form.ptype.data, alterp=form.alterp.data, deliveydate=form.deliveydate.data,
                ordersnum=form.ordersnum.data, orderstate=form.orderstate.data)
        db.session.add(om)
        db.session.commit()
        flash('添加订单信息成功')
        return redirect(url_for('ordersadd'))
    return render_template('ordersim_main_add.html', form=form)


@app.route('/templates/ordersim_query_all.html', methods=['GET', 'POST'])
def orderquery():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='loginfo', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM om"
    cur.execute(sql)
    u = cur.fetchall()
    conn.close()
    return render_template('ordersim_query_all.html', u=u)


@app.route('/templates/ordersim_change_one.html', methods=['GET', 'POST'])
def orderchange():
    form = Orders_change()
    if form.validate_on_submit():
        om = Om.query.filter_by(id=form.id.data).first()
        if Om.query.filter_by(id=form.id.data).first():
            if form.name.data != "":
                om.name = form.name.data
            if form.ptype.data != "":
                om.ptype = form.ptype.data
            if form.alterp.data != "":
                om.alterp = form.alterp.data
            if form.deliverydate.data != "":
                om.deliveydate = form.deliverydate.data
            if form.ordersnum.data != "":
                om.ordersnum = form.ordersnum.data
            if form.orderstate.data != "":
                om.orderstate = form.orderstate.data
            db.session.add(om)
            db.session.commit()
            flash('修改成功')
            return redirect(url_for('orderquery'))
    return render_template('ordersim_change_one.html', form=form)


@app.route('/templates/ordersim_delet_one.html', methods=['GET', 'POST'])
def ordersdelte():
    form = Ordersim_delete()
    if form.validate_on_submit():
        om = Om.query.filter_by(id=form.id.data).first()
        if om:
            db.session.delete(om)
            db.session.commit()
            flash('删除成功')
            return redirect(url_for('orderquery'))
        else:
            flash('无此ID号')
    return render_template('ordersim_delet_one.html', form=form)


@app.route("/templates/opti_workpiece_index.html", methods=['GET', 'POST'])
def opti_workpiece():
    form = Opti_workpiece_index()
    if form.validate_on_submit():
        if form.query_name.data == '激光切割机':
            if form.query_workpiece.data == '6×6mm板':
                return redirect(url_for('psochinknormal'))
        if form.query_name.data == '立式加工中心':
            if form.query_workpiece.data == '轴承座':
                return redirect(url_for('opt_for_lasercutting'))
        else:
            flash('填写错误，当前您的设备或零件名不对应')
    return render_template('opti_workpiece_index.html', form=form)


@app.route('/templates/opt_for_lasercutting.html', methods=['GET', 'POST'])
def opt_for_lasercutting():
    return render_template('opt_for_lasercutting.html')


@app.route('/templates/opt_for_computer.html', methods=['GET', 'POST'])
def opt_for_computer():
    return render_template('opt_for_computer.html')


@app.route("/templates/predict_workpiece_index.html", methods=['GET', 'POST'])
def predict_workpiece():
    form = Predict_workpiece_index()
    if form.validate_on_submit():
        if form.query_name.data == '激光切割机':
            if form.query_workpiece.data == '6×6mm板':
                return redirect(url_for('predict_for_computer'))
        if form.query_name.data == '立式加工中心':
            if form.query_workpiece.data == '轴承座':
                return redirect(url_for('predict_for_lasercutting'))
        if form.query_name.data == '上海同琛车床':
            if form.query_workpiece.data == '轴承球':
                return redirect(url_for('predict_for_xiaochechuang'))
        else:
            flash('填写错误，当前您的设备或零件名不对应')
    return render_template('predict_workpiece_index.html', form=form)


@app.route('/templates/predict_for_xiaochechuang.html')
def predict_for_xiaochechuang():
    return render_template('predict_for_xiaochechuang.html')


@app.route('/templates/predict_for_lasercutting.html')
def predict_for_lasercutting():
    return render_template('predict_for_lasercutting.html')


@app.route('/templates/predict_for_computer.html', methods=['GET', 'POST'])
def predict_for_computer():
    return render_template('predict_for_computer.html')


@app.route('/templates/computer_P_image.html')
def computer_P_image():
    return render_template('computer_P_image.html')


@app.route('/setDataI/')  # 这个是电脑yangxu的I的实时图像展示,为路由后台获取数据库数据，不需要返回网页
def setDataI():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = " SELECT I FROM test_computer_yangxu ORDER BY time desc LIMIT 1;"
    cur.execute(sql)
    u = cur.fetchone()
    now = datetime.now().strftime('%H:%M:%S')
    conn.close()
    data = {'time': now, 'data': u}
    return jsonify(data)


@app.route('/templates/computer_I_image.html')
def computer_I_image():
    return render_template('computer_I_image.html')


@app.route('/setDataU/')  # 这个是电脑yangxu的I的实时图像展示,为路由后台获取数据库数据，不需要返回网页
def setDataU():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = " SELECT U FROM test_computer_yangxu ORDER BY time desc LIMIT 1;"
    cur.execute(sql)
    u = cur.fetchone()
    now = datetime.now().strftime('%H:%M:%S')
    conn.close()
    data = {'time': now, 'data': u}
    return jsonify(data)


@app.route('/templates/computer_U_image.html')
def computer_U_image():
    return render_template('computer_U_image.html')


@app.route('/templates/index_new.html')
def ind():
    return render_template('index_new.html')


@app.route('/templates/gangweiquanxian.html')
def gangweiquanxian():
    if current_user.role_s == "admin":
        return redirect(url_for("gangweiquanxianYes"))
    # user = User.query.filter_by(role_s="admin").first()


@app.route('/templates/gangweiquanxianYes.html', methods=['GET', 'POST'])
def gangweiquanxianYes():
    if current_user.role_s == "admin":
        form = Gangweixinxi()
        if form.validate_on_submit():
            user = User.query.filter_by(username=form.username.data).first()
            user.role_s = form.quanxian.data
            db.session.add(user)
            db.session.commit()
            flash('修改成功')
            print(user.role_s)
    else:
        return redirect(url_for("gangweiquanxianNO"))
    return render_template('gangweiquanxianYes.html', form=form)


@app.route('/templates/ganweiquanxianNO.html')
def gangweiquanxianNO():
    return render_template('gangweiquanxianNO.html')


@app.route('/templates/3Dtest.html')
def threeD():
    return render_template('3Dtest.html')


@app.route('/templates/order.html')
def oee():
    return render_template('order.html')


@app.route('/templates/test.html')
def testt():
    return render_template('test.html')


#
# @app.route('/e2/Idata', methods=['GET'])
# def updataI():
#     num = request.args.get('index')
#     c = ReadDate.count(conn, 'cac')
#
#     if int(num) < c:
#         data = ReadDate.readone(conn, 'test', c)
#         stats = ReadDate.readstats(conn, 'cac', c)
#
#         ia = data['ia']
#         ib = data['ib']
#         ic = data['ic']
#         Dtime = data['time']
#         Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
#
#         a = {
#             'flag': 1,
#             'index': c,
#             'ia': ia,
#             'ib': ib,
#             'ic': ic,
#             'time': Dtime,
#             'stats': stats,
#
#         }
#     else:
#         a = {
#             'flag': 0,
#             'index': c,
#         }
#
#     return jsonify(a)
#
#
# @app.route('/e2/Pdata', methods=['GET'])
# def updataP():
#     num = request.args.get('index')
#     c = ReadDate.count(conn, 'cac')
#
#     if int(num) < c:
#         data = ReadDate.readone(conn, 'test', c)
#         stats = ReadDate.readstats(conn, 'cac', c)
#
#         Pa = data['Pa']
#         Pb = data['Pb']
#         Pc = data['Pc']
#         Dtime = data['time']
#         Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
# 
#         a = {
#             'flag': 1,
#             'index': c,
#             'Pa': Pa,
#             'Pb': Pb,
#             'Pc': Pc,
#             'time': Dtime,
#             'stats': stats,
#
#         }
#     else:
#         a = {
#             'flag': 0,
#             'index': c,
#         }
#
#     return jsonify(a)
#
#
# @app.route('/e2/PFdata', methods=['GET'])
# def updataPF():
#     num = request.args.get('index')
#     c = ReadDate.count(conn, 'cac')
#
#     if (int(num) < c):
#         data = ReadDate.readone(conn, 'test', c)
#         stats = ReadDate.readstats(conn, 'cac', c)
#
#         PFa = data['PFa']
#         PFb = data['PFb']
#         PFc = data['PFc']
#         Dtime = data['time']
#         Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
#
#         a = {
#             'flag': 1,
#             'index': c,
#             'PFa': PFa,
#             'PFb': PFb,
#             'PFc': PFc,
#             'time': Dtime,
#             'stats': stats,
#
#         }
#     else:
#         a = {
#             'flag': 0,
#             'index': c,
#         }
#
#     return jsonify(a)
#
#
# @app.route('/e2/Sdata', methods=['GET'])
# def updataS():
#     num = request.args.get('index')
#     c = ReadDate.count(conn, 'cac')
#
#     if (int(num) < c):
#         data = ReadDate.readone(conn, 'test', c)
#         stats = ReadDate.readstats(conn, 'cac', c)
#
#         Sa = data['Sa']
#         Sb = data['Sb']
#         Sc = data['Sc']
#         Dtime = data['time']
#         Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
#
#         a = {
#             'flag': 1,
#             'index': c,
#             'Sa': Sa,
#             'Sb': Sb,
#             'Sc': Sc,
#             'time': Dtime,
#             'stats': stats,
#
#         }
#     else:
#         a = {
#             'flag': 0,
#             'index': c,
#         }
#
#     return jsonify(a)
#
#
# @app.route('/e2/LastN', methods=['GET'])
# def Readlastn():
#     data = ReadDate.readlastn(conn, "test", 20)
#     a = {
#
#         'Data': data,
#     }
#
#     return jsonify(a)
#
#
# @app.route('/3', methods=['GET'])
# def Search():
#     data = ReadDate.readlastn(conn, "test", 20)
#
#
# @app.route('/search', methods=['GET'])
# def Find(conn1=None):
#     name = request.args.get('index')
#     data = ReadDate.readsearch(conn1, name)
#     data_list = []
#     if len(data) > 0:
#         for item in data:
#             con = ReadDate.connecttion(item[0])
#             data_x = ReadDate.machinedata(con)
#             data_y = ReadDate.questiondata(con)
#             data_z = ReadDate.leidata(con)
#             Dtime = data_x['time']
#             Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
#             P = data_x['P']
#             U = data_x['ua']
#             QU = data_y['question']
#             Machine = data_z['machine']
#             XH = data_z['xinghao']
#             a = {
#                 'flag': 1,
#                 'P': P,
#                 'U': U,
#                 'QU': QU,
#                 'time': Dtime,
#                 'Machine': Machine,
#                 'XH': XH,
#             }
#             data_list.append(a)
#     else:
#         a = {
#             'flag': 0,
#         }
#
#         data_list.append(a)
#     return jsonify(data_list)
@app.route('/templates/toolinit.html')
def toolinit():
    return render_template('toolinit.html')


@app.route('/setDataqiefeng/')
def predict_qiefeng():
    data_train = pd.read_csv(
        'D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone/static/data/朱师兄数据初版 - 副本.csv',
        nrows=100, index_col=False)
    # data_train = pd.read_csv(
    #     '/home/nzw/BigDataFlask1/static/data/朱师兄数据初版 - 副本.csv',
    #     nrows=100, index_col=False)
    feature = ['velocity', 'pressure', 'power']
    lable = ['chink', 'ra', 'haz']
    data_train_mean = data_train.mean()
    data_train_std = data_train.std()
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT I,P,V FROM test_computer_yangxu ORDER BY time desc LIMIT 1"
    cur.execute(sql)
    u = cur.fetchone()
    conn.close()
    int_features = [[float(x) for x in u]]
    final_features = int_features
    # final_features = [np.array(int_features)]
    predictionchink1 = (
            model_BP.predict(int_features, batch_size=1) * data_train_std['chink'] + data_train_mean['chink'])
    predictionchink2 = (model_BP.predict(int_features, batch_size=1) * data_train_std['ra'] + data_train_mean['ra'])
    predictionchink3 = (model_BP.predict(int_features, batch_size=1) * data_train_std['haz'] + data_train_mean['haz']) \
                       / 100
    print(predictionchink1)
    output1 = {'data1': predictionchink1.tolist(), 'data2': predictionchink2.tolist(),
               'data3': predictionchink3.tolist()}
    return jsonify(output1)


@app.route('/setDatazhuidu/')
def predict_zhuidu():
    data_train = pd.read_csv(
        'D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone/static/data/朱师兄数据初版 - 副本 - 副本.csv',
        nrows=100, index_col=False)
    # data_train = pd.read_csv(
    #     '/home/nzw/BigDataFlask1/static/data/朱师兄数据初版 - 副本 - 副本.csv',
    #     nrows=100, index_col=False)
    feature = ['velocity', 'pressure', 'power']
    lable = ['chink', 'ra', 'tup']
    data_train_mean = data_train.mean()
    data_train_std = data_train.std()
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT Pa,P,PFc FROM test_yangxu ORDER BY time desc LIMIT 1"
    cur.execute(sql)
    u = cur.fetchone()
    conn.close()
    int_features = [[float(x) for x in u]]
    final_features = int_features
    # final_features = [np.array(int_features)]
    predictionchink1 = (
            model_BP.predict(int_features, batch_size=1) * data_train_std['chink'] + data_train_mean['chink'])
    predictionchink2 = (model_BP.predict(int_features, batch_size=1) * data_train_std['ra'] + data_train_mean['ra'])
    predictionchink3 = (model_BP.predict(int_features, batch_size=1) * data_train_std['tup'] + data_train_mean['tup'])
    print(predictionchink1)
    output1 = {'data1': predictionchink1.tolist(), 'data2': predictionchink2.tolist(),
               'data3': predictionchink3.tolist()}
    return jsonify(output1)


@app.route('/setDatanilongqiou/')
def predict_nilongqiou():
    data_train = pd.read_csv(
        'D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone/static/data/朱师兄数据初版 - 副本.csv',
        nrows=100, index_col=False)
    # data_train = pd.read_csv(
    #     '/home/nzw/BigDataFlask1/static/data/朱师兄数据初版 - 副本.csv',
    #     nrows=100, index_col=False)
    feature = ['velocity', 'pressure', 'power']
    lable = ['chink', 'ra', 'haz']
    data_train_mean = data_train.mean()
    data_train_std = data_train.std()
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT I,P,V FROM xiaochechuang ORDER BY time desc LIMIT 1"
    cur.execute(sql)
    u = cur.fetchone()
    conn.close()
    int_features = [[float(x) for x in u]]
    final_features = int_features
    # final_features = [np.array(int_features)]
    predictionchink1 = (
            model_BP.predict(int_features, batch_size=1) * data_train_std['chink'] + data_train_mean['chink'])
    predictionchink2 = (model_BP.predict(int_features, batch_size=1) * data_train_std['ra'] + data_train_mean['ra'])
    predictionchink3 = (model_BP.predict(int_features, batch_size=1) * data_train_std['haz'] + data_train_mean['haz']) \
                       / 100
    # print(predictionchink1)
    output1 = {'data1': predictionchink1.tolist(), 'data2': predictionchink2.tolist(),
               'data3': predictionchink3.tolist()}
    return jsonify(output1)


@app.route('/pre_jieduan_chechuang/')
def pre_jieduan_chechuang():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', port=3306, db='threephase', charset='utf8')
    cur = conn.cursor()
    cur.execute("SELECT P FROM xiaochechuang ORDER BY time desc LIMIT 1")
    data = cur.fetchone()
    cur.close()
    data1 = [[float(a) for a in data]]
    # print(data1)
    jieduan = KNN.predict(data1)
    print(jieduan)
    # print(jieduan.tolist())
    chechuang = {'data1': jieduan.tolist()}
    return jsonify(chechuang)


@app.route('/setData/')  # 路由
def setData():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = " SELECT P FROM test_computer_yangxu ORDER BY time desc LIMIT 1;"
    cur.execute(sql)
    u = cur.fetchone()
    a = int(u[0])
    # if a > 35:
    #     winsound.Beep(1200, 4000)
    now = datetime.now().strftime('%H:%M:%S')
    conn.close()
    data = {'time': now, 'data': u}
    return jsonify(data)


@app.route('/setDataP/')  # 这个是电脑P的实时图像展示,为路由后台获取数据库数据，不需要返回网页
def setDataP():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = " SELECT I,U,P FROM test_computer_yangxu ORDER BY time desc LIMIT 1;"
    cur.execute(sql)
    a = cur.fetchone()
    i = a[0]
    u = a[1]
    p = a[2]
    now = datetime.now().strftime('%H:%M:%S')
    conn.close()
    print(now)
    data1 = {'time': now, 'data1': u, 'data2': i, 'data3': p}
    return jsonify(data1)


@app.route('/setDatalasercutting/')  # 这个是电脑P的实时图像展示,为路由后台获取数据库数据，不需要返回网页
def setDatalasercutting():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT ua,ia,P,Pa,Sa,PFa FROM test_yangxu ORDER BY time desc LIMIT 1"
    cur.execute(sql)
    a = cur.fetchone()
    cur.close()
    ua = a[0]
    ia = a[1]
    p = a[2]
    pa = a[3]
    sa = a[4]
    pfa = a[5]
    now = datetime.now().strftime('%H:%M:%S')
    conn.close()
    print(now)
    data1 = {'time': now, 'data1': ua, 'data2': ia, 'data3': p, 'data4': pa, 'data5': sa, 'data6': pfa}
    return jsonify(data1)


@app.route('/setDataoptcom/', methods=['GET', 'POST'])
def setDataoptcom():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = " SELECT velocity,pressure,power,chink,ra,tup FROM fakedata_zhu"
    cur.execute(sql)
    a = cur.fetchone()
    conn.close()
    v = a[0]
    p = a[1]
    po = a[2]
    c = a[3]
    t = a[4]
    tup = a[5]
    return render_template('opt_for_computer.html', v=v, p=p, po=po, c=c, t=t, tup=tup)


@app.route('/setData2/')  # 路由
def setData2():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    cur = conn.cursor()
    sql = " SELECT I,U,P FROM test_computer_yangxu ORDER BY time desc LIMIT 1;"
    cur.execute(sql)
    a = cur.fetchone()
    i = a[0]
    u = a[1]
    p = a[2]
    now = datetime.now().strftime('%H:%M:%S')
    # print(i)
    # print(u)
    # print(v)
    conn.close()
    print(now)
    data2 = {'time': now, 'data1': u, 'data2': i, 'data3': p}
    return jsonify(data2)


# 实时电流
# @app.route('/e/I', methods=['GET'])
# def I():
#     data = request.args.get('index')
#     U = request.args.get('ua')
#     a = ReadDate.readone(conn, 'n100', int(data) + 1)
#     u = a['ia']
#     Dtime = a['time']
#     index = a['num']
#     Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
#     a = {
#         'index': index,
#         'ua': u,
#         'time': Dtime,
#     }
#
#     return jsonify(a)


# 实时电压
@app.route('/e/U', methods=['GET'])
def U():
    data = request.args.get('index')
    U = request.args.get('ua')
    a = ReadDate.readone(conn, 'n100', int(data) + 1)
    u = a['ua']
    Dtime = a['time']
    index = a['num']
    Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
    a = {
        'index': index,
        'ua': u,
        'time': Dtime,
    }

    return jsonify(a)


# 实时功率
# @app.route('/e/S', methods=['GET'])
# def S():
#     data = request.args.get('index')
#     U = request.args.get('ua')
#     a = ReadDate.readone(conn, 'n100', int(data) + 1)
#     u = a['S']
#     Dtime = a['time']
#     index = a['num']
#     Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
#     a = {
#         'index': index,
#         'ua': u,
#         'time': Dtime,
#     }
#
#     return jsonify(a)


# 实时功率因素
# @app.route('/e/PF', methods=['GET'])
# def PF():
#     data = request.args.get('index')
#     U = request.args.get('ua')
#     a = ReadDate.readone(conn, 'n100', int(data) + 1)
#     u = a['PF']
#     Dtime = a['time']
#     index = a['num']
#     Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
#     a = {
#         'index': index,
#         'ua': u,
#         'time': Dtime,
#     }
#
#     return jsonify(a)


@app.route('/templates/e_parm2.html', methods=['GET'])
def showE2():
    return render_template('e_parm2.html')


@app.route('/s1', methods=['GET'])
def Search1():
    return render_template('search.html')


@app.route('/e2/I', methods=['GET'])
def showI():
    return render_template('e_parm2_forI.html')


@app.route('/e2/P', methods=['GET'])
def showP():
    return render_template('e_parm2_forPh.html')


@app.route('/e2/PF', methods=['GET'])
def showPF():
    return render_template('e_parm2_forPs.html')


@app.route('/e2/S', methods=['GET'])
def showS():
    return render_template('e_parm2_forS.html')


@app.route('/e2', methods=['GET'])
def showE21():
    return render_template('e_parm2.html')


@app.route('/e2/U', methods=['GET'])
def updataU():
    num = request.args.get('index')
    c = ReadDate.count(conn, 'cac')

    if int(num) < c:
        data = ReadDate.readone(conn, 'test', c)
        stats = ReadDate.readstats(conn, 'cac', c)
        print(stats['avg_PFc'])
        ua = data['ua']
        ub = data['ub']
        uc = data['uc']
        Dtime = data['time']
        Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
        a = {
            'flag': 1,
            'index': c,
            'ua': ua,
            'ub': ub,
            'uc': uc,
            'time': Dtime,
            'stats': stats,

        }
    else:
        a = {
            'flag': 0,
            'index': c,
        }

    return jsonify(a)


@app.route('/templates/predict_lasercutting', methods=['POST'])
def predict_lasercutting():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='data_catch', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT A相电压,A相电流,总有功功率,A相有功功率,A相视在功率,A相功率因素 FROM firstxichuang ORDER BY 时间 desc LIMIT 1"
    cur.execute(sql)
    u = cur.fetchone()
    print(u)
    conn.close()
    int_features = [float(x) for x in u]
    final_features = [np.array(int_features)]
    prediction = model2_lasercutting_q1.predict(final_features)
    output = round(prediction[0], 4)
    return render_template('predict_for_lasercutting.html', prediction_text='切缝宽度为 :{}mm'
                           .format(output), prediction_text1='表面粗糙度为 :{:.4f}Rz'.format(output - 0.22821),
                           prediction_text2='热影响区为 :{:.4f}mm'.format(output - 0.46215))


@app.route('/templates/predict_computer', methods=['POST'])
def predict_computer():
    # data_train = pd.read_csv(
    #     'D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone/static/data/朱师兄数据初版 - 副本.csv',
    #     nrows=100, index_col=False)
    # feature = ['velocity', 'pressure', 'power']
    # lable = ['chink', 'ra', 'haz']
    # data_train_mean = data_train.mean()
    # data_train_std = data_train.std()
    # conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='threephase', charset='utf8')
    # cur = conn.cursor()
    # sql = "SELECT I,P,V FROM test_computer_yangxu ORDER BY time desc LIMIT 1"
    # cur.execute(sql)
    # u = cur.fetchone()
    # conn.close()
    # int_features = [[float(x) for x in u]]
    # final_features = int_features
    # # final_features = [np.array(int_features)]
    # predictionchink = model_BP.predict(int_features,batch_size=1)*data_train_std['chink']+data_train_mean['chink']
    # print(predictionchink)
    return render_template('predict_for_computer.html')


def demo_func_chink(x):
    x1, x2, x3 = x
    y = 240.995 + 9.4079 * x1 - 72.875 * x2 - 0.034 * x3
    return y


@app.route('/psochink', methods=['GET', 'POST'])
def psochink():
    model = PSO(func=demo_func_chink, n_dim=3, pop=300, max_iter=1100, lb=[0.4, 0.5, 60], ub=[1.6, 2.5, 100], w=0.1,
                c1=0.3,
                c2=0.4)
    model.run()
    x = model.gbest_x
    x1 = np.round(x[0], 4)
    x2 = np.round(x[1], 4)
    x3 = np.round(x[2], 4)

    y = model.gbest_y
    y = np.round(y, 4)
    print(y)
    # data1 = {'data1': x1, 'data2': x2, 'data3': x3, 'data4': y[0]}
    # print(data1)
    print('best_x is ', model.gbest_x, 'best_y is', model.gbest_y)
    return render_template('opt_for_computer.html', x1=x1, x2=x2, x3=x3, y=y)


def demo_func_haz(x):
    x1, x2, x3 = x
    y = 830.98 + 31.259 * x1 - 255.207 * x2 - 0.8623 * x3
    return y


@app.route('/psohaz', methods=['GET', 'POST'])
def psohaz():
    model = PSO(func=demo_func_haz, n_dim=3, pop=300, max_iter=1100, lb=[0.4, 0.5, 60], ub=[1.6, 2.5, 100], w=0.1,
                c1=0.3,
                c2=0.4)
    model.run()
    x = model.gbest_x
    x4 = np.round(x[0], 4)
    x5 = np.round(x[1], 4)
    x6 = np.round(x[2], 4)
    y1 = model.gbest_y
    y1 = np.round(y1, 4)
    print(y1)
    # data1 = {'data1': x1, 'data2': x2, 'data3': x3, 'data4': y[0]}
    # print(data1)
    print('best_x is ', model.gbest_x, 'best_y is', model.gbest_y)
    return render_template('opt_for_computer.html', x4=x4, x5=x5, x6=x6, y1=y1)


@app.route('/templates/opt_for_computer.html', methods=['GET', 'POST'])
def psochinknormal():
    return render_template('opt_for_computer.html')


def demo_func_ra(x):
    x1, x2, x3 = x
    y = 245 + 9.8215 * x1 - 72.933 * x2 - 0.107 * x3
    return y


@app.route('/psora', methods=['GET', 'POST'])
def psora():
    model = PSO(func=demo_func_ra, n_dim=3, pop=300, max_iter=1100, lb=[0.4, 0.5, 60], ub=[1.6, 2.5, 100], w=0.1,
                c1=0.3,
                c2=0.4)
    model.run()
    x = model.gbest_x
    x7 = np.round(x[0], 4)
    x8 = np.round(x[1], 4)
    x9 = np.round(x[2], 4)
    y2 = model.gbest_y
    y2 = np.round(y2, 4)
    print(y2)
    # data1 = {'data1': x1, 'data2': x2, 'data3': x3, 'data4': y[0]}
    # print(data1)
    print('best_x is ', model.gbest_x, 'best_y is', model.gbest_y)
    return render_template('opt_for_computer.html', x7=x7, x8=x8, x9=x9, y2=y2)


def demo_func_critic(x):
    x1, x2, x3 = x
    y = 497.211 + 18.957 * x1 - 151.7895 * x2 - 0.17717 * x3
    return y


@app.route('/psocritic', methods=['GET', 'POST'])
def psocritic():
    model = PSO(func=demo_func_critic, n_dim=3, pop=300, max_iter=1100, lb=[0.4, 0.5, 60], ub=[1.6, 2.5, 100], w=0.1,
                c1=0.3,
                c2=0.4)
    model.run()
    x = model.gbest_x
    x10 = np.round(x[0], 4)
    x11 = np.round(x[1], 4)
    x12 = np.round(x[2], 4)
    y3 = model.gbest_y
    y3 = np.round(y3, 4)
    print(y3)
    # data1 = {'data1': x1, 'data2': x2, 'data3': x3, 'data4': y[0]}
    # print(data1)
    print('best_x is ', model.gbest_x, 'best_y is', model.gbest_y)
    return render_template('opt_for_computer.html', x10=x10, x11=x11, x12=x12, y3=y3)


@app.route('/setDatachechuang/', methods=['GET', 'POST'])
def setDatachechuang():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', database='threephase', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT I,U,P FROM xiaochechuang ORDER BY time desc LIMIT 1;"
    cur.execute(sql)
    a = cur.fetchone()
    i = a[0]
    u = a[1]
    p = a[2]
    now = datetime.now().strftime('%H:%M:%S')
    conn.close()
    data1 = {'time': now, 'data1': u, 'data2': i, 'data3': p}
    return jsonify(data1)


@app.route('/templates/mechine1.html')
def mechine1():
    return render_template('mechine1.html')


@app.route('/templates/nianzhiwei.html')
def nianzhiwei():
    return render_template('index.html')


@app.route('/diannaoshujudaochu.html')
def diannao():
    cur = conn.cursor()
    # get annual sales rank
    sql = "select * from test_computer_yangxu where U>240"
    cur.execute(sql)
    contenty = cur.fetchall()
    # 获取表头
    sql = "SHOW FIELDS FROM test_computer_yangxu"
    cur.execute(sql)
    labels = cur.fetchall()
    labels = [l[0] for l in labels]
    return render_template('diannaoshujudaochu.html', labels=labels, content=contenty)


@app.route('/xiaochechuangdaochu.html')
def xiaochechuangdaochu():
    cur = conn.cursor()
    # get annual sales rank
    sql = "select * from xiaochechuang where U>238"
    cur.execute(sql)
    contenty = cur.fetchall()
    # 获取表头
    sql = "SHOW FIELDS FROM xiaochechuang"
    cur.execute(sql)
    labels = cur.fetchall()
    labels = [l[0] for l in labels]
    return render_template('xiaochechuangdaochu.html', labels=labels, content=contenty)


@app.route('/jiguangshujudaochu.html')
def jiguangshujudaochu():
    cur = conn.cursor()
    # get annual sales rank
    sql = "select * from test_yangxu where P>850"
    cur.execute(sql)
    contenty = cur.fetchall()
    # 获取表头
    sql = "SHOW FIELDS FROM test_yangxu"
    cur.execute(sql)
    labels = cur.fetchall()
    labels = [l[0] for l in labels]
    return render_template('jiguangshujudaochu.html', labels=labels, content=contenty)


@app.route('/xichuangshujudaochu.html')
def xichuangshujudaochu():
    cur = conn.cursor()
    # get annual sales rank
    sql = "select * from test_copy1 where P>600"
    cur.execute(sql)
    contenty = cur.fetchall()
    # 获取表头
    sql = "SHOW FIELDS FROM test_copy1"
    cur.execute(sql)
    labels = cur.fetchall()
    labels = [l[0] for l in labels]
    return render_template('xichuangshujudaochu.html', labels=labels, content=contenty)


@app.route('/templates/yichangshuju.html', methods=['GET', 'POST'])
def yichangshuju():
    form = Yichangshujudaochu()
    query_name = form.query_name.data
    query_type = form.query_type.data
    if form.validate_on_submit():
        if query_name == '激光切割机' and query_type == 'ZT-J-6060M':
            return redirect(url_for('jiguangshujudaochu'))
        elif query_name == '立式加工中心' and query_type == 'VMC850E':
            return redirect(url_for('xichuangshujudaochu'))
        elif query_name == '上海同琛小车床' and query_type == 'V210':
            return redirect(url_for('xiaochechuangdaochu'))
        else:
            flash('无此型号设备,请返回设备修改信息中查看')
    return render_template('yichangshuju.html', form=form)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
