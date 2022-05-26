import multiprocessing

preload_app = True

bind= "0.0.0.0:5000"

workers = multiprocessing.cpu_count()*2+1

threads = multiprocessing.cpu_count()*2

backlog = 2048

worker_class = "gevent"

worker_connections = 1200

proc_name = 'gunicorn.pid'

pidfile = 'app_run.log'

loglevel = 'debug'

logfile = 'debug.log'

accesslog = 'access.log'

access_log_format = '%(h)s %(t)s %(U)s %(q)s'