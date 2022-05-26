import lightgbm as lgb
import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
import pickle

data_train = pd.read_csv('D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone/static/data/'
                         'datacatchcomputer.csv', nrows=724, index_col=False)

data_test = pd.read_csv('D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone/static/data/'
                        'datacatchcomputer.csv', nrows=300, index_col=False)
x_train = data_train.loc()[:, ['平均电压', '平均电流', '总有功功率', '总功率因素']]
y_train = data_train.loc()[:, ['工件质量']]
print(x_train)
x_test = data_test.loc[:, ['平均电压', '平均电流', '总有功功率', '总功率因素']]
y_test = data_test.loc[:, ['工件质量']]

# x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 0.3)

lgb_train = lgb.Dataset(x_train, y_train)

lgb_eval = lgb.Dataset(x_test, y_test, reference=lgb_train)

params = {
    'boosting_type': 'gbdt',
    'objective': 'regression',
    'metric': {'l2', 'auc'},
    'num_leaves': 5,
    'learning_rate': 0.05,
    'feature_fraction': 0.9,
    'bagging_fraction': 0.8,
    'bagging_freq': 5,
    'verbose': 0
}
print('Starting training...')

gbm = lgb.train(params,
                lgb_train,
                num_boost_round=22,
                valid_sets=lgb_eval,
                early_stopping_rounds=5)
print('Saving model...')
# 模型保存
gbm.save_model('model.txt')
# 模型加载
gbm = lgb.Booster(model_file='model.txt')
# 模型预测
y_pred = gbm.predict(x_test, num_iteration=gbm.best_iteration)
# 模型评估

print('The rmse of prediction is:', mean_squared_error(y_test, y_pred) ** 0.5)  # rmse是均方根差
pickle.dump(gbm, open('model1.pkl', 'wb'))  # 模型序列化 序列化到指定文件,序列化的意思是把模型以二进制保存到磁盘中
# model = pickle.load(open('model1.pkl', 'rb'))  # 反序列化输出到控制台
# print(model.predict([[235, 2.3, 18, 0.5]]))
