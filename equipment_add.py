from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Equipmentaddform(FlaskForm):
    name = StringField('设备名称', validators=[DataRequired()])
    etype = StringField('设备型号', validators=[DataRequired()])
    pr = StringField('额定电压', validators=[DataRequired()])
    pa = StringField('厂商联系方式', validators=[DataRequired()])
    submit = SubmitField('确认')
