from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Orders_add(FlaskForm):
    name = StringField('订单名称', validators=[DataRequired()])
    ptype = StringField('订单类型', validators=[DataRequired()])
    alterp = StringField('备用产品', validators=[DataRequired()])
    deliveydate = StringField('交货日期', validators=[DataRequired()])
    ordersnum = StringField('订单数量', validators=[DataRequired()])
    orderstate = StringField('订单状态', validators=[DataRequired()])
    submit = SubmitField('确认')
