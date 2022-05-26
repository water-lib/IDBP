import socket
#1创建socket对象
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)  #必须和客户端保持一致
#2，需要自己绑定一个ip地址和端口号
s.bind(('127.0.0.1',10001))
#3，服务端监听操作时刻注意是否有客户端请求发来
s.listen(3)   #可以同时监听3个，但是这里只有一个客户请求，因为没有写多线程
#4,同意连接请求
s1,addr=s.accept()   #s是服务端的socket对象s1是接入的客户端socket对象
print(addr)
#5，revice接收数据
data=s1.recv(1024)  #设定一次可以接收1024字节大小
print(data.decode())
