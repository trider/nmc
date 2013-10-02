// JavaScript Document
var dname = "asia.xml";
$(document).ready(function() {

  $('#btnHide').collapse({toggle: true});
  
  $('#options').on('show', function () {
    $('#btnHide').hide();
  })
  ;
  $('#options').on('hide', function () {
    $('#btnHide').show();
  });
  
  $("#region").change(function(){
     $("#p1").html(PopulateLst(getRegion()));
  });
  
                
  $("#btnView").click(function(){
      getReport(getRegion(), getType(), getCustLst(), isStacked(),getMaxItems());
      $("#options").collapse('hide');
    })
    $("#btnHide").hide();
    $("#p1").html(PopulateLst(dname));
  });

function getReport(dname, type,lst,val,max){

  if (type=="table"){
    $("#chart").html(GetTable(dname, lst)); }
  else{  
    createChart(dname, type, val, lst,max);   
  }
}

function isStacked(){
  return $('#stacked:checked').val();
}

function getMaxItems(){
  return $('#maxItems').val();
}

function getRegion(){
 return $('#region').val()+'.xml';
}

function getType(){
 return $('#type').val();
}

function getCustLst(){
  return $('#Select01').val()||[]; 
}


function createChart(dname, chartType,stacked,lst, maxItems) {

 var chart_data = GetGraphData(dname, lst); 
 
                 
 $("#chart").kendoChart({
     title: { text: "Compliance Chart" },
     legend: { position: "top"},
     dataSource: { data: chart_data },
     
     seriesDefaults: { type: chartType, stack: stacked },
     series:[
       { name: "Missing Critical Data", 
         field: "black",
         color: "black" },
       { name: "Not Compliant more than 62 days",
         field: "red",
         color: "red"
       },
       { name: "Compliant in the last 32 days",
         field: "green",
         color: "green"
       },
       { name: "Not Compliant in the last 62 days",
         field: "yellow",
         color: "yellow"
       }],
     valueAxis: {
         min:0,
         max:maxItems  
     },
     categoryAxis: { field: "name" },
     tooltip: { 
       visible: true,
       format: "{0}" }
   });
 
//Handle Android
if (!testSvg()) {
   
   var chartEle = $("#chart"),
       chart = chartEle.data("kendoChart"),
       svg = chart.svg();

   var canvas = document.createElement("canvas");
   canvas.setAttribute("style", "height:" + chartEle.height() + ";width:" + chartEle.width() + ";");

   canvg(canvas, svg);

   chartEle.empty();
   chartEle.append(canvas);
}

}

function testSvg() {
  return !!document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;           
}
