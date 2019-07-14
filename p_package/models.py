from datetime import datetime
from p_package import db



class Buyer(db.Model):
    buyer_id=db.Column(db.Integer(),primary_key=True,autoincrement=True)
    buyer_fname=db.Column(db.String(255),nullable=False)
    buyer_lname=db.Column(db.String(255),nullable=False)
    buyer_email=db.Column(db.String(255),nullable=False)
    buyer_address=db.Column(db.String(255),nullable=False)
    buyer_phone=db.Column(db.String(255),nullable=False)
    password=db.Column(db.String(255),nullable=False)
    user_created_on=db.Column(db.DateTime(),default=datetime.utcnow)

    def __repr__(self):
        return "<{}:{}>".format(self.buyer_id,self.buyer_fname,self.buyer_lname)



seller_product=db.Table('seller_product', 
db.Column('productid',db.Integer,db.ForeignKey('product.product_id'),primary_key=True),
db.Column('sellerid',db.Integer,db.ForeignKey('seller.seller_id'),primary_key=True)
)#it is optionalto heve both field

class Product(db.Model):
    __tablename__='product'
    product_id= db.Column(db.Integer(),primary_key=True,autoincrement=True)
    product_brand=db.Column(db.String(255),nullable=False)
    product_model=db.Column(db.String(255),nullable=False)
    product_year=db.Column(db.String(4),nullable=False)
    product_condition=db.Column(db.String(255),nullable=False)
    product_fuel_type= db.Column(db.String(255),nullable=False)
    product_price = db.Column(db.Float(),nullable=False)
    product_color=db.Column(db.String(255),nullable=False)
    product_seller_id=db.Column(db.Integer(),db.ForeignKey('seller.seller_id'),nullable=False)
    product_image= db.Column(db.String(255),nullable=False)
    product_uploaded_on=db.Column(db.DateTime(),default=datetime.utcnow)

    def __repr__(self):
        return "<{}:{}>".format(self.product_id,self.product_brand,self.product_price)

    #relationship table
    sell_product=db.relationship('Seller',secondary='seller_product',backref=db.backref('cars'))


class Seller(db.Model):
    __tablename__='seller'
    seller_id=db.Column(db.Integer(),primary_key=True,autoincrement=True)
    seller_fname=db.Column(db.String(255),nullable=False)
    seller_lname=db.Column(db.String(255),nullable=False)
    seller_email=db.Column(db.String(255),nullable=False)
    seller_address=db.Column(db.String(255),nullable=False)
    seller_phone=db.Column(db.String(255),nullable=False)
    password=db.Column(db.String(255),nullable=False)
    user_created_on=db.Column(db.DateTime(),default=datetime.utcnow)

    def __repr__(self):
        return "<{}:{}>".format(self.userid,self.seller_fname,self.seller_lname)




#association table
brand_model=db.Table('brand_model',db.Column('brandid',db.Integer,db.ForeignKey('brand.brand_id'),primary_key=True),
db.Column('modelid',db.Integer,db.ForeignKey('car_models.model_id'),primary_key=True),)



class Brand(db.Model):
    __tablename__= 'brand'
    brand_id=db.Column(db.Integer(),primary_key=True,autoincrement=True)
    brand_name=db.Column(db.String(255),nullable=False)
    product_model_id=db.Column(db.Integer(),db.ForeignKey('product.product_id'))
    


    #relationship table
    brands=db.relationship('Car_models',secondary='brand_model',backref=db.backref('members'))



class Car_models(db.Model):
    __tablename__= 'car_models'
    model_id=db.Column(db.Integer(),primary_key=True,autoincrement=True)
    model_year=db.Column(db.String(4),nullable=False)
    model_name=db.Column(db.String(255),nullable=False)
    
    
class Product_image(db.Model):
    __tablename__='product_image'
    product_image_id=db.Column(db.Integer(),primary_key=True,autoincrement=True)
    product_image_product_id=db.Column(db.Integer(),db.ForeignKey('product.product_id'))


class Contactus(db.Model):
    __tablename__='contactus'
    message_id=db.Column(db.Integer(),primary_key=True,autoincrement=True)
    sender_email=db.Column(db.String(255),nullable=False)
    sender_phone=db.Column(db.String(255),nullable=False)
    message_content= db.Column(db.String(255),nullable=False)







