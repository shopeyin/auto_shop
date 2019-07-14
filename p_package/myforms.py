""" this module contains classes for my webform """
from flask_wtf import FlaskForm
from flask_wtf.file import FileField,FileRequired,FileAllowed
from wtforms import StringField,TextAreaField,PasswordField,BooleanField,SubmitField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo


class ContactForm(FlaskForm):
    """The login form """
    email = StringField("Email: ",validators=[Email(message='WTF!!!')])
    password=PasswordField("Password: ", validators=[DataRequired(message='input valid password')])
    submit = SubmitField("Submit")

class LoginForm(FlaskForm):
    """ the contact us form"""
    username = StringField("Name: ",validators=[DataRequired(message='input'),Email()])
    password = PasswordField("Password: ",validators=[DataRequired(message='WTF!!!')])
    submit = SubmitField("Login") 

class SignUp(FlaskForm):
    """buyer sign up form"""
    firstname = StringField("First name: ",validators=[DataRequired()])
    lastname = StringField("Last name: ",validators=[DataRequired()])
    email = StringField("Email: ",validators=[Email()])
    address = StringField("Address: ",validators=[DataRequired()])
    phonenumber = IntegerField("Phone number: ",validators=[DataRequired()])
    password = PasswordField("Password: ",validators=[DataRequired(message='WTF!!!')])
    confirmpassword = PasswordField('Confirm Password', validators=[EqualTo('password',message='Passwords must match')])
    checkbox= BooleanField("",validators=[DataRequired(message='Tick this box')])
    submit = SubmitField("Submit")



class Sellersignup(FlaskForm):
    """seller signup form"""
    firstname = StringField("First name: ",validators=[DataRequired()])
    lastname = StringField("Last name: ",validators=[DataRequired()])
    email = StringField("Email: ",validators=[Email(message='Input a valid email address')])
    address = StringField("Address: ",validators=[DataRequired()])
    phonenumber = IntegerField("Phone number: ",validators=[DataRequired()])
    password = PasswordField("Password: ",validators=[DataRequired()])
    confirmpassword = PasswordField('Confirm Password', validators=[EqualTo('password',message='Passwords must match')])
    checkbox= BooleanField("",validators=[DataRequired(message='Tick this box')])
    submit = SubmitField("Submit")

class Sellerlogin(FlaskForm):
    """The login form """
    email = StringField("Email: ",validators=[Email(message='WTF!!!')])
    password=PasswordField("Password: ", validators=[DataRequired(message='input valid password')])
    submit = SubmitField("Submit")


class Productupload(FlaskForm):
    """product form"""
    productbrand = StringField("Product brand: ",validators=[DataRequired()])
    productmodel = StringField("Product model: ",validators=[DataRequired()])
    productyear = StringField("Product year: ",validators=[DataRequired()])
    productcondition = StringField("Product condition: ",validators=[DataRequired()])
    productfuel = StringField("Product fuel type: ",validators=[DataRequired()])
    productprice = StringField("Product price: ",validators=[DataRequired()])
    productcolor = StringField("Product color: ",validators=[DataRequired()])
    passport = FileField('Upload passport', validators=[FileRequired(),FileAllowed(['jpg','png','jpeg'],'images only')])
    submit = SubmitField("Save")



class Register(FlaskForm):
    """sign up form"""
    username = StringField("UserName: ",validators=[DataRequired(message='input'),Email()])
    email = StringField("Email: ", validators=[Email(message='what')])
    password = PasswordField("Password: ", validators=[DataRequired()])
    submit= SubmitField("SignUp")


class Updateprofile(FlaskForm):
    changevendor = StringField("Change name: ",validators=[DataRequired(message='please input')])
    password = PasswordField("Password: ",validators=[DataRequired(message='WTF!!!')])
    address = StringField("Change address: ",validators=[DataRequired(message='please input')])
    phonenumber = IntegerField("Phone number: ",validators=[DataRequired()])
    submit= SubmitField("Save Changes")
   

   
class Contactus(FlaskForm):
     email = StringField("Email: ", validators=[Email(message='what')])
     phonenumber = IntegerField("Phone number: ",validators=[DataRequired()])
     message = TextAreaField("Message: ", validators=[DataRequired()])
     submit= SubmitField("Save Changes")



class SearchForm(FlaskForm):
    search = StringField("search: ", validators=[DataRequired()])
    submit= SubmitField("Search")
