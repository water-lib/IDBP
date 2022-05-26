from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Predict_workpiece_index(FlaskForm):
    query_name = SelectField('请输入您要加工并实现此工件实时质量预测的设备名：', validators=[DataRequired()],
                             choices=[('上海同琛车床','上海同琛车床')])
    query_workpiece = SelectField('对应加工的零件名：', validators=[DataRequired()]
                                  , choices=[('轴承球', '轴承球')])
    submit = SubmitField('确认')
