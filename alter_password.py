from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError

from app import User


class ChangedPwd(FlaskForm):
    username = StringField('用户名', validators=[DataRequired()])
    oldpassword = PasswordField('旧密码', validators=[DataRequired()])
    newpassword = PasswordField('新密码', validators=[DataRequired(),EqualTo('newpassword2',message='密码不一致')])
    newpassword2 = PasswordField('确认新密码', validators=[DataRequired()])
    submit = SubmitField('修改密码', validators=[DataRequired()])

    def validate_username(self, field):
        if not User.query.filter_by(username=field.data).first():
            raise ValidationError('用户名不存在')

