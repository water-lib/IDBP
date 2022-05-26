from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Gangweixinxi(FlaskForm):
    username = StringField('请输入您要修改权限信息的用户名：', validators=[DataRequired()])
    quanxian = StringField('请输入您要修改的权限：', validators=[DataRequired()])
    submit = SubmitField('确认')