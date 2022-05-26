# client 客户端
# TCP必须建立连接
import socket   #导入模块
# SOCK_STREAM---TCP协议方式
# AF_INET----我的是ipv4地址
#1,创建socket对象：指定传输协议
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
#2，建立连接发送连接请求  ip地址和端口号
s.connect(('127.0.0.1',10001))
s.send("你好".encode()) #只能发送字节流需要用encode转码字符串成字节