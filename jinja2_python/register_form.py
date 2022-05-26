from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError

from app import User


class RegistrationForm(FlaskForm):
    username = StringField('username', validators=[
        DataRequired(), Length(1, 64)])
    # username = StringField('username', validators=[
    #     DataRequired(), Length(1, 64),
    #     Regexp('^[A-Za-z][A-Za-z0-9_.]*$', 0, 'Usernames must have only letters,numbers,'
    #                                           'dots or underscores')])
    password = PasswordField('password', validators=[DataRequired(),
                                                     EqualTo('password2', message='密码不一致')])
    password2 = PasswordField('再次输入密码', validators=[DataRequired()])
    role_s = StringField('权限', validators=[DataRequired()])
    location = StringField('地点', validators=[DataRequired()])
    phonenumber = StringField('电话号码', validators=[DataRequired()])
    introduce = TextField('自我介绍',validators=[DataRequired()])
    submit = SubmitField('注册')

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('当前用户名已存在')
