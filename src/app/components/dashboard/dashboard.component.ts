import { Component, OnInit, ViewChild,AfterViewChecked } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ManifestService } from 'src/app/services/manifest/manifest.service';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';
import { UserService } from 'src/app/services/user/user.service';
import { GroupService } from 'src/app/services/group/group.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  counts = {
    manifests:{
      active:0,
      incomplete:0,
      shipping:0,
      arrived:0,
      archived:0,
      all:0
    },
    shipments:{
      active:0,
      shipping:0,
      incomplete:0,
      arrived:0,
      archived:0,
      all:0
    },
    users:{
      active:0,
      locked:0,
      all:0
    },
    groups:{
      all:0
    }
  }
  isLoadingResults:boolean = true
  currentFeed = 'Admin'
  userId = '1'
  userNames = UtilsService.getNames()
  scrolledToBottom:boolean =false
  @ViewChild('feedsContainer') feedsContainer 
  feeds = [
    {
      userId:'0',
      name:'Admin',
      message:'Hello, Welcome to the dashboard',
      dateTime:new Date().toString()
    }, 
    {
      userId:'0',
      name:'Admin',
      message:'The messaging and feeds feature is not yet available but i do have some information on how to navigate the website.',
      dateTime:new Date().toString()
    }, 
    {
      userId:'0',
      name:'Admin',
      message:"Currently If you have the necessary permissions, you will be able to create new manifests, update them and manage all their life cycle till they are archived",
      dateTime:new Date().toString()
    }, 
    {
      userId:'0',
      name:'Admin',
      message:"oh! you can also generate manifest pdfs and send them as email attachments.",
      dateTime:new Date().toString()
    }, 
    {
      userId:'0',
      name:'Admin',
      message:"You can do the same for shipments except the pdf and email part.",
      dateTime:new Date().toString()
    }, 
    {
      userId:'0',
      name:'Admin',
      message:"Admins and other privilaged users can create and manage users and different user groups.",
      dateTime:new Date().toString()
    },
    {
      userId:'0',
      name:'Admin',
      message:"The dashboard contains basic statistics",
      dateTime:new Date().toString()
    },

    {
      userId:'1',
      name:'User',
      message:"Remember messaging features are not yet available.",
      dateTime:new Date().toString()
    },
    {
      userId:'1',
      name:'User',
      message:"user the rotating icon to the right to switch to dark mode.",
      dateTime:new Date().toString()
    }

  ]
  constructor(
    private manifestService:ManifestService,
    private shipmentService:ShipmentService,
    private userService:UserService,
    private groupService:GroupService
  ) { }

  ngOnInit(): void {
    this.getCounts()
    
    this.feeds.forEach(feed =>{
      feed['postedAt'] = this.prepareDateTime(feed.dateTime)
    })
  }


  ngAfterViewChecked(){
    if(!this.scrolledToBottom){
      this.scrollToBottom()
      this.scrolledToBottom = true
    }
  }

  scrollToBottom():void{
    this.feedsContainer.nativeElement.scrollTop = this.feedsContainer.nativeElement.scrollHeight  
  }
  
  prepareDateTime(dateTime)
  {
    try {
      const then =  Date.parse(dateTime.toString())
      const now = Date.now()
      const passedTime = (now-then)/1000
      let timePosted 
      if(passedTime <= 59){
        timePosted = 'just now'
      }else if(passedTime < 3600){
        const inMins:number =Math.ceil(passedTime/60) 
        timePosted = `${inMins} ${inMins == 1?'min':'mins'} ago`
      }else if (passedTime < 3600 *24){
        const asTime = new Date(dateTime).toLocaleTimeString().toString().toLowerCase()
        timePosted = `${asTime== 'invalid date'?'':asTime }`
      }else{
        const asDateTime = new Date(dateTime).toLocaleString().toString().toLowerCase()
        timePosted = `${asDateTime== 'invalid date'?'':asDateTime }`
      }
      console.log('time posted',timePosted)
      return timePosted.replaceAll('/','-')
      
    } catch (error) {
      console.log(error)
      return 
    }
    
  }

  onChangeFeed(newFeed){
    this.currentFeed = newFeed
  }

  getCounts(){
    const categories = ['all','active','shipping','arrived','archived','incomplete']

    categories.forEach(category =>{
      this.manifestService.getCount(category)
      .subscribe(result =>{ this.afterSubscribing(result,'manifests',category)})
      
    })

    categories.forEach(category =>{
      this.shipmentService.getCount(category)
      .subscribe(result =>{ this.afterSubscribing(result,'shipments',category)})
      
    })

    this.userService.getCount('all')
      .subscribe(result =>{ this.afterSubscribing(result,'users','all')})
    
    this.userService.getCount('active')
    .subscribe(result =>{ this.afterSubscribing(result,'users','active')})

    this.userService.getCount('locked')
      .subscribe(result =>{ this.afterSubscribing(result,'users','locked')})

    this.groupService.getCount('all')
      .subscribe(result =>{ 

        this.afterSubscribing(result,'groups','all')
        this.createGraph()
        this.isLoadingResults = false

    })

  }

  afterSubscribing(result,collection,category){
    if(result.isError){
      console.log(result.message)
    }else{
      this.counts[collection][category] = result
    }
  }

  createGraph(){
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create('mainChart',am4charts.XYChart)
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.paddingBottom = 5;
    
    chart.data = [
      {
        name:'Manifests',
        steps:this.counts.manifests.all
        
      },
      {
        name:'shipments',
        steps:this.counts.shipments.all
        
      },
      {
        name:'users',
        steps:this.counts.users.all
        
      },
      {
        name:'groups',
        steps:this.counts.groups.all
        
      }
    ]

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.strokeOpacity = 0  ;
    categoryAxis.renderer.minGridDistance = 15;
    categoryAxis.renderer.labels.template.dy = 35;
    categoryAxis.renderer.tooltip.dy = 35;


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 0.3;
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.strokeOpacity = 0;
    

    var series = chart.series.push(new am4charts.ColumnSeries);
    series.dataFields.valueY = "steps";
    series.dataFields.categoryX = "name";
    series.tooltipText = "{valueY.value}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.dy = - 6;
    series.columnsContainer.zIndex = 100;
    series.dataItems.template.locations.categoryX = 0.8;

    var columnTemplate = series.columns.template;
    columnTemplate.width = am4core.percent(50);
    columnTemplate.maxWidth = 66;
    columnTemplate.column.cornerRadius(60, 60, 10, 10);
    columnTemplate.strokeOpacity = 0;


    series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueY", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
    series.mainContainer.mask = undefined;
  
    var cursor = new am4charts.XYCursor();
    chart.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = "none";
  }


  

}
