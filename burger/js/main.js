class Hamburger {
  constructor(size = 'big', stuffing = 'cheese') { 
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];
    this._rendertotal();
  }

  _rendertotal() {
    document.querySelector('.total').textContent = `Total: price ${this.calculatePrice()}, callories ${this.calculateCalories()}`;
  }

  addTopping(topping) {
    this.toppings.push(topping);
  } 

  removeTopping(topping) {
    this.toppings.forEach((el, index)=>{
      if (el == topping) {
        this.toppings.splice(index, 1);
      }
    });
  }

  setSize(size) { 
    this.size = size;
  }   
  
  setstuffing(stuffing) { 
    this.stuffing = stuffing;
  }    


  calculatePrice() { 
    let total = 0;      
    if (this.size == 'big') {
      total+=100;
    } else if (this.size == 'small') {
      total+=50;
    }
    
    switch (this.stuffing){
      case 'salad':
        total+=20; 
        break;
      case 'cheese':
        total+=10; 
        break;
      case 'potato':
        total+=15;
        break;  
       
    }

    this.toppings.forEach((el)=>{
      switch (el){
        case 'herb':
          total+=15;
          break; 
        case 'mayo':
          total+=20;
          break;   
      }  
    });
    
    return total;
  }

  calculateCalories() {
    let total = 0;      
    if (this.size == 'big') {
      total+=40;
    } else if (this.size == 'small') {
      total+=20;
    }
    
    switch (this.stuffing){
      case 'salad':
        total+=5; 
        break;
      case 'cheese':
        total+=20; 
        break;
      case 'potato':
        total+=10; 
        break; 
      case 'mayo':
        total+=5;
        break;    
    }
    
    this.toppings.forEach((el)=>{
      switch (el){
        case 'mayo':
        total+=5;
        break; 
      }  
    });

    return total; 
  }  
}


let Burger = new Hamburger();

document.querySelectorAll('.type input').forEach((el)=>{
  el.addEventListener('change', (event)=>{
      Burger.setSize(event.target.dataset.type);
      Burger._rendertotal();
  });
});

document.querySelectorAll('.toppings input').forEach((el)=>{
  el.addEventListener('change', (event)=>{
      Burger.setstuffing(event.target.dataset.type);
      Burger._rendertotal();
  });
});

document.querySelectorAll('.Additional input').forEach((el)=>{
  el.addEventListener('change', (event)=>{
    if (event.target.checked) {
      Burger.addTopping(event.target.dataset.type);
    } else {
      Burger.removeTopping(event.target.dataset.type);
    }
    Burger._rendertotal();
  });
});