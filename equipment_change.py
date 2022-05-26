from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Equipment_change(FlaskForm):
    id = StringField('您当前要修改设备信息的设备ID号为：', validators=[DataRequired()])
    name = StringField('设备名修改为：')
    esuit = StringField('设备型号修改为')
    pr = StringField('额定电压修改为：')
    pa = StringField('厂商联系方式修改为：')
    submit = SubmitField('确认修改')
