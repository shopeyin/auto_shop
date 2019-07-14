from flask import request, render_template,make_response,abort,redirect,flash,session,url_for

from flask import flash
from werkzeug.security import  generate_password_hash,check_password_hash 
from p_package.myforms import ContactForm,LoginForm,SignUp,Register,Sellersignup,Sellerlogin,Productupload,Updateprofile,Contactus,SearchForm
from p_package import app, db, csrf
from flask import send_from_directory,jsonify
from p_package.models import Buyer,Seller,Car_models,Product
import random
import os
import json

from werkzeug.datastructures import CombinedMultiDict
from werkzeug import secure_filename
from PIL import Image


# @csrf.exempt
# @app.route('/jsonsu/',methods=['GET','POST'])
# def jsonsub():
#     j=db.session.query(Seller.seller_email).first()
#     if 0:
#         return 'available'
#     else:
#         return 'taken'

@app.route('/prod/')
def prod():
    return render_template('myproducts.html')




@app.route('/mysearch/', methods=['GET','POST'])
def mysearch():
    theform=SearchForm()
    mycar=db.session.query(Product.product_brand,Product.product_model,Product.product_year,Product.product_image,Seller.seller_fname,Seller.seller_phone,Seller.seller_address).join(Seller)
    return render_template('mysearch.html',theform=theform,mycar=mycar)


@app.route('/details/<productid>')
def details(productid):
    more=db.session.query(Product.product_brand,Product.product_model,Product.product_year,Product.product_image,Seller.seller_fname,Seller.seller_phone,Seller.seller_address).join(Seller).filter(Product.product_id==productid).all()
    return render_template('details.html',more=more)


# @app.route('/register/',methods=['GET','POST'])
# def reg():
#     form = Register()
#     if request.method=='GET':
#         return render_template('/register.html/',form=form)
#     else:
#         if form.validate_on_submit():
#             user=Regtable(username=request.form['username'],email=request.form['email'],password=request.form['password'])
#             db.session.add(user)
#             db.session.commit()
#             return render_template('/buyerdash.html/')
#         else:
#             return render_template('/register.html/')






# @app.route('/signup/')
# def signup():
#     userobj= User(username='dola@yahoo.com',pwd='ola')
#     db.session.add(userobj)
#     db.session.commit()
#     return 'add'


# @app.route('/home/',methods=['GET','POST'])
# def contactus():
#     cform=Contactus()
#     if request.method=='GET':
#         return render_template('index.html',cform=cform)
#     else:
#         if cform.validate_on_submit():
#             email=request.form['email']
#             phonenumber = request.form['phone']
#             message = request.form['message']
#             sendmsg = Contactus(sender_email=email,sender_phone=phone,message_content=message)
#             db.session.add(sendmsg)
#             db.session.commit()
#             return render_template('index.html')
#         else:
#             return render_template('index.html',cform=cform)




@app.route('/buyform/')
def buyerform():
     formdata = ContactForm()
     form = SignUp()
     pform=Productupload()
     
     return render_template('buyerform.html',formdata=formdata,form=form,pform=pform)




# @app.route('/formsubmit/',methods=['GET','POST'])
# def formsubmit():
#     formdata = ContactForm()
#     form = SignUp()
#     if request.method=='GET':
#         return render_template('buyerform.html',form=form,formdata=formdata)
#     else:
#         if form.validate_on_submit():
#             user=Buyer(buyer_fname=request.form['firstname'],buyer_lname=request.form['lastname'],buyer_email=request.form['email'],buyer_address=request.form['address'],buyer_phone=request.form['phonenumber'],password=request.form['password'])
#             db.session.add(user)
#             db.session.commit()
#             return  render_template('buyerdash.html')
#         else:
#             return render_template('buyerform.html',form=form,formdata=formdata)


# @app.route('/login/',methods=['GET','POST'])
# def login():
#     formdata = ContactForm()
#     form = SignUp()
#     if request.method == 'GET':
#         return render_template ('buyerform.html',formdata=formdata, form=form)
#     else:
#         if formdata.validate_on_submit():
#             data=db.session.query(Buyer).filter(Buyer.buyer_email==request.form['email'],Buyer.password==request.form['password']).first()
#             if data != None:
#                 session['buyer']=data.buyer_fname
#                 return redirect ('buyerform.html')
#             else:
#                 flash('invalid details')
#                 return render_template('buyerform.html',formdata=formdata, form=form)
#         else:
#             return render_template('buyerdash.html',formdata=formdata, form=form)




# @app.route('/logout/')    
# def logout():
#      if session.get('buyer'):
#          session.pop('buyer')
#      return redirect('/login')





@app.route('/sellform/')
def sellerform():
    forms=Sellersignup()
    formd=Sellerlogin()
    pform=Productupload()
    return render_template('sellerform.html',forms=forms,formd=formd,pform=pform)




@app.route('/formsub/',methods=['GET','POST'])
def formsub():
    forms=Sellersignup()
    formd=Sellerlogin()
    pform=Productupload()
    form=Updateprofile()

    if request.method=='GET':
        return render_template('sellerform.html',forms=forms)
    else:
        if forms.validate_on_submit():
            formated = generate_password_hash(request.form['password'])
            myuser=Seller(seller_fname=request.form['firstname'],seller_lname=request.form['lastname'],seller_email=request.form['email'],seller_address=request.form['address'],seller_phone=request.form['phonenumber'],password=formated)
            db.session.add(myuser)
            db.session.commit()
            session['seller']=myuser.seller_fname
            session['sell']=myuser.seller_id
            return  render_template('sellerdash.html',pform=pform,form=form)
        else:
            flash('complete all fields')
            return render_template('sellerform.html',forms=forms,pform=pform,form=form)


