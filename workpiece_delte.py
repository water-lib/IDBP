from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Workpiece_delte(FlaskForm):
    id = StringField('请输入您要删除工件的ID号：', validators=[DataRequired(), EqualTo("id2", message='输入的ID号不一致')])
    id2 = StringField('请再次输入您要删除工件的ID号：', validators=[DataRequired()])
    submit = SubmitField('确认删除')
