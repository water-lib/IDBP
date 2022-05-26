import numpy as py
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.cluster import KMeans
import pickle
file = pd.read_csv("../test2.csv", encoding='gb2312')
file1 = pd.read_csv("../test2_test.csv", encoding='gb2312')
xtrain = file["功率"].values.reshape(-1, 1)
# print(xtrain)
ytrain = file["加工阶段"]
xtest = file1["功率"].values.reshape(-1, 1)
ytest = file1["加工阶段"]
# model1 = KMeans(n_clusters=4)
# model1.fit(xtrain)
# pre1 = model1.predict(xtest)
# print(pre1)
KNN = KNeighborsClassifier(n_neighbors=1)
KNN.fit(xtrain, ytrain)
pickle.dump(KNN, open('KNN_jieduan.pkl', 'wb'))
model = pickle.load(open('KNN_jieduan.pkl', 'rb'))
pre = model.predict(xtest)
print(pre)
# pre = KNN.predict(xtest)
# # print(pre)
# flag = 0
# for i in range(len(pre)):
#     a = pre[i] - ytest[i]
#     if a == 0:
#         flag += 1
# print("正确率为："+str(flag/len(pre)))

# print(ytest)
