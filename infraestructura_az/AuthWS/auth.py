import os
from tornado.ioloop import IOLoop
from tornado.web import Application, RequestHandler
from tornado.escape import json_decode
import datetime
import jwt
import ldap

app_secret = os.getenv('app_secret')
allowed_app_name = os.getenv('allowed_app_name')
token_live = os.getenv('token_live')

class DefaultHandler(RequestHandler):
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Allow-Methods', '*')

    def get(self):
        self.write({'response':'Servicio de Autenticación Operativo', 'status':200})

class ActionHandler(RequestHandler):
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Allow-Methods', '*')

    def options(self, action):
        pass
    
    def post(self, action):
        content = json_decode(self.request.body)
        if (action == 'ldap_auth'):
            email = content['email']
            password = content['password']
            respuesta = ldap_auth(email,password)
        self.write(respuesta)
        return

def ldap_auth(email,password):
    ldap_server = os.getenv('ldap_server')
    ldap_port = os.getenv('ldap_port')
    try:
        connect = ldap.initialize('ldap://' + ldap_server + ':' + str(ldap_port))    
    except ldap.SERVER_DOWN:
        return 'No se puede conectar al LDAP'
    try:
        connect.set_option(ldap.OPT_REFERRALS, 0)
        connect.simple_bind_s(email, password)
        connect.unbind()
        return {'response':'Usuario Autorizado', 'userdata': email, 'token':generate_token(), 'status':200}        
    except Exception as e:
        return {'response': 'Usuario no Autorizado', 'userdata': '', 'token':'', 'status':500}

def generate_token():
    exp_time = datetime.datetime.now() + datetime.timedelta(minutes=int(token_live))
    payload = { 'app_name':allowed_app_name, 'valid_until': str(exp_time) }
    return jwt.encode(payload, app_secret, algorithm='HS256')

def make_app():
    urls = [
        ("/", DefaultHandler),
        ("/([^/]+)", ActionHandler)
    ]
    return Application(urls, debug=True)
  
if __name__ == '__main__':
    app = make_app()
    app.listen(5050)
    IOLoop.instance().start()