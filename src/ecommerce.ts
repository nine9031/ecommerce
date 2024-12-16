class Customer {
    private name: string
    private address: string
    constructor(name: string, address: string){
        this.name = name
        this.address = address
    }

    public getInfo():string{
        return "Name: "+ this.name + "\nAddress: "+ this.address;
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
        let subtotal = 0;
        for(let i = 0; i < this.orderDetails.length;i++){
            subtotal =  subtotal + this.orderDetails[i].calcSubTotal();
        }
        return subtotal;
    }
    public calcTax(){
        let vat = 0;
        for(let i = 0; i < this.orderDetails.length;i++){
        vat = vat + this.orderDetails[i].calcTax();
        }
        return vat;
    }
    public calcTotal(){
        return this.calcSubTotal() + this.calcTax();
    }
    public calcTotalWeight(){
        let weight = 0
        for(let i = 0; i < this.orderDetails.length;i++){
        weight = weight + this.orderDetails[i].calcWeight();
        }
        return weight
    }
    public addOrderDetails(orderDetails: OrderDetail){
this.orderDetails.push(orderDetails)
    }
    public payOrder(payment: Payment){
        this.payment = payment
    }
    public getPayment():Payment{
        return this.payment
    }
    public printOrderDetails():void{
        for(let i = 0 ; i < this.orderDetails.length; i++){
            this.orderDetails[i].printDetail();
        }
    }
}

class OrderDetail{
    private item: Item
    private quantity: number
    private taxStatus: string

    constructor(item: Item, quantity: number, taxStatus: string){
        this.item = item
        this.quantity = quantity
        this.taxStatus = taxStatus
    }
    public calcSubTotal(){
        return this.quantity*this.item.getPriceForQuantity();
    }
    public calcWeight(){
        return this.quantity*this.item.getShippingWeight();
    }
    public calcTax(){
        if(this.taxStatus === "not included"){
            return this.quantity* this.item.getTax();
        }
        return 0;
    }

    public printDetail():void{
        console.log(this.item.getName() + "\t"+ this.quantity + "\t"+ this.calcSubTotal()+" ฿\t");
    }
}

class Item {
    private shippingWeight: number
    private description: string
    private price: number

    constructor(shippingWeight: number, description: string, price: number){
        this.shippingWeight = shippingWeight
        this.description = description
        this.price = price
    }
    public getPriceForQuantity(){
        return this.price;
    }
    public getTax(){
        return this.price * 0.07;
    }
    public getShippingWeight(){
        return this.shippingWeight;
    }
    public inStock(){
        return true;
    }
    public getInfo():string{
        return "Name: "+ this.description+", Price: "+ this.price +" ฿, Weight: "+ this.shippingWeight+" kg.";
    }
    public getName():string{
        return this.description;
    }
}

abstract class Payment{
    private amount:number

    constructor(amount: number){
        this.amount = amount
    }
    public getAmount():number{
        return this.amount;
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
    public getChanged():number{
        return this.cashTendered - this.getAmount();
    }
    public getCashTendered():number{
        return this.cashTendered;
    }
}

//Create Object
const customer1 = new Customer("Mr. Alongkon Natphunwat", "Nakhon Pathom");
console.log(customer1.getInfo());


//Item
const item1 = new Item(1.5, "Lotus's water", 15);
console.log(item1.getInfo());
const item2 = new Item(0.05, "Lays", 30);
console.log(item2.getInfo());
const item3 = new Item(0.1, "Mama", 6);
console.log(item3.getInfo());
console.log("############### Order ################"
)

//Order
const order1 = new Order(customer1, "16/12/2567", "in progress");

//OrderDetails
const orderdetail1 = new OrderDetail(item1,15,"not included");

const orderdetail2 = new OrderDetail(item2,20,"not included");

const orderdetail3 = new OrderDetail(item3,10,"not included");

//OrderDetail => Order
order1.addOrderDetails(orderdetail1);
order1.addOrderDetails(orderdetail2);
order1.addOrderDetails(orderdetail3);

const amount = order1.calcTotal();
//Payment
const cash = new Cash(amount, 1000);
order1.printOrderDetails();
order1.payOrder(cash);
console.log("SubTotal: "+ order1.calcSubTotal()+" ฿");
console.log("VAT: "+ order1.calcTax()+" ฿")
console.log("Total: "+ order1.getPayment().getAmount()+" ฿");

console.log("Recieve: "+ (order1.getPayment() as Cash).getCashTendered()+" ฿");
console.log("Change: "+ (order1.getPayment() as Cash).getChanged()+" ฿");