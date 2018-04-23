import config from '../../config'

export var API_PATH = (process.env.NODE_ENV === 'production') ? 'https://a.baidu.cn/abc/baidu/admin/index.php' : (config.dev.proxyTable ? "/cros" : 'https://a.baidu.cn/a/b/admin/index.php')

export var AUTH_LINK = "https://baidu/abc/baidu.php?mod=auth&action=index"

export var ERR_OK = 1