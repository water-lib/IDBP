from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Orders_change(FlaskForm):
    id = StringField('您当前要修改订单信息的订单ID号为：', validators=[DataRequired()])
    name = StringField('订单名修改为：')
    ptype = StringField('订单类型修改为：')
    alterp = StringField('备用产品修改为：')
    deliverydate = StringField('交货日期修改为：')
    ordersnum = StringField('订单数量修改为：')
    orderstate = StringField('加工状态修改为：')
    submit = SubmitField('确认修改')
