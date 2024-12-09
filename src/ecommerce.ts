class Customer {
    private name: string
    private address: string

    constructor(name: string, address: string){
        this.name = name
        this.address = address
    }
}
class Order{
    private customer: Customer
    private orderDetails: OrderDetail[]=[]
    private payment: Payment=new Cash(0,0)
    private date: string
    private status: string

    constructor(customer: Customer ,date: string, status: string){
        this.customer = customer
        this.date = date
        this.status = status
    }
    public calcSubTotal(){

    }
    public calcTax(){
        
    }
    public calcTotal(){
        
    }
    public calcTotalWeight(){
        
    }
    public addOrderDetail(orderDetails: OrderDetail){
this.orderDetails.push(orderDetails)
    }
    public payOrder(payment: Payment){
        
    }
}

class OrderDetail{
    private item: Item
    private quantity: string
    private taxStatus: string

    constructor(item: Item, quantity: string, taxStatus: string){
        this.item = item
        this.quantity = quantity
        this.taxStatus = taxStatus
    }
    public calcSubTotal(){

    }
    public calcWeight(){
        
    }
    public calcTax(){
        
    }
}

class Item {
    private shippingWeight: string
    private description: string

    constructor(shippingWeight: string, description: string){
        this.shippingWeight = shippingWeight
        this.description = description
    }
    public getPriceForQuantity(){

    }
    public getTax(){
        
    }
    public inStock(){
        
    }
}

abstract class Payment{
    private amount:number

    constructor(amount: number){
        this.amount = amount
        
    }
}

class Check extends Payment{
    private name:string
    private bankID:string

    constructor(amount:number,name:string, bankID:string){
        super(amount)
        this.name = name
        this.bankID = bankID
    }
    public authorized(){

    }
}

class Credit extends Payment{
    private number:string
    private type:string
    private expDate:string

    constructor(amount:number,number:string,type:string, expDate:string){
        super(amount)
        this.number = number
        this.type = type
        this.expDate = expDate
    }
    public authorized(){

    }
}

class Cash extends Payment{
    private cashTendered:number

    constructor(amount:number,cashTendered:number){
        super(amount)
        this.cashTendered = cashTendered
    }
}