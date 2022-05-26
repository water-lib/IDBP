from flask import request, jsonify
from jinja2_python import ReadDate
from datetime import timedelta
import os
from flask import Flask, render_template, redirect, url_for, flash
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, BooleanField
from wtforms.validators import DataRequired
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager
from werkzeug.security import generate_password_hash, check_password_hash

# from NetGate import conn

basedir = os.path.abspath(os.path.dirname(__file__))
print(basedir)
app = Flask(__name__)
login = LoginManager(app)
bootstrap = Bootstrap(app)
moment = Moment(app)
app.config['SECRET_KEY'] = 'hard to guess string'
# app.config['SQLALCHEMY_DATABASE_URI'] = \
#      'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:123456@127.0.0.1:3306/loginfo'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
data = ['one', 'two', 'three', 'four']
# 连接数据库
# conn = ReadDate.connect()
# conn1 = ReadDate.connect1()
# conn2 = ReadDate.connect2()
# 每隔1秒清楚缓存
app.config['DEBUG'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)
db = SQLAlchemy(app)


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
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))

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


class LoginForm(FlaskForm):
    name = StringField('username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Log in')
    remember_me = BooleanField('Keep me Log in')


# 首页
@app.route('/')
def head():
    return render_template('index.html')


# 历史能耗
@app.route('/history_energy_consumption.html')
def history():
    return render_template('history_energy_consumption.html')


# 测试页面
@app.route('/t')
def test():
    return render_template('test.html')


# 机床页面
@app.route('/templates/mechine.html')
def Machin1():
    return render_template('mechine.html')


@app.route('/templates/mechine_skc1.html')
def Machin2():
    return render_template('mechine_skc1.html')


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


@app.route('/templates/xiugaimima.html')
def mima():
    return render_template('xiugaimima.html')


@app.route('/templates/Login_modify.html', methods=['GET', 'POST'])
def log():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.name.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            next = request.args.get('next')
            if next is None or not next.startwith('/'):
                next = url_for('index.html')
            return redirect(next)
        flash("Invalid password or name.")
    return render_template("Login_modify.html", form=form)


@app.route('/templates/index.html')
def ind():
    return render_template('index.html')


@app.route('/templates/3Dtest.html')
def threeD():
    return render_template('3Dtest.html')




@app.route('/templates/test.html')
def testt():
    return render_template('test.html')


# 实时电流
@app.route('/e/I', methods=['GET'])
def I():
    data = request.args.get('index')
    U = request.args.get('ua')
    a = ReadDate.readone(conn, 'n100', int(data) + 1)
    u = a['ia']
    Dtime = a['time']
    index = a['num']
    Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
    a = {
        'index': index,
        'ua': u,
        'time': Dtime,
    }

    return jsonify(a)


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


@app.route('/templates/search.html', methods=['GET'])
def Search1():
    return render_template('search.html')


@app.route('/templates/e_parm2_forI.html', methods=['GET'])
def showI():
    return render_template('e_parm2_forI.html')


@app.route('/templates/e_parm2_forPh.html', methods=['GET'])
def showP():
    return render_template('e_parm2_forPh.html')


@app.route('/templates/e_parm2_forPs.html', methods=['GET'])
def showPF():
    return render_template('e_parm2_forPs.html')


@app.route('/templates/e_parm2_forS.html', methods=['GET'])
def showS():
    return render_template('e_parm2_forS.html')


# @app.route('/e2/U', methods=['GET'])
# def updataU():
#     num = request.args.get('index')
#     c = ReadDate.count(conn, 'cac')
#
#     if int(num) < c:
#         data = ReadDate.readone(conn, 'test', c)
#         stats = ReadDate.readstats(conn, 'cac', c)
#         print(stats['avg_PFc'])
#         ua = data['ua']
#         ub = data['ub']
#         uc = data['uc']
#         Dtime = data['time']
#         Dtime = Dtime.strftime('%Y-%m-%d %H:%M:%S.%f')
#
#         a = {
#             'flag': 1,
#             'index': c,
#             'ua': ua,
#             'ub': ub,
#             'uc': uc,
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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
