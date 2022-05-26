import lightgbm as lgb
import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
import pickle

data_train = pd.read_csv(
    'D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone/static/data/firstxichuang_copy1_lasercutting.csv',
    nrows=450, index_col=False)

data_test = pd.read_csv(
    'D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone/static/data/firstxichuang_copy1_lasercutting.csv',
    nrows=270, index_col=False)
print(data_test)
x_train = data_train.loc()[:, ['A相电压', 'A相电流', '总有功功率', 'A相有功功率', 'A相视在功率',
                               'A相功率因素']]
y_train = data_train.loc()[:, ['工件质量']]

x_test = data_test.loc()[:, ['A相电压', 'A相电流', '总有功功率', 'A相有功功率', 'A相视在功率',
                             'A相功率因素']]
y_test = data_test.loc()[:, ['工件质量']]
print(y_test)

lgb_train = lgb.Dataset(x_train, y_train)

lgb_eval = lgb.Dataset(x_test, y_test, reference=lgb_train)

params = {
    'boosting_type': 'gbdt',
    'objective': 'regression',
    'metric': {'l2', 'auc'},
    'num_leaves': 10,
    'learning_rate': 0.05,
    'feature_fraction': 0.9,  # 每棵树训练之前选择90%的特征
    'bagging_fraction': 0.8,  # 类似于feature_fraction，加速训练，处理过拟合
    'bagging_freq': 5,
    'verbose': 0
}

gbm = lgb.train(params,
                lgb_train,
                num_boost_round=5000,
                valid_sets=lgb_eval,
                early_stopping_rounds=50)

# 　把模型保存在本地磁盘，随时调用
gbm.save_model('model_lasercutting.txt')  # 相当于pickel.dump序列化
gbm = lgb.Booster(model_file='model_lasercutting.txt')  # 相当于pickel.load反序列化
y_pred = gbm.predict(x_test, num_iteration=gbm.best_iteration)
print(y_pred)
print('The rmse of prediction is:', mean_squared_error(y_test, y_pred) ** 0.5)  # rmse是均方根差
pickle.dump(gbm, open('model_lasercutting.pkl', 'wb'))
pickle.load(open('model_lasercutting.pkl', 'rb'))
