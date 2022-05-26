from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextField, DateField
from flask_admin.form.widgets import DatePickerWidget
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Workpiece_unusual_count(FlaskForm):
    date1 = DateField('按日/周查询起始时间', default='', format='%Y/%m/%d', widget=DatePickerWidget())
    date2 = DateField('按日/周查询终止时间', default='', format='%Y/%m/%d', widget=DatePickerWidget())
    date3 = DateField('按月查询起始时间', default='', format='%Y/%m', widget=DatePickerWidget())
    date4 = DateField('按月查询终止时间', default='', format='%Y/%m', widget=DatePickerWidget())
    submit = SubmitField('查询')
