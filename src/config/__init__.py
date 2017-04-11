import os
from settings import *

if os.getenv('ENV') in ('prod', 'production'):
    from prod import *