@app.route('/login/',methods=['GET','POST'])
def login():
    # forms=Sellersignup()
    formd=Sellerlogin()
    pform=Productupload()
    form=Updateprofile()
    if request.method=='GET':
        return render_template('login.html',formd=formd,form=form)
    else:
        if formd.validate_on_submit():
            mydata=db.session.query(Seller).filter(Seller.seller_email==request.form['email']).first()
            if mydata and check_password_hash(mydata.password,request.form['password']):
                session['seller']=mydata.seller_fname
                return render_template('sellerdash.html',pform=pform,form=form,formd=formd)     
            else:
                flash('invalid details')
                return render_template('login.html',formd=formd)
            
        else:
            return render_template('login.html',formd=formd)
            







@app.route('/upload/',methods=['GET','POST'])
def upload():
    forms=Sellersignup()
    formd=Sellerlogin()
    pform=Productupload()
    form=Updateprofile()
    if request.method =='GET':
        return render_template('sellerdash.html',pform=pform, formd=formd,forms=forms,form=form)
    else:
        if pform.validate_on_submit():
            ppt=request.files['passport']  
            name, ext=os.path.splitext(ppt.filename)
            newname=secure_filename(name) + str(random.random())+ext
            ppt.save(app.config['UPLOAD_FOLDER']+newname)

            # pillowobj= Image.open(app.config['UPLOAD_FOLDER'] + newname)
            # pillowobj.thumbnail((240,240))
            # newname = newname + ext
            # pillowobj.save(app.config['UPLOAD_FOLDER'] + newname)
            sellerid=session['sell']
            mycar=Product(product_brand=request.form['productbrand'],product_model=request.form['productmodel'],product_year=request.form['productyear'],product_condition=request.form['productcondition'],product_fuel_type=request.form['productfuel'],product_price=request.form['productprice'],product_color=request.form['productcolor'],product_image=newname,product_seller_id=sellerid)
            db.session.add(mycar)
            db.session.commit()
            return render_template('sellerdash.html',forms=forms,formd=formd,pform=pform,form=form)
            
        else:
            return render_template('index.html')

    
@app.route('/v/',methods=['GET','POST'])
def v():
    view=db.session.query(Seller.seller_fname,Seller.seller_lname,Seller.seller_phone,Seller.seller_address,Product.product_brand,Product.product_price).join(Product).all()
    return render_template('h.html',view=view)
 

@app.route('/viewproduct/<sellerid>')
def viewproduct(sellerid):
    vehicles=db.session.query(Product.product_brand,Product.product_model,Seller.seller_fname).join(Seller).all().filter(Product.product_id==sellerid)
    return render_template('viewprod.html',vehicles=vehicles)


@app.route('/delcar/')
def delcar():
    pro=Product.query.filter_by(product_id=1).first()
    db.session.delete(pro)
    db.session.commit()
    return redirect('/viewproduct',pro=pro)
 



@app.route('/update/',methods=['GET','POST'])
def update():
    formated = generate_password_hash(request.form['password'])
    forms=Sellersignup()
    formd=Sellerlogin()
    form=Updateprofile()
    pform=Productupload()
    id= session['sell']
    seller=db.session.query(Seller).get(id)
    
    seller.seller_fname=request.form['changevendor']
    seller.seller_address=request.form['address']
    seller.seller_phone=request.form['phonenumber']
    seller.password=formated


    db.session.commit()
    return render_template('sellerdash.html',form=form,pform=pform,formd=formd,forms=forms)






@app.route('/delete/')
def delete():
    id = session['sell']
    user=db.session.query(Seller).get(id)
    db.session.delete(user)
    db.session.commit()
    return redirect ('/login')

    




@app.route('/logout/')    
def logout():
    if session.get('seller'):
         session.pop('seller')
    return redirect('/login/')





# # @app.route('/delete/')
# # def delete():
# #     delete_this=User.query.filter_by(userid=13).first()
# #     db.session.delete(delete_this)
# #     db.session.commit()
# #     return 'deleted'




@app.route('/home/')
def home():
    mysearch=SearchForm()
    cars=Product.query.limit(6).all()
    # cars=Product.query.(Product.product_image).all()
    return render_template('index.html',cars=cars,mysearch=mysearch)



@app.route('/viewimage/<path:filename>')
def download_file(filename):
    return send_from_directory('../' + app.config['UPLOAD_FOLDER'],filename,as_attachment=False)



@app.route('/ourservices/')
def ourservices():
    return render_template('services.html')



@app.route('/ourproducts/')
def products():
    return render_template('products.html')


# @app.route('/sellform/')
# def sellerform():
#     return render_template('sellerform.html')
 

@app.route('/buyerdash/')
def buyerdash():
    return render_template('buyerdash.html')

@app.route('/selldash/')
def sellerdash():
    forms=Sellersignup()
    formd=Sellerlogin()
    form=Updateprofile()
    pform=Productupload()
    return render_template('sellerdash.html',forms=forms,formd=formd,pform=pform,form=form)


# @app.route('/selldash/')
# def selldash():
#     return render_template('sellerdash.html')





@app.errorhandler(500)
def error500(error):
    return render_template('500.html',error=error),500

@app.errorhandler(404)
def error404(error):
    return render_template('404.html',error=error),404

@app.errorhandler(403)
def error403(error):
    return render_template('403.html',error=error),403

@app.errorhandler(410)
def error410(error):
    return render_template('410.html',error=error),404
