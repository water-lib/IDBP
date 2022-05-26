import pickle

from keras.models import Sequential
from keras.layers.core import Dense, Activation
from tensorflow.python.keras import layers, models
import pandas as pd
from keras.models import load_model

data_train = pd.read_csv(
    'D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone/static/data/朱师兄数据初版 - 副本 - 副本.csv',
    nrows=100, index_col=False)
data_test = pd.read_csv(
    'D:/2021-1-23/大数据项目/BigData_Phone1/BigData_Phone/static/data/朱师兄数据初版 - 副本 - 副本.csv',
    nrows=30, index_col=False)
feature = ['velocity', 'pressure', 'power']
lable = ['chink', 'ra', 'tup']
data_train_mean = data_train.mean()
data_train_std = data_train.std()
data_train = (data_train - data_train_mean) / data_train_std
x_train = data_train[feature].values
y_train = data_train[lable].values
data_test_mean = data_test.mean()
data_test_std = data_test.std()
data_test = (data_test - data_test_mean) / data_test_std
x_test = data_test[feature].values
y_test = data_test[lable].values
model = Sequential()
model.add(Dense(6, input_dim=3, kernel_initializer='uniform'))
model.add(Activation('sigmoid'))
model.add(Dense(1, input_dim=6))
model.compile(loss='mean_squared_error', optimizer='sgd')
model.fit(x_train, y_train, epochs=100, batch_size=1)
model.save('BP_model2.h5')
BP = load_model('BP_model2.h5')
# model.save_weights(modelfile)  # 保存模型权重
x = ((data_test[feature] - data_test_mean[feature]) / data_test_std[feature]).values
data_pred1 = model.predict(x_test, batch_size=1) * data_test_std['chink'] + data_test_mean['chink']
data_pred2 = model.predict(x_test, batch_size=1) * data_test_std['ra'] + data_test_mean['ra']
data_pred3 = model.predict(x_test, batch_size=1) * data_test_std['tup'] + data_test_mean['tup']
print(data_pred1)
print(data_pred2)
print(data_pred3)
