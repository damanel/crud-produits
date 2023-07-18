import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-productcrud',
  templateUrl: './productcrud.component.html',
  styleUrls: ['./productcrud.component.css']
})
export class ProductcrudComponent {
  ProductArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  name: string ="";
  unitprice: string ="";
  quality: string ="";
  currentProductID = "";

  constructor(private http: HttpClient ) 
  {
    this.getAllProduct();
  }
  ngOnInit(): void {
  }
  getAllProduct()
  { 
    this.http.get("http://localhost:2800/api/product")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.ProductArray = resultData.data;
    });
  }
  
register()
  {
   
    let bodyData = {
      "name" : this.name,
      "unitprice" : this.unitprice,
      "quality" : this.quality,
    };
    this.http.post("http://localhost:2800/api/product/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Registered Successfully")
        this.getAllProduct();
    });
  }
  setUpdate(data: any) 
  {
   this.name = data.name;
   this.unitprice = data.unitprice;
   this.quality = data.quality;
  
   this.currentProductID = data.id;
 
  }
  UpdateProduct()
  {
    let bodyData = 
    {
      "name" : this.name,
      "unitprice" : this.unitprice,
      "quality" : this.quality
    };
    
    this.http.put("http://localhost:2800/api/product/update"+ "/"+ this.currentProductID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Registered Updated")
        this.getAllProduct();
      
    });
  }
 
  save()
  {
    if(this.currentProductID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateProduct();
      }       
  }
  setDelete(data: any)
  {
    this.http.delete("http://localhost:2800/api/product/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Deletedddd")
        this.getAllProduct();
    });
  }
}

