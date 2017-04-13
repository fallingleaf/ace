from settings import *

try:
    from prod import *
except ImportError as e:
    print e.message
    pass
