from flask import Flask



from flask_sqlalchemy import SQLAlchemy

from flask_wtf.csrf import CSRFProtect



app=Flask(__name__,template_folder='mytemplates',static_folder='mystatic',instance_relative_config=True)
csrf=CSRFProtect(app)
app.config.from_pyfile('config.py')

db=SQLAlchemy(app)



from p_package import views, models