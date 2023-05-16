import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data:any;
  abc: any;


  
  constructor(private fb:FormBuilder, private serv:ShareService){
    
  }

  form = this.fb.group({
    name: [''],
    kra: [''],
    status: ['']
  })

  ngOnInit(): void {
    this.getData()
  }


  getData() {
 this.serv.getData().subscribe((resp)=>{
  console.log(resp);
      this.data = resp
 })
  }

  onSave() {
    
      let obj = {
        name: this.form.value.name,
        kra: this.form.value.kra,
        status: this.form.value.status
      };
      this.serv.setData(obj).subscribe((resp) => {
        console.log(resp);
        
      });
    
  }

  saveChanges() {
    if (this.abc) {
      let obj= {
        name: this.form.value.name,
        kra: this.form.value.kra,
        status: this.form.value.status,
        id: this.abc.id,
      };
      this.serv.updatedata(this.abc.id,obj).subscribe((resp) => {
        this.data = resp; 
        console.log(resp)
      });
      
    }
    
    
    this.getData()
  }
  
  onClose() {
    this.form.reset();

}

editItem(d:any){
    
  this.form.patchValue({
    name: d.name,
    kra: d.kra,
    status: d.status
    
  });
  this.abc = d;
}
 
  
  deleteItem(d: any) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deleteData(d.id).subscribe(() => {
        this.getData();
      });
    }


  }
}
