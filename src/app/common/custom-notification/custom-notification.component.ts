import { Component, OnInit ,Input,SimpleChanges} from '@angular/core';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-custom-notification',
  templateUrl: './custom-notification.component.html',
  styleUrls: ['./custom-notification.component.scss']
})
export class CustomNotificationComponent implements OnInit {
  @Input() Notification;

  constructor(private service: NotificationsService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('Notification ',this.Notification)
    let title    = this.Notification.title
    let content  = this.Notification.content
    let override = {
      position       : this.Notification.position,
      timeOut        : this.Notification.timeOut,
      showProgressBar: this.Notification.showProgressBar,
      pauseOnHover   : this.Notification.pauseOnHover,
      clickToClose   : this.Notification.clickToClose
    }
    

    if (this.Notification.showSuccess=='YES') {
      this.onSuccess(title,content,override)
    }if (this.Notification.showError=='YES') {
      this.onError(title,content,override)
    }
  }

  onSuccess(title,content,override){
    this.service.success(title, content, override)
  }
  onError(title,content,override){
    this.service.error(title, content, override)
  }
}
