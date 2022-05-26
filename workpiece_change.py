from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import Regexp, Length, DataRequired, EqualTo, ValidationError


class Workpiece_change(FlaskForm):
    id = StringField('您当前要修改工件信息的工件ID号为：', validators=[DataRequired()])
    name = StringField('工件名修改为：')
    wtype = StringField('工件类型修改为：')
    wmaterial = StringField('工件材料修改为：')
    wnumber = StringField('加工数量修改为：')
    equipment = StringField('加工设备修改为：')
    crft = StringField('加工工艺修改为：')
    commit = SubmitField('确认修改')
