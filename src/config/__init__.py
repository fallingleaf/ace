from settings import *

try:
    from prod import *
except ImportError:
    pass
