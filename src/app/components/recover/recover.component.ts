import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
  errorMessage:string = 'Login error'
  showError:boolean = false
  showWarning:boolean = false
  warningMessage:string
  dialogAction:string = 'error'
  token:string = ''
  constructor(
    private authService: AuthService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      const token = params['t'];
      this.token = token;
    })

  }

  onSubmit(password, passwordConfirmation){
    
    this.authService.changePassword({password,passwordConfirmation,token: this.token})
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
      // this.warningMessage= 'Password changed successfully'
      // this.dialogAction = 'success'
      // this.showWarning = true
      // const timeout =  setTimeout(() => {
      //   this.showWarning = false
      //   clearTimeout(timeout)
      // }, 5000);
      this.router.navigate(['/login'])
      console.log('password changed successfully')
      
    }

    console.log('password change',result)
  }

  closeDialog(selection){
    this.showWarning = false
  }

  selected(selection){
    this.showError = false
  }


}
