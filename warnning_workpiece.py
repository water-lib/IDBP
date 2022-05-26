from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Warnning_workpiece_index(FlaskForm):
    query_name = SelectField('请输入您要查看实时数据的设备名：', validators=[DataRequired()]
                             , choices=[('上海同琛小车床', '上海同琛小车床')])
    query_type = SelectField('请输入当前出现异常生产时的设备型号：', validators=[DataRequired()],
                             choices=[('V210', 'V210')])
    query_workpiece = SelectField('对应加工的零件名：', validators=[DataRequired()]
                                  , choices=[('轴承球', '轴承球')])
    # query_workpiece = SelectField('对应加工的零件名：', validators=[DataRequired()]
    #                               , choices=[('轴承座', '轴承座'), ('CFRP板材', 'CFRP板材'), ('HONOR', 'HONOR')])
    submit = SubmitField('确认')
