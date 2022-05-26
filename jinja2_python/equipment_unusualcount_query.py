from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectMultipleField, SelectField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Equipment_unusualcount_query(FlaskForm):
    query_name = SelectField('请输入当前出现异常生产时的设备名：', validators=[DataRequired()]
                             , choices=[('立式加工中心', '立式加工中心'), ('激光切割机', '激光切割机'), ('上海同琛小车床', '上海同琛小车床')])
    query_type = SelectField('请输入当前出现异常生产时的设备型号：', validators=[DataRequired()]
                             , choices=[('VMC850E', 'VMC850E'), ('ZT-J-6060M', 'ZT-J-6060M'), ('V210', 'V210')])
    # query_name = StringField('请输入当前出现异常生产时的设备名：',validators=[DataRequired()])
    # query_type = StringField('请输入当前出现异常生产时的设备型号：',validators=[DataRequired()])
    submit = SubmitField('查询')
