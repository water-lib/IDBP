from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Opti_workpiece_index(FlaskForm):
    query_name = SelectField('请输入您要加工并实现此工件实时质量优化的设备名：', validators=[DataRequired()],
                             choices=[('激光切割机', '激光切割机')])
    query_workpiece = SelectField('对应加工的零件名：', validators=[DataRequired()]
                                  , choices=[('6×6mm板', '6×6mm板')])
    submit = SubmitField('确认')
