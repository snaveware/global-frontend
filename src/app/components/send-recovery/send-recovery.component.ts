import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-send-recovery',
  templateUrl: './send-recovery.component.html',
  styleUrls: ['./send-recovery.component.scss']
})
export class SendRecoveryComponent implements OnInit {
  errorMessage:string = 'Login error'
  showError:boolean = false
  showWarning:boolean = false
  warningMessage:string
  dialogAction:string = 'error'
  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(UtilsService.checkInitialLoginStatus()){
      this.router.navigate(['/'])
    }
  }

  onSubmit(email){
    
    this.authService.requestRecoveryEmail(email)
    .subscribe(result =>{
      this.afterSubscribing(result)
    })
    
  }

  afterSubscribing(result){
    if(!result){
      this.errorMessage = 'unknown result. Contact the admin'
      this.showError =true
    }
    if(result.isError){
      this.errorMessage = result.message
      this.showError =true
      console.log('error requesting recovery email',result.message)
    }
    else{
      this.warningMessage= 'created successfully'
      this.dialogAction = 'success'
      this.showWarning = true
      const timeout =  setTimeout(() => {
        this.showWarning = false
        clearTimeout(timeout)
      }, 5000);
      console.log('email sent successfully')
      
    }

    console.log('login',result)
  }

  closeDialog(selection){
    this.showWarning = false
  }

  selected(selection){
    this.showError = false
  }



}
