from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Workpieceaddform(FlaskForm):
    name = StringField('工件名称', validators=[DataRequired()])
    wtype = StringField('工件类型', validators=[DataRequired()])
    wmaterial = StringField('工件材质', validators=[DataRequired()])
    wnumber = StringField('工件数量', validators=[DataRequired()])
    equipment = StringField('加工设备', validators=[DataRequired()])
    crft = StringField('生产工艺', validators=[DataRequired()])
    submit = SubmitField('确认')
